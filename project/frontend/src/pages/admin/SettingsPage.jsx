import { useEffect, useState } from 'react';
import { SlidersHorizontal, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { C, BTN } from '../../theme';

const SETTING_META = {
  max_reservation_days: {
    label: 'Maksimalno trajanje rezervacije',
    description: 'Korisnik ne može rezervisati opremu na duži period od ovog broja dana.',
    unit: 'dana',
  },
  max_advance_days: {
    label: 'Maksimalni broj dana unaprijed',
    description: 'Korisnik ne može kreirati rezervaciju koja počinje više od ovog broja dana u budućnosti.',
    unit: 'dana',
  },
  max_active_reservations: {
    label: 'Maksimalan broj aktivnih rezervacija po korisniku',
    description: 'Korisnik ne može imati više od ovog broja aktivnih (pending + approved) rezervacija istovremeno.',
    unit: 'rezervacija',
  },
};

export default function SettingsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const d = await fetch('/api/settings').then(r => r.json());
      const map = {};
      if (Array.isArray(d)) d.forEach(s => { map[s.key] = s.value; });
      setSettings(map);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          max_reservation_days: parseInt(settings.max_reservation_days),
          max_advance_days: parseInt(settings.max_advance_days),
          max_active_reservations: parseInt(settings.max_active_reservations),
        }),
      });
      if (res.ok) {
        toast.success('Pravila korištenja su sačuvana.');
        load();
      } else {
        toast.error('Greška pri snimanju pravila.');
      }
    } finally {
      setSaving(false);
    }
  }

  const FIELD = {
    width: 100, padding: '8px 12px', borderRadius: 8,
    border: `1px solid ${C.border}`, fontSize: 14, color: C.body,
    textAlign: 'right',
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Pravila korištenja</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Globalna ograničenja koja se primjenjuju na sve rezervacije u sistemu.</p>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: C.muted }}>Učitavanje...</div>
      ) : (
        <form onSubmit={handleSave}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <SlidersHorizontal size={16} color="#6366f1" />
              <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Ograničenja rezervacija</span>
            </div>
            <div style={{ padding: 24, display: 'grid', gap: 24 }}>
              {Object.entries(SETTING_META).map(([key, meta]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, marginBottom: 4 }}>{meta.label}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{meta.description}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={settings[key] || ''}
                      onChange={e => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
                      style={FIELD}
                      required
                    />
                    <span style={{ fontSize: 13, color: C.muted, whiteSpace: 'nowrap' }}>{meta.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} style={{ ...BTN.primary, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px' }}>
            <Save size={14} /> {saving ? 'Snimanje...' : 'Spremi pravila'}
          </button>
        </form>
      )}
    </div>
  );
}
