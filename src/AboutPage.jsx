import { useEffect, useState } from "react";
import profileAvatar from "./assets/figma-avatar-2.png";
import portrait from "./assets/about-shoaib-3d.png";
import { appHref } from "./routes.js";
import { ThemeToggle } from "./ThemeToggle.jsx";
import "./about.css";

const aboutNavigation = [
  { label: "Services", href: appHref("#services") },
  { label: "Work", href: appHref("#work") },
  { label: "Process", href: appHref("#process") },
  { label: "About", href: appHref("about") },
];

const principles = [
  {
    number: "01",
    title: "Find the signal",
    text: "Good work starts by deciding what matters most—then giving that idea enough room to be understood.",
  },
  {
    number: "02",
    title: "Give it character",
    text: "Clarity earns attention. A distinct point of view makes the experience stay with people after they leave.",
  },
  {
    number: "03",
    title: "Make it move",
    text: "The final layer is momentum: thoughtful interactions, decisive hierarchy, and a path that feels natural to follow.",
  },
];

const playModes = {
  focus: {
    label: "Focus",
    index: "01",
    word: "Clarity",
    note: "Remove the noise until the next move feels obvious.",
  },
  tension: {
    label: "Tension",
    index: "02",
    word: "Character",
    note: "Pair restraint with one move nobody forgets.",
  },
  momentum: {
    label: "Momentum",
    index: "03",
    word: "Action",
    note: "Turn attention into a sequence people want to follow.",
  },
};

