import { useState, useEffect } from "react";

const PRIMARY = "#185FA5";

const features = [
  {
    icon: "📅",
    bg: "#E6F1FB",
    title: "Sistem rezervacija",
    desc: "Laboranti kreiraju zahtjeve za željeni termin. Automatska detekcija konflikata sprečava dvostruke rezervacije.",
  },
  {
    icon: "🔬",
    bg: "#EAF3DE",
    title: "Evidencija opreme",
    desc: "Kompletan inventar svakog aparata s detaljima, statusom i lokacijom. Administrator upravlja opremom u realnom vremenu.",
  },
  {
    icon: "📦",
    bg: "#FAEEDA",
    title: "Zalihe repromaterijala",
    desc: "Praćenje potrošnog materijala s automatskim upozorenjima ispod minimalnog praga.",
  },
  {
    icon: "🔐",
    bg: "#FBEAF0",
    title: "Kontrola pristupa",
    desc: "JWT autentifikacija i role-based access control. Laborant i administrator imaju jasno odvojena ovlaštenja.",
  },
  {
    icon: "📋",
    bg: "#E1F5EE",
    title: "Dnevnik aktivnosti",
    desc: "Svaka kritična akcija u sistemu ostavlja digitalni trag. Administrator ima potpun uvid u historiju promjena.",
  },
  {
    icon: "📊",
    bg: "#F1EFE8",
    title: "Izvještaji i analitika",
    desc: "Statistike iskorištenosti opreme i export podataka u CSV format za eksternu analizu.",
  },
];

const reservations = [
  {
    user: "Dr. Hadžić A.",
    equipment: "Centrifuga Hettich EBA 200",
    termin: "24.04. · 09:00–11:00",
    status: "Odobreno",
    statusBg: "#EAF3DE",
    statusColor: "#3B6D11",
  },
  {
    user: "Tehn. Kovač M.",
    equipment: "Mikroskop Olympus CX23",
    termin: "24.04. · 13:00–15:30",
    status: "Na čekanju",
    statusBg: "#FAEEDA",
    statusColor: "#854F0B",
  },
  {
    user: "Dr. Begić S.",
    equipment: "Spektrofotometar UV-1900",
    termin: "25.04. · 10:00–12:00",
    status: "Odbijeno",
    statusBg: "#FCEBEB",
    statusColor: "#A32D2D",
  },
];

const laborantItems = [
  "Pregled dostupne opreme",
  "Kreiranje zahtjeva za rezervacijom",
  "Pregled vlastitih rezervacija",
  "Kalendar zauzeća opreme",
  "Otkazivanje i izmjena rezervacije",
  "Ocjenjivanje opreme nakon korištenja",
];

