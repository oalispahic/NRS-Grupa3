import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Calendar,
  FlaskConical,
  Package,
  Shield,
  ClipboardList,
  BarChart2,
  CheckCircle2,
  Database,
  GitBranch,
  KeyRound,
  Server,
  Atom,
  ChevronRight,
  User,
  ShieldCheck,
} from "lucide-react";

const PRIMARY = "#2563EB";

const NAV_LINKS = [
  { label: "O nama", href: "#o-nama" },
  { label: "Korisnici", href: "#korisnici" },
  { label: "Funkcionalnosti", href: "#funkcionalnosti" },
  { label: "Razvoj", href: "#razvoj" },
  { label: "Tehnologije", href: "#tehnologije" },
];

const STATS = [
  { num: "27+", lbl: "Funkcionalnosti" },
  { num: "5", lbl: "Stakeholdera" },
  { num: "100%", lbl: "Cloud-based" },
  { num: "REST", lbl: "API arhitektura" },
];

const ABOUT_POINTS = [
  "Brza evidencija svakog uređaja u realnom vremenu",
  "Manje papirologije, više vremena za pacijente",
  "Transparentnost rada cijelog tima u jednom prikazu",
];

const LABORANT_ITEMS = [
  "Pregled opreme i specifikacija",
  "Kreiranje rezervacija",
  "Moje rezervacije i historija",
  "Kalendar zauzeća",
  "Otkazivanje i izmjena rezervacije",
  "Ocjenjivanje opreme nakon korištenja",
];

const ADMIN_ITEMS = [
  "Upravljanje opremom (dodavanje / brisanje)",
  "Odobravanje i odbijanje rezervacija",
  "Promjena statusa opreme",
  "Praćenje repromaterijala i zaliha",
  "Dnevnik aktivnosti i audit log",
  "Generisanje izvještaja",
  "Export podataka u CSV",
];

const FEATURES = [
  {
    Icon: Calendar,
    title: "Sistem rezervacija",
    desc: "Laboranti kreiraju zahtjeve za željeni termin. Automatska detekcija konflikata (PB26) sprečava dvostruke rezervacije.",
  },
  {
    Icon: FlaskConical,
    title: "Evidencija opreme",
    desc: "Kompletan inventar svakog aparata s detaljima, statusom i lokacijom. Administrator upravlja opremom u realnom vremenu.",
  },
  {
    Icon: Package,
    title: "Zalihe repromaterijala",
    desc: "Praćenje potrošnog materijala s automatskim upozorenjima ispod minimalnog praga. Proaktivno upravljanje umjesto reaktivnog.",
  },
  {
    Icon: Shield,
    title: "Kontrola pristupa",
    desc: "JWT autentifikacija i role-based access control. Laborant i administrator imaju jasno odvojena ovlaštenja.",
  },
  {
    Icon: ClipboardList,
    title: "Dnevnik aktivnosti",
    desc: "Svaka kritična akcija u sistemu ostavlja digitalni trag. Administrator ima potpun uvid u historiju promjena.",
  },
  {
    Icon: BarChart2,
    title: "Izvještaji i analitika",
    desc: "Statistike iskorištenosti opreme, servisni kartoni i export podataka u CSV format za eksternu analizu.",
  },
];

const SPRINTS = [
  {
    num: 5,
    title: "Sprint 5: Osnovne funkcionalnosti",
    desc: "Autentifikacija, pregled opreme i osnovni mehanizam rezervacije.",
    tags: ["PB1", "PB5", "PB23"],
  },
  {
    num: 6,
    title: "Sprint 6: Kontrola i validacija",
    desc: "Tok odobravanja rezervacija, RBAC i zaštita od vremenskih konflikata.",
    tags: ["PB6", "PB24", "PB26"],
  },
  {
    num: 7,
    title: "Sprint 7: Korisnički interfejs",
    desc: "Kalendar zauzeća, pretraga opreme i izmjena postojećih rezervacija.",
    tags: ["PB8", "PB13", "PB14"],
  },
  {
    num: 8,
    title: "Sprint 8: Administracija",
    desc: "Notifikacije, audit log i pregled stanja sistema iz administratorskog ugla.",
    tags: ["PB11", "PB15", "PB25"],
  },
  {
    num: 9,
    title: "Sprint 9: Laboratorijske funkcije",
    desc: "Repromaterijal, evidencija potrošnje i pravila korištenja opreme.",
    tags: ["PB21", "PB22"],
  },
  {
    num: 10,
    title: "Sprint 10: Analitika",
    desc: "Izvještaji, servisni karton aparata i analitički dashboard.",
    tags: ["PB16", "PB17", "PB27"],
  },
  {
    num: 11,
    title: "Sprint 11: Finalizacija",
    desc: "Specifikacije, ocjenjivanje opreme, export podataka i završno testiranje.",
    tags: ["PB18", "PB19", "PB20"],
  },
];

