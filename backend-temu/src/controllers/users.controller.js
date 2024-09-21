import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import twilio from "twilio";
import { Vonage } from "@vonage/server-sdk";

const SECRET_KEY = "erdggfdjhe23";
const accountSid = "AC7e3df1b87dbcfece000f3aed860a2fcf"; // Tu Account SID de Twilio
const authToken = "8151b9c72d665f804644b19f34840d75"; // Tu Auth Token de Twilio
const client = twilio(accountSid, authToken);

const vonage = new Vonage({
  apiKey: "f66bb460", // Tu API Key de Vonage
  apiSecret: "D90Jr0lVLs2JEKyl", // Tu API Secret de Vonage
});

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for port 587
  auth: {
    user: "temulabsoftware@gmail.com",
    pass: "svbf wvpb wzld uoxv",
  },
});

// Controlador para manejar la solicitud de envío de código de verificación
export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  // Generar un código de verificación de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: '"Temu" <temulabsoftware@gmail.com>', // sender address
    to: email,
    subject: `${code} es su Código de Verificación de Temu`,
    text: `Tu código de verificación es: ${code}`,
    html: `<p style="font-size: 30px;">Tu código de verificación es: <strong>${code}</strong></p>`, // Contenido HTML con tamaño de fuente personalizado
  };

  try {
    // Enviar el código de verificación por correo electrónico
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado");

    res.status(200).send({
      message: "Código de verificación enviado a tu correo electrónico",
      code: code, // Devolver el código al frontend
    });
  } catch (error) {
    console.error("Error al enviar el correo de verificación:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para manejar la solicitud de actualización de contraseña
export const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await pool.query("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).send({
      message: "Contraseña actualizada exitosamente",
      token: token, // Devolver el token al frontend
      user: user,
    });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para manejar la solicitud de envío de código de verificación por SMS
export const sendVerificationCodeSMS = async (req, res) => {
  const { phoneNumber } = req.body;

  // Generar un código de verificación de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const from = "VonageAPI";
  const to = phoneNumber;
  const text = `Tu código de verificación es: ${code}`;

  try {
    // Enviar el código de verificación por SMS utilizando Vonage
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("SMS de verificación enviado", resp);
        res.status(200).send({
          message: "Código de verificación enviado a tu número de teléfono",
          code: code, // Devolver el código al frontend (opcional, dependiendo de tu flujo de trabajo)
        });
      })
      .catch((err) => {
        console.error("Error al enviar el SMS de verificación:", err);
        return res.status(500).json({ message: err.message });
      });
  } catch (error) {
    console.error("Error al enviar el SMS de verificación:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para manejar la solicitud de inicio de sesión con número de teléfono
export const loginWithPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE phone_number = ?",
      [phoneNumber]
    );

    let user;
    if (rows.length === 0) {
      // Crear un nuevo usuario si no existe
      const [result] = await pool.query(
        "INSERT INTO users (username, phone_number) VALUES (?, ?)",
        [phoneNumber, phoneNumber]
      );
      user = {
        id: result.insertId,
        username: phoneNumber,
        phone_number: phoneNumber,
      };
    } else {
      user = rows[0];
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        username: user.username,
      },
      token: token, // Devolver el token al frontend
    });
  } catch (error) {
    console.error("Error al iniciar sesión con número de teléfono:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para verificar si un email existe en la base de datos
export const hasProfile = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el email ya existe en la base de datos
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      res.status(200).send({ exists: false });
    } else {
      res.status(200).send({ exists: true });
    }
  } catch (error) {
    console.error("Error al verificar el email:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const username = email.split("@")[0];

  try {
    // Buscar el usuario en la base de datos
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      // Si el usuario no existe, crear un nuevo usuario
      const saltRounds = 10;
      const passwordHashed = await bcrypt.hash(password, saltRounds);

      const [insertResult] = await pool.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, passwordHashed]
      );

      // Obtener todos los datos del usuario recién creado
      const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        insertResult.insertId,
      ]);
      const newUser = userRows[0];

      // Generar el token JWT
      const token = jwt.sign(
        { id: insertResult.insertId, username, email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.send({
        message: "Usuario creado y sesión iniciada",
        user: {
          id: insertResult.insertId,
          username: username,
          email,
          id_usuario_plataforma: newUser.id_usuario_plataforma,
          nombre_plataforma: newUser.nombre_plataforma,
          phone_number: newUser.phone_number,
          is_verified: newUser.is_verified,
          created_at: newUser.created_at,
        },
        token: token, // Devolver el token al front-end
      });
    }

    const user = rows[0];

    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Si las credenciales son correctas, responder con un mensaje de éxito
    res.send({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        id_usuario_plataforma: user.id_usuario_plataforma,
        nombre_plataforma: user.nombre_plataforma,
        phone_number: user.phone_number,
        is_verified: user.is_verified,
        created_at: user.created_at,
      },
      token: token, // Devolver el token al front-end
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUserPlatform = async (req, res) => {
  const { id_usuario_plataforma, nombre_plataforma, username, email } =
    req.body;

  try {
    // Buscar si el usuario ya existe en la base de datos por correo electrónico
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    let user;
    if (rows.length === 0) {
      // Si el usuario no existe, crear un nuevo usuario
      const [insertResult] = await pool.query(
        "INSERT INTO users (id_usuario_plataforma, nombre_plataforma, username, email) VALUES (?, ?, ?, ?)",
        [id_usuario_plataforma, nombre_plataforma, username, email]
      );
      user = {
        id: insertResult.insertId,
        id_usuario_plataforma,
        nombre_plataforma,
        username,
        email,
      };
    } else {
      // Si el usuario ya existe, obtener sus datos
      user = rows[0];

      // Si el usuario existe pero no tiene id_usuario_plataforma, actualizar el registro
      if (!user.id_usuario_plataforma) {
        await pool.query(
          "UPDATE users SET id_usuario_plataforma = ?, nombre_plataforma = ? WHERE email = ?",
          [id_usuario_plataforma, nombre_plataforma, email]
        );
        user.id_usuario_plataforma = id_usuario_plataforma;
        user.nombre_plataforma = nombre_plataforma;
      }
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Devolver el ID del usuario y el token al front-end
    res.send({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        id_usuario_plataforma: user.id_usuario_plataforma,
        nombre_plataforma: user.nombre_plataforma,
        username: user.username,
        email: user.email,
        id_usuario_plataforma: user.id_usuario_plataforma,
        nombre_plataforma: user.nombre_plataforma,
        phone_number: user.phone_number,
        is_verified: user.is_verified,
        created_at: user.created_at,
      },
      token: token, // Devolver el token al front-end
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
