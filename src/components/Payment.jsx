import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { API_BASE } from '../config';

export default function Payment() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [txnId, setTxnId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('regData');
        if (stored) {
            setData(JSON.parse(stored));
        }
    }, []);

    const handleSubmit = async () => {
        if (!txnId.trim() || !data) return;

        setSubmitting(true);
        setError(null);

        const submitData = { ...data, transactionId: txnId.trim() };

        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Registration failed');
            }

            sessionStorage.removeItem('regData');
            sessionStorage.setItem('successTeam', data.teamName);
            navigate('/success');
        } catch (err) {
            setError('Error: ' + err.message + '\nPlease try again.');
            setSubmitting(false);
        }
    };

    if (!data) {
        return (
            <>
                <Navbar />
                <div className="page-wrapper">
                    <div className="payment-container">
                        <div className="payment-card">
                            <h1>No Registration Data</h1>
                            <p style={{ color: 'var(--text-secondary)', margin: '20px 0' }}>
                                Please complete the registration form first.
                            </p>
                            <Link to="/register" className="btn-primary" style={{ display: 'inline-block', marginTop: '12px' }}>
                                Go to Registration
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="payment-container">
                    <div className="payment-card">
                        <h1>Complete Payment</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Team: <strong style={{ color: 'var(--text-primary)' }}>{data.teamName}</strong>
                        </p>
                        <div className="amount"><span>₹</span>200</div>

                        <div className="qr-wrapper">
                            <img
                                src="/qr-code.png"
                                alt="Payment QR Code"
                                id="qrImage"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div style="width:220px;height:220px;display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#6b7280;font-size:0.9rem;border-radius:8px;text-align:center;padding:20px;">QR Code Image<br><small>(Place qr-code.png in public folder)</small></div>';
                                }}
                            />
                        </div>

                        <div className="payment-instruction">
                            📝 Scan the QR code above and pay ₹200
                            <br />
                            <span className="highlight">TYPE "{data.teamName}" AS REASON FOR PAYMENT</span>
                        </div>

                        <div className="txn-input-group">
                            <label>Transaction ID <span style={{ color: 'var(--accent-warm)' }}>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter your UPI Transaction ID"
                                value={txnId}
                                onChange={(e) => setTxnId(e.target.value)}
                                disabled={submitting}
                            />
                        </div>

                        {error && <p style={{ color: 'var(--accent-warm)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

                        <button
                            className="btn-submit"
                            onClick={handleSubmit}
                            disabled={submitting || txnId.trim().length === 0}
                        >
                            <span className="btn-shimmer"></span>
                            {submitting ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
