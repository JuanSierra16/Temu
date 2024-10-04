import { createContext, useState } from 'react';

const CarContext = createContext(null);

const CarProvider = ({ children }) => {
    const [car, setCar] = useState([]);
    const [carTotalCost, setCarTotalCost] = useState(0);

    const addCar = product => {
        setCar([...car, product]);
        setCarTotalCost(carTotalCost + product.price);
    };

    const removeCar = product => {
        setCar(car.filter(item => item.id !== product.id));
        setCar(car.filter(item => item.title !== product.title));
        setCarTotalCost(carTotalCost - product.price);
    };

    return (
        <CarContext.Provider
            value={{
                car,
                addCar,
                removeCar,
                carTotalCost,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};

export { CarContext, CarProvider };
