import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../features/transactionSlice';
import { Trash2, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const TransactionList = () => {
  const { items, status } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  if (status === 'loading' && items.length === 0) {
    return <p className="text-muted text-center">Loading transactions...</p>;
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clock size={24} color="var(--primary-color)" /> Recent Activity
      </h2>
      
      {items.length === 0 ? (
        <p className="text-muted text-center" style={{ padding: '2rem 0' }}>No transactions found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((t) => (
            <div 
              key={t.id} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                borderLeft: `4px solid ${t.type === 'credit' ? 'var(--success)' : 'var(--danger)'}`,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  background: t.type === 'credit' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  {t.type === 'credit' ? <ArrowUpRight size={20} color="var(--success)"/> : <ArrowDownRight size={20} color="var(--danger)"/>}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{t.description}</h4>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>
                    {new Date(t.date).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ 
                  fontWeight: 600, 
                  fontSize: '1.1rem',
                  color: t.type === 'credit' ? 'var(--success)' : 'var(--text-main)'
                }}>
                  {t.type === 'credit' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <button 
                  onClick={() => handleDelete(t.id)}
                  style={{
                    background: 'transparent',
                    boxShadow: 'none',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    color: 'var(--danger)',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                  aria-label="Delete transaction"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
