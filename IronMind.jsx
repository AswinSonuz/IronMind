import { useState, useEffect, useRef } from "react";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    ai: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    chat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    supplement: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 20H4a2 2 0 01-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H20a2 2 0 012 2v3"/><circle cx="17" cy="17" r="5"/><path d="M17 14v3h3"/></svg>,
    profile: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    fire: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M12 2C8.5 5.5 7 8 7 11c0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.5-.5-3-1.5-4.5C14.5 8 14 9.5 14 11c0 1.1-.9 2-2 2s-2-.9-2-2c0-2 1.5-4 2-7z"/></svg>,
    dumbbell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6 7.5V6a1 1 0 011-1h1a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1v-1.5"/><path d="M18 7.5V6a1 1 0 00-1-1h-1a1 1 0 00-1 1v12a1 1 0 001 1h1a1 1 0 001-1v-1.5"/><line x1="3" y1="8.5" x2="6" y2="8.5"/><line x1="3" y1="15.5" x2="6" y2="15.5"/><line x1="18" y1="8.5" x2="21" y2="8.5"/><line x1="18" y1="15.5" x2="21" y2="15.5"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    weight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 00-1.905 1.46L2.1 18.5A2 2 0 004 21h16a2 2 0 001.9-2.54L19.4 9.46A2 2 0 0017.5 8z"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,21 12,21 16,21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H17l-1 7a5 5 0 01-8 0L7 4z"/><path d="M5 4H3v3a4 4 0 004 4"/><path d="M19 4h2v3a4 4 0 01-4 4"/></svg>,
    apple: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 015 5v1a5 5 0 01-10 0V7a5 5 0 015-5z"/><path d="M7 8c-2.5.5-4 3-4 6 0 4 2.5 8 5 8 1 0 2-.5 4-.5s3 .5 4 .5c2.5 0 5-4 5-8 0-3-1.5-5.5-4-6"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>,
    camera: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    doc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>,
    water: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 7.5 4 12 4 15a8 8 0 0016 0c0-3-2.5-7.5-8-13z"/></svg>,
    sleep: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    run: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="4" r="2"/><path d="M4 17L8 13 11 15 14 11 17 14 20 10"/><path d="M7 20L10 17"/></svg>,
    stats: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    like: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>,
    comment: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    image: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>,
  };
  return icons[name] || null;
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const generateStreak = () => {
  const weeks = 17;
  const days = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const idx = w * 7 + d;
      const rand = Math.random();
      week.push(rand > 0.45 ? (rand > 0.7 ? 2 : 1) : 0);
    }
    days.push(week);
  }
  return days;
};

const mockWorkouts = [
  { id: 1, name: "Push Day", date: "Today", exercises: [{ name: "Bench Press", sets: 4, reps: 10, weight: 80 }, { name: "OHP", sets: 3, reps: 12, weight: 50 }, { name: "Tricep Pushdown", sets: 3, reps: 15, weight: 25 }], duration: 62 },
  { id: 2, name: "Pull Day", date: "Yesterday", exercises: [{ name: "Deadlift", sets: 4, reps: 6, weight: 120 }, { name: "Pull-ups", sets: 4, reps: 8, weight: 0 }, { name: "Cable Row", sets: 3, reps: 12, weight: 60 }], duration: 58 },
  { id: 3, name: "Leg Day", date: "2d ago", exercises: [{ name: "Squat", sets: 5, reps: 5, weight: 100 }, { name: "Leg Press", sets: 3, reps: 15, weight: 180 }, { name: "RDL", sets: 3, reps: 12, weight: 70 }], duration: 75 },
];

const mockSupplements = [
  { id: 1, name: "Whey Protein", brand: "Optimum Nutrition", dose: "1 scoop", timing: "Post-workout", icon: "💪", taken: true, calories: 120, protein: 24 },
  { id: 2, name: "Creatine", brand: "Bulk Supplements", dose: "5g", timing: "Pre-workout", icon: "⚡", taken: false, calories: 0, protein: 0 },
  { id: 3, name: "Multivitamin", brand: "Garden of Life", dose: "2 tablets", timing: "Morning", icon: "🌿", taken: true, calories: 15, protein: 0 },
  { id: 4, name: "Omega-3", brand: "Nordic Naturals", dose: "2 softgels", timing: "Evening", icon: "🐟", taken: false, calories: 25, protein: 0 },
  { id: 5, name: "Pre-workout", brand: "C4 Original", dose: "1 scoop", timing: "30min before", icon: "🔥", taken: false, calories: 5, protein: 0 },
  { id: 6, name: "Casein Protein", brand: "Dymatize", dose: "1 scoop", timing: "Before bed", icon: "🌙", taken: false, calories: 110, protein: 25 },
];

const communityPosts = [
  { id: 1, user: "IronKing_", avatar: "👑", time: "2h ago", content: "Hit a new PR on deadlift today — 200kg! 2 years of grinding finally paying off 🏆", likes: 142, comments: 23, tags: ["PR", "Deadlift"], img: false },
  { id: 2, user: "FitQueen.official", avatar: "🦅", time: "5h ago", content: "Reminder: sleep is as important as training. 8 hours = better gains. Stop skipping recovery.", likes: 89, comments: 31, tags: ["Recovery", "Tips"], img: false },
  { id: 3, user: "Physique.God", avatar: "🔥", time: "1d ago", content: "12 weeks out from competition. Cutting is brutal but the physique is coming in 🔱", likes: 231, comments: 67, tags: ["Competition", "Cut"], img: false },
  { id: 4, user: "NutritionNerd", avatar: "🥗", time: "1d ago", content: "High protein breakfast = less hunger + better performance. 50g protein at breakfast is the move.", likes: 56, comments: 14, tags: ["Nutrition", "Diet"], img: false },
];

const streakData = generateStreak();

