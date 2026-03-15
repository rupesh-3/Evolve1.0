import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (e, targetId) => {
        if (!isHome) {
            // Allow navigation to work naturally via Link, but we might need 
            // some logic to scroll after navigation. For now, rely on standard links.
            return;
        }

        e.preventDefault();
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="logo">
                <img src="/logo-new.png" alt="EVOLVE 1.0" />
            </Link>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <li>
                    {isHome ? (
                        <a href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a>
                    ) : (
                        <Link to="/#about">About</Link>
                    )}
                </li>
                <li>
                    {isHome ? (
                        <a href="#timeline" onClick={(e) => handleScrollTo(e, 'timeline')}>Timeline</a>
                    ) : (
                        <Link to="/#timeline">Timeline</Link>
                    )}
                </li>
                <li>
                    {isHome ? (
                        <a href="#tracks" onClick={(e) => handleScrollTo(e, 'tracks')}>Tracks</a>
                    ) : (
                        <Link to="/#tracks">Tracks</Link>
                    )}
                </li>
                <li>
                    {isHome ? (
                        <a href="#rules" onClick={(e) => handleScrollTo(e, 'rules')}>Rules</a>
                    ) : (
                        <Link to="/#rules">Rules</Link>
                    )}
                </li>
                <li>
                    {isHome ? (
                        <a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')}>FAQ</a>
                    ) : (
                        <Link to="/#faq">FAQ</Link>
                    )}
                </li>
                <li>
                    {isHome ? (
                        <a href="#coordinators" onClick={(e) => handleScrollTo(e, 'coordinators')}>Contact</a>
                    ) : (
                        <Link to="/#coordinators">Contact</Link>
                    )}
                </li>
            </ul>

            <Link to="/register" className="nav-cta" onClick={() => setMenuOpen(false)}>
                Register Now
            </Link>

            <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span></span><span></span><span></span>
            </button>
        </nav>
    );
}
