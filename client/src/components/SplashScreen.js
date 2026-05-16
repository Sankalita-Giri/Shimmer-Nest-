import React, { useEffect, useState } from 'react';

const floatingItems = [
  { emoji: '🌸', top: '8%',  left: '8%',  size: '2.2rem', delay: '0s',   dur: '4s'  },
  { emoji: '✨', top: '12%', left: '40%', size: '1.4rem', delay: '0.5s', dur: '3s'  },
  { emoji: '🌷', top: '10%', right: '10%',size: '2rem',   delay: '1s',   dur: '5s'  },
  { emoji: '🧶', top: '40%', left: '4%',  size: '2rem',   delay: '0.3s', dur: '4.5s'},
  { emoji: '💫', top: '45%', right: '5%', size: '1.8rem', delay: '0.8s', dur: '3.5s'},
  { emoji: '🌼', top: '75%', left: '8%',  size: '1.8rem', delay: '0.2s', dur: '4s'  },
  { emoji: '✨', top: '82%', left: '35%', size: '1.2rem', delay: '1.2s', dur: '3s'  },
  { emoji: '🎀', top: '78%', right: '9%', size: '2rem',   delay: '0.6s', dur: '5s'  },
  { emoji: '🌸', top: '25%', right: '4%', size: '1.4rem', delay: '1.5s', dur: '3.5s'},
  { emoji: '💐', top: '60%', right: '3%', size: '1.6rem', delay: '0.9s', dur: '4.2s'},
];

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('exit'), 2400);
    const doneTimer = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(holdTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(145deg, #fdf0ff 0%, #fce4f3 35%, #f3e8ff 65%, #ede9fe 100%)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
        overflow: 'hidden',
      }}
    >
      {/* ── Background blobs ─────────────────────────────── */}
      <div style={{ position:'absolute', top:'-10%',  left:'-10%',  width:'55%', height:'55%', borderRadius:'50%', background:'radial-gradient(circle, rgba(216,180,254,0.55) 0%, transparent 70%)', animation:'blobFloat 7s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'-8%', right:'-8%',  width:'55%', height:'55%', borderRadius:'50%', background:'radial-gradient(circle, rgba(251,182,206,0.55) 0%, transparent 70%)', animation:'blobFloat 9s ease-in-out infinite reverse' }} />
      <div style={{ position:'absolute', top:'30%',   right:'8%',   width:'35%', height:'35%', borderRadius:'50%', background:'radial-gradient(circle, rgba(196,181,253,0.4) 0%, transparent 70%)',  animation:'blobFloat 6s ease-in-out infinite 1.5s' }} />
      <div style={{ position:'absolute', top:'50%',   left:'5%',    width:'30%', height:'30%', borderRadius:'50%', background:'radial-gradient(circle, rgba(249,168,212,0.35) 0%, transparent 70%)', animation:'blobFloat 8s ease-in-out infinite 0.5s' }} />

      {/* ── Floating emojis ──────────────────────────────── */}
      {floatingItems.map((el, i) => (
        <div key={i} style={{
          position: 'absolute', top: el.top, left: el.left, right: el.right,
          fontSize: el.size, opacity: 0.85, userSelect: 'none', pointerEvents: 'none',
          animation: `floatPetal ${el.dur} ease-in-out infinite`, animationDelay: el.delay,
        }}>{el.emoji}</div>
      ))}

      {/* ── Top ribbon label — REMOVED, now inside card ── */}

      {/* ── Main content card ────────────────────────────── */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255,255,255,0.7)',
        borderRadius: '2.5rem', padding: '2.5rem 3.5rem',
        boxShadow: '0 24px 80px rgba(139,92,246,0.15), 0 8px 24px rgba(236,72,153,0.1)',
        animation: 'splashEnter 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
        maxWidth: '420px', width: '90%',
      }}>

        {/* Welcome ribbon — centered inside card */}
        <div style={{
          background: 'linear-gradient(90deg, #a855f7, #ec4899)',
          color: 'white', borderRadius: '99px', padding: '6px 28px',
          fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(168,85,247,0.35)', whiteSpace: 'nowrap',
          marginBottom: '20px',
        }}>
          ✨ &nbsp; Welcome to our studio &nbsp; ✨
        </div>

        {/* Logo with pulsing rings */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div style={{
            position: 'absolute', inset: '-14px', borderRadius: '50%',
            border: '2px solid rgba(196,181,253,0.5)',
            animation: 'ringPulse 2s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '-6px', borderRadius: '50%',
            border: '2px solid rgba(251,182,206,0.6)',
            animation: 'ringPulse 2s ease-in-out infinite 0.5s',
          }} />
          <div style={{
            width: '150px', height: '150px', borderRadius: '50%',
            background: 'white', overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(139,92,246,0.3)',
          }}>
            <img src="/shimmer-nest-logo.png" alt="Shimmer-Nest" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Brand name */}
        <div style={{ marginBottom: '4px' }}>
          <span style={{
            fontSize: '2.6rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>ShimmerNest</span>
          <span style={{ fontSize: '2.6rem', fontWeight: 900, fontStyle: 'italic', color: '#f472b6' }}>.</span>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#c084fc', marginBottom: '20px'
        }}>
          handmade with love 🧶
        </p>

        {/* Divider with diamonds */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px', width:'100%' }}>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, transparent, rgba(196,181,253,0.6))' }} />
          <span style={{ fontSize:'0.8rem', color:'#c084fc' }}>✦</span>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, rgba(196,181,253,0.6), transparent)' }} />
        </div>

        {/* Decorative star row */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          {['✦','🌸','✦','💫','✦','🌸','✦'].map((s, i) => (
            <span key={i} style={{
              fontSize: s.length > 1 ? '1rem' : '0.7rem',
              color: i % 2 === 0 ? 'rgba(196,181,253,0.8)' : undefined,
              animation: `floatPetal ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}>{s}</span>
          ))}
        </div>

        {/* Quote */}
        <p style={{
          fontSize: '0.72rem', fontWeight: 600, color: '#9333ea', textAlign: 'center',
          fontStyle: 'italic', lineHeight: 1.7, marginBottom: '22px',
          maxWidth: '280px', opacity: 0.85,
        }}>
          &ldquo; Every stitch is made with love,<br/>every piece tells a story. &rdquo;
        </p>

        {/* Progress bar */}
        <div style={{ width:'100%', height:'4px', borderRadius:'99px', background:'rgba(196,181,253,0.25)', overflow:'hidden' }}>
          <div style={{
            height:'100%', borderRadius:'99px',
            background: 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
            backgroundSize: '200% 100%',
            animation: 'progressFill 2.4s ease-out forwards, shimmerMove 1.5s linear infinite',
          }} />
        </div>
        <p style={{ fontSize:'0.55rem', color:'#d8b4fe', marginTop:'8px', letterSpacing:'0.15em', textTransform:'uppercase' }}>
          Preparing your experience...
        </p>
      </div>

      {/* ── Bottom tagline ───────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '24px', whiteSpace: 'nowrap',
        animation: 'splashEnter 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.4s both',
      }}>
        {['🌸 Hand-Crocheted', '✨ Made to Order', '💜 Shipped with Care'].map((item) => (
          <span key={item} style={{
            fontSize: '0.62rem', fontWeight: 700, color: 'rgba(147,51,234,0.7)',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>{item}</span>
        ))}
      </div>

      <style>{`
        @keyframes splashEnter {
          from { opacity:0; transform:translateY(24px) scale(0.94); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        @keyframes blobFloat {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(16px,-18px) scale(1.06); }
        }
        @keyframes floatPetal {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-14px) rotate(12deg); }
        }
        @keyframes ringPulse {
          0%,100% { transform:scale(1);    opacity:0.7; }
          50%      { transform:scale(1.06); opacity:1;   }
        }
        @keyframes progressFill {
          from { width:0%; }
          to   { width:100%; }
        }
        @keyframes shimmerMove {
          0%   { background-position:100% 0; }
          100% { background-position:-100% 0; }
        }
      `}</style>
    </div>
  );
}
