import React from "react";
import "./App.css";
import { Header, Footer } from "./HeaderFooter.jsx";
const PEACE_POD_IMG = "assets/peace-pod.jpeg";
const GALLERY_IMAGES = [
  "assets/1.jpeg",
  "assets/2.jpeg",
  "assets/3.jpeg",
  "assets/4.jpeg",
  "assets/5.jpeg",
  "assets/6.jpeg",
];

// --- Subcomponents ---
const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-card__icon" aria-hidden>
      {icon}
    </div>
    <div className="feature-card__title">{title}</div>
    <div className="feature-card__desc">{desc}</div>
  </div>
);

const PriceCard = ({ title, price, desc, features, highlight }) => (
  <div className={`price-card${highlight ? " price-card--highlight" : ""}`}>
    <div className="price-card__title">{title}</div>
    <div className="price-card__price">{price}</div>
    <div className="price-card__desc">{desc}</div>
    <ul className="price-card__features">
      {features.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
    <button className="btn btn--accent">Choose Plan</button>
  </div>
);

const TeamMember = ({ name, role, img }) => (
  <div className="team__member">
    <div className="team__photo">
      {img ? (
        <img
          src={img}
          alt={name}
          className="team__photo"
          style={{
            borderRadius: "50%",
            width: "72px",
            height: "72px",
            objectFit: "cover",
            boxShadow: "0 2px 8px #b6c6e6",
          }}
        />
      ) : (
        <span>Photo</span>
      )}
    </div>
    <div className="team__name">{name}</div>
    <div className="team__role">{role}</div>
  </div>
);

const Step = ({ icon, title }) => (
  <div className="step">
    <div className="step__icon" aria-hidden>
      {icon}
    </div>
    <div className="step__title">{title}</div>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="testimonial">
    “{quote}”<div className="testimonial__author">{author}</div>
  </div>
);

const BlogItem = ({ title, desc }) => (
  <div className="blog__item">
    <div className="blog__title">{title}</div>
    <div className="blog__desc">{desc}</div>
    <a href="#" className="btn btn--accent" style={{ width: "fit-content" }}>
      Read More
    </a>
  </div>
);

// --- Main App ---
function App() {
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [paymentLoading, setPaymentLoading] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [bookingDetails, setBookingDetails] = React.useState(null);
  const [fakeInputs, setFakeInputs] = React.useState({
    cardNumber: "",
    upiId: "",
    netBanking: "",
    studentEmail: "",
  });

  function handleSelectPlan(plan) {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
    setPaymentLoading(false);
    setPaymentSuccess(false);
    setPaymentError("");
    setPaymentMethod("card");
    setBookingDetails(null);
    setFakeInputs({ cardNumber: "", upiId: "", netBanking: "", studentEmail: "" });
  }

  function handleCloseModal() {
    setShowPaymentModal(false);
    setSelectedPlan(null);
    setPaymentLoading(false);
    setPaymentSuccess(false);
    setPaymentError("");
    setBookingDetails(null);
    setFakeInputs({ cardNumber: "", upiId: "", netBanking: "", studentEmail: "" });
  }

  // Dummy payment logic
  function handlePayment() {
    // For student plan, require email
    if (selectedPlan === "Student & Institutional Discounts" && !fakeInputs.studentEmail.trim()) {
      setPaymentError("Please enter your student or institutional email ID.");
      return;
    }
    setPaymentLoading(true);
    setPaymentError("");
    setTimeout(() => {
      // Always succeed for demo
      setPaymentSuccess(true);
      setPaymentLoading(false);
      // Compose booking details
      const priceMap = {
        "Solo Pods": "₹99/hour",
        "Team Pods": "₹199/hour",
        "Student & Institutional Discounts": "₹74/hour",
      };
      const now = new Date();
      const booking = {
        plan: selectedPlan,
        price: priceMap[selectedPlan] || "-",
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        paymentMethod,
        paymentId: `PAY${Math.floor(Math.random()*1000000)}`,
        ...(selectedPlan === "Student & Institutional Discounts" ? { studentEmail: fakeInputs.studentEmail.trim() } : {}),
      };
      setBookingDetails(booking);
      // Save to localStorage
      let bookings = [];
      try {
        bookings = JSON.parse(localStorage.getItem("peacepod_bookings") || "[]");
      } catch {}
      bookings.push(booking);
      localStorage.setItem("peacepod_bookings", JSON.stringify(bookings));
    }, 2200);
  }

  return (
    <>
      <Header />
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,40,60,0.18)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.3s'}}>
          <div className="payment-modal" style={{background:'#fff',borderRadius:'1.5rem',boxShadow:'0 8px 32px #b6c6e655',padding:'2.2rem 2rem',minWidth:'320px',maxWidth:'95vw',width:'360px',position:'relative',display:'flex',flexDirection:'column',alignItems:'center',transition:'box-shadow 0.3s,transform 0.3s'}}>
            <button onClick={handleCloseModal} style={{position:'absolute',top:'1.1rem',right:'1.3rem',background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer',color:'#888'}} aria-label="Close">×</button>
            <div style={{fontWeight:900,fontSize:'1.3rem',marginBottom:'0.7rem',color:'#222',textAlign:'center'}}>Book {selectedPlan}</div>
            {/* Payment Steps */}
            {!paymentSuccess && !paymentLoading && !paymentError && (
              <>
                <div style={{marginBottom:'1.2rem',color:'#444',fontWeight:500,textAlign:'center'}}>Choose payment method and enter details:</div>
                <div style={{width:'100%',marginBottom:'1.2rem'}}>
                  {/* Student email for student plan */}
                  {selectedPlan === 'Student & Institutional Discounts' && (
                    <input type="email" placeholder="Student/Institutional Email ID" value={fakeInputs.studentEmail} onChange={e=>setFakeInputs(f=>({...f,studentEmail:e.target.value}))} style={{width:'100%',padding:'0.7em',borderRadius:'0.8em',border:'1.5px solid #e0e7ff',marginBottom:'0.7rem',fontSize:'1.05rem'}} required />
                  )}
                  <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem',justifyContent:'center'}}>
                    <button type="button" className={paymentMethod==='card'?"pay-method-btn active":"pay-method-btn"} style={{padding:'0.5em 1.1em',borderRadius:'1.2em',border:'1.5px solid #e0e7ff',background:paymentMethod==='card'?'#e0f7ef':'#f8fafc',fontWeight:700,cursor:'pointer',transition:'all 0.2s'}} onClick={()=>setPaymentMethod('card')}>Credit/Debit Card</button>
                    <button type="button" className={paymentMethod==='upi'?"pay-method-btn active":"pay-method-btn"} style={{padding:'0.5em 1.1em',borderRadius:'1.2em',border:'1.5px solid #e0e7ff',background:paymentMethod==='upi'?'#e0f7ef':'#f8fafc',fontWeight:700,cursor:'pointer',transition:'all 0.2s'}} onClick={()=>setPaymentMethod('upi')}>UPI</button>
                    <button type="button" className={paymentMethod==='net'?"pay-method-btn active":"pay-method-btn"} style={{padding:'0.5em 1.1em',borderRadius:'1.2em',border:'1.5px solid #e0e7ff',background:paymentMethod==='net'?'#e0f7ef':'#f8fafc',fontWeight:700,cursor:'pointer',transition:'all 0.2s'}} onClick={()=>setPaymentMethod('net')}>Net Banking</button>
                  </div>
                  {/* Fake Inputs */}
                  {paymentMethod==='card' && (
                    <input type="text" placeholder="Card Number" value={fakeInputs.cardNumber} onChange={e=>setFakeInputs(f=>({...f,cardNumber:e.target.value}))} style={{width:'100%',padding:'0.7em',borderRadius:'0.8em',border:'1.5px solid #e0e7ff',marginBottom:'0.7rem',fontSize:'1.05rem'}} />
                  )}
                  {paymentMethod==='upi' && (
                    <input type="text" placeholder="UPI ID" value={fakeInputs.upiId} onChange={e=>setFakeInputs(f=>({...f,upiId:e.target.value}))} style={{width:'100%',padding:'0.7em',borderRadius:'0.8em',border:'1.5px solid #e0e7ff',marginBottom:'0.7rem',fontSize:'1.05rem'}} />
                  )}
                  {paymentMethod==='net' && (
                    <input type="text" placeholder="Bank Name" value={fakeInputs.netBanking} onChange={e=>setFakeInputs(f=>({...f,netBanking:e.target.value}))} style={{width:'100%',padding:'0.7em',borderRadius:'0.8em',border:'1.5px solid #e0e7ff',marginBottom:'0.7rem',fontSize:'1.05rem'}} />
                  )}
                </div>
                <button className="btn btn--accent" style={{width:'100%',fontWeight:700,transition:'background 0.2s'}} onClick={handlePayment}>Pay Now</button>
              </>
            )}
            {paymentLoading && (
              <div style={{margin:'1.5rem 0',display:'flex',flexDirection:'column',alignItems:'center',transition:'all 0.3s'}}>
                <div className="spinner" style={{width:'38px',height:'38px',border:'4px solid #e0e7ff',borderTop:'4px solid #4f5bd5',borderRadius:'50%',animation:'spin 1s linear infinite',marginBottom:'1.1rem'}}></div>
                <div style={{color:'#4f5bd5',fontWeight:600}}>Processing payment...</div>
              </div>
            )}
            {paymentSuccess && bookingDetails && (
              <div style={{margin:'1.5rem 0',display:'flex',flexDirection:'column',alignItems:'center',transition:'all 0.3s'}}>
                <div className="success-checkmark" style={{width:'54px',height:'54px',borderRadius:'50%',background:'#e0f7ef',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.1rem',transition:'all 0.3s'}}>
                  <span style={{fontSize:'2.2rem',color:'#3bb273'}}>✅</span>
                </div>
                <div style={{color:'#3bb273',fontWeight:700,textAlign:'center',fontSize:'1.1rem',marginBottom:'0.7rem'}}>Payment Successful!<br/>Your slot is booked.</div>
                <div style={{background:'#f8fafc',borderRadius:'1rem',padding:'1.1rem 1.2rem',boxShadow:'0 2px 12px #b6c6e633',marginBottom:'0.7rem',width:'100%',maxWidth:'260px',fontSize:'1.05rem',color:'#222'}}>
                  <div><b>Plan:</b> {bookingDetails.plan}</div>
                  <div><b>Price:</b> {bookingDetails.price}</div>
                  <div><b>Date:</b> {bookingDetails.date}</div>
                  <div><b>Time:</b> {bookingDetails.time}</div>
                  <div><b>Payment ID:</b> {bookingDetails.paymentId}</div>
                  {bookingDetails.studentEmail && (
                    <div><b>Email:</b> {bookingDetails.studentEmail}</div>
                  )}
                </div>
                <button className="btn btn--accent" style={{width:'100%',fontWeight:700}} onClick={handleCloseModal}>Done</button>
              </div>
            )}
            {paymentError && (
              <div style={{margin:'1.5rem 0',color:'#d32f2f',fontWeight:600,textAlign:'center'}}>
                {paymentError}
                <button className="btn btn--accent" style={{marginTop:'1.2rem',width:'100%'}} onClick={handlePayment}>Retry Payment</button>
              </div>
            )}
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .pay-method-btn.active {
                border-color: #3bb273 !important;
                background: #e0f7ef !important;
                color: #2563eb;
              }
              @media (max-width: 600px) {
                .payment-modal {
                  min-width: 0 !important;
                  width: 98vw !important;
                  padding: 1.2rem 0.5rem !important;
                }
              }
            `}</style>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="hero section">
        <div className="container">
          <div className="hero__tagline heading heading--xl">
            Find Your Peace. Anytime. Anywhere.
          </div>
          <div className="hero__subtext">
            Peace Pods are calming, private micro-environments for meditation,
            focus, and relaxation—wherever you need them most.
          </div>
          <div className="hero__img" style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            margin:'0 auto',
            maxWidth:'720px',
            width:'100%',
            aspectRatio:'16/9',
            borderRadius:'2.2rem',
            overflow:'hidden',
            boxShadow:'0 8px 40px 0 rgba(79,91,213,0.13)',
            border:'3px solid #fff',
            background:'#e8f0ff',
            height:'auto',
            minHeight:'320px',
            maxHeight:'480px'
          }}>
            <video
              src="assets/peace-pod-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width:'100%',
                height:'100%',
                minHeight:'320px',
                maxHeight:'480px',
                objectFit:'cover',
                aspectRatio:'16/9',
                borderRadius:'2.2rem',
                transition:'transform 0.3s',
                boxShadow:'0 4px 32px 0 rgba(60,80,180,0.10)'
              }}
              poster="assets/1.jpeg"
            >
              Sorry, your browser does not support embedded videos.
            </video>
          </div>
          <div style={{ height: "2.5rem" }} />
          <div className="hero__actions">
            <a href="#pricing" className="btn">Book Now</a>
            <a href="#why" className="btn btn--accent">Service</a>
          </div>
        </div>
      </section>

      {/* Products / Pods */}
      <section className="section" id="products">
        <div className="container">
          <div className="heading heading--lg text--center mb-md">Our Pods</div>
          <div className="text--center mb-md">
            Engineered for tranquility, comfort, and versatility.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <FeatureCard
              icon="🔇"
              title="Soundproofing"
              desc="Escape the noise with advanced acoustic insulation."
            />
            <FeatureCard
              icon="💨"
              title="Ventilation"
              desc="Fresh, filtered air for every session."
            />
            <FeatureCard
              icon="💡"
              title="Smart Lighting"
              desc="Adjustable, soothing LED ambiance."
            />
            <FeatureCard
              icon="🛋️"
              title="Ultimate Comfort"
              desc="Ergonomic seating and calming interiors."
            />
          </div>
          <div className="heading heading--md text--center mt-lg mb-md">
            Use Cases
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <FeatureCard
              icon="🧘‍♂️"
              title="Meditation Pods"
              desc="Find your zen in any environment."
            />
            <FeatureCard
              icon="💼"
              title="Office Pods"
              desc="Boost focus and productivity at work."
            />
            <FeatureCard
              icon="🌿"
              title="Relaxation Pods"
              desc="Recharge in nature-inspired comfort."
            />
          </div>
          <div
            className="gallery mt-lg"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1.5rem",
            }}
          >
            {GALLERY_IMAGES.slice(0, 3).map((img, i) => (
              <div
                className="gallery__item"
                key={img}
                style={{
                  background: "#f8fafc",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px #b6c6e633",
                  height: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={img}
                  alt={`Peace Pod Gallery ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section--alt" id="why">
        <div className="container">
          <div className="heading heading--lg text--center mb-md">
            Why Choose Us
          </div>
          <div className="comparison">
            <div className="comparison__item">Stress Reduction</div>
            <div className="comparison__item">Focus Boost</div>
            <div className="comparison__item">Eco-Friendly</div>
            <div className="comparison__item">Compact Design</div>
          </div>
          <div className="heading heading--md text--center mt-lg mb-md">
            Testimonials
          </div>
          <div className="testimonials">
            <Testimonial
              quote="The Peace Pod is my sanctuary in the city!"
              author="Sophie, NYC"
            />
            <Testimonial
              quote="I meditate daily at work now—game changer."
              author="Raj, London"
            />
            <Testimonial
              quote="Beautiful, sustainable, and so calming."
              author="Elena, SF"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" id="how">
        <div className="container">
          <div className="heading heading--lg text--center mb-md">
            How It Works in Co-working Spaces
          </div>
          <div className="text--center mb-md" style={{maxWidth:'700px',margin:'0 auto',fontSize:'1.15rem',color:'#444'}}>
            Setting up Peace Pods in your co-working space is simple and hassle-free. We provide fully equipped pods for solo work or team meetings, helping your members stay productive and focused.
          </div>
            <div style={{height:'2.5rem'}} />
          <div className="how-steps-grid" style={{display:'grid',gridTemplateColumns:'1fr',gap:'2.2rem',maxWidth:'900px',margin:'0 auto'}}>
            {/* Step 1 */}
            <div className="how-step-card">
              <div className="how-step-icon" style={{fontSize:'2.5rem'}}>1️⃣</div>
              <div className="how-step-title">Pod Installation</div>
              <div className="how-step-desc">
                We install Solo and Team Pods at your co-working space in available corners or dedicated zones, ensuring minimal space usage and maximum accessibility.
              </div>
            </div>
            {/* Step 2 */}
            <div className="how-step-card">
              <div className="how-step-icon" style={{fontSize:'2.5rem'}}>2️⃣</div>
              <div className="how-step-title">Member Access & Booking</div>
              <div className="how-step-desc">
                Members can book a pod instantly through your co-working space app or website. The system shows available time slots and notifies users if a slot is already booked.
              </div>
            </div>
            {/* Step 3 */}
            <div className="how-step-card">
              <div className="how-step-icon" style={{fontSize:'2.5rem'}}>3️⃣</div>
              <div className="how-step-title">Use the Pod</div>
              <div className="how-step-desc">
                Once booked, members unlock the pod via QR code or access ID. Each pod is soundproof, comfortable, and tech-ready with Wi-Fi, power outlets, lighting, and ventilation.
              </div>
            </div>
            {/* Step 4 */}
            <div className="how-step-card">
              <div className="how-step-icon" style={{fontSize:'2.5rem'}}>4️⃣</div>
              <div className="how-step-title">End Session & Feedback</div>
              <div className="how-step-desc">
                After the session, members exit the pod and provide optional feedback. The system updates availability in real time, ensuring smooth scheduling for all users.
              </div>
            </div>
          </div>
          {/* How It Works Section Styles */}
          <style>{`
            .how-steps-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 2.2rem;
              margin-top: 2.5rem;
              max-width: 1200px;
            }
            @media (max-width: 1023px) {
              .how-steps-grid {
                grid-template-columns: 1fr;
                gap: 2.2rem;
              }
            }
            .how-step-card {
              background: #fff;
              border-radius: 1.5rem;
              box-shadow: 0 4px 24px #b6c6e633;
              padding: 2rem 1.5rem 1.5rem 1.5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              min-width: 0;
              border: 2px solid #e5e7eb;
              transition: box-shadow 0.2s, border 0.2s, transform 0.2s;
              height: 100%;
            }
            .how-step-card:hover {
              box-shadow: 0 8px 32px #4f5bd533;
              border-color: #4f5bd5;
              transform: translateY(-4px) scale(1.025);
            }
            .how-step-icon {
              margin-bottom: 0.7rem;
              text-shadow: 0 2px 8px #e0e7ff;
            }
            .how-step-title {
              font-weight: 800;
              font-size: 1.25rem;
              margin-bottom: 0.5rem;
              color: #222;
              text-align: center;
              letter-spacing: -0.5px;
            }
            .how-step-desc {
              color: #444;
              font-size: 1.05rem;
              text-align: center;
              font-weight: 500;
            }
          `}</style>
        </div>
      </section>

      {/* Gallery / Virtual Tour */}
      <section className="section section--alt" id="gallery">
        <div className="container">
          <div className="heading heading--lg text--center mb-md">
            Gallery / Virtual Tour
          </div>
          <div
            className="gallery"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "1.5rem",
              justifyItems: "center",
              alignItems: "center",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {GALLERY_IMAGES.slice(0, 6).map((img, i) => (
              <div
                className="gallery__item"
                key={img + i}
                style={{
                  background: "#f8fafc",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px #b6c6e633",
                  width: "100%",
                  maxWidth: "320px",
                  height: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={img}
                  alt={`Peace Pod Gallery ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: i === 0 ? "left bottom" : "center", // Crop first image to bottom left to hide logo
                    display: "block",
                    transition: "transform 0.3s",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Plans */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="heading heading--lg text--center mb-md" style={{letterSpacing:'-1px',fontWeight:900,fontSize:'2.5rem',color:'#2a2a2a',textShadow:'0 2px 12px #e0e7ff'}}>Pricing & Plans</div>
          <div className="pricing-grid">
            {/* Solo Pods */}
            <div className="pricing-card premium-card most-popular">
              <span className="pricing-badge">Most Popular</span>
              <div className="pricing-icon" style={{color:'#3bb273'}}>👤</div>
              <div className="pricing-title">Solo Pods</div>
              <div className="pricing-desc">Perfect for individuals who want uninterrupted focus or a private work session.</div>
              <div className="pricing-price-group">
                <div className="pricing-price pricing-price--hour">₹<span>99</span><span className="pricing-unit">/hour</span></div>
                <div className="pricing-price pricing-price--day">₹<span>399</span><span className="pricing-unit">/day</span></div>
                <div className="pricing-price pricing-price--month">₹<span>1,999</span><span className="pricing-unit">/month</span></div>
                <div className="pricing-note">(20 hrs + priority booking + 10% off extra hrs)</div>
              </div>
              <ul className="pricing-features">
                <li><span className="feature-icon">📶</span> Wi-Fi</li>
                <li><span className="feature-icon">🔌</span> Charging ports</li>
                <li><span className="feature-icon">🛋️</span> Comfortable seating</li>
                <li><span className="feature-icon">💡</span> Lighting & ventilation</li>
                <li><span className="feature-icon">🔇</span> Noise-free environment</li>
              </ul>
              <button className="btn btn--accent select-plan-btn" style={{marginTop:'1.2rem',width:'100%'}} onClick={() => handleSelectPlan('Solo Pods')}>Select Plan</button>
            </div>
            {/* Team Pods */}
            <div className="pricing-card premium-card">
              <span className="pricing-badge team-badge">Best for Teams</span>
              <div className="pricing-icon" style={{color:'#4f5bd5'}}>👥</div>
              <div className="pricing-title">Team Pods</div>
              <div className="pricing-desc">Designed for 2–4 people — ideal for meetings, small discussions, or collaborative work.</div>
              <div className="pricing-price-group">
                <div className="pricing-price pricing-price--hour">₹<span>199</span><span className="pricing-unit">/hour</span></div>
                <div className="pricing-price pricing-price--day">₹<span>799</span><span className="pricing-unit">/day</span></div>
                <div className="pricing-price pricing-price--month">₹<span>3,999</span><span className="pricing-unit">/month</span></div>
                <div className="pricing-note">(40 hrs + priority booking + 10% off extra hrs)</div>
              </div>
              <ul className="pricing-features">
                <li><span className="feature-icon">📶</span> Wi-Fi</li>
                <li><span className="feature-icon">🔌</span> Multiple charging ports</li>
                <li><span className="feature-icon">🪑</span> Meeting table</li>
                <li><span className="feature-icon">🔇</span> Soundproof walls</li>
              </ul>
              <button className="btn btn--accent select-plan-btn" style={{marginTop:'1.2rem',width:'100%'}} onClick={() => handleSelectPlan('Team Pods')}>Select Plan</button>
            </div>
            {/* Student & Institutional Discounts */}
            <div className="pricing-card premium-card discount-card">
              <span className="pricing-badge discount-badge">Special Offer</span>
              <div className="pricing-icon" style={{color:'#facc15'}}>🎓</div>
              <div className="pricing-title">Student & Institutional Discounts</div>
              <div className="pricing-desc">Students and educational institutions get up to <span style={{color:'#facc15',fontWeight:700}}>25% off</span> with valid ID.</div>
              <ul className="pricing-features">
                <li><span className="feature-icon">📶</span> Wi-Fi</li>
                <li><span className="feature-icon">🔌</span> Charging ports</li>
                <li><span className="feature-icon">🛋️</span> Comfortable seating</li>
                <li><span className="feature-icon">💡</span> Lighting & ventilation</li>
                <li><span className="feature-icon">🔇</span> Noise-free environment</li>
              </ul>
              <button className="btn btn--accent select-plan-btn" style={{marginTop:'1.2rem',width:'100%'}} onClick={() => handleSelectPlan('Student & Institutional Discounts')}>Select Plan</button>
            </div>
          </div>
        </div>
        {/* Pricing Section Styles */}
        <style>{`
          .pricing-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
            justify-content: center;
            align-items: stretch;
            margin-bottom: 2.5rem;
          }
          @media (min-width: 700px) {
            .pricing-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .pricing-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .premium-card {
            background: #fff;
            border-radius: 2rem;
            box-shadow: 0 8px 32px #b6c6e655;
            padding: 2.5rem 2.2rem 2.2rem 2.2rem;
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            border: 2.5px solid #e5e7eb;
            transition: box-shadow 0.25s, transform 0.25s, border 0.25s;
            height: 100%;
            overflow: visible;
          }
          .premium-card:hover {
            box-shadow: 0 16px 48px #3bb27333, 0 0 0 4px #e0f7ef;
            transform: translateY(-8px) scale(1.035);
            border-color: #3bb273;
            z-index: 2;
          }
          .most-popular {
            border-image: linear-gradient(120deg,#3bb273 40%,#2563eb 100%) 1;
            border-width: 3px;
            border-style: solid;
            box-shadow: 0 12px 48px #3bb27333;
          }
          .most-popular:hover {
            box-shadow: 0 20px 64px #3bb27355, 0 0 0 6px #e0f7ef;
            border-color: #2563eb;
          }
          .discount-card {
            border-color: #facc15;
            box-shadow: 0 8px 32px #facc1555;
          }
          .discount-card:hover {
            box-shadow: 0 16px 48px #facc1555, 0 0 0 4px #fef9c3;
            border-color: #facc15;
          }
          .pricing-badge {
            position: absolute;
            top: -18px;
            right: 24px;
            background: linear-gradient(90deg,#3bb273 60%,#2563eb 100%);
            color: #fff;
            font-weight: 700;
            padding: 0.5em 1.2em;
            border-radius: 1.2em;
            font-size: 1.05rem;
            box-shadow: 0 2px 12px #3bb27355;
            z-index: 3;
            letter-spacing: 0.01em;
          }
          .team-badge {
            background: linear-gradient(90deg,#4f5bd5 60%,#2563eb 100%);
            box-shadow: 0 2px 12px #4f5bd555;
          }
          .discount-badge {
            background: linear-gradient(90deg,#facc15 60%,#fef08a 100%);
            color: #222;
            box-shadow: 0 2px 12px #facc1555;
          }
          .pricing-icon {
            font-size: 3.5rem;
            margin-bottom: 0.7rem;
            text-shadow: 0 2px 8px #e0e7ff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pricing-title {
            font-weight: 900;
            font-size: 1.7rem;
            margin-bottom: 0.5rem;
            color: #222;
            text-align: center;
            letter-spacing: -0.5px;
          }
          .pricing-desc {
            margin-bottom: 1.1rem;
            color: #444;
            font-weight: 500;
            text-align: center;
            font-size: 1.08rem;
          }
          .pricing-price-group {
            width: 100%;
            margin-bottom: 1.1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
          }
          .pricing-price {
            font-weight: 900;
            font-size: 2.1rem;
            color: #222;
            display: flex;
            align-items: baseline;
            gap: 0.3em;
            line-height: 1.1;
          }
          .pricing-price span {
            font-size: 2.1rem;
            font-weight: 900;
            margin-left: 0.1em;
          }
          .pricing-price--hour { color: #3bb273; }
          .pricing-price--day { color: #4f5bd5; }
          .pricing-price--month { color: #2563eb; }
          .pricing-unit {
            font-size: 1.1rem;
            font-weight: 500;
            color: #888;
            margin-left: 0.2em;
          }
          .pricing-note {
            font-size: 1rem;
            color: #2563eb;
            font-weight: 600;
            margin-top: 0.2rem;
            text-align: center;
          }
          .pricing-features {
            margin: 0;
            padding: 0;
            list-style: none;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
            margin-top: 0.7rem;
          }
          .pricing-features li {
            font-size: 1.08rem;
            color: #444;
            display: flex;
            align-items: center;
            gap: 0.7em;
            font-weight: 500;
            padding-left: 0.2em;
          }
          .feature-icon {
            font-size: 1.25em;
            display: inline-block;
            width: 1.5em;
            text-align: center;
          }
        `}</style>
      </section>

      {/* Sustainability */}
      <section className="section section--alt" id="sustainability">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="heading heading--lg text--center mb-md">
            Sustainability
          </div>
          <img
            src="assets/4.jpeg"
            alt="Eco-friendly Peace Pod"
            style={{
              width: "100%",
              maxWidth: "520px",
              height: "320px",
              objectFit: "cover",
              borderRadius: "1.2rem",
              marginBottom: "1.5rem",
              boxShadow: "0 2px 12px #b6c6e633",
            }}
          />
          <div className="text--center mb-md">
            Our pods use eco-friendly materials and support mental health &
            community well-being. Every pod is built to last, with minimal
            environmental impact.
          </div>
        </div>
      </section>

      {/* Contact / Collaborate */}
      <section className="section" id="contact">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="heading heading--lg text--center mb-md">
            Contact / Collaborate
          </div>
          <img
            src="assets/5.jpeg"
            alt="Contact Peace Pods"
            style={{
              width: "100%",
              maxWidth: "520px",
              height: "320px",
              objectFit: "cover",
              borderRadius: "1.2rem",
              marginBottom: "1.5rem",
              boxShadow: "0 2px 12px #b6c6e633",
            }}
          />
          <form className="contact-form">
            <input
              className="contact-form__input"
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              className="contact-form__input"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              className="contact-form__textarea"
              name="message"
              placeholder="Your Message"
              rows={4}
              required
            ></textarea>
            <button className="btn contact-form__btn" type="submit">
              Send Message
            </button>
          </form>
          <div className="social-links mt-md">
            <a href="#" className="social-links__icon" aria-label="Instagram">
              📸
            </a>
            <a href="#" className="social-links__icon" aria-label="Twitter">
              🐦
            </a>
            <a href="#" className="social-links__icon" aria-label="LinkedIn">
              💼
            </a>
          </div>
          <div className="text--center mt-md">
            <a href="#" className="btn btn--accent">
              Partner / Invest with us
            </a>
          </div>
        </div>
      </section>

      {/* Blog (Optional) */}
      <section className="section section--alt" id="blog">
        <div className="container">
          <div className="heading heading--lg text--center mb-md">Blog</div>
          <div
            className="blog"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              className="blog__item"
              style={{
                background: "#f8fafc",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 2px 12px #b6c6e633",
                height: "380px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="assets/6.jpeg"
                alt="Blog Visual 1"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <BlogItem
                title="The Science of Calm Spaces"
                desc="How micro-environments help mental health and productivity."
              />
            </div>
            <div
              className="blog__item"
              style={{
                background: "#f8fafc",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 2px 12px #b6c6e633",
                height: "380px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="assets/2.jpeg"
                alt="Blog Visual 2"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <BlogItem
                title="Designing for Focus"
                desc="Why privacy pods are the future of work and wellness."
              />
            </div>
            <div
              className="blog__item"
              style={{
                background: "#f8fafc",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 2px 12px #b6c6e633",
                height: "380px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="assets/3.jpeg"
                alt="Blog Visual 3"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <BlogItem
                title="Eco Materials in Modern Pods"
                desc="Sustainability at the heart of Peace Pods."
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
