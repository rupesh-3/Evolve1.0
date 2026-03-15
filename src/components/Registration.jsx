import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        teamName: '',
        college: '',
        participants: [
            { name: '', reg: '', phone: '', email: '' },
            { name: '', reg: '', phone: '', email: '' },
            { name: '', reg: '', phone: '', email: '' },
            { name: '', reg: '', phone: '', email: '' }
        ]
    });
    const [errors, setErrors] = useState({});

    const handleTeamChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const handleParticipantChange = (index, field, value) => {
        const newParticipants = [...formData.participants];
        newParticipants[index][field] = value;
        setFormData(prev => ({ ...prev, participants: newParticipants }));

        // Clear error
        const errKey = `p${index + 1}_${field}`;
        if (errors[errKey]) setErrors(prev => ({ ...prev, [errKey]: null }));
    };

    const validate = () => {
        let valid = true;
        const newErrors = {};

        const setError = (key, msg) => {
            newErrors[key] = msg;
            valid = false;
        };

        if (!formData.teamName.trim()) setError('teamName', 'Team name is required');
        if (!formData.college.trim()) setError('college', 'College name is required');

        const phoneRe = /^[0-9]{10}$/;
        const regRe = /^[A-Za-z0-9]{5,20}$/;
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // First two are mandatory
        for (let i = 0; i < 2; i++) {
            const p = formData.participants[i];
            if (!p.name.trim()) setError(`p${i + 1}_name`, 'Name is required');
            if (!regRe.test(p.reg.trim())) setError(`p${i + 1}_reg`, 'Register valid alphanumeric ID');
            if (!phoneRe.test(p.phone.trim())) setError(`p${i + 1}_phone`, 'Valid 10-digit phone required');
            if (!emailRe.test(p.email.trim())) setError(`p${i + 1}_email`, 'Valid email required');
        }

        // Next two optional, but if partially filled, require all
        for (let i = 2; i < 4; i++) {
            const p = formData.participants[i];
            const anyFilled = p.name.trim() || p.reg.trim() || p.phone.trim() || p.email.trim();
            if (anyFilled) {
                if (!p.name.trim()) setError(`p${i + 1}_name`, 'Name is required');
                if (!regRe.test(p.reg.trim())) setError(`p${i + 1}_reg`, 'Register valid alphanumeric ID');
                if (!phoneRe.test(p.phone.trim())) setError(`p${i + 1}_phone`, 'Valid 10-digit phone required');
                if (!emailRe.test(p.email.trim())) setError(`p${i + 1}_email`, 'Valid email required');
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Filter out empty participants
            const validParticipants = formData.participants.filter(p =>
                p.name.trim() || p.reg.trim() || p.phone.trim() || p.email.trim()
            );

            const submitData = {
                teamName: formData.teamName.trim(),
                college: formData.college.trim(),
                participants: validParticipants
            };

            sessionStorage.setItem('regData', JSON.stringify(submitData));
            navigate('/payment');
        }
    };

    const renderParticipantFields = (index, mandatory) => {
        const pIndex = index - 1;
        const p = formData.participants[pIndex];

        return (
            <div key={`p${index}`}>
                <div className="form-section-title">
                    Participant {index}
                    {mandatory ? <span className="badge-mandatory">Mandatory</span> : <span className="badge-optional">Optional</span>}
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Name {mandatory && <span className="req">*</span>}</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={p.name}
                            onChange={(e) => handleParticipantChange(pIndex, 'name', e.target.value)}
                            className={errors[`p${index}_name`] ? 'invalid' : ''}
                            required={mandatory}
                        />
                        {errors[`p${index}_name`] && <span className="error-msg">{errors[`p${index}_name`]}</span>}
                    </div>
                    <div className="form-group">
                        <label>Register Number {mandatory && <span className="req">*</span>}</label>
                        <input
                            type="text"
                            placeholder="e.g. 21CSE001"
                            value={p.reg}
                            onChange={(e) => handleParticipantChange(pIndex, 'reg', e.target.value)}
                            className={errors[`p${index}_reg`] ? 'invalid' : ''}
                            required={mandatory}
                        />
                        {errors[`p${index}_reg`] && <span className="error-msg">{errors[`p${index}_reg`]}</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Phone Number {mandatory && <span className="req">*</span>}</label>
                        <input
                            type="tel"
                            placeholder="10-digit number"
                            value={p.phone}
                            onChange={(e) => handleParticipantChange(pIndex, 'phone', e.target.value)}
                            className={errors[`p${index}_phone`] ? 'invalid' : ''}
                            required={mandatory}
                        />
                        {errors[`p${index}_phone`] && <span className="error-msg">{errors[`p${index}_phone`]}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email {mandatory && <span className="req">*</span>}</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={p.email}
                            onChange={(e) => handleParticipantChange(pIndex, 'email', e.target.value)}
                            className={errors[`p${index}_email`] ? 'invalid' : ''}
                            required={mandatory}
                        />
                        {errors[`p${index}_email`] && <span className="error-msg">{errors[`p${index}_email`]}</span>}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="form-container">
                    <h1>Register Your Team</h1>
                    <p className="form-subtitle">Fill in your team details below. Team size: 2-4 participants.</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-section-title">Team Information</div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Team Name <span className="req">*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. CodeQueens"
                                    value={formData.teamName}
                                    onChange={(e) => handleTeamChange('teamName', e.target.value)}
                                    className={errors.teamName ? 'invalid' : ''}
                                    required
                                />
                                {errors.teamName && <span className="error-msg">{errors.teamName}</span>}
                            </div>
                            <div className="form-group">
                                <label>College <span className="req">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Your college name"
                                    value={formData.college}
                                    onChange={(e) => handleTeamChange('college', e.target.value)}
                                    className={errors.college ? 'invalid' : ''}
                                    required
                                />
                                {errors.college && <span className="error-msg">{errors.college}</span>}
                            </div>
                        </div>

                        {renderParticipantFields(1, true)}
                        {renderParticipantFields(2, true)}
                        {renderParticipantFields(3, false)}
                        {renderParticipantFields(4, false)}

                        <button type="submit" className="btn-proceed">
                            <span className="btn-shimmer"></span>
                            Proceed to Pay →
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
