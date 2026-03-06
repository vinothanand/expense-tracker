import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from './features/transactionSlice';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(to right, #f8fafc, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Expense Tracker
        </h1>
        <p className="text-muted">Manage your finances beautifuly.</p>
      </header>

      <main>
        <Dashboard />
        <TransactionForm />
        <TransactionList />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem' }} className="text-muted animate-fade-in">
        <p>Built for tracking your every steps!</p>
      </footer>
    </>
  );
}

export default App;
