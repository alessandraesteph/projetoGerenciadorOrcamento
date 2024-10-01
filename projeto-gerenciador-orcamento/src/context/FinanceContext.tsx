// src/context/FinanceContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Finance {
    id: number; 
    type: 'income' | 'expense'; 
    amount: number;
}

interface FinanceContextType {
    finances: Finance[];
    addFinance: (finance: Finance) => void;
    editFinance: (id: number, updatedFinance: Finance) => void;
    deleteFinance: (id: number) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

type FinanceProviderProps = {
    children: ReactNode;
};

const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
    const [finances, setFinances] = useState<Finance[]>([]);

    const addFinance = (finance: Finance) => {
        setFinances((prev) => [...prev, finance]);
    };

    const editFinance = (id: number, updatedFinance: Finance) => {
        setFinances((prev) =>
            prev.map((finance) => (finance.id === id ? updatedFinance : finance))
        );
    };

    const deleteFinance = (id: number) => {
        setFinances((prev) => prev.filter((finance) => finance.id !== id));
    };

    return (
        <FinanceContext.Provider value={{ finances, addFinance, editFinance, deleteFinance }}>
            {children}
        </FinanceContext.Provider>
    );
};

export { FinanceProvider, FinanceContext };
