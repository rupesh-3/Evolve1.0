import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Success() {
    const teamName = sessionStorage.getItem('successTeam') || 'Your Team';

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="success-container">
                    <div className="success-card">
                        <div className="success-icon">✓</div>
                        <h1>Registration Complete!</h1>
                        <p>Your registration has been submitted successfully.</p>
                        <div className="team-name">{teamName}</div>
                        <p>Your details have been recorded. You will receive a confirmation email with your event ticket once your payment is verified.</p>

                        <div className="whatsapp-instruction" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '15px', margin: '20px 0' }}>
                            <p style={{ color: '#22c55e', margin: 0, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                📱 Important for Team Leader
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '8px 0 0' }}>
                                Please join the <strong>WhatsApp group</strong> using the link provided in your confirmation email for further event updates.
                            </p>
                        </div>

                        <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
