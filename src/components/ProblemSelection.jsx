import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { API_BASE } from '../config';

const PROBLEM_STATEMENTS = [
    { id: 'T1-PS1', track: 1, title: 'Women Safety App', desc: 'Build a real-time safety alert system for women using GPS and AI-powered threat detection.' },
    { id: 'T1-PS2', track: 1, title: 'Health-Tech for Her', desc: "Create a personalized health monitoring app focused on women's wellness and preventive care." },
    { id: 'T1-PS3', track: 1, title: 'Financial Empowerment', desc: 'Design a micro-finance platform that helps women entrepreneurs manage and grow their businesses.' },
    { id: 'T2-PS1', track: 2, title: 'Skill Bridge', desc: 'Build a mentorship platform connecting women students with industry professionals for skill development.' },
    { id: 'T2-PS2', track: 2, title: 'Interactive Learning', desc: 'Create an adaptive learning tool that personalizes education paths for women in STEM fields.' },
    { id: 'T2-PS3', track: 2, title: 'Career Navigator', desc: 'Design an AI-powered career guidance system specifically tailored for women entering the tech workforce.' },
    { id: 'T3-PS1', track: 3, title: 'Community Connect', desc: 'Build a platform that connects women in rural areas to community resources, healthcare, and support networks.' },
    { id: 'T3-PS2', track: 3, title: 'Green Impact', desc: 'Create a sustainability tracking app that empowers women-led initiatives in environmental conservation.' },
    { id: 'T3-PS3', track: 3, title: 'Inclusive Finance', desc: 'Design a financial literacy and inclusion platform for women in underserved communities.' },
];

export default function ProblemSelection() {
    const [teamName, setTeamName] = useState('');
    const [verifyStatus, setVerifyStatus] = useState('idle'); // idle, loading, error, success
    const [verifyError, setVerifyError] = useState('');
    const [verifiedTeam, setVerifiedTeam] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submittedProblem, setSubmittedProblem] = useState(null);

    const handleVerify = async () => {
        if (!teamName.trim()) {
            setVerifyError('Team name is required');
            setVerifyStatus('error');
            return;
        }

        setVerifyStatus('loading');
        setVerifyError('');

        try {
            const res = await fetch(`${API_BASE}/registrations`);
            const result = await res.json();

            if (!result.success) throw new Error('Failed to fetch teams');

            const team = result.data.find(t =>
                t.teamName.toLowerCase() === teamName.trim().toLowerCase() &&
                t.confirmed.toUpperCase() === 'TRUE'
            );

            if (!team) {
                setVerifyError('Team not found or not yet confirmed. Please check spelling or contact organizers.');
                setVerifyStatus('error');
                return;
            }

            setVerifiedTeam(team);
            setVerifyStatus('success');
        } catch (err) {
            setVerifyError('Error verifying team: ' + err.message);
            setVerifyStatus('error');
        }
    };

    const confirmSelection = async () => {
        if (!selectedProblem || !verifiedTeam) return;

        setSubmitting(true);

        try {
            const res = await fetch(`${API_BASE}/select-problem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamName: verifiedTeam.teamName,
                    problemId: selectedProblem.id,
                }),
            });

            const result = await res.json();
            if (!result.success) throw new Error(result.message || 'Failed to select problem');

            setShowModal(false);
            setSubmittedProblem(selectedProblem);
        } catch (err) {
            alert('Error: ' + err.message);
            setSubmitting(false);
        }
    };

    const renderTrack = (trackNum, icon, title) => {
        const problems = PROBLEM_STATEMENTS.filter(p => p.track === trackNum);

        return (
            <div className="ps-track" key={trackNum}>
                <h3 className="ps-track-title">{icon} Track {trackNum} — {title}</h3>
                <div className="ps-cards">
                    {problems.map(p => (
                        <div className="ps-card" key={p.id}>
                            <div className="ps-card-id">{p.id}</div>
                            <h4>{p.title}</h4>
                            <p>{p.desc}</p>
                            <button
                                className="ps-select-btn"
                                onClick={() => {
                                    setSelectedProblem(p);
                                    setShowModal(true);
                                }}
                            >
                                Select This Problem
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="form-container" style={{ maxWidth: '900px' }}>
                    <h1>Select Your Problem Statement</h1>
                    <p className="form-subtitle">Only the team leader can select a problem statement. Enter your team name to proceed.</p>

                    {!verifiedTeam && (
                        <div id="teamVerifySection">
                            <div className="form-row" style={{ gridTemplateColumns: '1fr auto', alignItems: 'end' }}>
                                <div className="form-group">
                                    <label>Team Name <span className="req">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter your registered team name"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        className={verifyStatus === 'error' ? 'invalid' : ''}
                                    />
                                    {verifyStatus === 'error' && <span className="error-msg">{verifyError}</span>}
                                </div>
                                <button
                                    className="btn-proceed"
                                    style={{ width: 'auto', padding: '12px 32px', marginTop: 0 }}
                                    onClick={handleVerify}
                                    disabled={verifyStatus === 'loading'}
                                >
                                    {verifyStatus === 'loading' ? 'Verifying...' : 'Verify Team'}
                                </button>
                            </div>
                        </div>
                    )}

                    {verifiedTeam && !submittedProblem && (
                        <div id="problemsSection">
                            <div className="ps-team-info">
                                <div className="ps-verified">
                                    <span className="ps-check">✓</span>
                                    <strong>{verifiedTeam.teamName}</strong> — {verifiedTeam.college}
                                    <span className="ps-leader">
                                        Team Leader: {verifiedTeam.participants?.[0]?.name || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            {renderTrack(1, '🔬', 'Tech for Her')}
                            {renderTrack(2, '📚', 'EduTech & Skills')}
                            {renderTrack(3, '🌍', 'Social Impact')}
                        </div>
                    )}

                    {submittedProblem && (
                        <div className="ps-success">
                            <div className="success-icon" style={{ marginBottom: '20px' }}>✓</div>
                            <h2>Problem Statement Selected!</h2>
                            <p style={{ margin: '12px 0', color: 'var(--text-secondary)' }}>
                                Your team <strong>{verifiedTeam.teamName}</strong> has selected:
                            </p>
                            <div className="ps-selected-problem">{submittedProblem.id}: {submittedProblem.title}</div>
                            <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                This has been recorded. Good luck on event day!
                            </p>
                            <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px' }}>
                                Back to Home
                            </Link>
                        </div>
                    )}

                    {showModal && selectedProblem && (
                        <div className="modal-overlay" style={{ display: 'flex' }}>
                            <div className="modal-card">
                                <h2>Confirm Selection</h2>
                                <p>Are you sure you want to select this problem statement?</p>
                                <p style={{ fontWeight: 700, color: 'var(--accent-3)', margin: '12px 0', fontSize: '1.1rem' }}>
                                    {selectedProblem.id}: {selectedProblem.title}
                                </p>
                                <p style={{ color: 'var(--accent-warm)', fontSize: '0.85rem' }}>⚠️ This action cannot be undone.</p>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                    <button
                                        className="btn-outline"
                                        style={{ flex: 1, padding: '12px' }}
                                        onClick={() => setShowModal(false)}
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn-primary"
                                        style={{ flex: 1, padding: '12px' }}
                                        onClick={confirmSelection}
                                        disabled={submitting}
                                    >
                                        <span className="btn-shimmer"></span>
                                        {submitting ? 'Submitting...' : 'Confirm'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
