// src/components/LoginModal.jsx
import React, { useEffect, useState } from 'react';
import './Login.css';
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import {login} from '../API/Login.API'

const Login = ({ isOpen, onClose }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        };

        if (!isOpen) {
            window.addEventListener('click', handleOutsideClick);
        }

        return () => {
            window.removeEventListener('click', handleOutsideClick)
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Correo electronico ingresado:", email);
        console.log("Contraseña ingresada:", password);
    
        try {
            const response = await login(email, password);
            console.log("Respuesta de la API:", response);
        } catch (error) {
            console.error("Error durante Login", error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='CloseButtom'>
                    <span className="close-button" onClick={onClose}>&times;</span>
                </div>
                <div className='IniciarSesion'>
                    <h3>Iniciar Sesión/Registrarse</h3>
                </div>
                <div className='LoginLogos'>
                    <div className='LoginImg'>
                        <FaTruckFast />
                        <span>Envio gratis</span>
                        <small> En todos los pedidos</small>
                    </div>
                    <div className='LoginImg'>
                        <MdOutlineAssignmentReturn />
                        <span>Devoluciones 90 días</span>
                        <small> desde la fecha de compra</small>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email o número de telefono:</label>
                        <input 
                            type="Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    {<div className="form-group">
                        <label>Contraseña:</label>
                        <input 
                            type="password"
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>}
                    <div className='ContinueButtom'>

                    </div>
                    <button type="submit">Continuar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
