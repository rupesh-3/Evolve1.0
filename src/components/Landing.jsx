import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Landing() {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "Who can participate in EVOLVE 1.0?",
            a: "EVOLVE 1.0 is open to students from colleges and universities. Participants must register in teams to take part in the hackathon."
        },
        {
            q: "What is the team size allowed?",
            a: "Each team must consist of 2 to 4 members."
        },
        {
            q: "Is there a registration fee?",
            a: "Yes. The registration fee is ₹200 per team."
        },
        {
            q: "When and where will the event take place?",
            a: "EVOLVE 1.0 will be held on April 6, 2026, at Rajalakshmi Institute of Technology."
        },
        {
            q: "What are the domains or themes of the hackathon?",
            a: "Participants will work on challenges related to Artificial Intelligence, Internet of Things, and Cybersecurity, with a focus on social impact and innovation."
        },
        {
            q: "What should participants bring to the event?",
            a: "Participants must bring their own laptops, chargers, and any required development tools."
        },
        {
            q: "How will the projects be judged?",
            a: "Projects will be evaluated based on innovation, relevance to the theme, technical feasibility, presentation quality, and problem-solving approach."
        },
        {
            q: "Will certificates be provided?",
            a: "Yes. Participation certificates will be provided to all participants, and trophies/prizes will be awarded to the winning teams."
        },
        {
            q: "How can we contact the organizers for queries?",
            a: "For any questions, participants can contact the organizing team at: 📧 evolve.cce@gmail.com"
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Refs for parallax
    const heroRef = useRef(null);
    const heroLogoRef = useRef(null);
    const badgeRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        // ── Reveal Animation ──
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                    entry.target.style.transitionDelay = delay;
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // ── Parallax ──
        const handleScroll = () => {
            if (!heroRef.current) return;
            const scrollY = window.scrollY;

            if (heroLogoRef.current) heroLogoRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
            if (badgeRef.current) badgeRef.current.style.transform = `translateY(${scrollY * 0.08}px)`;
            if (statsRef.current) statsRef.current.style.transform = `translateY(${scrollY * -0.05}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar />
            {/* Hero */}
            <section className="hero" id="hero" ref={heroRef}>
                <div className="hero-badge" ref={badgeRef}>
                    <span className="dot"></span>
                    Registrations Open
                </div>

                <div className="hero-logo-wrapper" ref={heroLogoRef}>
                    <div className="hero-logo-glow"></div>
                    <div className="hero-logo-ring hero-logo-ring-1"></div>
                    <div className="hero-logo-ring hero-logo-ring-2"></div>
                    <img src="/logo-new.png" alt="EVOLVE 1.0" className="hero-logo" />
                </div>

                <div className="save-date-display">
                    APRIL 06, 2026
                </div>

                <p className="subtitle">An inter-college hackathon for social impact & Innovation — Innovate, Create & Empower through Technology</p>

                <div className="hero-actions">
                    <Link to="/register" className="btn-primary">
                        <span className="btn-shimmer"></span>
                        Register Your Team
                    </Link>
                </div>

                <div className="hero-stats" ref={statsRef}>
                    <div className="stat">
                        <div className="stat-num">₹15K</div>
                        <div className="stat-label">Prize Pool</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">2-4</div>
                        <div className="stat-label">Team Size</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">₹200</div>
                        <div className="stat-label">Reg Fee</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num" style={{ fontSize: '1.2rem', padding: '8px 0' }}>RIT</div>
                        <div className="stat-label">Venue</div>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <div className="scroll-arrow"></div>
                </div>
            </section>

            {/* About */}
            <section className="section" id="about">
                <div className="section-header reveal">
                    <div className="section-tag">About the Event</div>
                    <h2 className="section-title">Empowering Innovation</h2>
                    <p className="section-desc">Foster creativity among students while highlighting solutions aligned with UN SDG goals in technology, education, health, and social impact.</p>
                </div>
                <div className="about-grid">
                    <div className="about-card reveal" style={{ '--delay': '0s' }}>
                        <div className="card-icon">💡</div>
                        <h3>Innovation First</h3>
                        <p>Build cutting-edge solutions that address real-world challenges through technology and creative thinking.</p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.1s' }}>
                        <div className="card-icon">🌍</div>
                        <h3>SDG Social Impact</h3>
                        <p>Focus on solutions that address UN Sustainable Development Goals in technology, education, health, and environmental sustainability.</p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.2s' }}>
                        <div className="card-icon">🏆</div>
                        <h3>Compete & Learn</h3>
                        <p>Present your work to expert judges, receive mentorship, and win exciting prizes across 3 specialized tracks.</p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.3s' }}>
                        <div className="card-icon">🎯</div>
                        <h3>Secret Challenge</h3>
                        <p>On event day, receive a surprise challenge with 3 levels of secret features to integrate into your solution.</p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section" id="timeline">
                <div className="section-header reveal">
                    <div className="section-tag">Event Day Schedule</div>
                    <h2 className="section-title">Timeline</h2>
                    <p className="section-desc">A packed day of innovation, challenges, and celebration.</p>
                </div>
                <div className="timeline-date reveal" style={{ '--delay': '0.05s' }}>
                    Event Date: 6th April 2026
                </div>
                <div className="timeline">
                    <div className="timeline-item reveal" style={{ '--delay': '0s' }}>
                        <div className="time">8:30 AM</div>
                        <h3>Arrival & Registration</h3>
                        <p>Teams check in, receive welcome kits. Guidance provided for team seating.</p>
                    </div>
                    <div className="timeline-item reveal" style={{ '--delay': '0.1s' }}>
                        <div className="time">9:00 AM</div>
                        <h3>Opening Ceremony</h3>
                        <p>Welcome address and project theme brief introduction.</p>
                    </div>
                    <div className="timeline-item reveal" style={{ '--delay': '0.15s' }}>
                        <div className="time">9:30 AM</div>
                        <h3>Secret Challenge Pursuit</h3>
                        <p>Receive unique challenges and adapt with secret features.</p>
                    </div>
                    <div className="timeline-item reveal" style={{ '--delay': '0.2s' }}>
                        <div className="time">12:40 PM</div>
                        <h3>Lunch Break</h3>
                        <p>Refreshments and networking with fellow participants and mentors.</p>
                    </div>
                    <div className="timeline-item reveal" style={{ '--delay': '0.25s' }}>
                        <div className="time">1:30 PM</div>
                        <h3>Final Presentations</h3>
                        <p>3-minute presentations + 2-minute Q&A. Judges evaluate live based on all criteria.</p>
                    </div>
                    <div className="timeline-item reveal" style={{ '--delay': '0.3s' }}>
                        <div className="time">3:30 PM onwards</div>
                        <h3>Awards & Closing Ceremony</h3>
                        <p>Winners announcement, certificates for all, and closing remarks.</p>
                    </div>
                </div>
            </section>

            {/* Judging */}
            <section className="section" id="judging">
                <div className="section-header reveal">
                    <div className="section-tag">Evaluation</div>
                    <h2 className="section-title">Judging Criteria</h2>
                </div>
                <div className="judging-grid">
                    <div className="judge-card">
                        <div className="judge-icon">✨</div>
                        <h3>Innovation</h3>
                        <p>Originality and creativity of the solution. How novel is the approach?</p>
                    </div>
                    <div className="judge-card">
                        <div className="judge-icon">🌍</div>
                        <h3>SDG Social Impact</h3>
                        <p>Depth and relevance of the solution's impact on social issues and alignment with SDG goals.</p>
                    </div>
                    <div className="judge-card">
                        <div className="judge-icon">⚙️</div>
                        <h3>Feasibility</h3>
                        <p>Technical viability and potential for real-world deployment.</p>
                    </div>
                    <div className="judge-card">
                        <div className="judge-icon">🎤</div>
                        <h3>Presentation</h3>
                        <p>Clarity, confidence, and effectiveness of the pitch.</p>
                    </div>
                    <div className="judge-card">
                        <div className="judge-icon">🔐</div>
                        <h3>Challenge Adaptation</h3>
                        <p>How well the team incorporated the surprise challenge features.</p>
                    </div>
                </div>
            </section>

            {/* Rules */}
            <section className="section" id="rules">
                <div className="section-header reveal">
                    <div className="section-tag">Official Guidelines</div>
                    <h2 className="section-title rulebook-title">Rulebook</h2>
                </div>
                <div className="rules-grid">
                    <div className="rule-card reveal" style={{ '--delay': '0s' }}>
                        <div className="rule-num">1</div>
                        <h3>Team Composition</h3>
                        <p>Teams must have <strong>2 to 4 members</strong> from any college or department. Each participant can join only one team.</p>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.1s' }}>
                        <div className="rule-num">2</div>
                        <h3>Project Development</h3>
                        <p>Build original solutions during the hackathon timeline. AI tools are permitted, but the core implementation must be yours.</p>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.2s' }}>
                        <div className="rule-num">3</div>
                        <h3>Equipment</h3>
                        <p>Bring your own laptops and chargers. We provide workspace, internet access, and power supply.</p>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.3s' }}>
                        <div className="rule-num">4</div>
                        <h3>Event Format</h3>
                        <p>Pre-preparation is allowed, but teams must adapt to an <strong>on-the-spot surprise challenge</strong> introduced on event day.</p>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.4s' }}>
                        <div className="rule-num">5</div>
                        <h3>Evaluation</h3>
                        <p>Judged on innovation, impact, technical feasibility, presentation quality, and challenge adaptation.</p>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.5s' }}>
                        <div className="rule-num">6</div>
                        <h3>Code of Conduct</h3>
                        <p>Professional behavior is required. Plagiarism or violating rules leads to immediate disqualification. Judges' decisions are final.</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" id="faq">
                <div className="section-header reveal">
                    <div className="section-tag">Got Questions?</div>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                </div>
                <div className="faq-grid">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`faq-item reveal ${openFaq === idx ? 'open' : ''}`}
                            onClick={() => toggleFaq(idx)}
                            style={{ '--delay': `${idx * 0.1}s` }}
                        >
                            <div className="faq-question">
                                <h3>{faq.q}</h3>
                                <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Coordinators */}
            <section className="section" id="coordinators">
                <div className="section-header reveal">
                    <div className="section-tag">Get In Touch</div>
                    <h2 className="section-title">Coordinators</h2>
                </div>

                <h3 className="sub-heading reveal" style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--accent-3)', fontSize: '1.5rem' }}>Faculty & Administration</h3>
                <div className="about-grid" style={{ marginBottom: '60px' }}>
                    <div className="about-card reveal" style={{ '--delay': '0s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>👩‍🏫</div>
                        <h3>Mrs. Monikapreethi S K</h3>
                        <p style={{ color: 'var(--text-primary)', marginTop: '8px' }}>Faculty Co-ordinator</p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.1s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>👨‍🏫</div>
                        <h3>Dr. E. Ganesh</h3>
                        <p style={{ color: 'var(--text-primary)', marginTop: '8px' }}>HOD</p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.2s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>🎓</div>
                        <h3>Dr. Maheswari R</h3>
                        <p style={{ color: 'var(--text-primary)', marginTop: '8px' }}>Principal</p>
                    </div>
                </div>

                <h3 className="sub-heading reveal" style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--accent-3)', fontSize: '1.5rem' }}>Student Coordinators</h3>
                <div className="about-grid">
                    <div className="about-card reveal" style={{ '--delay': '0s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>📞</div>
                        <h3>Rupesh S</h3>
                        <p><a href="tel:9894646003" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>9894646003</a></p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.1s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>📞</div>
                        <h3>Adithyaa A</h3>
                        <p><a href="tel:7200909287" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>7200909287</a></p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.2s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>📞</div>
                        <h3>Satyanarayanaa H</h3>
                        <p><a href="tel:8122950540" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>8122950540</a></p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.3s', textAlign: 'center' }}>
                        <div className="card-icon" style={{ margin: '0 auto 20px' }}>📞</div>
                        <h3>Mugesh M N</h3>
                        <p><a href="tel:9042553150" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>9042553150</a></p>
                    </div>
                </div>

                <div className="queries-box reveal" style={{ marginTop: '50px', padding: '30px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                        Have any Queries? <br /><br /> Email us at: <br /> <a href="mailto:evolve.cce@gmail.com" style={{ color: 'var(--accent-3)', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '1px', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>evolve.cce@gmail.com</a>
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section cta-section">
                <div className="cta-box reveal">
                    <div className="cta-glow"></div>
                    <div className="section-tag">Ready to Innovate?</div>
                    <h2 className="section-title">Register Your Team Today</h2>
                    <Link to="/register" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
                        <span className="btn-shimmer"></span>
                        Register Now — ₹200/team
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" style={{ padding: '80px 8% 40px', background: 'linear-gradient(to bottom, #05040a, #0a0816)', borderTop: '1px solid rgba(155, 122, 232, 0.2)', position: 'relative', zIndex: '1', overflow: 'hidden' }}>
                <div className="footer-glow" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-3), transparent)', opacity: 0.5 }}></div>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', textAlign: 'left', marginBottom: '60px' }}>

                    {/* Brand Col */}
                    <div>
                        <img src="/logo-new.png" alt="EVOLVE 1.0" style={{ height: '70px', marginBottom: '20px' }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>A premier inter-college hackathon fostering social impact & innovation at Rajalakshmi Institute of Technology.</p>
                        <p style={{ color: 'var(--accent-1)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '1.1rem' }}>BREAK. BUILD. BECOME.</p>
                    </div>

                    {/* Quick Links Col */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '25px', position: 'relative', display: 'inline-block' }}>Quick Links
                            <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '40px', height: '2px', background: 'var(--accent-3)' }}></span>
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>About EVOLVE</a>
                            <a href="#timeline" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>Schedule</a>
                            <a href="#rules" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>Rulebook</a>
                            <a href="#faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>FAQs</a>
                        </div>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '25px', position: 'relative', display: 'inline-block' }}>Event Details
                            <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '40px', height: '2px', background: 'var(--accent-3)' }}></span>
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-secondary)' }}>
                            <p><strong style={{ color: 'var(--text-primary)' }}>Date:</strong> April 06, 2026</p>
                            <p><strong style={{ color: 'var(--text-primary)' }}>Venue:</strong> Rajalakshmi Institute of Technology<br />Chennai, Tamil Nadu</p>
                            <p><strong style={{ color: 'var(--text-primary)' }}>Email:</strong> <a href="mailto:evolve.cce@gmail.com" style={{ color: 'var(--accent-3)', textDecoration: 'none' }}>evolve.cce@gmail.com</a></p>
                            <Link to="/register" style={{ marginTop: '10px', display: 'inline-block', color: 'var(--accent-1)', fontWeight: 'bold', textDecoration: 'none' }}>Register Now →</Link>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>© 2026 EVOLVE 1.0 @ Rajalakshmi Institute of Technology. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
