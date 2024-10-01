// src/pages/Dashboard.tsx
import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import './Dashboard.css'; 

const Dashboard: React.FC = () => {
    const { finances, addFinance, editFinance, deleteFinance } = useContext(FinanceContext)!;
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            editFinance(editId, { id: editId, type, amount });
            setEditId(null);
        } else {
            const newFinance = {
                id: Date.now(),
                type,
                amount,
            };
            addFinance(newFinance);
        }
        setAmount(0);
    };

    const handleEdit = (finance: { id: number; type: 'income' | 'expense'; amount: number }) => {
        setAmount(finance.amount);
        setType(finance.type);
        setEditId(finance.id);
    };

    const totalIncome = finances.filter((f) => f.type === 'income').reduce((acc, f) => acc + f.amount, 0);
    const totalExpenses = finances.filter((f) => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0);
    const balance = totalIncome - totalExpenses;

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Valor"
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
                    <option value="income">Renda</option>
                    <option value="expense">Despesa</option>
                </select>
                <button type="submit">{editId ? 'Editar' : 'Adicionar'}</button>
            </form>

            <h3>Entradas de Renda e Despesas</h3>
            <ul>
                {finances.map((finance) => (
                    <li key={finance.id}>
                        {finance.type === 'income' ? 'Renda' : 'Despesa'}: {finance.amount} 
                        <div>
                            <button onClick={() => handleEdit(finance)}>Editar</button>
                            <button onClick={() => deleteFinance(finance.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>

            <h3>Resumo</h3>
            <div className="summary">
                <span>Total de Renda: {totalIncome}</span>
                <span>Total de Despesas: {totalExpenses}</span>
                <span>Saldo: {balance}</span>
            </div>
        </div>
    );
};

export default Dashboard;