export function AboutPage() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [portraitLifted, setPortraitLifted] = useState(false);
  const [playMode, setPlayMode] = useState("focus");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-about-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    const closeOnEscape = (event) => event.key === "Escape" && setBookingOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [bookingOpen]);

  const handlePortraitMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 11, y: y * -11 });
  };

  const openBooking = () => {
    setBookingComplete(false);
    setBookingOpen(true);
  };

  const togglePortrait = () => setPortraitLifted((lifted) => !lifted);

  return (
    <main className="about-page" id="top">
      <header className="site-header glass-surface about-header" aria-label="Primary navigation">
        <a className="brand" href={appHref()} aria-label="Shoaib Mumtaz home">
          <span className="avatar-frame" aria-hidden="true"><img src={profileAvatar} alt="" /></span>
          <span className="brand-name">Shoaib Mumtaz</span>
        </a>
        <nav className="nav-actions" aria-label="Main menu">
          {aboutNavigation.map((item) => (
            <a className={`nav-link${item.label === "About" ? " is-current" : ""}`} href={item.href} key={item.label} aria-current={item.label === "About" ? "page" : undefined}>
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <button className="contact-button" type="button" onClick={openBooking}>Contact</button>
        </nav>
      </header>

      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="eyebrow">Independent designer · Creative developer</p>
          <h1 id="about-title">I make ambitious ideas feel inevitable.</h1>
          <p className="about-hero-lede">I’m Shoaib—a design partner who turns complexity into digital experiences people understand, remember, and act on.</p>
          <div className="about-hero-actions">
            <a className="about-primary-action" href="#about-story">See how I think <span aria-hidden="true">↓</span></a>
            <button className="about-text-action" type="button" onClick={openBooking}>Book a call</button>
          </div>
        </div>

        <div className="portrait-column">
          <div
            className={`portrait-stage${portraitLifted ? " is-lifted" : ""}`}
            onPointerMove={handlePortraitMove}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            onClick={togglePortrait}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                togglePortrait();
              }
            }}
            role="button"
            tabIndex="0"
            aria-label="Play with Shoaib's portrait"
            aria-pressed={portraitLifted}
            style={{ "--portrait-rx": `${tilt.y}deg`, "--portrait-ry": `${tilt.x}deg` }}
          >
            <div className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
            <div className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
            <div className="portrait-glow" aria-hidden="true" />
            <img src={portrait} alt="Stylized 3D portrait of Shoaib Mumtaz" />
            <span className="portrait-note portrait-note-top">Curious by default</span>
            <span className="portrait-note portrait-note-bottom">Move · click · play</span>
          </div>
          <p className="portrait-caption"><span>Based in Pakistan</span><span>Working worldwide</span></p>
        </div>
      </section>

      <section className="about-section about-story" id="about-story">
        <div className="about-section-heading" data-about-reveal>
          <div>
            <p className="eyebrow">The short version</p>
            <h2>Design is how the complicated becomes obvious.</h2>
          </div>
          <p>I work where strategy, identity, and digital experience overlap—helping ambitious teams find the clearest version of what they are trying to say.</p>
        </div>

        <div className="story-grid">
          <article className="story-card story-card-main" data-about-reveal>
            <span className="story-card-index">A little context</span>
            <div>
              <p>I’m most useful when the idea is strong but the experience has not caught up yet. I ask the awkward questions, find the useful pattern, and turn it into something people can feel immediately.</p>
              <p>That means fewer layers between thinking and making—and a closer partnership from first conversation to final detail.</p>
            </div>
          </article>

          <article className="story-card story-card-signal" data-about-reveal>
            <span className="story-card-index">The signal</span>
            <div className="signal-graphic" aria-hidden="true">
              <span className="signal-ring signal-ring-one" />
              <span className="signal-ring signal-ring-two" />
              <span className="signal-core" />
            </div>
            <strong>Make the right thing impossible to miss.</strong>
          </article>

          <article className="story-card story-card-list" data-about-reveal>
            <span className="story-card-index">Built around</span>
            <ul>
              <li><span>01</span>Sharp questions</li>
              <li><span>02</span>Clear decisions</li>
              <li><span>03</span>Memorable details</li>
              <li><span>04</span>Real outcomes</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="about-section about-method">
        <div className="about-section-heading" data-about-reveal>
          <div>
            <p className="eyebrow">How I think</p>
            <h2>Clarity first. Character always.</h2>
          </div>
          <p>The process stays deliberately simple, so the work can stay ambitious without becoming chaotic.</p>
        </div>

        <div className="method-layout">
          <div className="method-visual" data-about-reveal aria-hidden="true">
            <div className="method-orbit method-orbit-a" />
            <div className="method-orbit method-orbit-b" />
            <div className="method-orbit method-orbit-c" />
            <div className="method-center"><span>Idea</span><strong>→</strong><span>Impact</span></div>
            <p>Strategy and craft in the same room.</p>
          </div>

          <div className="principle-list">
            {principles.map((principle) => (
              <article className="principle-row" key={principle.number} data-about-reveal>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-playground">
        <div className="playground-copy" data-about-reveal>
          <p className="eyebrow">A little room to play</p>
          <h2>Change the energy.</h2>
          <p>Strong digital work can be calm, expressive, or kinetic. Pick a mode and watch the same ingredients tell a different story.</p>
          <div className="playground-controls" role="group" aria-label="Choose a design energy">
            {Object.entries(playModes).map(([key, mode]) => (
              <button className={playMode === key ? "is-active" : ""} type="button" key={key} onClick={() => setPlayMode(key)} aria-pressed={playMode === key}>
                <span>{mode.index}</span>{mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`play-canvas play-canvas--${playMode}`}>
          <span className="play-grid" aria-hidden="true" />
          <span className="play-sphere play-sphere-a" aria-hidden="true" />
          <span className="play-sphere play-sphere-b" aria-hidden="true" />
          <div className="play-card play-card-back" aria-hidden="true">SM / 01</div>
          <div className="play-card play-card-front">
            <span>{playModes[playMode].index} / Design energy</span>
            <strong aria-live="polite">{playModes[playMode].word}</strong>
            <p>{playModes[playMode].note}</p>
          </div>
        </div>
      </section>

      <section className="about-section about-final" id="about-cta">
        <div className="about-final-card" data-about-reveal>
          <p className="eyebrow">Start a project</p>
          <h2>Have something ambitious in mind?</h2>
          <p>Bring the early idea, the messy brief, or the next big launch. We’ll find the clearest path forward together.</p>
          <button className="about-final-button" type="button" onClick={openBooking}>Book a Call</button>
        </div>

        <footer className="site-footer about-footer">
          <a className="footer-brand" href={appHref()}>Shoaib Mumtaz</a>
          <p>Independent web designer and creative developer.</p>
          <div className="footer-links">
            <a href={appHref("#work")}>Work</a>
            <a href={appHref("#services")}>Services</a>
            <button type="button" onClick={openBooking}>Contact</button>
          </div>
        </footer>
      </section>

      <div className={`booking-modal${bookingOpen ? " is-open" : ""}`} aria-hidden={!bookingOpen}>
        <button className="modal-backdrop" type="button" aria-label="Close booking form" onClick={() => setBookingOpen(false)} />
        <section className="booking-dialog glass-surface" role="dialog" aria-modal="true" aria-labelledby="about-booking-title">
          <button className="modal-close" type="button" onClick={() => setBookingOpen(false)}>Close</button>
          {bookingComplete ? (
            <div className="booking-success">
              <p className="eyebrow">Message received</p>
              <h2>Thanks—this sounds like a conversation worth having.</h2>
              <p>I’ll review the details and get back to you with the best next step.</p>
              <button className="primary-cta glass-cta" type="button" onClick={() => setBookingOpen(false)}>Back to the site</button>
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setBookingComplete(true); }}>
              <div className="booking-heading">
                <p className="eyebrow">Book a call</p>
                <h2 id="about-booking-title">Tell me what you’re building.</h2>
                <p>A few details are enough to make our first conversation useful.</p>
              </div>
              <div className="form-grid">
                <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
                <label>Work email<input name="email" type="email" placeholder="you@company.com" required /></label>
                <label>Project type<select name="projectType" defaultValue="" required><option value="" disabled>Select one</option><option>New website</option><option>Website redesign</option><option>Brand and website</option><option>Product design</option></select></label>
                <label>Ideal start<select name="start" defaultValue="" required><option value="" disabled>Select timing</option><option>As soon as possible</option><option>Within 1–2 months</option><option>Within 3–4 months</option><option>Still exploring</option></select></label>
                <label className="form-wide">What would make this project a success?<textarea name="message" rows="4" placeholder="A quick overview of the challenge, goal, or opportunity." required /></label>
              </div>
              <button className="primary-cta glass-cta booking-submit" type="submit">Send project details</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
