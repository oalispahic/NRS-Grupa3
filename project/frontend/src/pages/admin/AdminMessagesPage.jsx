import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Megaphone, User, CheckCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { C, PRIMARY, BTN } from '../../theme';

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

export default function AdminMessagesPage() {
  const { token, user } = useAuth();
  const [tab, setTab] = useState('conversations');
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  // Broadcast form
  const [bcTitle, setBcTitle] = useState('');
  const [bcBody, setBcBody] = useState('');
  const [bcSending, setBcSending] = useState(false);
  const [bcSuccess, setBcSuccess] = useState('');
  const [bcError, setBcError] = useState('');

  const bottomRef = useRef(null);

  function loadConversations() {
    fetch('/api/messages/conversations', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setConversations(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoadingConvs(false));
  }

  function loadConversation(userId) {
    setLoadingMsgs(true);
    fetch(`/api/messages/conversation/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        setMessages(d.messages || []);
        // Remove unread badge from conversation list
        setConversations(prev => prev.map(c => c.id === userId ? { ...c, unread_count: 0 } : c));
      })
      .catch(() => {})
      .finally(() => setLoadingMsgs(false));
  }

  useEffect(() => { loadConversations(); }, []);

  useEffect(() => {
    if (selectedUser) loadConversation(selectedUser.id);
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function selectUser(conv) {
    setSelectedUser(conv);
    setReplyBody('');
    setSendError('');
  }

  async function sendReply(e) {
    e.preventDefault();
    if (!replyBody.trim() || !selectedUser) return;
    setSending(true);
    setSendError('');
    try {
      const r = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ body: replyBody.trim(), recipient_user_id: selectedUser.id }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Greška');
      setReplyBody('');
      loadConversation(selectedUser.id);
      loadConversations();
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function sendBroadcast(e) {
    e.preventDefault();
    if (!bcTitle.trim() || !bcBody.trim()) return;
    setBcSending(true);
    setBcSuccess('');
    setBcError('');
    try {
      const r = await fetch('/api/messages/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: bcTitle.trim(), body: bcBody.trim() }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Greška');
      setBcTitle('');
      setBcBody('');
      setBcSuccess('Obavijest je uspješno poslana svim korisnicima.');
    } catch (err) {
      setBcError(err.message);
    } finally {
      setBcSending(false);
    }
  }

  const totalUnread = conversations.reduce((sum, c) => sum + (parseInt(c.unread_count) || 0), 0);

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageSquare size={20} color={PRIMARY} />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading, margin: 0 }}>Poruke korisnika</h1>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
            {totalUnread > 0 ? `${totalUnread} nepročitanih poruka` : 'Inbox administratora'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#f1f5f9', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {[
          { key: 'conversations', label: `Konverzacije${totalUnread ? ` (${totalUnread})` : ''}`, Icon: MessageSquare },
          { key: 'broadcast', label: 'Nova obavijest', Icon: Megaphone },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 18px',
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
              gap: 7,
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Conversations tab */}
      {tab === 'conversations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, height: 520 }}>
          {/* Left: user list */}
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.borderFaint}`, fontSize: 12, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Korisnici
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {loadingConvs ? (
                <div style={{ padding: 20, textAlign: 'center', color: C.muted, fontSize: 13 }}>Učitavanje...</div>
              ) : conversations.length === 0 ? (
                <div style={{ padding: '30px 16px', textAlign: 'center', color: C.muted, fontSize: 13 }}>
                  <MessageSquare size={28} color={C.border} style={{ marginBottom: 8 }} />
                  <div>Nema poruka</div>
                </div>
              ) : conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => selectUser(conv)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 14px',
                    border: 'none',
                    borderBottom: `1px solid ${C.borderFaint}`,
                    background: selectedUser?.id === conv.id ? '#eef2ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (selectedUser?.id !== conv.id) e.currentTarget.style.background = '#f8fafc'; }}
                  onMouseLeave={e => { if (selectedUser?.id !== conv.id) e.currentTarget.style.background = '#fff'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, fontWeight: 700, color: PRIMARY }}>
                      {conv.full_name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: parseInt(conv.unread_count) > 0 ? 700 : 500, color: C.heading, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>
                          {conv.full_name}
                        </div>
                        {parseInt(conv.unread_count) > 0 && (
                          <span style={{ background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', flexShrink: 0 }}>
                            {conv.unread_count}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: C.subtle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160, marginTop: 2 }}>
                        {conv.last_message || ''}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: conversation thread */}
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {!selectedUser ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.muted }}>
                <MessageSquare size={40} color={C.border} style={{ marginBottom: 12 }} />
                <div style={{ fontSize: 14 }}>Odaberi korisnika za pregled konverzacije</div>
              </div>
            ) : (
              <>
                {/* Thread header */}
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: PRIMARY }}>
                    {selectedUser.full_name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{selectedUser.full_name}</div>
                    <div style={{ fontSize: 11, color: C.subtle }}>{selectedUser.email}</div>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {loadingMsgs ? (
                    <div style={{ textAlign: 'center', color: C.muted, fontSize: 13 }}>Učitavanje...</div>
                  ) : messages.map(msg => {
                    const isAdmin = ['admin', 'test'].includes(msg.sender_role);
                    return (
                      <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isAdmin ? 'flex-end' : 'flex-start' }}>
                        {msg.equipment_name && (
                          <div style={{ fontSize: 11, color: PRIMARY, fontWeight: 600, marginBottom: 3, background: '#eef2ff', padding: '2px 10px', borderRadius: 99 }}>
                            Re: {msg.equipment_name}
                          </div>
                        )}
                        <div style={{
                          maxWidth: '75%',
                          background: isAdmin ? PRIMARY : '#f1f5f9',
                          color: isAdmin ? '#fff' : C.heading,
                          borderRadius: isAdmin ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          padding: '10px 14px',
                          fontSize: 13,
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}>
                          {msg.body}
                        </div>
                        <div style={{ fontSize: 11, color: C.subtle, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                          {isAdmin ? 'Ti (admin)' : msg.sender_name}
                          <span>·</span>
                          <span title={fmtFull(msg.created_at)}>{timeAgo(msg.created_at)}</span>
                          {isAdmin && msg.read_at && <CheckCheck size={11} color="#22c55e" />}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>

                {/* Reply form */}
                <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 14px', background: '#fafafa' }}>
                  {sendError && <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>{sendError}</div>}
                  <form onSubmit={sendReply} style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                    <textarea
                      value={replyBody}
                      onChange={e => setReplyBody(e.target.value)}
                      placeholder={`Odgovorite ${selectedUser.full_name}...`}
                      rows={2}
                      style={{ flex: 1, padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, resize: 'none', fontFamily: 'inherit', outline: 'none' }}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(e); } }}
                    />
                    <button
                      type="submit"
                      disabled={sending || !replyBody.trim()}
                      style={{ ...BTN.primary, padding: '10px 16px', opacity: sending || !replyBody.trim() ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}
                    >
                      <Send size={14} />
                      {sending ? '...' : 'Pošalji'}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Broadcast tab */}
      {tab === 'broadcast' && (
        <div style={{ maxWidth: 560 }}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Megaphone size={18} color="#d97706" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.heading }}>Nova obavijest</div>
                <div style={{ fontSize: 12, color: C.muted }}>Šalje se svim aktivnim korisnicima</div>
              </div>
            </div>

            {bcSuccess && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '12px 16px', color: '#166534', fontSize: 13, marginBottom: 20 }}>
                {bcSuccess}
              </div>
            )}
            {bcError && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#991b1b', fontSize: 13, marginBottom: 20 }}>
                {bcError}
              </div>
            )}

            <form onSubmit={sendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Naslov obavijesti</label>
                <input
                  type="text"
                  value={bcTitle}
                  onChange={e => setBcTitle(e.target.value)}
                  placeholder="npr. Planirano održavanje sistema u ponedjeljak"
                  maxLength={200}
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Tekst obavijesti</label>
                <textarea
                  value={bcBody}
                  onChange={e => setBcBody(e.target.value)}
                  placeholder="Detalji obavijesti..."
                  rows={5}
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, resize: 'vertical', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
              </div>
              <button
                type="submit"
                disabled={bcSending || !bcTitle.trim() || !bcBody.trim()}
                style={{ ...BTN.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: bcSending || !bcTitle.trim() || !bcBody.trim() ? 0.6 : 1 }}
              >
                <Megaphone size={15} />
                {bcSending ? 'Slanje...' : 'Pošalji obavijest svim korisnicima'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
