import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    const [timeLeft, setTimeLeft] = useState({ days: '--', hours: '--', mins: '--', secs: '--' });
    const [isLive, setIsLive] = useState(false);

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

        // ── Countdown ──
        const releaseDate = new Date('2026-04-05T00:00:00+05:30').getTime();

        const updateCountdown = () => {
            const now = Date.now();
            const diff = releaseDate - now;

            if (diff <= 0) {
                setIsLive(true);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                mins: String(mins).padStart(2, '0'),
                secs: String(secs).padStart(2, '0')
            });
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="hero" id="hero" ref={heroRef}>
                <div className="hero-badge" ref={badgeRef}>
                    <span className="dot"></span>
                    Registration Open • March 2026
                </div>

                <div className="hero-logo-wrapper" ref={heroLogoRef}>
                    <div className="hero-logo-glow"></div>
                    <div className="hero-logo-ring hero-logo-ring-1"></div>
                    <div className="hero-logo-ring hero-logo-ring-2"></div>
                    <img src="/logo-new.png" alt="EVOLVE 1.0" className="hero-logo" />
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
                        <div className="stat-num">2-4</div>
                        <div className="stat-label">Team Size</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">₹200</div>
                        <div className="stat-label">Per Team</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">3</div>
                        <div className="stat-label">Tracks</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">1 Day</div>
                        <div className="stat-label">Event</div>
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

            {/* Tracks */}
            <section className="section" id="tracks">
                <div className="section-header reveal">
                    <div className="section-tag">Competition Tracks</div>
                    <h2 className="section-title">Problem Statements</h2>
                </div>
                <div className="tracks-release-box reveal">
                    <div className="release-icon">🚀</div>
                    <h3 className="release-title">
                        {isLive ? (
                            <>Problem Statements are <span className="release-date">LIVE!</span></>
                        ) : (
                            <>Problem Statements will be released on<br /><span className="release-date">3rd April 2026, 5:00 PM</span></>
                        )}
                    </h3>
                    <p className="release-subtitle">Stay tuned! All registered teams will receive an email notification when the problem statements go live.</p>
                    {!isLive && (
                        <div className="release-countdown">
                            <div className="countdown-item"><span>{timeLeft.days}</span><small>Days</small></div>
                            <div className="countdown-item"><span>{timeLeft.hours}</span><small>Hours</small></div>
                            <div className="countdown-item"><span>{timeLeft.mins}</span><small>Minutes</small></div>
                            <div className="countdown-item"><span>{timeLeft.secs}</span><small>Seconds</small></div>
                        </div>
                    )}
                </div>
            </section>

            {/* Judging */}
            <section className="section" id="judging">
                <div className="section-header reveal">
                    <div className="section-tag">Evaluation</div>
                    <h2 className="section-title">Judging Criteria</h2>
                </div>
                <div className="judging-grid">
                    <div className="judge-card reveal" style={{ '--delay': '0s' }}>
                        <div className="judge-icon">✨</div>
                        <h3>Innovation</h3>
                        <p>Originality and creativity of the solution. How novel is the approach?</p>
                    </div>
                    <div className="judge-card reveal" style={{ '--delay': '0.08s' }}>
                        <div className="judge-icon">🌍</div>
                        <h3>SDG Social Impact</h3>
                        <p>Depth and relevance of the solution's impact on social issues and alignment with SDG goals.</p>
                    </div>
                    <div className="judge-card reveal" style={{ '--delay': '0.16s' }}>
                        <div className="judge-icon">⚙️</div>
                        <h3>Feasibility</h3>
                        <p>Technical viability and potential for real-world deployment.</p>
                    </div>
                    <div className="judge-card reveal" style={{ '--delay': '0.24s' }}>
                        <div className="judge-icon">🎤</div>
                        <h3>Presentation</h3>
                        <p>Clarity, confidence, and effectiveness of the pitch.</p>
                    </div>
                    <div className="judge-card reveal" style={{ '--delay': '0.32s' }}>
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
                        <ul>
                            <li>Each team must consist of a minimum of <strong>2</strong> and a maximum of <strong>4</strong> participants.</li>
                            <li>Participants may belong to the same or different departments or institutions.</li>
                            <li>Each participant can be part of <strong>only one team</strong>.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.06s' }}>
                        <div className="rule-num">2</div>
                        <h3>Eligibility</h3>
                        <ul>
                            <li>Students from <strong>any college or university</strong> are eligible to participate for the event.</li>
                            <li>Participants must register through the <strong>official registration platform</strong> before the event.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.12s' }}>
                        <div className="rule-num">3</div>
                        <h3>Project Development Guidelines</h3>
                        <ul>
                            <li>All projects must be developed within the <strong>hackathon timeline</strong>.</li>
                            <li>Teams are encouraged to build <strong>original and innovative solutions</strong> addressing the given problem statements.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.18s' }}>
                        <div className="rule-num">4</div>
                        <h3>Use of Tools and Technologies</h3>
                        <ul>
                            <li>Participants are free to use <strong>any programming language, framework, or development platform</strong>.</li>
                            <li>AI tools may be used for assistance, but the <strong>core idea, implementation, and development</strong> must be carried out by the team members themselves.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.24s' }}>
                        <div className="rule-num">5</div>
                        <h3>Equipment and Resources</h3>
                        <ul>
                            <li>Participants must bring their own <strong>laptops, chargers, and required software tools</strong>.</li>
                            <li>The organizing team will provide basic infrastructure such as workspace, internet access, and power supply.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.3s' }}>
                        <div className="rule-num">6</div>
                        <h3>Event Format</h3>
                        <ul>
                            <li>Registered teams will receive the <strong>official problem statements</strong>.</li>
                            <li>Teams may begin preparing their solution remotely within the permitted time window.</li>
                            <li>During the event, teams will refine their solutions and incorporate an <strong>additional challenge</strong> introduced by the organizers on the day of the event.</li>
                            <li>Teams will present their final solution to the judging panel.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.36s' }}>
                        <div className="rule-num">7</div>
                        <h3>Judging Criteria</h3>
                        <ul>
                            <li>Innovation and originality</li>
                            <li>Impact and relevance to the theme</li>
                            <li>Technical feasibility and implementation</li>
                            <li>Quality of presentation and demonstration</li>
                            <li>Overall problem-solving approach</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.42s' }}>
                        <div className="rule-num">8</div>
                        <h3>Code of Conduct</h3>
                        <ul>
                            <li>Participants must maintain <strong>professional conduct</strong> throughout the event.</li>
                            <li>Teams are expected to respect judges, organizers, volunteers, and fellow participants.</li>
                            <li>Any form of <strong>misconduct, plagiarism, or violation of rules</strong> may result in immediate disqualification.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.48s' }}>
                        <div className="rule-num">9</div>
                        <h3>Decision of Judges</h3>
                        <ul>
                            <li>The decision of the judging panel will be <strong>final and binding</strong>.</li>
                            <li>The organizing committee reserves the right to modify event procedures if necessary to ensure fair evaluation.</li>
                        </ul>
                    </div>
                    <div className="rule-card reveal" style={{ '--delay': '0.54s' }}>
                        <div className="rule-num">10</div>
                        <h3>Compliance</h3>
                        <ul>
                            <li>By participating in EVOLVE, teams agree to <strong>abide by all rules and guidelines</strong> stated in this rulebook and follow the instructions provided by the organizing committee.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Coordinators */}
            <section className="section" id="coordinators">
                <div className="section-header reveal">
                    <div className="section-tag">Get In Touch</div>
                    <h2 className="section-title">Student Coordinators</h2>
                </div>
                <div className="about-grid">
                    <div className="about-card reveal" style={{ '--delay': '0s' }}>
                        <div className="card-icon">📞</div>
                        <h3>Rupesh S</h3>
                        <p><a href="tel:9894646003" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>9894646003</a></p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.1s' }}>
                        <div className="card-icon">📞</div>
                        <h3>Adithyaa A</h3>
                        <p><a href="tel:7200909287" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>7200909287</a></p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.2s' }}>
                        <div className="card-icon">📞</div>
                        <h3>Satyanarayanaa H</h3>
                        <p><a href="tel:8122950540" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>8122950540</a></p>
                    </div>
                    <div className="about-card reveal" style={{ '--delay': '0.3s' }}>
                        <div className="card-icon">📞</div>
                        <h3>Mugesh M N</h3>
                        <p><a href="tel:9042553150" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>9042553150</a></p>
                    </div>
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
            <footer className="footer">
                <img src="/logo.png" alt="EVOLVE 1.0" className="footer-logo" />
                <p>An inter-college hackathon for social impact & Innovation</p>
                <p>Innovate · Create · Empower</p>
                <div className="footer-links">
                    <a href="#about">About</a>
                    <a href="#timeline">Timeline</a>
                    <a href="#rules">Rules</a>
                    <a href="#coordinators">Contact</a>
                    <Link to="/register">Register</Link>
                </div>
                <p style={{ marginTop: '24px', fontSize: '0.8rem' }}>© 2026 EVOLVE 1.0. All rights reserved.</p>
            </footer>
        </>
    );
}
