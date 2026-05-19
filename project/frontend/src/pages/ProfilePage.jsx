import { useEffect, useState } from 'react';
import { User, KeyRound, Save, ShieldCheck, BookOpen, Building2, Phone, GraduationCap, Layers, AlignLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, BTN, FONT } from '../theme';

const ROLE_LABELS   = { admin: 'Administrator', laborant: 'Laborant', test: 'Test' };
const ROLE_COLORS   = { admin: '#ef4444', laborant: PRIMARY, test: '#8b5cf6' };
const GRADIENT_BY_ROLE = {
  admin:    'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  laborant: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  test:     'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
};

const COMPLETION_FIELDS = ['full_name', 'bio', 'institution', 'department', 'phone', 'degree'];

function completionPct(profile) {
  if (!profile) return 0;
  const filled = COMPLETION_FIELDS.filter(f => profile[f]?.trim()).length;
  return Math.round((filled / COMPLETION_FIELDS.length) * 100);
}

function FieldInput({ icon: Icon, label, value, onChange, placeholder, color = PRIMARY, type = 'text', multiline = false }) {
  const [focused, setFocused] = useState(false);
  const style = {
    width: '100%',
    padding: multiline ? '9px 12px 9px 38px' : '9px 12px 9px 38px',
    border: `1px solid ${focused ? color : C.border}`,
    borderRadius: 8,
    fontSize: 13,
    color: C.heading,
    outline: 'none',
    fontFamily: FONT,
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? 80 : undefined,
    background: '#fff',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 5 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon size={14} color={focused ? color : C.subtle} style={{ position: 'absolute', left: 12, top: multiline ? 11 : '50%', transform: multiline ? undefined : 'translateY(-50%)', pointerEvents: 'none', transition: 'color 0.15s' }} />
        {multiline ? (
          <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            style={style} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            style={style} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { token } = useAuth();
  const toast     = useToast();

  const [profile,    setProfile]    = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingPw,   setSavingPw]   = useState(false);

  const [fullName,    setFullName]    = useState('');
  const [bio,         setBio]         = useState('');
  const [institution, setInstitution] = useState('');
  const [department,  setDepartment]  = useState('');
  const [phone,       setPhone]       = useState('');
  const [degree,      setDegree]      = useState('');

  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  useEffect(() => {
    fetch('/api/users/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        setProfile(d);
        setFullName(d.full_name || '');
        setBio(d.bio || '');
        setInstitution(d.institution || '');
        setDepartment(d.department || '');
        setPhone(d.phone || '');
        setDegree(d.degree || '');
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSaveInfo(e) {
    e.preventDefault();
    setSavingInfo(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT', headers: authH(),
        body: JSON.stringify({ fullName: fullName.trim() || undefined, bio, institution, department, phone, degree }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška');
      setProfile(data);
      toast.success('Profil je uspješno ažuriran.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingInfo(false);
    }
  }

  async function handleSavePassword(e) {
    e.preventDefault();
    if (!currentPw || !newPw) return;
    if (newPw !== confirmPw) { toast.error('Nove lozinke se ne podudaraju.'); return; }
    if (newPw.length < 6)    { toast.error('Nova lozinka mora imati najmanje 6 znakova.'); return; }
    setSavingPw(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT', headers: authH(),
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      toast.success('Lozinka je uspješno promijenjena.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingPw(false);
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
        {[160, 320, 280].map((h, i) => (
          <div key={i} className="skeleton" style={{ height: h, borderRadius: 12 }} />
        ))}
      </div>
    );
  }

  const initial   = profile?.full_name?.[0]?.toUpperCase() || '?';
  const roleLabel = ROLE_LABELS[profile?.role] || profile?.role;
  const roleColor = ROLE_COLORS[profile?.role] || PRIMARY;
  const gradient  = GRADIENT_BY_ROLE[profile?.role] || GRADIENT_BY_ROLE.laborant;
  const pct       = completionPct({ ...profile, full_name: fullName, bio, institution, department, phone, degree });
  const pctColor  = pct < 40 ? '#ef4444' : pct < 70 ? '#f59e0b' : '#10b981';

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Korisnički račun
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Moj profil</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Uredite lične podatke i sigurnosne postavke.</p>
      </div>

      {/* Avatar + info */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: '24px', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, flexShrink: 0,
          background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontWeight: 700, color: '#fff',
          boxShadow: `0 6px 18px ${roleColor}44`,
        }}>
          {initial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.heading, marginBottom: 2 }}>{profile?.full_name}</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>{profile?.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: roleColor + '15', color: roleColor, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99 }}>
              <ShieldCheck size={12} /> {roleLabel}
            </span>
            {profile?.institution && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: C.bgFaint, color: C.muted, fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 99 }}>
                <Building2 size={11} /> {profile.institution}
              </span>
            )}
            {profile?.degree && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fdf4ff', color: '#a21caf', fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 99 }}>
                <GraduationCap size={11} /> {profile.degree}
              </span>
            )}
          </div>
          {profile?.bio && (
            <p style={{ marginTop: 10, fontSize: 13, color: C.muted, lineHeight: 1.6, borderLeft: `3px solid ${PRIMARY}33`, paddingLeft: 10 }}>{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Profile completion */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.heading }}>Kompletnost profila</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: pctColor }}>{pct}%</span>
        </div>
        <div style={{ height: 7, background: C.bgFaint, borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: pctColor, borderRadius: 99, transition: 'width 0.4s ease, background 0.3s' }} />
        </div>
        {pct < 100 && (
          <p style={{ marginTop: 7, fontSize: 11, color: C.subtle }}>
            Popunite sve podatke ispod kako biste kompletirali profil.
          </p>
        )}
      </div>

      {/* Personal info form */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <User size={15} color={PRIMARY} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>Lični podaci</span>
        </div>
        <form onSubmit={handleSaveInfo} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 5 }}>Email adresa</label>
            <input type="text" value={profile?.email || ''} disabled
              style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.subtle, background: C.bgFaint, fontFamily: FONT, boxSizing: 'border-box' }} />
          </div>
          <FieldInput icon={User}         label="Ime i prezime"       value={fullName}    onChange={setFullName}    placeholder="Ime i prezime"               color={PRIMARY}    />
          <FieldInput icon={AlignLeft}    label="Kratka biografija"   value={bio}         onChange={setBio}         placeholder="Napišite nešto o sebi..."     color="#8b5cf6"    multiline />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FieldInput icon={Building2}   label="Institucija / Firma" value={institution} onChange={setInstitution} placeholder="npr. Univerzitet u Sarajevu"  color={PRIMARY}    />
            <FieldInput icon={Layers}      label="Odsjek / Odjeljenje" value={department}  onChange={setDepartment}  placeholder="npr. Prirodno-matematički"    color="#0891b2"    />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FieldInput icon={Phone}       label="Broj telefona"       value={phone}       onChange={setPhone}       placeholder="+387 61 000 000"              color="#059669"    />
            <FieldInput icon={GraduationCap} label="Stepen obrazovanja" value={degree}    onChange={setDegree}      placeholder="npr. Bachelor, Master, PhD"   color="#a21caf"    />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={savingInfo} className="btn-primary"
              style={{ ...BTN.primary, padding: '9px 22px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, opacity: savingInfo ? 0.7 : 1 }}>
              <Save size={13} /> {savingInfo ? 'Spremanje...' : 'Spremi profil'}
            </button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <KeyRound size={15} color={PRIMARY} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>Promjena lozinke</span>
        </div>
        <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Trenutna lozinka',    value: currentPw, set: setCurrentPw, placeholder: 'Unesite trenutnu lozinku' },
            { label: 'Nova lozinka',        value: newPw,     set: setNewPw,     placeholder: 'Minimalno 6 znakova' },
            { label: 'Potvrda nove lozinke',value: confirmPw, set: setConfirmPw, placeholder: 'Ponovite novu lozinku' },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 5 }}>{label}</label>
              <input type="password" value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.heading, outline: 'none', fontFamily: FONT, boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = PRIMARY}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={savingPw || !currentPw || !newPw || !confirmPw} className="btn-primary"
              style={{ ...BTN.primary, padding: '9px 22px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, opacity: (savingPw || !currentPw || !newPw || !confirmPw) ? 0.7 : 1 }}>
              <KeyRound size={13} /> {savingPw ? 'Mijenjanje...' : 'Promijeni lozinku'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