const adminItems = [
  "Dodavanje i brisanje opreme",
  "Odobravanje i odbijanje rezervacija",
  "Promjena statusa opreme",
  "Praćenje potrošnje repromaterijala",
  "Dnevnik aktivnosti (audit log)",
  "Generisanje izvještaja i export CSV",
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
        color: "#1a1a1a",
        background: "#fff",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 64px",
          borderBottom: "1px solid #e8e8e8",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: PRIMARY,
              borderRadius: 8,
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
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 3H15M12 3V7M8 7H16L17.5 17C17.5 18.1 16.6 19 15.5 19H8.5C7.4 19 6.5 18.1 6.5 17L8 7Z" />
              <circle cx="10.5" cy="13" r="1" fill="#fff" stroke="none" />
              <circle cx="13.5" cy="11.5" r="1" fill="#fff" stroke="none" />
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 600 }}>LabManager</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
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
                color: "#555",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              padding: "8px 20px",
              border: "1px solid #d0d0d0",
              borderRadius: 8,
              background: "transparent",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Registracija
          </button>
          <button
            style={{
              padding: "8px 20px",
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

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 32px 60px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2)",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(230,241,251,0.9)",
              border: "1px solid #B5D4F4",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 13,
              color: PRIMARY,
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: PRIMARY,
              }}
            />
            Sistem za medicinsku laboratoriju
          </div>
          <h1
            style={{
              fontSize: 46,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fff",
              maxWidth: 640,
              margin: "0 auto 20px",
            }}
          >
            Upravljanje{" "}
            <span style={{ color: "#60a5e8" }}>laboratorijskom</span> opremom
            bez komplikacija
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 500,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Rezervišite aparate, pratite zalihe, vodite servisne kartone i
            kontrolišite pristup – sve na jednom mjestu.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              style={{
                padding: "12px 32px",
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
                padding: "12px 32px",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: 8,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Saznaj više
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid #e8e8e8",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        {[
          { num: "27+", lbl: "Funkcionalnosti" },
          { num: "2", lbl: "Tipa korisnika" },
          { num: "100%", lbl: "Cloud-based" },
          { num: "REST", lbl: "API arhitektura" },
        ].map((s, i, arr) => (
          <div
            key={s.lbl}
            style={{
              flex: 1,
              maxWidth: 200,
              padding: "24px 16px",
              textAlign: "center",
              borderRight: i < arr.length - 1 ? "1px solid #e8e8e8" : "none",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: PRIMARY }}>
              {s.num}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginTop: 4,
              }}
            >
              {s.lbl}
            </div>
          </div>
        ))}
      </div>

      {/* BROWSER MOCKUP */}
      <div style={{ padding: "60px 64px", background: "#f7f8fa" }}>
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          }}
        >
          <div
            style={{
              background: "#f0f0f0",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#FC5F57",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#FEBC2E",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#27C840",
              }}
            />
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: 12,
                color: "#888",
                border: "1px solid #e0e0e0",
                margin: "0 8px",
              }}
            >
              nrs-grupa3-95bq.vercel.app/dashboard
            </div>
          </div>
          <div style={{ background: "#fff", padding: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Pregled</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
                  Sažetak aktivnosti laboratorije
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>Danas, 24.04.</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  border: "1px solid #e8e8e8",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#888" }}>
                    Ukupno opreme
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#E6F1FB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    🔬
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>
                  24
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 500,
                    background: "#EAF3DE",
                    color: "#3B6D11",
                    marginTop: 8,
                  }}
                >
                  18 dostupno
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #e8e8e8",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#888" }}>
                    Aktivne rezervacije
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#FAEEDA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    📅
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>
                  7
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 500,
                    background: "#FAEEDA",
                    color: "#854F0B",
                    marginTop: 8,
                  }}
                >
                  3 na čekanju
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #e8e8e8",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#888" }}>
                    Kritične zalihe
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#FCEBEB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    ⚠️
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>
                  2
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 500,
                    background: "#FCEBEB",
                    color: "#A32D2D",
                    marginTop: 8,
                  }}
                >
                  ispod minimuma
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  borderBottom: "1px solid #e8e8e8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  Nedavne rezervacije
                </span>
                <span
                  style={{ fontSize: 13, color: PRIMARY, cursor: "pointer" }}
                >
                  Sve rezervacije →
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1.5fr 1fr",
                  padding: "10px 16px",
                  background: "#f7f8fa",
                  borderBottom: "1px solid #e8e8e8",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                <span>Korisnik</span>
                <span>Oprema</span>
                <span>Termin</span>
                <span>Status</span>
              </div>
              {reservations.map((r) => (
                <div
                  key={r.user}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1.5fr 1fr",
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: 14,
                    alignItems: "center",
                  }}
                >
                  <span>{r.user}</span>
                  <span>{r.equipment}</span>
                  <span style={{ fontSize: 13, color: "#666" }}>
                    {r.termin}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 500,
                      background: r.statusBg,
                      color: r.statusColor,
                    }}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: "64px 64px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Sve što laboratorija treba
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: 15,
            marginBottom: 48,
          }}
        >
          Od rezervacija do izvještaja – sistem pokriva cijeli operativni tok
          laboratorije.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
            background: "#e8e8e8",
            border: "1px solid #e8e8e8",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{ background: "#fff", padding: "32px 28px" }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: f.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  fontSize: 18,
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section style={{ padding: "0 64px 64px" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>
          Dvije korisničke uloge
        </h2>
        <p style={{ color: "#666", fontSize: 15, marginBottom: 32 }}>
          Svaki korisnik vidi i može raditi samo ono za šta je ovlašten.
        </p>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          <div
            style={{
              border: "1px solid #e8e8e8",
              borderRadius: 12,
              padding: 28,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              👨‍🔬 Laborant
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {laborantItems.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 14,
                    color: "#444",
                    padding: "6px 0",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#3B6D11" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              border: `2px solid ${PRIMARY}`,
              borderRadius: 12,
              padding: 28,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -12,
                left: 24,
                background: PRIMARY,
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                padding: "3px 12px",
                borderRadius: 99,
              }}
            >
              Proširena ovlaštenja
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              🛡️ Administrator
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {adminItems.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 14,
                    color: "#444",
                    padding: "6px 0",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: PRIMARY }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div
        style={{
          background: PRIMARY,
          padding: "48px 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            Spreman za upotrebu u laboratoriji
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
            Prijavite se i počnite upravljati opremom odmah.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              padding: "12px 28px",
              background: "#fff",
              color: PRIMARY,
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
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 8,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            API dokumentacija
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          padding: "20px 64px",
          borderTop: "1px solid #e8e8e8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          LabManager — NRS Grupa 3
        </div>
        <div style={{ fontSize: 13, color: "#888" }}>
          React + Node.js + PostgreSQL · Supabase · Vercel
        </div>
      </footer>
    </div>
  );
}
