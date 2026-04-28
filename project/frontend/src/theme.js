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
  body { font-family: ${FONT}; color: ${C.body}; background: ${C.bg}; }
  button, input, select, textarea { font-family: inherit; }
  a { font-family: inherit; }

  .app-link { color: ${PRIMARY}; text-decoration: none; font-size: 14px; }
  .app-link:hover { text-decoration: underline; }

  .btn-primary { transition: background 0.15s; }
  .btn-primary:hover { background: #1d4ed8 !important; }
  .btn-outline:hover { background: #f9fafb !important; }
  .btn-danger:hover  { background: #b91c1c !important; }

  .card-hover:hover { border-color: #bfdbfe !important; box-shadow: 0 2px 16px rgba(37,99,235,0.07); }
  .row-hover:hover  { background: ${C.bgFaint}; }
  .nav-link-app:hover { color: ${PRIMARY} !important; }

  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
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
  available:      { bg: '#dcfce7', color: '#166534', label: 'Dostupna' },
  reserved:       { bg: '#fef9c3', color: '#854d0e', label: 'Rezervisana' },
  in_use:         { bg: '#dbeafe', color: '#1e40af', label: 'U upotrebi' },
  maintenance:    { bg: '#fee2e2', color: '#991b1b', label: 'Održavanje' },
  out_of_service: { bg: '#f1f5f9', color: '#475569', label: 'Van upotrebe' },
};

export const STATUS_RESERVATION = {
  pending:  { bg: '#fef9c3', color: '#854d0e', label: 'Na čekanju' },
  approved: { bg: '#dcfce7', color: '#166534', label: 'Odobrena' },
  rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Odbijena' },
};