const TECH = [
  { Icon: Atom, name: "React", sub: "Frontend" },
  { Icon: Server, name: "Node.js + Express", sub: "Backend" },
  { Icon: Database, name: "PostgreSQL", sub: "Baza podataka" },
  { Icon: KeyRound, name: "JWT", sub: "Autentifikacija" },
  { Icon: GitBranch, name: "Git", sub: "Verzionisanje" },
];

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter','Segoe UI',sans-serif",
        color: "#111",
        background: "#fff",
        overflowX: "hidden",
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        img { display: block; max-width: 100%; }
        button { font-family: inherit; }
        a { font-family: inherit; }

        .nav-links-desktop { display: flex; gap: 32px; }
        .nav-cta-desktop   { display: flex; gap: 10px; }
        .hamburger         { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
        .mobile-menu       { display: none; }

        .hero-h1    { font-size: 48px; }
        .stats-grid { grid-template-columns: repeat(4,1fr); }
        .about-grid { grid-template-columns: 1fr 1fr; }
        .roles-grid { grid-template-columns: 1fr 1fr; }
        .feat-grid  { grid-template-columns: repeat(3,1fr); }
        .tech-grid  { grid-template-columns: repeat(5,1fr); }
        .cta-inner  { flex-direction: row; align-items: center; justify-content: space-between; }
        .cta-btns   { flex-direction: row; }
        .footer-inner { flex-direction: row; align-items: center; justify-content: space-between; }

        @media (max-width: 900px) {
          .nav-links-desktop { display: none; }
          .nav-cta-desktop   { display: none; }
          .hamburger         { display: block; }
          .mobile-menu.open  { display: flex; flex-direction: column; gap: 0; position: fixed; top: 60px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #e5e7eb; z-index: 99; padding: 8px 0 16px; }
          .hero-h1    { font-size: 32px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .roles-grid { grid-template-columns: 1fr !important; }
          .feat-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .tech-grid  { grid-template-columns: repeat(3,1fr) !important; }
          .cta-inner  { flex-direction: column !important; gap: 24px !important; text-align: center; }
          .cta-btns   { flex-direction: column !important; width: 100%; }
          .cta-btns button { width: 100%; }
          .footer-inner { flex-direction: column !important; gap: 16px; text-align: center; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }

        @media (max-width: 540px) {
          .feat-grid  { grid-template-columns: 1fr !important; }
          .tech-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }

        .nav-link-mob {
          display: block; padding: 12px 24px; font-size: 15px; color: #374151;
          text-decoration: none; border-bottom: 1px solid #f3f4f6; cursor: pointer;
        }
        .nav-link-mob:hover { background: #f9fafb; }
        .btn-primary { transition: background 0.15s; }
        .btn-primary:hover { background: #1d4ed8 !important; }
        .btn-outline:hover { background: #f9fafb !important; }
        .feat-card:hover { border-color: #bfdbfe !important; box-shadow: 0 2px 16px rgba(37,99,235,0.07); }
        .sprint-row:hover { background: #f8fafc; }
        .tech-card:hover { background: #f0f6ff !important; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          boxShadow: scrolled ? "0 1px 10px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 48px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <button
            onClick={() => scrollTo("#hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                background: PRIMARY,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FlaskConical size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>
              LabManager
            </span>
          </button>

          <div className="nav-links-desktop">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 14,
                  color: "#444",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.target.style.color = PRIMARY)}
                onMouseLeave={(e) => (e.target.style.color = "#444")}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="nav-cta-desktop">
            <button
              className="btn-outline"
              style={{
                padding: "8px 18px",
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                background: "#fff",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Registracija
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate('/login')}
              style={{
                padding: "8px 18px",
                border: "none",
                borderRadius: 8,
                background: PRIMARY,
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Prijava
            </button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? (
              <X size={24} color="#111" />
            ) : (
              <Menu size={24} color="#111" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              className="nav-link-mob"
              onClick={() => {
                scrollTo(l.href);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                display: "block",
                padding: "12px 24px",
                fontSize: 15,
                color: "#374151",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              {l.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: 10, padding: "12px 24px" }}>
            <button
              className="btn-outline"
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                background: "#fff",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Registracija
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate('/login')}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: 8,
                background: PRIMARY,
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Prijava
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          paddingTop: 72,
          position: "relative",
          background: "#f8fafc",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.13,
          }}
        />
        <div
          className="section-pad"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "80px 48px 60px",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid #d1d5db",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 13,
              color: "#555",
              marginBottom: 28,
              background: "rgba(255,255,255,0.85)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: PRIMARY,
                flexShrink: 0,
              }}
            />
            Sistem za medicinsku laboratoriju
          </div>
          <h1
            className="hero-h1"
            style={{
              fontWeight: 800,
              lineHeight: 1.13,
              color: "#0f172a",
              marginBottom: 20,
            }}
          >
            Upravljanje <span style={{ color: PRIMARY }}>laboratorijskom</span>{" "}
            opremom bez komplikacija
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              maxWidth: 480,
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Rezervišite aparate, pratite zalihe, vodite servisne kartone i
            kontrolišite pristup – sve na jednom mjestu.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 52,
            }}
          >
            <button
              className="btn-primary"
              onClick={() => scrollTo("#o-nama")}
              style={{
                padding: "12px 28px",
                background: PRIMARY,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Počni koristiti <ChevronRight size={16} />
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollTo("#funkcionalnosti")}
              style={{
                padding: "12px 28px",
                background: "#fff",
                color: "#111",
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Saznaj više
            </button>
          </div>

          {/* Stats */}
          <div
            className="stats-grid"
            style={{
              display: "grid",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {STATS.map((s, i, arr) => (
              <div
                key={s.lbl}
                style={{
                  padding: "20px 12px",
                  textAlign: "center",
                  borderRight:
                    i < arr.length - 1 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div
                  style={{ fontSize: 26, fontWeight: 700, color: "#0f172a" }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    marginTop: 4,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O NAMA ── */}
      <section
        id="o-nama"
        className="section-pad"
        style={{ padding: "80px 48px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          className="about-grid"
          style={{ display: "grid", gap: 64, alignItems: "center" }}
        >
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <img
              src="/bili.webp"
              alt="Laboratorija"
              style={{
                width: "100%",
                height: 340,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: "inline-block",
                border: "1px solid #d1d5db",
                borderRadius: 99,
                padding: "4px 14px",
                fontSize: 13,
                color: "#555",
                marginBottom: 16,
              }}
            >
              Napravljeno za stvarne laboratorije
            </div>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Digitalni partner u{" "}
              <span style={{ color: PRIMARY }}>svakodnevnom radu</span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              LabManager je projekat EtfSa Studenata. Svaki
              ekran prati stvarne korake u laboratoriji — od prijema uzorka,
              preko korištenja opreme, do generisanja izvještaja.
            </p>
            {ABOUT_POINTS.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <CheckCircle2
                  size={18}
                  color={PRIMARY}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KORISNICI / ROLES ── */}
      <section
        id="korisnici"
        className="section-pad"
        style={{ padding: "0 48px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          style={{
            display: "inline-block",
            border: "1px solid #d1d5db",
            borderRadius: 99,
            padding: "4px 14px",
            fontSize: 13,
            color: "#555",
            marginBottom: 16,
          }}
        >
          Korisnički tipovi
        </div>
        <h2
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          Dvije glavne uloge, jasno razdvojena ovlaštenja
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#64748b",
            marginBottom: 40,
            maxWidth: 560,
          }}
        >
          Sistem razlikuje 5 stakeholdera od kojih je laborant i šefa laboratorije najvažniji za rad cijelog sistema. Svaka uloga vidi tačno
          one funkcije koje su joj potrebne.
        </p>
        <div className="roles-grid" style={{ display: "grid", gap: 24 }}>
          {/* Laborant */}
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={20} color={PRIMARY} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Laborant</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>
                  Korisnik — svakodnevni rad sa opremom
                </div>
              </div>
            </div>
            {LABORANT_ITEMS.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <CheckCircle2
                  size={15}
                  color={PRIMARY}
                  style={{ flexShrink: 0 }}
                />
                <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
          {/* Admin */}
          <div
            style={{
              border: `2px solid ${PRIMARY}`,
              borderRadius: 16,
              padding: 32,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} color={PRIMARY} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    Administrator
                  </div>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>
                    Šef laboratorije — upravljanje sistemom
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#EFF6FF",
                  color: PRIMARY,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: 99,
                }}
              >
                Povišena prava
              </div>
            </div>
            {ADMIN_ITEMS.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <CheckCircle2
                  size={15}
                  color={PRIMARY}
                  style={{ flexShrink: 0 }}
                />
                <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNKCIONALNOSTI ── */}
      <section
        id="funkcionalnosti"
        style={{ background: "#f8fafc", padding: "80px 0" }}
      >
        <div
          className="section-pad"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}
        >
          <div
            style={{
              display: "inline-block",
              border: "1px solid #d1d5db",
              borderRadius: 99,
              padding: "4px 14px",
              fontSize: 13,
              color: "#555",
              marginBottom: 16,
            }}
          >
            Funkcionalnosti
          </div>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 10,
            }}
          >
            Sve što laboratorija treba na jednom mjestu
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#64748b",
              marginBottom: 48,
              maxWidth: 480,
            }}
          >
            Modularne funkcije prilagođene svakodnevnom radu medicinskog osoblja
            — od rezervacija do izvještaja.
          </p>
          <div className="feat-grid" style={{ display: "grid", gap: 16 }}>
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="feat-card"
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 28,
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  <Icon size={20} color={PRIMARY} />
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RAZVOJ / SPRINTS ── */}
      <section
        id="razvoj"
        className="section-pad"
        style={{ padding: "80px 48px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          style={{
            display: "inline-block",
            border: "1px solid #d1d5db",
            borderRadius: 99,
            padding: "4px 14px",
            fontSize: 13,
            color: "#555",
            marginBottom: 16,
          }}
        >
          Razvoj
        </div>
        <h2
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          Sedam sprinteva, jedan sistem
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#64748b",
            marginBottom: 48,
            maxWidth: 520,
          }}
        >
          Razvoj je organizovan kroz iterativne sprinteve, svaki sa jasnim
          ciljem i isporučenim Product Backlog stavkama.
        </p>
        <div>
          {SPRINTS.map((s) => (
            <div
              key={s.num}
              className="sprint-row"
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                borderBottom: "1px solid #f1f5f9",
                padding: "18px 12px",
                borderRadius: 8,
                transition: "background 0.12s",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#cbd5e1",
                  minWidth: 28,
                  paddingTop: 2,
                  flexShrink: 0,
                }}
              >
                {s.num}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      flexShrink: 0,
                    }}
                  >
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#f1f5f9",
                          color: "#64748b",
                          fontSize: 12,
                          padding: "3px 8px",
                          borderRadius: 6,
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEHNOLOGIJE ── */}
      <section
        id="tehnologije"
        style={{ background: "#f8fafc", padding: "80px 0" }}
      >
        <div
          className="section-pad"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 48px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              border: "1px solid #d1d5db",
              borderRadius: 99,
              padding: "4px 14px",
              fontSize: 13,
              color: "#555",
              marginBottom: 20,
            }}
          >
            Tehnologije
          </div>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 48,
            }}
          >
            Moderni stack, provjerena rješenja
          </h2>
          <div
            className="tech-grid"
            style={{
              display: "grid",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {TECH.map(({ Icon, name, sub }, i, arr) => (
              <div
                key={name}
                className="tech-card"
                style={{
                  background: "#fff",
                  padding: "32px 16px",
                  textAlign: "center",
                  borderRight:
                    i < arr.length - 1 ? "1px solid #e5e7eb" : "none",
                  transition: "background 0.15s",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Icon size={28} color={PRIMARY} />
                </div>
                <div
                  style={{ fontSize: 14, color: "#374151", fontWeight: 600 }}
                >
                  {name}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 24 }}>
            Full-stack aplikacija deployovana na Vercel, baza podataka na
            Supabase.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="section-pad"
        style={{ padding: "60px 48px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          className="cta-inner"
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: "48px 40px",
            display: "flex",
            gap: 24,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Spreman za upotrebu u laboratoriji
            </h2>
            <p style={{ fontSize: 15, color: "#64748b" }}>
              Prijavite se i počnite upravljati opremom odmah.
            </p>
          </div>
          <div
            className="cta-btns"
            style={{ display: "flex", gap: 12, flexShrink: 0 }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate('/login')}
              style={{
                padding: "12px 28px",
                background: PRIMARY,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Prijava u sistem
            </button>
            <button
              className="btn-outline"
              style={{
                padding: "12px 28px",
                background: "#fff",
                color: "#111",
                border: "1px solid #d4d4d4",
                borderRadius: 8,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Registracija
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #f0f0f0", padding: "24px 48px" }}>
        <div
          className="footer-inner"
          style={{ display: "flex", maxWidth: 1100, margin: "0 auto", gap: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: PRIMARY,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FlaskConical size={14} color="#fff" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              LabManager — NRS Grupa 3
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="https://nrs-grupa3-95bq.vercel.app"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}
            >
              Frontend
            </a>
            <a
              href="https://nrs-grupa3.vercel.app"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}
            >
              Backend API
            </a>
            <a
              href="https://github.com/oalispahic/NRS-Grupa3"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 14,
                color: "#64748b",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              GitHub
            </a>
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>
            React + Node.js + PostgreSQL
          </div>
        </div>
      </footer>
    </div>
  );
}
