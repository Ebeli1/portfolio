/* eslint-disable no-unused-vars */
// ================================
// PORTFOLIO — EDITORIAL DARK EDITION
// Playfair Display + DM Sans | Warm Charcoal & Gold
// FULLY RESPONSIVE + CV FIX
// ================================

import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, createContext, useContext, useRef } from "react";

// =====================
// GOOGLE FONTS INJECTION
// =====================
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// =====================
// GLOBAL STYLES (WITH RESPONSIVE)
// =====================
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      
      :root {
        --c-bg: #0d0d0d;
        --c-surface: #141414;
        --c-surface-2: #1c1c1c;
        --c-border: rgba(255,255,255,0.07);
        --c-border-hover: rgba(255,255,255,0.14);
        --c-gold: #c9a96e;
        --c-gold-dim: #a07c45;
        --c-gold-glow: rgba(201,169,110,0.12);
        --c-text: #f0ede8;
        --c-text-2: #9a9690;
        --c-text-3: #5a5752;
        --ff-display: 'Playfair Display', Georgia, serif;
        --ff-body: 'DM Sans', system-ui, sans-serif;
        --ff-mono: 'DM Mono', monospace;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--c-bg);
        color: var(--c-text);
        font-family: var(--ff-body);
        font-size: 16px;
        line-height: 1.7;
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
      }

      ::selection { background: var(--c-gold); color: #0d0d0d; }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--c-bg); }
      ::-webkit-scrollbar-thumb { background: var(--c-gold-dim); border-radius: 2px; }

      .serif { font-family: var(--ff-display); }
      .mono { font-family: var(--ff-mono); }
      .gold { color: var(--c-gold); }

      .section-label {
        font-family: var(--ff-mono);
        font-size: 11px;
        font-weight: 300;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--c-gold);
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 2rem;
      }
      .section-label::after {
        content: '';
        flex: 0 0 40px;
        height: 1px;
        background: var(--c-gold-dim);
      }

      /* RESPONSIVE STYLES */
      @media (max-width: 768px) {
        body { font-size: 14px; }
        .section-label { margin-bottom: 1.5rem; }
        .section-label::after { flex: 0 0 20px; }
      }

      @media (max-width: 640px) {
        .section-label { font-size: 9px; }
      }
    `;
    document.head.appendChild(style);
    document.body.style.backgroundColor = "#0d0d0d";
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// =====================
// SCROLL PROGRESS
// =====================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--c-gold)",
        scaleX,
        transformOrigin: "0%",
        zIndex: 100,
        opacity: 0.8,
      }}
    />
  );
}

// =====================
// NAVIGATION (RESPONSIVE)
// =====================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 1.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--c-border)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <button
        onClick={() => scrollTo("home")}
        style={{
          fontFamily: "var(--ff-display)",
          fontStyle: "italic",
          fontSize: "18px",
          color: "var(--c-text)",
          background: "none",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        E. Ebeli
      </button>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item === "Home" ? "home" : item.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--ff-body)",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "var(--c-text-2)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--c-gold)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--c-text-2)")}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--c-text)",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && isOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "rgba(13,13,13,0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--c-border)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item === "Home" ? "home" : item.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--ff-body)",
                fontSize: "16px",
                fontWeight: 400,
                color: "var(--c-text-2)",
                padding: "0.75rem",
                textAlign: "left",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--c-gold)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--c-text-2)")}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  );
}

// =====================
// HERO SECTION (RESPONSIVE)
// =====================
function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/profile.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(13,13,13,0.80) 0%, rgba(13,13,13,0.30) 55%, rgba(13,13,13,0.15) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 35%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
          opacity: 0.5,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 4rem",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--c-gold)",
            marginBottom: "1rem",
          }}
        >
          Portfolio — 2025
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "var(--c-text)",
            marginBottom: "0.25rem",
          }}
        >
          Egberipou
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "var(--ff-display)",
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "var(--c-gold)",
            marginBottom: "1.5rem",
          }}
        >
          Ebeli
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontFamily: "var(--ff-body)",
            fontSize: "clamp(12px, 4vw, 15px)",
            fontWeight: 300,
            color: "var(--c-text-2)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            maxWidth: "480px",
          }}
        >
          AI-Assisted Developer &nbsp;·&nbsp; Web3 Builder &nbsp;·&nbsp; Systems Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="/resume.pdf"
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "var(--c-gold)",
              color: "#0d0d0d",
              fontFamily: "var(--ff-body)",
              fontSize: "clamp(11px, 3vw, 13px)",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Download CV
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "transparent",
              color: "var(--c-text)",
              fontFamily: "var(--ff-body)",
              fontSize: "clamp(11px, 3vw, 13px)",
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid var(--c-border-hover)",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--c-gold)";
              e.currentTarget.style.color = "var(--c-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--c-border-hover)";
              e.currentTarget.style.color = "var(--c-text)";
            }}
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "var(--c-text-3)",
            writingMode: "vertical-rl",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--c-gold), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

// =====================
// SECTION WRAPPER (RESPONSIVE)
// =====================
function Section({ id, children, alt = false }) {
  return (
    <section
      id={id}
      style={{
        padding: "4rem 0",
        background: alt ? "var(--c-surface)" : "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        {children}
      </div>
    </section>
  );
}

// =====================
// ABOUT SECTION (RESPONSIVE)
// =====================
function About() {
  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="section-label">About</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--ff-display)",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
                color: "var(--c-text)",
              }}
            >
              Building at the edge of{" "}
              <em style={{ color: "var(--c-gold)", fontStyle: "italic" }}>
                AI & Web3
              </em>
            </h2>
            <p
              style={{
                color: "var(--c-text-2)",
                lineHeight: 1.85,
                fontSize: "15px",
                marginBottom: "1.25rem",
                fontWeight: 300,
              }}
            >
              I'm an AI-assisted Software Developer and Web3-focused builder with experience
              designing and developing decentralized and AI-powered digital products. I
              specialise in front-end and full-stack web development using modern
              technologies and AI coding workflows.
            </p>
            <p
              style={{
                color: "var(--c-text-2)",
                lineHeight: 1.85,
                fontSize: "15px",
                fontWeight: 300,
              }}
            >
              My passion lies in contributing to the decentralised economy through
              scalable, transparent, and user-focused digital solutions — constantly
              exploring emerging technologies to build products that make a difference.
            </p>
          </div>

          <div>
            <div
              style={{
                borderLeft: "1px solid var(--c-border)",
                paddingLeft: "1.5rem",
              }}
            >
              {[
                { label: "Location", value: "Lagos State, Nigeria" },
                { label: "Email", value: "piantoebeli@gmail.com" },
                { label: "Phone", value: "+234 813 283 9266" },
                { label: "Open to", value: "Web3 & AI Projects" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    paddingBottom: "1.5rem",
                    marginBottom: "1.5rem",
                    borderBottom: i < 3 ? "1px solid var(--c-border)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--c-gold)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "var(--c-text)",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// =====================
// SKILLS SECTION (RESPONSIVE)
// =====================
function Skills() {
  const skills = {
    Frontend: ["React", "Tailwind CSS", "Framer Motion", "Flutter"],
    Backend: ["Node.js", "Firebase", "Supabase", "REST APIs"],
    "Web3 & AI": ["Web3 Concepts", "AI Integration", "Claude Code", "ChatGPT"],
    Tools: ["Git", "VS Code", "Figma", "Postman"],
  };

  return (
    <Section id="skills" alt>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="section-label">Skills</div>

        <h2
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: "2rem",
            color: "var(--c-text)",
          }}
        >
          Technologies &amp; Tools
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1px",
            background: "var(--c-border)",
            border: "1px solid var(--c-border)",
          }}
        >
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: "var(--c-surface)",
                padding: "1.5rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--c-surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--c-surface)")}
            >
              <div
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--c-gold)",
                  marginBottom: "1rem",
                }}
              >
                0{idx + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--ff-display)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--c-text)",
                  marginBottom: "1rem",
                }}
              >
                {category}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {items.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--c-text-2)",
                      borderBottom: "1px solid var(--c-border)",
                      paddingBottom: "0.4rem",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// =====================
// PROJECTS SECTION (RESPONSIVE)
// =====================
function Projects() {
  const projects = [
    {
      num: "01",
      title: "SnappyX",
      category: "Web3 Concept",
      description:
        "Blockchain-based marketplace and auction system. Explored decentralised transaction flows and trustless exchange models.",
      tags: ["Blockchain", "Marketplace", "Web3"],
    },
    {
      num: "02",
      title: "TerraChain AI",
      category: "AI + Blockchain",
      description:
        "AI-assisted land registry and verification system with blockchain-inspired logic for secure record validation.",
      tags: ["AI", "Land Registry", "Verification"],
    },
    {
      num: "03",
      title: "KudiTrack",
      category: "Fintech",
      description:
        "WhatsApp-based financial tracking for SMEs with automation workflows and AI-powered financial summaries.",
      tags: ["Fintech", "Automation", "WhatsApp"],
    },
  ];

  return (
    <Section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="section-label">Projects</div>

        <h2
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: "2rem",
            color: "var(--c-text)",
          }}
        >
          Featured Work
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "flex-start",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--c-border)",
                cursor: "default",
                transition: "background 0.2s, padding 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--c-surface)";
                e.currentTarget.style.marginLeft = "-1rem";
                e.currentTarget.style.marginRight = "-1rem";
                e.currentTarget.style.paddingLeft = "1rem";
                e.currentTarget.style.paddingRight = "1rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.marginLeft = "0";
                e.currentTarget.style.marginRight = "0";
                e.currentTarget.style.paddingLeft = "0";
                e.currentTarget.style.paddingRight = "0";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: "11px",
                    color: "var(--c-gold)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {project.num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--ff-display)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--c-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--c-text-3)",
                  }}
                >
                  {project.category}
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--c-text-2)",
                  lineHeight: 1.7,
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--c-text-3)",
                      border: "1px solid var(--c-border)",
                      padding: "2px 8px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// =====================
// EXPERIENCE SECTION (RESPONSIVE)
// =====================
function Experience() {
  return (
    <Section id="experience" alt>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="section-label">Experience</div>

        <h2
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: "2rem",
            color: "var(--c-text)",
          }}
        >
          Background &amp; Education
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
          {/* Work */}
          <div>
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-text-3)",
                marginBottom: "1.5rem",
              }}
            >
              Work
            </div>

            <div
              style={{
                paddingLeft: "1.5rem",
                borderLeft: "1px solid var(--c-gold-dim)",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-1.625rem",
                    top: "6px",
                    width: "8px",
                    height: "8px",
                    background: "var(--c-gold)",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--c-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  2023 — Present
                </div>
                <h3
                  style={{
                    fontFamily: "var(--ff-display)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "var(--c-text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Web3 & AI Product Builder
                </h3>
                <p
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "var(--c-text-3)",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Independent
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Built experimental Web3-inspired and AI-powered digital products",
                    "Applied AI coding tools to accelerate development and debugging",
                    "Designed concepts for decentralised and fintech-style applications",
                    "Focused on user experience, scalability, and clean interface design",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "var(--c-text-2)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: "var(--c-gold)", flexShrink: 0, marginTop: "2px" }}>—</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-text-3)",
                marginBottom: "1.5rem",
              }}
            >
              Education
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                {
                  degree: "B.Sc. Accountancy",
                  school: "University of Abuja",
                  country: "Nigeria",
                },
                {
                  degree: "PGD, Accounting & Finance",
                  school: "Nigerian College of Accountancy",
                  country: "Jos",
                },
              ].map((edu, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.5rem",
                    border: "1px solid var(--c-border)",
                    background: "var(--c-bg)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      color: "var(--c-gold)",
                      marginBottom: "0.5rem",
                      textTransform: "uppercase",
                    }}
                  >
                    0{i + 1}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--ff-display)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--c-text)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--c-text-2)",
                    }}
                  >
                    {edu.school}, {edu.country}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// =====================
// CONTACT SECTION (RESPONSIVE)
// =====================
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    console.log("Form submitted:", formData);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--c-border)",
    color: "var(--c-text)",
    fontFamily: "var(--ff-body)",
    fontSize: "14px",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
    display: "block",
  };

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="section-label">Contact</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <h2
              style={{
                fontFamily: "var(--ff-display)",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--c-text)",
                marginBottom: "1.5rem",
              }}
            >
              Let's build{" "}
              <em style={{ color: "var(--c-gold)", fontStyle: "italic" }}>something</em>
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--c-text-2)",
                lineHeight: 1.85,
                marginBottom: "2rem",
              }}
            >
              Always interested in new opportunities, collaborations, or just a conversation
              about Web3, AI, and the future of technology.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Email", value: "piantoebeli@gmail.com" },
                { label: "Phone", value: "+234 813 283 9266" },
                { label: "Location", value: "Lagos State, Nigeria" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--c-gold)",
                      minWidth: "60px",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "var(--c-text-2)",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                style={inputStyle}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={(e) => (e.target.style.borderBottomColor = "var(--c-gold)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "var(--c-border)")}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="email"
                placeholder="Your Email"
                required
                style={inputStyle}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={(e) => (e.target.style.borderBottomColor = "var(--c-gold)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "var(--c-border)")}
              />
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <textarea
                rows={4}
                placeholder="Your Message"
                required
                style={{ ...inputStyle, resize: "none" }}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={(e) => (e.target.style.borderBottomColor = "var(--c-gold)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "var(--c-border)")}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: submitted ? "var(--c-surface-2)" : "var(--c-gold)",
                color: submitted ? "var(--c-gold)" : "#0d0d0d",
                fontFamily: "var(--ff-body)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: submitted ? "1px solid var(--c-gold)" : "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              {submitted ? "✓ Message Sent" : "Send Message"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </Section>
  );
}

// =====================
// FOOTER (RESPONSIVE WITH GITHUB LINK)
// =====================
function Footer() {
  return (
    <footer
      style={{
        padding: "2rem 1.5rem",
        background: "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--ff-display)",
          fontStyle: "italic",
          fontSize: "14px",
          color: "var(--c-text-3)",
        }}
      >
        Egberipou Ebeli
      </span>
      
      <a
        href="https://github.com/Ebeli1"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--ff-mono)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "var(--c-gold)",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        GitHub ↗
      </a>
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "var(--c-text-3)",
          }}
        >
          Lagos · Nigeria
        </span>
        <span
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "var(--c-text-3)",
          }}
        >
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

// =====================
// MAIN APP
// =====================
export default function App() {
  return (
    <Router>
      <FontLoader />
      <GlobalStyles />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </Router>
  );
}