import { useEffect, useRef, useState } from "react";
import profileAvatar from "./assets/figma-avatar-2.png";
import heroVideo from "./assets/video-background.mp4";
import northstarImage from "./assets/work-northstar.png";
import sereinImage from "./assets/work-serein.png";
import formaImage from "./assets/work-forma.png";
import resonanceImage from "./assets/work-resonance.png";
import { appHref } from "./routes.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

const navigation = [
  { label: "Services", target: "#services" },
  { label: "Work", target: "#work" },
  { label: "Process", target: "#process" },
  { label: "About", target: appHref("about") },
];

const services = [
  {
    number: "01",
    title: "Web Design",
    description: "Distinctive, conversion-minded websites built around a sharp visual point of view.",
    detail: "Art direction · UX/UI · Responsive systems",
  },
  {
    number: "02",
    title: "Digital Strategy",
    description: "A clear story, audience journey, and content structure before a single pixel gets polished.",
    detail: "Positioning · Workshops · Experience mapping",
  },
  {
    number: "03",
    title: "Brand Systems",
    description: "Flexible visual foundations that make every launch feel connected and unmistakably yours.",
    detail: "Identity · Type systems · Digital guidelines",
  },
  {
    number: "04",
    title: "Creative Development",
    description: "Precise, responsive builds with considered motion and the details that make a site feel alive.",
    detail: "Front-end · Motion · Design QA",
  },
];

const projects = [
  {
    name: "Northstar",
    category: "Fintech platform",
    outcome: "A calmer way to make high-stakes decisions.",
    tags: "Strategy · Brand · Web",
    image: northstarImage,
    className: "project-card--wide",
  },
  {
    name: "Serein",
    category: "Wellness technology",
    outcome: "Digital care with a more human pulse.",
    tags: "Product · UX/UI · Motion",
    image: sereinImage,
    className: "",
  },
  {
    name: "Forma",
    category: "Architecture platform",
    outcome: "Complex property data, made beautifully clear.",
    tags: "Strategy · Web · Development",
    image: formaImage,
    className: "",
  },
  {
    name: "Resonance",
    category: "Music and culture",
    outcome: "A living identity built for discovery.",
    tags: "Brand · Digital · Campaign",
    image: resonanceImage,
    className: "project-card--wide",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Align",
    description: "We get clear on the audience, the business goal, and what the website needs to make people feel and do.",
  },
  {
    number: "02",
    title: "Create",
    description: "Direction becomes a complete visual system, shaped through focused feedback and high-fidelity prototypes.",
  },
  {
    number: "03",
    title: "Launch",
    description: "The experience is built, tested across screens, refined in motion, and prepared for a confident release.",
  },
];

const testimonials = [
  {
    quote: "Shoaib turned a complex product into a website people understood immediately. The clarity changed every sales conversation.",
    person: "Maya Chen",
    role: "Co-founder, Northstar",
  },
  {
    quote: "It felt like working with a true product partner—not a vendor. Every choice had a reason and the launch exceeded our targets.",
    person: "Daniel Reed",
    role: "Creative Director, Serein",
  },
  {
    quote: "The new system gave our team confidence and gave the brand the presence it had been missing for years.",
    person: "Aisha Khan",
    role: "Head of Brand, Forma",
  },
];

