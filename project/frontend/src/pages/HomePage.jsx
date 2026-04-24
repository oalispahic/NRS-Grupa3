import { useState, useEffect } from "react";

const PRIMARY = "#2563EB";
const PRIMARY_LIGHT = "#EFF6FF";

const laborantItems = [
  "Pregled opreme i specifikacija",
  "Kreiranje rezervacija",
  "Moje rezervacije i historija",
  "Kalendar zauzeća",
  "Otkazivanje i izmjena rezervacije",
  "Ocjenjivanje opreme nakon korištenja",
];

const adminItems = [
  "Upravljanje opremom (dodavanje / brisanje)",
  "Odobravanje i odbijanje rezervacija",
  "Promjena statusa opreme",
  "Praćenje repromaterijala i zaliha",
  "Dnevnik aktivnosti i audit log",
  "Generisanje izvještaja",
  "Export podataka u CSV",
];

const features = [
  {
    icon: "📅",
    title: "Sistem rezervacija",
    desc: "Laboranti kreiraju zahtjeve za željeni termin. Automatska detekcija konflikata (PB26) sprečava dvostruke rezervacije.",
  },
  {
    icon: "🔬",
    title: "Evidencija opreme",
    desc: "Kompletan inventar svakog aparata s detaljima, statusom i lokacijom. Administrator upravlja opremom u realnom vremenu.",
  },
  {
    icon: "📦",
    title: "Zalihe repromaterijala",
    desc: "Praćenje potrošnog materijala s automatskim upozorenjima ispod minimalnog praga. Proaktivno upravljanje umjesto reaktivnog.",
  },
  {
    icon: "🔐",
    title: "Kontrola pristupa",
    desc: "JWT autentifikacija i role-based access control. Laborant i administrator imaju jasno odvojena ovlaštenja i vidljive funkcije.",
  },
  {
    icon: "📋",
    title: "Dnevnik aktivnosti",
    desc: "Svaka kritična akcija u sistemu ostavlja digitalni trag. Administrator ima potpun uvid u historiju promjena i ko je šta uradio.",
  },
  {
    icon: "📊",
    title: "Izvještaji i analitika",
    desc: "Statistike iskorištenosti opreme, servisni kartoni i export podataka u CSV format za eksternu analizu.",
  },
];

const sprints = [
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

const techStack = [
  { icon: "⚛️", name: "React" },
  { icon: "🟩", name: "Node.js + Express" },
  { icon: "🐘", name: "PostgreSQL" },
  { icon: "🔑", name: "JWT" },
  { icon: "🌿", name: "Git" },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: "#111",
        background: "#fff",
        margin: 0,
        padding: 0,
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 48px",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: PRIMARY,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 3H15M12 3V7M8 7H16L17.5 17C17.5 18.1 16.6 19 15.5 19H8.5C7.4 19 6.5 18.1 6.5 17L8 7Z" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>LabManager</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {[
            "O nama",
            "Korisnici",
            "Funkcionalnosti",
            "Razvoj",
            "Tehnologije",
          ].map((l) => (
            <a
              key={l}
              style={{
                fontSize: 14,
                color: "#444",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            style={{
              padding: "8px 18px",
              border: "1px solid #d4d4d4",
              borderRadius: 8,
              background: "#fff",
              fontSize: 14,
              cursor: "pointer",
              color: "#111",
            }}
          >
            Registracija
          </button>
          <button
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
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#f8fafc",
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
            opacity: 0.18,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "80px 32px 60px",
            maxWidth: 720,
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
              padding: "4px 14px",
              fontSize: 13,
              color: "#555",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: PRIMARY,
              }}
            />
            Sistem za medicinsku laboratoriju
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.13,
              color: "#0f172a",
              margin: "0 auto 20px",
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
              marginBottom: 52,
            }}
          >
            <button
              style={{
                padding: "12px 28px",
                background: PRIMARY,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Počni koristiti
            </button>
            <button
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
          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {[
              { num: "27+", lbl: "FUNKCIONALNOSTI" },
              { num: "2", lbl: "TIPA KORISNIKA" },
              { num: "100%", lbl: "CLOUD-BASED" },
              { num: "REST", lbl: "API ARHITEKTURA" },
            ].map((s, i, arr) => (
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
                  }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / DIGITAL PARTNER ── */}
      <section
        style={{
          padding: "80px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ borderRadius: 12, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=800&q=80"
            alt="Laboratorija"
            style={{
              width: "100%",
              height: 280,
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
              marginBottom: 20,
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
            LabManager je projektovan zajedno sa medicinskim osobljem. Svaki
            ekran prati stvarne korake u laboratoriji — od prijema uzorka, preko
            korištenja opreme, do generisanja izvještaja.
          </p>
          {[
            "Brza evidencija svakog uređaja u realnom vremenu",
            "Manje papirologije, više vremena za pacijente",
            "Transparentnost rada cijelog tima u jednom prikazu",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 16 }}>
                ✓
              </span>
              <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLES ── */}
      <section
        style={{ padding: "0 80px 80px", maxWidth: 1100, margin: "0 auto" }}
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
            fontSize: 36,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          Dvije uloge, jasno razdvojena ovlaštenja
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#64748b",
            marginBottom: 40,
            maxWidth: 560,
          }}
        >
          Sistem razlikuje laboranta i šefa laboratorije. Svaka uloga vidi tačno
          one funkcije koje su joj potrebne.
        </p>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {/* Laborant card */}
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
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={PRIMARY}
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Laborant</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>
                  Korisnik — svakodnevni rad sa opremom
                </div>
              </div>
            </div>
            {laborantItems.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <span style={{ color: PRIMARY, fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
          {/* Admin card */}
          <div
            style={{
              border: `1.5px solid ${PRIMARY}`,
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
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={PRIMARY}
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
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
                  background: PRIMARY_LIGHT,
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
            {adminItems.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <span style={{ color: PRIMARY, fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        style={{
          background: "#f8fafc",
          padding: "80px 80px",
          maxWidth: "100%",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
              fontSize: 36,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 10,
              maxWidth: 480,
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 28,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 14 }}>{f.icon}</div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPRINTS TIMELINE ── */}
      <section
        style={{ padding: "80px 80px", maxWidth: 1100, margin: "0 auto" }}
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
            fontSize: 36,
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
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {sprints.map((s) => (
            <div
              key={s.num}
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                borderBottom: "1px solid #f1f5f9",
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#94a3b8",
                  minWidth: 24,
                  paddingTop: 2,
                }}
              >
                {s.num}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                  <div style={{ display: "flex", gap: 6 }}>
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

      {/* ── TECH STACK ── */}
      <section style={{ background: "#f8fafc", padding: "80px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
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
              fontSize: 36,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 48,
            }}
          >
            Moderni stack, provjerena rješenja
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gap: 0,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {techStack.map((t, i, arr) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  padding: "32px 16px",
                  textAlign: "center",
                  borderRight:
                    i < arr.length - 1 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{t.icon}</div>
                <div
                  style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}
                >
                  {t.name}
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
        style={{ padding: "60px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: "48px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 28,
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
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
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
      <footer
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "24px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
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
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 3H15M12 3V7M8 7H16L17.5 17C17.5 18.1 16.6 19 15.5 19H8.5C7.4 19 6.5 18.1 6.5 17L8 7Z" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            LabManager — NRS Grupa 3
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Frontend", "Backend API", "GitHub"].map((l) => (
            <a
              key={l}
              style={{
                fontSize: 14,
                color: "#64748b",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8" }}>
          React + Node.js + PostgreSQL
        </div>
      </footer>
    </div>
  );
}
