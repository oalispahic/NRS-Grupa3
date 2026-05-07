export const PRIMARY = '#2563EB';
export const FONT    = "'Inter','Segoe UI',sans-serif";

export const C = {
  heading:  '#0f172a',
  body:     '#374151',
  muted:    '#64748b',
  subtle:   '#94a3b8',
  border:   '#e5e7eb',
  borderFaint: '#f1f5f9',
  bg:       '#fff',
  bgFaint:  '#f8fafc',
  iconBg:   '#EFF6FF',
};

export const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  html, body, #root { min-height: 100%; }
  body { font-family: ${FONT}; color: ${C.body}; background: ${C.bg}; overflow-x: hidden; }
  button, input, select, textarea { font-family: inherit; min-width: 0; }
  button { touch-action: manipulation; }
  a { font-family: inherit; }
  img, svg { max-width: 100%; }
  input, select, textarea { transition: border-color 0.15s; }

  @keyframes labFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes labShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .skeleton {
    background: linear-gradient(90deg, ${C.borderFaint} 25%, #e8edf2 50%, ${C.borderFaint} 75%);
    background-size: 800px 100%;
    animation: labShimmer 1.4s infinite linear;
    border-radius: 6px;
  }

  .app-shell {
    padding-top: 60px;
    min-height: 100vh;
    background: ${C.bgFaint};
  }

  .app-container {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px;
    animation: labFadeIn 0.18s ease-out;
  }

  .app-link { color: ${PRIMARY}; text-decoration: none; font-size: 14px; }
  .app-link:hover { text-decoration: underline; }

  .btn-primary { transition: background 0.15s; }
  .btn-primary:hover { background: #1d4ed8 !important; }
  .btn-outline:hover { background: #f9fafb !important; }
  .btn-danger:hover  { background: #b91c1c !important; }

  .card-hover:hover { border-color: #bfdbfe !important; box-shadow: 0 2px 16px rgba(37,99,235,0.07); }
  .row-hover:hover  { background: ${C.bgFaint}; }
  .nav-link-app:hover { color: ${PRIMARY} !important; }

  .auth-nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 60px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 18px;
  }

  .auth-nav-links,
  .auth-nav-user {
    display: flex;
    align-items: center;
  }

  .auth-nav-links { gap: 2px; }
  .auth-nav-user { gap: 12px; }

  .auth-nav-menu-button,
  .auth-nav-mobile {
    display: none;
  }

  .equipment-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .detail-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 32px;
    align-items: start;
  }

  .detail-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .reservation-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }

  .action-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .responsive-table-card-list {
    display: none;
  }

  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
    .app-container { padding: 28px 20px; }

    .auth-nav-inner { padding: 0 20px; }
    .auth-nav-links,
    .auth-nav-user {
      display: none !important;
    }
    .auth-nav-menu-button {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
    }
    .auth-nav-mobile.open {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      z-index: 99;
      background: #fff;
      border-bottom: 1px solid ${C.border};
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
      padding: 10px 16px 16px;
      gap: 8px;
    }

    .detail-layout {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  @media (max-width: 760px) {
    .table-desktop { display: none !important; }
    .responsive-table-card-list {
      display: grid;
      gap: 12px;
      padding: 12px;
    }
  }

  @media (max-width: 640px) {
    .app-shell { padding-top: 56px; }
    .app-container { padding: 24px 16px; }
    .auth-nav-inner { height: 56px; padding: 0 16px; }
    .auth-nav-mobile.open { top: 56px; }
    .equipment-card-grid { grid-template-columns: minmax(0, 1fr); }
    .detail-header { align-items: flex-start; }
    .reservation-form-grid { grid-template-columns: 1fr; }
    .action-row,
    .action-row > button,
    .action-row > a {
      width: 100%;
    }
    .action-row > button,
    .action-row > a {
      justify-content: center;
    }
  }
`;

export function pill(text) {
  return {
    display: 'inline-block',
    border: `1px solid ${C.border}`,
    borderRadius: 99,
    padding: '4px 14px',
    fontSize: 13,
    color: C.muted,
    marginBottom: 16,
  };
}

export function iconBox(size = 40, radius = 10) {
  return {
    width: size,
    height: size,
    borderRadius: radius,
    background: C.iconBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };
}

export const BTN = {
  primary: {
    padding: '10px 22px',
    background: PRIMARY,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  outline: {
    padding: '10px 22px',
    background: '#fff',
    color: C.heading,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    fontSize: 14,
    cursor: 'pointer',
  },
  danger: {
    padding: '8px 16px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  ghost: {
    padding: '8px 16px',
    background: C.bgFaint,
    color: C.body,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    fontSize: 13,
    cursor: 'pointer',
  },
};

export const STATUS_EQUIPMENT = {
  available:      { bg: '#dcfce7', color: '#166534', label: 'Nema rezervacija' },
  reserved:       { bg: '#fef9c3', color: '#854d0e', label: 'Postoje rezervacije (trazi termin)' },
 // in_use:         { bg: '#dbeafe', color: '#1e40af', label: 'U upotrebi' },
  maintenance:    { bg: '#fee2e2', color: '#991b1b', label: 'Održavanje' },
  out_of_service: { bg: '#f1f5f9', color: '#475569', label: 'Van upotrebe' },
};

export const STATUS_RESERVATION = {
  pending:  { bg: '#fef9c3', color: '#854d0e', label: 'Na čekanju' },
  approved: { bg: '#dcfce7', color: '#166534', label: 'Odobrena' },
  rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Odbijena' },
};