export function App() {
  const [notice, setNotice] = useState({ visible: false, text: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const noticeTimer = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    if (bookingOpen) window.setTimeout(() => firstFieldRef.current?.focus(), 80);

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setBookingOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [bookingOpen]);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  const showNotice = (text) => {
    clearTimeout(noticeTimer.current);
    setNotice({ visible: true, text });
    noticeTimer.current = setTimeout(
      () => setNotice((current) => ({ ...current, visible: false })),
      3200,
    );
  };

  const openBooking = () => {
    setMenuOpen(false);
    setBookingComplete(false);
    setBookingOpen(true);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    setBookingComplete(true);
  };

  const handleNavClick = () => setMenuOpen(false);

  return (
    <main className="site-shell" id="top">
      <header className="site-header glass-surface" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Shoaib Mumtaz home" onClick={handleNavClick}>
          <span className="avatar-frame" aria-hidden="true">
            <img src={profileAvatar} alt="" />
          </span>
          <span className="brand-name">Shoaib Mumtaz</span>
        </a>

        <nav className="nav-actions" aria-label="Main menu">
          {navigation.map((item) => (
            <a className="nav-link" key={item.label} href={item.target} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu">
            Menu
          </button>
          <button className="contact-button" type="button" onClick={openBooking}>
            Contact
          </button>
        </nav>
      </header>

      <div className={`mobile-menu glass-surface${menuOpen ? " is-open" : ""}`} id="mobile-menu">
        {navigation.map((item) => (
          <a key={item.label} href={item.target} onClick={handleNavClick}>{item.label}</a>
        ))}
      </div>

      <div className="hero-stage">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex="-1"
        />

        <section className="hero" aria-labelledby="headline">
          <div className="hero-content">
            <div className="hero-copy">
              <h1 id="headline">
                <span>Web Design</span>
                <span>That Performs</span>
              </h1>
              <p className="description">Web designs that move your Business Forward →</p>
            </div>

            <div className="hero-actions">
              <button className="primary-cta glass-cta" type="button" onClick={openBooking}>
                Book a Call
              </button>
              <a className="view-work" href="#work">View all Work</a>
            </div>

            <div className="promotional-text" aria-label="Agency highlights">
              <span>Real Users</span>
              <span className="promo-dot" aria-hidden="true">•</span>
              <span>Stunners &amp; Deliver Real Results</span>
              <span className="promo-dot" aria-hidden="true">•</span>
              <span>Modern Designs</span>
            </div>
          </div>
        </section>
      </div>

      <section className="page-section about-section" id="about">
        <div className="section-shell">
          <div className="section-intro about-intro" data-reveal>
            <p className="eyebrow">Independent design partner</p>
            <h2>Strategy sharp enough to guide. Design bold enough to move.</h2>
            <p className="section-lede">I partner with ambitious teams to turn complex ideas into digital experiences that feel simple, distinctive, and ready to perform.</p>
          </div>

          <div className="proof-grid" data-reveal>
            <article className="proof-card">
              <strong>One</strong>
              <span>senior partner from first thought to final detail</span>
            </article>
            <article className="proof-card">
              <strong>Zero</strong>
              <span>handoff gaps between strategy, design, and build</span>
            </article>
            <article className="proof-card proof-card--accent">
              <strong>Built</strong>
              <span>to earn attention, create trust, and convert</span>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section services-section" id="services">
        <div className="section-shell">
          <div className="section-heading-row" data-reveal>
            <div>
              <p className="eyebrow">What I do</p>
              <h2>Everything your digital presence needs to become unforgettable.</h2>
            </div>
            <p>Focused expertise, brought together into one clear and collaborative process.</p>
          </div>

          <div className="services-list">
            {services.map((service) => (
              <article className="service-row" key={service.number} data-reveal>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-detail">{service.detail}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section work-section" id="work">
        <div className="section-shell">
          <div className="section-heading-row work-heading" data-reveal>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Ideas made tangible.</h2>
            </div>
            <p>Identity, product, and web experiences designed to make ambitious businesses easier to believe in.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.name} data-reveal>
                <button className="project-visual" type="button" onClick={() => showNotice(`${project.name} case study preview will be added in the next pass.`)} aria-label={`View ${project.name} project`}>
                  <img src={project.image} alt={`Abstract visual created for the ${project.name} case study`} />
                  <span>View project</span>
                </button>
                <div className="project-meta">
                  <div>
                    <p>{project.category}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <div className="project-outcome">
                    <p>{project.outcome}</p>
                    <span>{project.tags}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section process-section" id="process">
        <div className="section-shell">
          <div className="section-heading-row" data-reveal>
            <div>
              <p className="eyebrow">The process</p>
              <h2>Clear steps. Close collaboration. No black box.</h2>
            </div>
            <p>A focused path from the first conversation to a launch everyone feels proud to share.</p>
          </div>

          <div className="process-layout">
            <div className="process-list">
              {processSteps.map((step) => (
                <article className="process-step" key={step.number} data-reveal>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="testimonial-panel" data-reveal aria-label="Client testimonials">
              <p className="eyebrow">Client perspective</p>
              <blockquote>“{testimonials[testimonialIndex].quote}”</blockquote>
              <div className="testimonial-footer">
                <div>
                  <strong>{testimonials[testimonialIndex].person}</strong>
                  <span>{testimonials[testimonialIndex].role}</span>
                </div>
                <div className="testimonial-controls" aria-label="Select testimonial">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.person}
                      className={index === testimonialIndex ? "is-active" : ""}
                      type="button"
                      onClick={() => setTestimonialIndex(index)}
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-pressed={index === testimonialIndex}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-section final-cta-section" aria-labelledby="final-cta-title">
        <div className="section-shell">
          <div className="final-cta-card" data-reveal>
            <p className="eyebrow">Start a project</p>
            <h2 id="final-cta-title">Have a project in mind? Let’s make it impossible to ignore.</h2>
            <p>Bring the early idea, the messy brief, or the next big launch. We’ll turn it into a clear plan together.</p>
            <button className="primary-cta glass-cta final-cta-button" type="button" onClick={openBooking}>Book a Call</button>
          </div>

          <footer className="site-footer">
            <a className="footer-brand" href="#top">Shoaib Mumtaz</a>
            <p>Independent web designer and creative developer.</p>
            <div className="footer-links">
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <button type="button" onClick={openBooking}>Contact</button>
            </div>
          </footer>
        </div>
      </section>

      <div className={`booking-modal${bookingOpen ? " is-open" : ""}`} aria-hidden={!bookingOpen}>
        <button className="modal-backdrop" type="button" aria-label="Close booking form" onClick={() => setBookingOpen(false)} />
        <section className="booking-dialog glass-surface" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <button className="modal-close" type="button" onClick={() => setBookingOpen(false)}>Close</button>
          {bookingComplete ? (
            <div className="booking-success">
              <p className="eyebrow">Message received</p>
              <h2>Thanks—this sounds like a conversation worth having.</h2>
              <p>I’ll review the details and get back to you with the best next step.</p>
              <button className="primary-cta glass-cta" type="button" onClick={() => setBookingOpen(false)}>Back to the site</button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit}>
              <div className="booking-heading">
                <p className="eyebrow">Book a call</p>
                <h2 id="booking-title">Tell me what you’re building.</h2>
                <p>A few details are enough to make our first conversation useful.</p>
              </div>
              <div className="form-grid">
                <label>
                  Name
                  <input ref={firstFieldRef} name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>
                <label>
                  Project type
                  <select name="projectType" defaultValue="" required>
                    <option value="" disabled>Select one</option>
                    <option>New website</option>
                    <option>Website redesign</option>
                    <option>Brand and website</option>
                    <option>Product design</option>
                  </select>
                </label>
                <label>
                  Ideal start
                  <select name="start" defaultValue="" required>
                    <option value="" disabled>Select timing</option>
                    <option>As soon as possible</option>
                    <option>Within 1–2 months</option>
                    <option>Within 3–4 months</option>
                    <option>Still exploring</option>
                  </select>
                </label>
                <label className="form-wide">
                  What would make this project a success?
                  <textarea name="message" rows="4" placeholder="A quick overview of the challenge, goal, or opportunity." required />
                </label>
              </div>
              <button className="primary-cta glass-cta booking-submit" type="submit">Send project details</button>
            </form>
          )}
        </section>
      </div>

      <div className={`purchase-notice${notice.visible ? " is-visible" : ""}`} role="status" aria-live="polite">
        {notice.text}
      </div>
    </main>
  );
}
