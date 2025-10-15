// --- Informational Sections ---
export function SustainabilityInfo() {
  return (
    <section className="sustainability" style={{ padding: '2rem', maxWidth: '700px', margin: '2rem auto', background: '#f4f9f4', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ marginBottom: '1.2rem' }}>🌿 Sustainability</h2>
      <p style={{ marginBottom: '1rem' }}>
        At Peace Pods, we care about both people and the planet. Our pods are designed to minimize environmental impact while maximizing comfort and productivity:
      </p>
      <ul style={{ marginBottom: '1rem' }}>
        <li><strong>Energy-efficient Design:</strong> Smart ventilation, LED lighting, and low-power systems reduce energy consumption.</li>
        <li><strong>Community Well-being:</strong> By providing quiet, private workspaces, Peace Pods help improve mental health and focus for users in busy public spaces.</li>
        <li><strong>Responsible Deployment:</strong> Pods are compact and modular, reducing construction waste and space usage.</li>
      </ul>
    </section>
  );
}

export function ContactCollaborateInfo() {
  return (
    <section className="contact-collaborate" style={{ padding: '2rem', maxWidth: '700px', margin: '2rem auto', background: '#f7f7fa', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ marginBottom: '1.2rem' }}>📞 Contact / Collaborate</h2>
      <p style={{ marginBottom: '1rem' }}>
        We’d love to hear from you — whether you’re an individual user, a co-working space, or an investor.
      </p>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Get in Touch:</h3>
      <ul style={{ marginBottom: '1rem' }}>
        <li><strong>Contact Form:</strong> Name, Email, Message (for general inquiries)</li>
        <li><strong>Email:</strong> <a href="mailto:info@peacepods.in">info@peacepods.in</a></li>
        <li><strong>WhatsApp:</strong> +91 XXXXX XXXXX</li>
      </ul>
      <p style={{ marginBottom: '1rem' }}>Follow Us on Social Media</p>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Partner with Us / Invest with Us:</h3>
      <ul>
        <li>Co-working spaces, offices interested in hosting Peace Pods can reach out for customized packages.</li>
        <li>Investors looking to support a high-impact, scalable startup can discuss opportunities with our team.</li>
      </ul>
    </section>
  );
}
import React, { useState } from 'react';
import './App.css';
import peacePodLogo from '../public/assets/peace-pod-logo.png';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header 
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'linear-gradient(90deg,#e8f0ff 0%,#f8fafc 60%,#dbeafe 100%)',
        boxShadow: '0 8px 32px 0 rgba(79,91,213,0.18)',
        borderBottom: '2.5px solid #4f5bd5',
        minHeight: '100px',
        transition: 'background 0.3s',
        animation: 'headerGradientMove 8s linear infinite',
      }}
    >
      <div className="header__container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 2.5rem',
        width: '100%',
      }}>
        <div className="header__logo" style={{display:'flex',alignItems:'center',gap:'1.2rem'}}>
          <img 
            src={peacePodLogo} 
            alt="Peace Pods Logo" 
            className="header__logo-img" 
            style={{ maxWidth: '90px', height: '90px', width: 'auto', objectFit: 'contain', display: 'block', borderRadius: '1.2rem', boxShadow: '0 4px 18px #4f5bd533', background:'#fff', border:'2.5px solid #4f5bd5' }}
          />
          <div style={{display:'flex',flexDirection:'column',lineHeight:1.1}}>
            <span style={{fontWeight:900,fontSize:'1.7rem',color:'#2a2a2a',letterSpacing:'-1px',fontFamily:'Inter,Segoe UI,sans-serif',textShadow:'0 2px 8px #dbeafe'}}>PEACE <span style={{color:'#3bb273'}}>Pod</span></span>
            <span style={{fontSize:'1.08rem',color:'#4f5bd5',fontWeight:600,marginTop:'0.1em',textShadow:'0 1px 4px #e0e7ff'}}>Silent Zones for Focus & Clarity</span>
          </div>
        </div>
        <nav className={`header__nav${open ? ' header__nav--open' : ''}`} id="headerNav">
          <ul className="header__nav-list" style={{display:'flex',gap:'2.5rem',alignItems:'center',margin:0,padding:0,listStyle:'none'}}>
            <li><a href="#" className="header__nav-link" style={{fontWeight:700,fontSize:'1.13rem',color:'#222',padding:'0.5em 1.1em',borderRadius:'0.7em',transition:'background 0.2s,color 0.2s',textDecoration:'none',position:'relative'}} onMouseOver={e=>e.currentTarget.style.background='#f0f4ff'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>Home</a></li>
            <li><a href="#about" className="header__nav-link" style={{fontWeight:700,fontSize:'1.13rem',color:'#222',padding:'0.5em 1.1em',borderRadius:'0.7em',transition:'background 0.2s,color 0.2s',textDecoration:'none',position:'relative'}} onMouseOver={e=>e.currentTarget.style.background='#f0f4ff'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>About</a></li>
            <li><a href="#why" className="header__nav-link" style={{fontWeight:700,fontSize:'1.13rem',color:'#222',padding:'0.5em 1.1em',borderRadius:'0.7em',transition:'background 0.2s,color 0.2s',textDecoration:'none',position:'relative'}} onMouseOver={e=>e.currentTarget.style.background='#f0f4ff'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>Services</a></li>
            <li><a href="#contact" className="header__nav-link" style={{fontWeight:700,fontSize:'1.13rem',color:'#222',padding:'0.5em 1.1em',borderRadius:'0.7em',transition:'background 0.2s,color 0.2s',textDecoration:'none',position:'relative'}} onMouseOver={e=>e.currentTarget.style.background='#f0f4ff'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>Contact</a></li>
          </ul>
        </nav>
        <button className={`header__menu-btn${open ? ' header__menu-btn--open' : ''}`} id="menuBtn" aria-label="Open Menu" onClick={() => setOpen(o => !o)} style={{marginLeft:'1.5rem'}}>
          <span className="header__menu-bar"></span>
          <span className="header__menu-bar"></span>
          <span className="header__menu-bar"></span>
        </button>
      </div>
      {/* Animated gradient overlay for extra visual appeal */}
      <style>{`
        @keyframes headerGradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
      <div style={{
        position:'absolute',
        inset:0,
        zIndex:0,
        pointerEvents:'none',
        background:'repeating-linear-gradient(135deg,#e8f0ff 0 2px,transparent 2px 40px),linear-gradient(120deg,#f8fafc 0%,#e8f0ff 100%)',
        opacity:0.33,
        borderRadius:'inherit',
        mixBlendMode:'lighten',
      }} />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__bg"></div>
      <div className="footer__container">
        <div className="footer__left">
          <img 
            src={peacePodLogo} 
            alt="Peace Pods Logo" 
            className="footer__logo" 
            style={{ maxWidth: '260px', height: '100px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <p className="footer__desc">Peace Pods – Creating silent zones for focus, clarity, and well-being. Your peace, anywhere.</p>
        </div>
        <div className="footer__center">
          <ul className="footer__links">
            <li><a href="#" className="footer__link">Home</a></li>
            <li><a href="#about" className="footer__link">About</a></li>
            <li><a href="#why" className="footer__link">Services</a></li>
            <li><a href="#contact" className="footer__link">Contact</a></li>
          </ul>
        </div>
        <div className="footer__right">
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook"><svg width="24" height="24" fill="currentColor"><path d="M17 2.1v3.2h-1.8c-.2 0-.5.2-.5.6v1.7h2.3l-.3 2.5h-2v6.5h-2.7v-6.5h-2v-2.5h2v-1.8C10 4.1 11.2 2.1 13.7 2.1H17z"/></svg></a>
            <a href="#" className="footer__social" aria-label="Twitter"><svg width="24" height="24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.1 9.03c0 .34.04.67.1.99A12.13 12.13 0 0 1 3.1 4.9a4.28 4.28 0 0 0 1.32 5.7c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 0 0 3.43 4.2c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/></svg></a>
            <a href="#" className="footer__social" aria-label="LinkedIn"><svg width="24" height="24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15 10.3h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72zm-12.5 0h-3v-9h3v9z"/></svg></a>
            <a href="#" className="footer__social" aria-label="Instagram"><svg width="24" height="24" fill="currentColor"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.87.312 4.1.54c-.77.23-1.42.54-2.07 1.19-.65.65-.96 1.3-1.19 2.07-.23.77-.412 1.67-.47 2.95C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.24 2.18.47 2.95.23.77.54 1.42 1.19 2.07.65.65 1.3.96 2.07 1.19.77.23 1.67.412 2.95.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.18-.24 2.95-.47.77-.23 1.42-.54 2.07-1.19.65-.65.96-1.3 1.19-2.07.23-.77.412-1.67.47-2.95.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.24-2.18-.47-2.95-.23-.77-.54-1.42-1.19-2.07-.65-.65-1.3-.96-2.07-1.19-.77-.23-1.67-.412-2.95-.47C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="footer__copyright">&copy; 2025 Peace Pods. All rights reserved.</div>
    </footer>
  );
}
