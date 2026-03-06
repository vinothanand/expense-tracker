import React from 'react';
import { useSelector } from 'react-redux';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const { items } = useSelector((state) => state.transactions);

  const totalIncome = items
    .filter(t => t.type === 'credit')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = items
    .filter(t => t.type === 'debit')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <div>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Balance</p>
          <h1 style={{ fontSize: '2.5rem', color: balance >= 0 ? '#f8fafc' : 'var(--danger)' }}>
            ${balance.toFixed(2)}
          </h1>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '16px' }}>
          <Wallet size={32} color="var(--primary-color)" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '16px' }}>
          <div className="flex-between">
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--success)' }}>Income</p>
              <h3 style={{ fontSize: '1.2rem' }}>+${totalIncome.toFixed(2)}</h3>
            </div>
            <TrendingUp size={24} color="var(--success)" />
          </div>
        </div>
        
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '16px' }}>
          <div className="flex-between">
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--danger)' }}>Expenses</p>
              <h3 style={{ fontSize: '1.2rem' }}>-${totalExpense.toFixed(2)}</h3>
            </div>
            <TrendingDown size={24} color="var(--danger)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
