import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Megaphone, CheckCheck, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { C, PRIMARY, BTN } from '../theme';

function timeAgo(iso) {
  if (!iso) return '';
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60) return 'upravo';
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h`;
  return new Date(iso).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit' });
}

function fmtFull(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MessagesPage() {
  const { token, user } = useAuth();
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(true);
  const [loadingBc, setLoadingBc] = useState(true);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  // equipment inquiry pre-fill (passed via sessionStorage)
  const [equipCtx, setEquipCtx] = useState(null);

  useEffect(() => {
    const ctx = sessionStorage.getItem('msgEquipCtx');
    if (ctx) {
      const parsed = JSON.parse(ctx);
      setEquipCtx(parsed);
      setBody(`Pitanje o opremi "${parsed.name}":\n\n`);
      sessionStorage.removeItem('msgEquipCtx');
    }
  }, []);

  function loadMessages() {
    fetch('/api/messages/inbox', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setMessages(d.messages || []))
      .catch(() => {})
      .finally(() => setLoadingMsgs(false));
  }

  function loadBroadcasts() {
    fetch('/api/messages/broadcasts', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setBroadcasts(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoadingBc(false));
  }

  useEffect(() => {
    loadMessages();
    loadBroadcasts();
  }, []);

  useEffect(() => {
    if (tab === 'chat') bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, tab]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    setError('');
    try {
      const payload = { body: body.trim() };
      if (equipCtx) payload.equipment_id = equipCtx.id;
      const r = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Greška');
      setBody('');
      setEquipCtx(null);
      loadMessages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function markBroadcastRead(id) {
    await fetch(`/api/messages/broadcasts/${id}/read`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    setBroadcasts(prev => prev.map(b => b.id === id ? { ...b, is_read: true } : b));
  }

  const unreadBc = broadcasts.filter(b => !b.is_read).length;

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageSquare size={20} color={PRIMARY} />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading, margin: 0 }}>Poruke</h1>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Komunikacija s administratorima</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
        {[
          { key: 'chat', label: 'Chat s adminima', Icon: MessageSquare },
          { key: 'broadcasts', label: `Obavijesti${unreadBc ? ` (${unreadBc})` : ''}`, Icon: Megaphone },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              padding: '8px 14px',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: tab === key ? 700 : 500,
              background: tab === key ? '#fff' : 'transparent',
              color: tab === key ? C.heading : C.muted,
              boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              transition: 'all 0.15s',
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Chat tab */}
      {tab === 'chat' && (
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
          {/* Messages area */}
          <div style={{ minHeight: 340, maxHeight: 440, overflowY: 'auto', padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loadingMsgs ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: 13 }}>
                Učitavanje...
              </div>
            ) : messages.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', color: C.muted }}>
                <MessageSquare size={36} color={C.border} style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 14 }}>Nema poruka. Pošaljite pitanje adminima.</div>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.sender_id === user?.id;
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    {msg.equipment_name && (
                      <div style={{ fontSize: 11, color: PRIMARY, fontWeight: 600, marginBottom: 3, background: '#eef2ff', padding: '2px 10px', borderRadius: 99 }}>
                        Re: {msg.equipment_name}
                      </div>
                    )}
                    <div style={{
                      maxWidth: '75%',
                      background: isMe ? PRIMARY : '#f1f5f9',
                      color: isMe ? '#fff' : C.heading,
                      borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      padding: '10px 14px',
                      fontSize: 13,
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      {msg.body}
                    </div>
                    <div style={{ fontSize: 11, color: C.subtle, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {isMe ? 'Ti' : msg.sender_name}
                      <span>·</span>
                      <span title={fmtFull(msg.created_at)}>{timeAgo(msg.created_at)}</span>
                      {isMe && msg.read_at && <CheckCheck size={11} color="#22c55e" />}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* Compose */}
          <div style={{ borderTop: `1px solid ${C.border}`, padding: '14px 16px', background: '#fafafa' }}>
            {equipCtx && (
              <div style={{ fontSize: 12, color: PRIMARY, background: '#eef2ff', padding: '6px 12px', borderRadius: 8, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Pitanje o: <strong>{equipCtx.name}</strong></span>
                <button onClick={() => setEquipCtx(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 12 }}>✕</button>
              </div>
            )}
            {error && <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>{error}</div>}
            <form onSubmit={sendMessage} style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Napišite poruku administratoru..."
                rows={2}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  fontSize: 13,
                  resize: 'none',
                  fontFamily: 'inherit',
                  outline: 'none',
                  lineHeight: 1.5,
                }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(e); } }}
              />
              <button
                type="submit"
                disabled={sending || !body.trim()}
                style={{
                  ...BTN.primary,
                  padding: '10px 16px',
                  opacity: sending || !body.trim() ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
                {sending ? '...' : 'Pošalji'}
              </button>
            </form>
            <div style={{ fontSize: 11, color: C.subtle, marginTop: 6 }}>Enter = pošalji · Shift+Enter = novi red</div>
          </div>
        </div>
      )}

      {/* Broadcasts tab */}
      {tab === 'broadcasts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loadingBc ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: C.muted }}>Učitavanje...</div>
          ) : broadcasts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted }}>
              <Megaphone size={36} color={C.border} style={{ marginBottom: 10 }} />
              <div style={{ fontSize: 14 }}>Nema obavijesti</div>
            </div>
          ) : broadcasts.map(bc => (
            <div
              key={bc.id}
              style={{
                background: bc.is_read ? '#fff' : '#fffbeb',
                border: `1px solid ${bc.is_read ? C.border : '#fde68a'}`,
                borderRadius: 12,
                padding: '16px 20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    {!bc.is_read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />}
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.heading }}>{bc.title}</div>
                  </div>
                  <div style={{ fontSize: 13, color: C.body, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{bc.body}</div>
                  <div style={{ fontSize: 11, color: C.subtle, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={11} />
                    <span title={fmtFull(bc.created_at)}>{bc.sender_name} · {timeAgo(bc.created_at)}</span>
                  </div>
                </div>
                {!bc.is_read && (
                  <button
                    onClick={() => markBroadcastRead(bc.id)}
                    style={{ ...BTN.outline, fontSize: 12, padding: '5px 12px', flexShrink: 0 }}
                  >
                    Pročitano
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
