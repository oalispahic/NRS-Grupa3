import React, { useState } from 'react';
import { Calendar, Clock, Users, Check, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRIMARY = "#2563EB";

export default function Rezervacije() {
  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif", 
      background: "#f8fafc", 
      minHeight: "100vh", 
      color: "#1e293b" 
    }}>
      {/* --- NAVIGACIJA --- */}
      <nav style={{ 
        background: "#fff", 
        padding: "16px 40px", 
        borderBottom: "1px solid #e2e8f0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        sticky: "top"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/" style={{ color: "#64748b", display: "flex", alignItems: "center" }}>
            <ArrowLeft size={20} />
          </Link>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>LabManager Rezervacije</h2>
        </div>
        <div style={{ background: "#eff6ff", color: PRIMARY, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>
          Admin Panel
        </div>
      </nav>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          
          {/* --- FORMA --- */}
          <div style={{ flex: "1", minWidth: "300px", background: "#fff", padding: "30px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
              <Calendar color={PRIMARY} size={22} />
              <h3 style={{ margin: 0, fontSize: "18px" }}>Nova Rezervacija</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "5px" }}>Datum</label>
                <input type="date" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "5px" }}>Vrijeme</label>
                <input type="time" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "5px" }}>Broj osoba</label>
                <input type="number" placeholder="Npr. 4" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none" }} />
              </div>
              <button style={{ 
                background: PRIMARY, 
                color: "#fff", 
                border: "none", 
                padding: "12px", 
                borderRadius: "8px", 
                fontWeight: 600, 
                cursor: "pointer",
                marginTop: "10px"
              }}>Pošalji zahtjev</button>
            </div>
          </div>

          {/* --- TABELA --- */}
          <div style={{ flex: "2", minWidth: "400px", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ margin: 0, fontSize: "18px" }}>Pregled upita</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "15px", fontSize: "12px", color: "#64748b" }}>GOST</th>
                  <th style={{ textAlign: "left", padding: "15px", fontSize: "12px", color: "#64748b" }}>TERMIN</th>
                  <th style={{ textAlign: "center", padding: "15px", fontSize: "12px", color: "#64748b" }}>OSOBE</th>
                  <th style={{ textAlign: "right", padding: "15px", fontSize: "12px", color: "#64748b" }}>AKCIJE</th>
                </tr>
              </thead>
              <tbody>
                {/* Red 1 */}
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "15px" }}>
                    <div style={{ fontWeight: 600 }}>Amel Amelić</div>
                    <span style={{ fontSize: "11px", color: "#f59e0b" }}>Na čekanju</span>
                  </td>
                  <td style={{ padding: "15px", fontSize: "14px" }}>15.05. u 20:00h</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>3</td>
                  <td style={{ padding: "15px", textAlign: "right" }}>
                    <button style={{ border: "none", background: "#ecfdf5", color: "#10b981", padding: "6px", borderRadius: "6px", marginRight: "5px" }}><Check size={16}/></button>
                    <button style={{ border: "none", background: "#fff1f2", color: "#f43f5e", padding: "6px", borderRadius: "6px" }}><X size={16}/></button>
                  </td>
                </tr>
                {/* Red 2 */}
                <tr>
                  <td style={{ padding: "15px" }}>
                    <div style={{ fontWeight: 600 }}>Sara Sarić</div>
                    <span style={{ fontSize: "11px", color: "#10b981" }}>Odobreno</span>
                  </td>
                  <td style={{ padding: "15px", fontSize: "14px" }}>16.05. u 18:30h</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>2</td>
                  <td style={{ padding: "15px", textAlign: "right" }}>
                    <button style={{ border: "none", background: "#f1f5f9", color: "#94a3b8", padding: "6px", borderRadius: "6px" }}><X size={16}/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}