// ─── AI CALL ─────────────────────────────────────────────────────────────────
const callAI = async (messages, systemPrompt) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "Sorry, couldn't get a response.";
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  :root {
    --bg: #080B0F;
    --surface: #0F1318;
    --surface2: #161C24;
    --surface3: #1E2630;
    --border: rgba(255,255,255,0.06);
    --border2: rgba(255,255,255,0.1);
    --accent: #E8FF47;
    --accent2: #FF6B35;
    --accent3: #00D4AA;
    --text: #F0F4FF;
    --text2: #8B95A8;
    --text3: #4A5568;
    --red: #FF4757;
    --gold: #FFD700;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --r: 16px;
    --r2: 24px;
  }

  html, body { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font-body); overflow: hidden; }

  #root { height: 100%; display: flex; justify-content: center; align-items: center; background: radial-gradient(ellipse at 50% -20%, rgba(232,255,71,0.04) 0%, transparent 70%); }

  .app { width: 100%; max-width: 430px; height: 100dvh; height: 100vh; display: flex; flex-direction: column; position: relative; overflow: hidden; background: var(--bg); }

  /* NAVBAR */
  .navbar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 100; padding: 0 8px 8px; }
  .navbar-inner { background: rgba(15,19,24,0.92); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--border2); border-radius: 24px; display: flex; align-items: center; justify-content: space-around; padding: 10px 4px 14px; }
  .nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 16px; cursor: pointer; transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); border-radius: 16px; min-width: 52px; }
  .nav-item:hover { background: rgba(255,255,255,0.04); }
  .nav-item.active { color: var(--accent); }
  .nav-item.active .nav-icon { background: rgba(232,255,71,0.12); }
  .nav-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 14px; transition: all 0.25s ease; }
  .nav-label { font-size: 10px; font-weight: 500; letter-spacing: 0.3px; color: var(--text2); transition: color 0.2s; }
  .nav-item.active .nav-label { color: var(--accent); }

  /* PAGES */
  .page { flex: 1; overflow-y: auto; overflow-x: hidden; padding-bottom: 100px; scroll-behavior: smooth; }
  .page::-webkit-scrollbar { display: none; }

  /* PAGE ENTRY ANIMATION */
  @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .page-enter { animation: fadeSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

  /* HEADER */
  .page-header { padding: 56px 20px 0; }
  .page-title { font-family: var(--font-display); font-size: 42px; letter-spacing: 1px; line-height: 1; background: linear-gradient(135deg, var(--text) 40%, var(--text2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .page-subtitle { font-size: 13px; color: var(--text2); margin-top: 4px; font-weight: 300; }

  /* CARDS */
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r2); padding: 18px; }
  .card-sm { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--r); padding: 14px; }

  /* STAT CARDS */
  .stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat-card { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--r2); padding: 16px; display: flex; flex-direction: column; gap: 8px; transition: transform 0.2s ease, border-color 0.2s ease; }
  .stat-card:hover { transform: translateY(-2px); border-color: var(--border2); }
  .stat-label { font-size: 11px; font-weight: 500; color: var(--text3); text-transform: uppercase; letter-spacing: 0.8px; }
  .stat-value { font-family: var(--font-display); font-size: 32px; letter-spacing: 0.5px; line-height: 1; }
  .stat-unit { font-size: 12px; color: var(--text2); font-weight: 400; margin-left: 2px; }
  .stat-delta { font-size: 11px; color: var(--accent3); font-weight: 500; }
  .stat-delta.neg { color: var(--red); }

  /* STREAK */
  .streak-grid { display: flex; gap: 3px; overflow-x: auto; padding: 4px 0 8px; }
  .streak-grid::-webkit-scrollbar { display: none; }
  .streak-week { display: flex; flex-direction: column; gap: 3px; }
  .streak-cell { width: 13px; height: 13px; border-radius: 3px; background: var(--surface3); transition: all 0.2s ease; flex-shrink: 0; }
  .streak-cell.level-1 { background: rgba(232,255,71,0.35); }
  .streak-cell.level-2 { background: var(--accent); }

  /* WORKOUT CARD */
  .workout-card { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--r2); padding: 18px; display: flex; flex-direction: column; gap: 12px; }
  .workout-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .workout-name { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.5px; }
  .workout-badge { background: rgba(232,255,71,0.1); border: 1px solid rgba(232,255,71,0.2); color: var(--accent); font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
  .workout-badge.old { background: rgba(139,149,168,0.08); border-color: var(--border); color: var(--text2); }
  .exercise-list { display: flex; flex-direction: column; gap: 6px; }
  .exercise-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--surface3); border-radius: 12px; }
  .exercise-name { font-size: 13px; font-weight: 500; }
  .exercise-meta { font-size: 12px; color: var(--text2); }
  .exercise-weight { font-family: var(--font-display); font-size: 18px; color: var(--accent); letter-spacing: 0.5px; }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: flex-end; }
  .modal { background: var(--surface); border: 1px solid var(--border2); border-radius: 28px 28px 0 0; padding: 24px 20px 40px; width: 100%; max-height: 85vh; overflow-y: auto; animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
  .modal::-webkit-scrollbar { display: none; }
  @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-handle { width: 36px; height: 4px; background: var(--surface3); border-radius: 4px; margin: 0 auto 20px; }
  .modal-title { font-family: var(--font-display); font-size: 28px; margin-bottom: 20px; }

  /* INPUT */
  .input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .input-label { font-size: 11px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 0.8px; }
  .input { background: var(--surface2); border: 1px solid var(--border); border-radius: 14px; padding: 13px 16px; color: var(--text); font-family: var(--font-body); font-size: 15px; outline: none; transition: border-color 0.2s; width: 100%; }
  .input:focus { border-color: var(--accent); }
  .input::placeholder { color: var(--text3); }
  .input-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

  /* BUTTONS */
  .btn { display: flex; align-items: center; justify-content: center; gap: 8px; border: none; border-radius: 16px; font-family: var(--font-body); font-weight: 600; cursor: pointer; transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
  .btn:active { transform: scale(0.96); }
  .btn-primary { background: var(--accent); color: #080B0F; padding: 14px 24px; font-size: 15px; width: 100%; }
  .btn-primary:hover { background: #f0ff5c; box-shadow: 0 8px 24px rgba(232,255,71,0.25); }
  .btn-ghost { background: var(--surface2); color: var(--text); padding: 10px 16px; font-size: 13px; border: 1px solid var(--border); }
  .btn-icon { background: var(--surface2); border: 1px solid var(--border); color: var(--text2); padding: 10px; border-radius: 14px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; }
  .btn-icon:hover { background: var(--surface3); color: var(--text); }
  .btn-accent-outline { background: transparent; border: 1px solid var(--accent); color: var(--accent); padding: 10px 18px; font-size: 13px; border-radius: 12px; }

  /* SECTION */
  .section { padding: 20px 20px 0; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .section-title { font-family: var(--font-display); font-size: 20px; letter-spacing: 0.5px; }
  .section-action { font-size: 12px; color: var(--accent); font-weight: 500; cursor: pointer; }

  /* PILL TABS */
  .pill-tabs { display: flex; gap: 8px; overflow-x: auto; padding: 4px 0; }
  .pill-tabs::-webkit-scrollbar { display: none; }
  .pill { padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; border: 1px solid var(--border); color: var(--text2); background: transparent; }
  .pill.active { background: var(--accent); color: #080B0F; border-color: var(--accent); }

  /* AI PAGE */
  .ai-card { background: linear-gradient(135deg, var(--surface2), var(--surface)); border: 1px solid var(--border); border-radius: var(--r2); padding: 20px; transition: all 0.2s ease; cursor: pointer; }
  .ai-card:hover { border-color: var(--accent); box-shadow: 0 0 0 1px rgba(232,255,71,0.15), 0 8px 32px rgba(0,0,0,0.3); transform: translateY(-2px); }
  .ai-card-icon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .ai-card-title { font-family: var(--font-display); font-size: 20px; margin-bottom: 4px; }
  .ai-card-desc { font-size: 12px; color: var(--text2); line-height: 1.5; }

  /* CHAT */
  .chat-area { display: flex; flex-direction: column; gap: 14px; padding: 16px 20px; }
  .msg { max-width: 80%; display: flex; flex-direction: column; gap: 4px; }
  .msg.user { align-self: flex-end; }
  .msg.ai { align-self: flex-start; }
  .msg-bubble { padding: 12px 16px; border-radius: 20px; font-size: 14px; line-height: 1.5; }
  .msg.user .msg-bubble { background: var(--accent); color: #080B0F; border-radius: 20px 20px 4px 20px; }
  .msg.ai .msg-bubble { background: var(--surface2); border: 1px solid var(--border); border-radius: 20px 20px 20px 4px; }
  .msg-time { font-size: 10px; color: var(--text3); align-self: flex-end; }
  .chat-input-area { position: sticky; bottom: 90px; padding: 12px 16px; background: var(--bg); }
  .chat-input-wrap { display: flex; gap: 10px; align-items: flex-end; background: var(--surface); border: 1px solid var(--border2); border-radius: 20px; padding: 10px 10px 10px 16px; }
  .chat-input { flex: 1; background: none; border: none; color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none; resize: none; max-height: 100px; overflow-y: auto; }
  .chat-input::placeholder { color: var(--text3); }
  .chat-send { background: var(--accent); border: none; border-radius: 14px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: all 0.2s ease; }
  .chat-send:hover { box-shadow: 0 4px 16px rgba(232,255,71,0.3); }
  .typing { display: flex; gap: 5px; align-items: center; padding: 14px 16px; }
  .typing-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text3); animation: bounce 1s infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.15s; }
  .typing-dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); background: var(--accent); } }

  /* SUPPLEMENTS */
  .supp-card { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--r2); padding: 16px; display: flex; align-items: center; gap: 14px; transition: all 0.2s ease; }
  .supp-card.taken { border-color: rgba(0,212,170,0.2); background: rgba(0,212,170,0.04); }
  .supp-emoji { font-size: 32px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: var(--surface3); border-radius: 16px; flex-shrink: 0; }
  .supp-info { flex: 1; }
  .supp-name { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
  .supp-brand { font-size: 11px; color: var(--text2); margin-bottom: 4px; }
  .supp-meta { display: flex; gap: 8px; }
  .supp-tag { font-size: 10px; padding: 2px 8px; border-radius: 10px; background: var(--surface3); color: var(--text2); }
  .supp-check { width: 36px; height: 36px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--border); background: transparent; cursor: pointer; transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); flex-shrink: 0; }
  .supp-check.checked { background: var(--accent3); border-color: var(--accent3); }

  /* COMMUNITY */
  .post-card { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--r2); padding: 18px; }
  .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .post-avatar { width: 40px; height: 40px; border-radius: 14px; background: var(--surface3); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .post-user { font-size: 14px; font-weight: 600; }
  .post-time { font-size: 11px; color: var(--text2); }
  .post-content { font-size: 14px; line-height: 1.6; color: var(--text); margin-bottom: 12px; }
  .post-tags { display: flex; gap: 6px; margin-bottom: 14px; }
  .post-tag { font-size: 11px; color: var(--accent); background: rgba(232,255,71,0.08); padding: 3px 10px; border-radius: 10px; }
  .post-actions { display: flex; gap: 20px; }
  .post-action { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text2); cursor: pointer; transition: color 0.2s; }
  .post-action:hover { color: var(--text); }
  .post-action.liked { color: var(--red); }

  /* PROFILE */
  .profile-hero { padding: 56px 20px 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .avatar-wrap { position: relative; }
  .profile-avatar { width: 90px; height: 90px; border-radius: 28px; background: linear-gradient(135deg, var(--surface2), var(--surface3)); border: 2px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 40px; }
  .avatar-edit { position: absolute; bottom: -6px; right: -6px; width: 28px; height: 28px; border-radius: 10px; background: var(--accent); display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .profile-name { font-family: var(--font-display); font-size: 28px; letter-spacing: 0.5px; }
  .profile-handle { font-size: 13px; color: var(--text2); }
  .profile-stats { display: flex; gap: 0; background: var(--surface2); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; margin-top: 4px; }
  .profile-stat { flex: 1; padding: 14px 10px; text-align: center; border-right: 1px solid var(--border); }
  .profile-stat:last-child { border-right: none; }
  .profile-stat-val { font-family: var(--font-display); font-size: 22px; }
  .profile-stat-lbl { font-size: 10px; color: var(--text2); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .profile-section { margin: 20px 20px 0; }
  .profile-section-title { font-family: var(--font-display); font-size: 18px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
  .info-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 0; border-bottom: 1px solid var(--border); }
  .info-row:last-child { border-bottom: none; }
  .info-key { font-size: 13px; color: var(--text2); }
  .info-val { font-size: 14px; font-weight: 500; }

  /* LOADING */
  .ai-loading { display: flex; gap: 10px; align-items: center; padding: 20px; }
  @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
  .ai-loading-text { font-size: 13px; color: var(--text2); animation: pulse 1.5s infinite; }

  /* BADGES */
  .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
  .badge-yellow { background: rgba(232,255,71,0.12); color: var(--accent); border: 1px solid rgba(232,255,71,0.2); }
  .badge-green { background: rgba(0,212,170,0.12); color: var(--accent3); border: 1px solid rgba(0,212,170,0.2); }
  .badge-orange { background: rgba(255,107,53,0.12); color: var(--accent2); border: 1px solid rgba(255,107,53,0.2); }

  /* METRIC RING */
  .ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .ring-label { font-size: 11px; color: var(--text2); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }

  /* DIVIDER */
  .divider { height: 1px; background: var(--border); margin: 4px 0; }

  /* SCROLL FIX for modals */
  .modal textarea.input { min-height: 80px; }

  /* ACCENT LINE */
  .accent-line { width: 36px; height: 3px; background: var(--accent); border-radius: 2px; }

  /* PROGRESS BAR */
  .progress-bar { height: 4px; background: var(--surface3); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }

  /* AI RESULT */
  .ai-result { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--r2); padding: 18px; margin-top: 14px; }
  .ai-result-text { font-size: 14px; line-height: 1.7; color: var(--text); white-space: pre-wrap; }

  /* EMPTY STATE */
  .empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 40px 20px; color: var(--text2); }
  .empty-icon { font-size: 40px; opacity: 0.3; }
  .empty-text { font-size: 13px; text-align: center; }

  /* TOP ACCENT */
  .page-accent { width: 100%; height: 2px; background: linear-gradient(90deg, var(--accent), transparent); margin-bottom: 4px; }

  /* RING SVG */
  .ring svg { transform: rotate(-90deg); }
  .ring-track { fill: none; stroke: var(--surface3); stroke-width: 5; }
  .ring-progress { fill: none; stroke-width: 5; stroke-linecap: round; transition: stroke-dashoffset 1s cubic-bezier(0.34,1.56,0.64,1); }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const MetricRing = ({ value, max, color, label, size = 60 }) => {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;
  return (
    <div className="ring-wrap">
      <div className="ring">
        <svg width={size} height={size}>
          <circle className="ring-track" cx={size/2} cy={size/2} r={r} />
          <circle className="ring-progress" cx={size/2} cy={size/2} r={r} stroke={color}
            strokeDasharray={circ} strokeDashoffset={offset} />
          <text x={size/2} y={size/2+1} textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="13" fontFamily="Bebas Neue" letterSpacing="0.5">{value}</text>
        </svg>
      </div>
      <span className="ring-label">{label}</span>
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [newWorkout, setNewWorkout] = useState({ name: "", exercises: [{ name: "", sets: "", reps: "", weight: "" }] });
  const totalStreak = streakData.flat().filter(v => v > 0).length;

  const addExercise = () => setNewWorkout(w => ({ ...w, exercises: [...w.exercises, { name: "", sets: "", reps: "", weight: "" }] }));
  const saveWorkout = () => {
    if (!newWorkout.name) return;
    setWorkouts(prev => [{ id: Date.now(), name: newWorkout.name, date: "Just now", exercises: newWorkout.exercises.filter(e => e.name), duration: Math.floor(Math.random() * 30 + 40) }, ...prev]);
    setShowAddWorkout(false);
    setNewWorkout({ name: "", exercises: [{ name: "", sets: "", reps: "", weight: "" }] });
  };

  return (
    <div className="page page-enter">
      <div style={{ padding: "56px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 4, fontWeight: 500, letterSpacing: "0.5px" }}>WELCOME BACK</div>
          <div className="page-title">IRON<br/>MIND</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--surface2)", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: 14 }}>
          <Icon name="fire" size={16} color="var(--accent2)" />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--accent)" }}>{totalStreak}</span>
          <span style={{ fontSize: 11, color: "var(--text2)" }}>DAY<br/>STREAK</span>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="section" style={{ marginTop: 24 }}>
        <div className="stats-row">
          <div className="stat-card">
            <Icon name="weight" size={18} color="var(--accent)" />
            <div className="stat-label">BODY WEIGHT</div>
            <div className="stat-value">82<span className="stat-unit">kg</span></div>
            <div className="stat-delta">↓ 0.5kg this week</div>
          </div>
          <div className="stat-card">
            <Icon name="run" size={18} color="var(--accent3)" />
            <div className="stat-label">WORKOUTS</div>
            <div className="stat-value">18<span className="stat-unit">/mo</span></div>
            <div className="stat-delta">↑ 3 vs last month</div>
          </div>
          <div className="stat-card">
            <Icon name="heart" size={18} color="var(--red)" />
            <div className="stat-label">AVG HR</div>
            <div className="stat-value">72<span className="stat-unit">bpm</span></div>
            <div className="stat-delta" style={{ color: "var(--text2)" }}>Resting</div>
          </div>
          <div className="stat-card">
            <Icon name="zap" size={18} color="var(--gold)" />
            <div className="stat-label">PRs THIS MO.</div>
            <div className="stat-value">3</div>
            <div className="stat-delta">Bench, Squat, DL</div>
          </div>
        </div>
      </div>

      {/* TODAY'S RINGS */}
      <div className="section" style={{ marginTop: 20 }}>
        <div className="card" style={{ background: "linear-gradient(135deg, var(--surface2), var(--surface))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div className="section-title">Today</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>Monday · Push Day</div>
            </div>
            <div className="badge badge-yellow"><Icon name="fire" size={12} />ON TRACK</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <MetricRing value={2400} max={3000} color="var(--accent)" label="CALORIES" size={70} />
            <MetricRing value={148} max={180} color="var(--accent3)" label="PROTEIN (g)" size={70} />
            <MetricRing value={6} max={8} color="var(--accent2)" label="WATER (L)" size={70} />
            <MetricRing value={7} max={8} color="#A78BFA" label="SLEEP (h)" size={70} />
          </div>
        </div>
      </div>

      {/* STREAK */}
      <div className="section" style={{ marginTop: 20 }}>
        <div className="section-header">
          <div style={{ display: "flex", align: "center", gap: 8 }}>
            <div className="section-title">Activity</div>
          </div>
          <div className="badge badge-yellow"><Icon name="fire" size={11} />{totalStreak} days</div>
        </div>
        <div className="card">
          <div className="streak-grid">
            {streakData.map((week, wi) => (
              <div className="streak-week" key={wi}>
                {week.map((day, di) => (
                  <div key={di} className={`streak-cell level-${day}`} title={`${day > 0 ? "Workout" : "Rest"} day`} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: "var(--accent)" }} />
              Workout
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(232,255,71,0.35)" }} />
              Light
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: "var(--surface3)" }} />
              Rest
            </div>
          </div>
        </div>
      </div>

      {/* WORKOUT HISTORY */}
      <div className="section" style={{ marginTop: 20, marginBottom: 8 }}>
        <div className="section-header">
          <div className="section-title">Recent Workouts</div>
          <button className="btn btn-primary" style={{ width: "auto", padding: "8px 16px", fontSize: 13, borderRadius: 12 }} onClick={() => setShowAddWorkout(true)}>
            <Icon name="plus" size={16} color="#080B0F" /> Log
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {workouts.map(w => (
            <div className="workout-card" key={w.id}>
              <div className="workout-header">
                <div>
                  <div className="workout-name">{w.name.toUpperCase()}</div>
                  <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{w.duration} min · {w.exercises.length} exercises</div>
                </div>
                <div className={`workout-badge ${w.date !== "Today" ? "old" : ""}`}>{w.date}</div>
              </div>
              <div className="exercise-list">
                {w.exercises.map((ex, i) => (
                  <div className="exercise-row" key={i}>
                    <div>
                      <div className="exercise-name">{ex.name}</div>
                      <div className="exercise-meta">{ex.sets}×{ex.reps}</div>
                    </div>
                    <div className="exercise-weight">{ex.weight > 0 ? `${ex.weight}kg` : "BW"}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD WORKOUT MODAL */}
      {showAddWorkout && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAddWorkout(false)}>
          <div className="modal">
            <div className="modal-handle" />
            <div className="modal-title">Log Workout</div>
            <div className="input-group">
              <div className="input-label">Session Name</div>
              <input className="input" placeholder="e.g. Push Day, Leg Day…" value={newWorkout.name} onChange={e => setNewWorkout(w => ({ ...w, name: e.target.value }))} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 }}>Exercises</div>
            {newWorkout.exercises.map((ex, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <input className="input" placeholder="Exercise name" value={ex.name} onChange={e => { const arr = [...newWorkout.exercises]; arr[i].name = e.target.value; setNewWorkout(w => ({ ...w, exercises: arr })); }} style={{ marginBottom: 8 }} />
                <div className="input-row">
                  <input className="input" placeholder="Sets" type="number" value={ex.sets} onChange={e => { const arr = [...newWorkout.exercises]; arr[i].sets = e.target.value; setNewWorkout(w => ({ ...w, exercises: arr })); }} />
                  <input className="input" placeholder="Reps" type="number" value={ex.reps} onChange={e => { const arr = [...newWorkout.exercises]; arr[i].reps = e.target.value; setNewWorkout(w => ({ ...w, exercises: arr })); }} />
                  <input className="input" placeholder="kg" type="number" value={ex.weight} onChange={e => { const arr = [...newWorkout.exercises]; arr[i].weight = e.target.value; setNewWorkout(w => ({ ...w, exercises: arr })); }} />
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{ marginBottom: 14, width: "100%" }} onClick={addExercise}>
              <Icon name="plus" size={16} /> Add Exercise
            </button>
            <button className="btn btn-primary" onClick={saveWorkout}>Save Workout</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AI PAGE ──────────────────────────────────────────────────────────────────
const AIPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [customInput, setCustomInput] = useState("");

  const cards = [
    { id: "schedule", icon: "🗓️", color: "rgba(232,255,71,0.12)", title: "Workout Schedule", desc: "Personalized weekly plan based on your goals", prompt: "Create a detailed 5-day gym workout schedule for building muscle (hypertrophy). Include exercise names, sets, reps, and rest times. Format it clearly with day labels." },
    { id: "diet", icon: "🥗", color: "rgba(0,212,170,0.12)", title: "Diet Plan", desc: "Macro targets and meal timing optimized for gains", prompt: "Create a high-protein diet plan for muscle building. Include 3 meals and 2 snacks with approximate macros (protein, carbs, fat, calories). Keep it practical with real foods." },
    { id: "recovery", icon: "😴", color: "rgba(167,139,250,0.12)", title: "Recovery Tips", desc: "Sleep, mobility, and deload recommendations", prompt: "Give me a complete muscle recovery protocol including: sleep optimization, active recovery workouts, stretching routine, and signs of overtraining. Make it actionable." },
    { id: "supplement", icon: "💊", color: "rgba(255,107,53,0.12)", title: "Supplement Stack", desc: "Evidence-based supplement recommendations", prompt: "Recommend a science-backed supplement stack for muscle building and performance. Include what each supplement does, dosing, and timing. Only recommend well-researched supplements." },
    { id: "technique", icon: "🏋️", color: "rgba(255,215,0,0.12)", title: "Form & Technique", desc: "Cues for compound lifts", prompt: "Give me detailed form cues and technique tips for the big 3 lifts: Squat, Bench Press, and Deadlift. Include common mistakes and how to fix them." },
    { id: "cut", icon: "🔪", color: "rgba(255,71,87,0.12)", title: "Cutting Protocol", desc: "Lean cutting without losing muscle", prompt: "Create a cutting protocol to lose fat while preserving muscle. Include calorie deficit strategy, macro ratios, training adjustments, and cardio recommendations." },
  ];

  const getRecommendation = async (prompt) => {
    setLoading(true);
    setResult("");
    try {
      const res = await callAI([{ role: "user", content: prompt }],
        "You are an elite fitness coach and nutritionist. Give concise, actionable advice. Use bullet points and clear sections. Keep responses under 400 words. Be direct and specific.");
      setResult(res);
    } catch {
      setResult("Couldn't connect to AI. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="page page-enter">
      <div className="page-header">
        <div className="page-title">AI<br/>COACH</div>
        <div className="page-subtitle">Personalized fitness intelligence</div>
      </div>

      <div className="section" style={{ marginTop: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {cards.map(card => (
            <div key={card.id} className="ai-card" style={{ borderColor: activeCard === card.id ? "var(--accent)" : "var(--border)" }}
              onClick={() => { setActiveCard(card.id); getRecommendation(card.prompt); }}>
              <div className="ai-card-icon" style={{ background: card.color }}>
                <span style={{ fontSize: 22 }}>{card.icon}</span>
              </div>
              <div className="ai-card-title">{card.title}</div>
              <div className="ai-card-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="input" style={{ flex: 1 }} placeholder="Ask anything about fitness…" value={customInput} onChange={e => setCustomInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && customInput.trim()) { getRecommendation(customInput); setCustomInput(""); }}} />
          <button className="btn-icon" style={{ flexShrink: 0, background: "var(--accent)", borderColor: "var(--accent)" }}
            onClick={() => { if (customInput.trim()) { getRecommendation(customInput); setCustomInput(""); } }}>
            <Icon name="send" size={18} color="#080B0F" />
          </button>
        </div>
      </div>

      {(loading || result) && (
        <div className="section" style={{ marginTop: 4, marginBottom: 8 }}>
          {loading ? (
            <div className="ai-result">
              <div className="ai-loading">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                <span className="ai-loading-text">Generating your plan…</span>
              </div>
            </div>
          ) : (
            <div className="ai-result">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Icon name="zap" size={16} color="var(--accent)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.5px" }}>AI Response</span>
              </div>
              <div className="ai-result-text">{result}</div>
            </div>
          )}
        </div>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
};

// ─── CHAT PAGE ────────────────────────────────────────────────────────────────
const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hey! I'm your AI fitness coach. Ask me anything — workouts, nutrition, form tips, or just vent about leg day 😅" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const send = async () => {
    if (!input.trim() || typing) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    try {
      const history = messages.filter(m => m.role !== "ai" || messages.indexOf(m) > 0)
        .map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content }));
      const res = await callAI([...history, { role: "user", content: userMsg }],
        "You are an expert fitness coach and gym buddy. Be friendly, motivating, and knowledgeable. Keep responses concise (under 200 words). Use emojis naturally. Give practical, science-based advice.");
      setMessages(prev => [...prev, { role: "ai", content: res }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Network issue. Please try again 💪" }]);
    }
    setTyping(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="page page-enter" style={{ display: "flex", flexDirection: "column" }}>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 16, background: "linear-gradient(135deg, rgba(232,255,71,0.2), rgba(0,212,170,0.2))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="zap" size={22} color="var(--accent)" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.5px" }}>AI TRAINER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent3)" }} />
              <span style={{ fontSize: 11, color: "var(--accent3)", fontWeight: 500 }}>Online · Always ready</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-area" style={{ flex: 1 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            <div className="msg-bubble">{msg.content}</div>
          </div>
        ))}
        {typing && (
          <div className="msg ai">
            <div className="msg-bubble">
              <div className="typing"><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrap">
          <textarea className="chat-input" rows={1} placeholder="Ask your trainer…" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
          <button className="chat-send" onClick={send}><Icon name="send" size={16} color="#080B0F" /></button>
        </div>
      </div>
    </div>
  );
};

// ─── SUPPLEMENTS PAGE ─────────────────────────────────────────────────────────
const SupplementsPage = () => {
  const [supps, setSupps] = useState(mockSupplements);
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Morning", "Pre-workout", "Post-workout", "Evening", "Before bed"];

  const filtered = activeTab === "All" ? supps : supps.filter(s => s.timing === activeTab);
  const takenCount = supps.filter(s => s.taken).length;

  const toggle = (id) => setSupps(prev => prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s));

  return (
    <div className="page page-enter">
      <div className="page-header">
        <div className="page-title">SUPPS</div>
        <div className="page-subtitle">Daily supplement tracker</div>
      </div>

      <div className="section" style={{ marginTop: 20 }}>
        <div className="card" style={{ background: "linear-gradient(135deg, rgba(232,255,71,0.06), var(--surface))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36 }}>{takenCount}<span style={{ fontSize: 20, color: "var(--text2)" }}>/{supps.length}</span></div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>Taken today</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="badge badge-yellow">{Math.round(takenCount/supps.length*100)}%</div>
              <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 6 }}>Adherence</div>
            </div>
          </div>
          <div className="progress-bar" style={{ marginTop: 14 }}>
            <div className="progress-fill" style={{ width: `${(takenCount/supps.length)*100}%`, background: "var(--accent)" }} />
          </div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 16 }}>
        <div className="pill-tabs">
          {tabs.map(t => <button key={t} className={`pill ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>)}
        </div>
      </div>

      <div className="section" style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
        {filtered.map(s => (
          <div key={s.id} className={`supp-card ${s.taken ? "taken" : ""}`}>
            <div className="supp-emoji">{s.icon}</div>
            <div className="supp-info">
              <div className="supp-name">{s.name}</div>
              <div className="supp-brand">{s.brand}</div>
              <div className="supp-meta">
                <div className="supp-tag">{s.dose}</div>
                <div className="supp-tag">{s.timing}</div>
                {s.protein > 0 && <div className="supp-tag">{s.protein}g protein</div>}
              </div>
            </div>
            <button className={`supp-check ${s.taken ? "checked" : ""}`} onClick={() => toggle(s.id)}>
              {s.taken && <Icon name="check" size={16} color="#080B0F" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── COMMUNITY PAGE ───────────────────────────────────────────────────────────
const CommunityPage = () => {
  const [posts, setPosts] = useState(communityPosts);
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (id) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts.has(id) ? p.likes - 1 : p.likes + 1 } : p));
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{
      id: Date.now(), user: "You", avatar: "💪", time: "Just now",
      content: newPost, likes: 0, comments: 0, tags: []
    }, ...prev]);
    setNewPost(""); setShowNew(false);
  };

  return (
    <div className="page page-enter">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="page-title">GYM<br/>FORUM</div>
            <div className="page-subtitle">Community of iron</div>
          </div>
          <button className="btn btn-primary" style={{ width: "auto", padding: "10px 18px", fontSize: 13, borderRadius: 14 }} onClick={() => setShowNew(true)}>
            <Icon name="plus" size={16} color="#080B0F" /> Post
          </button>
        </div>
      </div>

      <div className="section" style={{ marginTop: 20, marginBottom: 8 }}>
        <div className="pill-tabs" style={{ marginBottom: 14 }}>
          {["Feed", "PRs", "Nutrition", "Form Check", "Motivation"].map(t => (
            <button key={t} className={`pill ${t === "Feed" ? "active" : ""}`}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <div className="post-avatar">{post.avatar}</div>
                <div>
                  <div className="post-user">{post.user}</div>
                  <div className="post-time">{post.time}</div>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              {post.tags.length > 0 && (
                <div className="post-tags">{post.tags.map(tag => <span key={tag} className="post-tag">#{tag}</span>)}</div>
              )}
              <div className="post-actions">
                <div className={`post-action ${likedPosts.has(post.id) ? "liked" : ""}`} onClick={() => toggleLike(post.id)}>
                  <Icon name="like" size={16} /> {post.likes}
                </div>
                <div className="post-action">
                  <Icon name="comment" size={16} /> {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNew && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowNew(false)}>
          <div className="modal">
            <div className="modal-handle" />
            <div className="modal-title">New Post</div>
            <textarea className="input" rows={5} placeholder="Share your gains, tips, or struggles…" value={newPost} onChange={e => setNewPost(e.target.value)} style={{ minHeight: 120, resize: "none" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
              <button className="btn btn-ghost" onClick={() => setShowNew(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitPost}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [profile, setProfile] = useState({
    name: "Alex Ryder", handle: "@ironmind_alex", emoji: "🦁",
    age: 26, height: "182 cm", weight: "82 kg", goal: "Muscle Gain",
    experience: "Intermediate", workoutDays: "5 days/week", preferredTime: "Evening",
    bench: "100 kg", squat: "120 kg", deadlift: "140 kg", ohp: "70 kg",
    calories: "3200 kcal", protein: "180g", carbs: "380g", fat: "85g",
    bloodType: "O+", allergies: "None", conditions: "None", medications: "None",
  });
  const [tempProfile, setTempProfile] = useState(profile);

  const tabs = ["General", "Fitness", "Nutrition", "Health"];
  const sections = {
    General: [
      { key: "age", label: "Age" }, { key: "height", label: "Height" },
      { key: "weight", label: "Weight" }, { key: "goal", label: "Goal" },
    ],
    Fitness: [
      { key: "experience", label: "Experience" }, { key: "workoutDays", label: "Training Days" },
      { key: "preferredTime", label: "Preferred Time" }, { key: "bench", label: "Bench PR" },
      { key: "squat", label: "Squat PR" }, { key: "deadlift", label: "Deadlift PR" },
      { key: "ohp", label: "OHP PR" },
    ],
    Nutrition: [
      { key: "calories", label: "Daily Calories" }, { key: "protein", label: "Protein Target" },
      { key: "carbs", label: "Carbs Target" }, { key: "fat", label: "Fat Target" },
    ],
    Health: [
      { key: "bloodType", label: "Blood Type" }, { key: "allergies", label: "Allergies" },
      { key: "conditions", label: "Medical Conditions" }, { key: "medications", label: "Medications" },
    ],
  };

  const save = () => { setProfile(tempProfile); setEditing(false); };

  return (
    <div className="page page-enter">
      <div className="profile-hero">
        <div className="avatar-wrap">
          <div className="profile-avatar">{profile.emoji}</div>
          <div className="avatar-edit"><Icon name="camera" size={14} color="#080B0F" /></div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-handle">{profile.handle}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8, justifyContent: "center" }}>
            <div className="badge badge-yellow"><Icon name="trophy" size={12} />Intermediate</div>
            <div className="badge badge-green"><Icon name="fire" size={12} />18 day streak</div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-val">247</div>
            <div className="profile-stat-lbl">Workouts</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-val">18</div>
            <div className="profile-stat-lbl">PRs</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-val">2.1y</div>
            <div className="profile-stat-lbl">Training</div>
          </div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 20 }}>
        <div className="pill-tabs">
          {tabs.map(t => <button key={t} className={`pill ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>)}
        </div>
      </div>

      <div className="profile-section" style={{ marginBottom: 8 }}>
        <div className="profile-section-title">
          {activeTab} Info
          <button className="btn-icon" onClick={() => editing ? save() : setEditing(true)} style={{ background: editing ? "var(--accent)" : "var(--surface2)", borderColor: editing ? "var(--accent)" : "var(--border)" }}>
            {editing ? <Icon name="check" size={16} color="#080B0F" /> : <Icon name="edit" size={16} color="var(--text2)" />}
          </button>
        </div>
        <div className="card">
          {sections[activeTab].map(({ key, label }) => (
            <div className="info-row" key={key}>
              <div className="info-key">{label}</div>
              {editing ? (
                <input className="input" style={{ width: "auto", minWidth: 120, textAlign: "right", padding: "6px 12px", fontSize: 13 }}
                  value={tempProfile[key]} onChange={e => setTempProfile(p => ({ ...p, [key]: e.target.value }))} />
              ) : (
                <div className="info-val">{profile[key]}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section" style={{ marginBottom: 8 }}>
        <div className="profile-section-title">Documents</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {["Blood Report", "DEXA Scan", "Diet Plan", "Workout Plan"].map(doc => (
            <div key={doc} className="card-sm" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <Icon name="doc" size={20} color="var(--text2)" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{doc}</div>
                <div style={{ fontSize: 11, color: "var(--text2)" }}>Tap to add</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── FAVICON SVG (inline data URI — no external file needed) ────────────────
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="%23080B0F"/>
  <rect x="72" y="212" width="28" height="88" rx="8" fill="%23E8FF47"/>
  <rect x="52" y="228" width="24" height="56" rx="6" fill="%23E8FF47"/>
  <rect x="100" y="244" width="312" height="24" rx="12" fill="%23E8FF47"/>
  <rect x="412" y="212" width="28" height="88" rx="8" fill="%23E8FF47"/>
  <rect x="436" y="228" width="24" height="56" rx="6" fill="%23E8FF47"/>
  <rect x="180" y="296" width="152" height="3" rx="2" fill="%23E8FF47" opacity="0.35"/>
</svg>`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");

  // ── PWA: inject all head tags + register service worker ────────────────────
  useEffect(() => {
    // ── Page title ──────────────────────────────────────────────────────────
    document.title = "IronMind — Elite Fitness Tracker";

    // ── Helper: set/create a <meta> tag ────────────────────────────────────
    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };

    // ── Helper: set/create a <link> tag ────────────────────────────────────
    const addLink = (attrs) => {
      const el = document.createElement("link");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    };

    // ── Viewport (mobile-optimised) ─────────────────────────────────────────
    setMeta("viewport", "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no");

    // ── Theme colour ────────────────────────────────────────────────────────
    setMeta("theme-color", "#080B0F");

    // ── PWA manifest ────────────────────────────────────────────────────────
    if (!document.querySelector("link[rel='manifest']")) {
      addLink({ rel: "manifest", href: "/manifest.json" });
    }

    // ── Favicons ────────────────────────────────────────────────────────────
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
    addLink({ rel: "icon", type: "image/svg+xml", href: `data:image/svg+xml,${FAVICON_SVG}` });
    addLink({ rel: "icon", type: "image/png", sizes: "512x512", href: "icon-512.png" });
    addLink({ rel: "icon", type: "image/png", sizes: "192x192", href: "icon-192.png" });

    // ── Apple / iOS meta ────────────────────────────────────────────────────
    setMeta("apple-mobile-web-app-capable", "yes");
    setMeta("apple-mobile-web-app-status-bar-style", "black-translucent");
    setMeta("apple-mobile-web-app-title", "IronMind");
    addLink({ rel: "apple-touch-icon", sizes: "512x512", href: "icon-512.png" });
    addLink({ rel: "apple-touch-icon", sizes: "192x192", href: "icon-192.png" });

    // ── Android / Chrome ────────────────────────────────────────────────────
    setMeta("mobile-web-app-capable", "yes");
    setMeta("application-name", "IronMind");

    // ── Description & OG ────────────────────────────────────────────────────
    setMeta("description", "Elite fitness tracker — workouts, nutrition, AI coaching and community.");
    setMeta("og:title", "IronMind", "property");
    setMeta("og:description", "Elite fitness tracker — workouts, nutrition, AI coaching.", "property");
    setMeta("og:image", "icon-512.png", "property");

    // ── Register Service Worker ─────────────────────────────────────────────
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" })
        .then(reg => console.log("[IronMind SW] Registered, scope:", reg.scope))
        .catch(err => console.warn("[IronMind SW] Registration failed:", err));
    }
  }, []);

  const nav = [
    { id: "home", label: "Home", icon: "home" },
    { id: "ai", label: "AI", icon: "ai" },
    { id: "chat", label: "Chat", icon: "chat" },
    { id: "community", label: "Forum", icon: "users" },
    { id: "profile", label: "Profile", icon: "profile" },
  ];

  const pages = { home: <HomePage />, ai: <AIPage />, chat: <ChatPage />, community: <CommunityPage />, profile: <ProfilePage /> };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {pages[active]}
        <nav className="navbar">
          <div className="navbar-inner">
            {nav.map(item => (
              <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`}
                style={{ background: "none", border: "none", color: active === item.id ? "var(--accent)" : "var(--text2)" }}
                onClick={() => setActive(item.id)}>
                <div className="nav-icon">
                  <Icon name={item.icon} size={20} color={active === item.id ? "var(--accent)" : "var(--text2)"} />
                </div>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
