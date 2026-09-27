import React, { createContext, useContext, useState } from 'react';

export type Car = {
  id: string;
  name: string;
  description: string;
  mileage: number;
  nextService: number;
};

type GarageContextType = {
  cars: Car[];
  addCar: (car: Car) => void;
};

const INITIAL_CARS: Car[] = [
  {
    id: '1',
    name: 'Mahindra XUV300',
    description: 'Petrol daily driver. Surprisingly decent on fuel and gets the job done.',
    mileage: 45000,
    nextService: 50000,
  },
  {
    id: '2',
    name: '2010 Chevrolet Spark',
    description: 'Tiny little city car.',
    mileage: 120000,
    nextService: 125000,
  },
  {
    id: '3',
    name: '2014 KTM Duke 200',
    description: 'Two-wheeled vehicle. Needs regular chain and standard maintenance.',
    mileage: 32000,
    nextService: 35000,
  },
];

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);

  const addCar = (car: Car) => {
    setCars((currentCars) => [...currentCars, car]);
  };

  return (
    <GarageContext.Provider value={{ cars, addCar }}>
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used inside GarageProvider');
  }
  return context;
}
