import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../features/transactionSlice';
import { PlusCircle } from 'lucide-react';

const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('debit');
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.transactions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    dispatch(addTransaction({
      description,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString()
    }));

    setDescription('');
    setAmount('');
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={24} color="var(--secondary-color)" /> Add Transaction
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <input 
              type="text" 
              placeholder="Description (e.g. Groceries)" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div style={{ width: '150px' }}>
            <input 
              type="number" 
              placeholder="Amount" 
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ flex: 1, marginBottom: 0 }}>
            <option value="debit">Expense</option>
            <option value="credit">Income</option>
          </select>
          <button type="submit" disabled={status === 'loading'} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            {status === 'loading' ? 'Saving...' : 'Add Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
