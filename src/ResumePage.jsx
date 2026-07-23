import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playSfx } from "./utils/sfx";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "University / Coursework", rank: 3 },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "Frontend / Design / UI", rank: 4 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "Featured Work", rank: 5 },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "Internships / Roles", rank: 2 },
];

const EDUCATION_ROWS = [
  { index: "01", title: "General Education", status: "Complete" },
  { index: "02", title: "Computer Science Core", status: "In Progress" },
  { index: "03", title: "Elective Track", status: "Queued" },
  { index: "04", title: "Capstone Prep", status: "Pending" },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        setActive((i) => {
          const next = Math.max(0, i - 1);
          if (next !== i) playSfx("deck_ui_misc_10");
          return next;
        });
      }
      if (e.key === "ArrowDown") {
        setActive((i) => {
          const next = Math.min(ITEMS.length - 1, i + 1);
          if (next !== i) playSfx("deck_ui_misc_10");
          return next;
        });
      }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        playSfx("deck_ui_out_of_game_detail");
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video 
        src={src} 
        autoPlay 
        loop 
        muted 
        playsInline 
        onPlay={() => setVideoLoaded(true)}
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 0.6s ease-in-out"
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 12vh;
          left: 3.5vw;
          width: min(42vw, 650px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
          transform: scale(0.95);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 88px;
          line-height: 0.9;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 2px;
          margin: 0 0 4px 14px;
          text-shadow: none;
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 104px;
          background: rgba(10, 18, 65, 0.92);
          border: 1px solid rgba(0, 210, 255, 0.25);
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          border-color: #ffffff;
          box-shadow: 8px 6px 0 #d63232;
          transform: translateX(8px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 10px 20px 10px 60px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -8px;
          width: 50px;
          height: 62px;
          background: #091244;
          border: 2px solid #00d2ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.4);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: #00d2ff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #050a24;
          border-color: #d63232;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #ffffff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 52px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #ffffff;
          text-shadow: 1px 1px 0 #000;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #050a24;
          text-shadow: none;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          color: #00d2ff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 60px;
          line-height: 0.82;
          color: #00d2ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #050a24;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 60px;
          right: 14px;
          bottom: 8px;
          height: 30px;
          background: #00d2ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 16px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #050a24;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          line-height: 1;
          letter-spacing: 1px;
          color: #050a24;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #ffffff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 12vh;
          right: 4vw;
          width: min(39vw, 540px);
          min-height: 68vh;
          z-index: 12;
          padding: 22px 24px;
          background: rgba(5, 12, 44, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 210, 255, 0.35);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            12px 12px 0 rgba(0, 0, 0, 0.6);
          overflow: hidden;
          pointer-events: all;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 84px;
          padding: 0 16px;
          background: linear-gradient(90deg, #00d2ff 0%, #8ef5ff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #050a24;
          box-shadow: none;
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 52px;
          padding: 0 14px;
          background: rgba(10, 20, 75, 0.94);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(0, 210, 255, 0.15);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(0, 210, 255, 0.25);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: #00d2ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          line-height: 1;
          color: #ffffff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #00d2ff;
        }
        .resume-detail-bottom {
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid rgba(0, 210, 255, 0.2);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #00d2ff;
          margin-bottom: 10px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .p3-back-btn {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(17, 17, 17, 0.9);
          border: 2px solid #c4001a;
          color: #ffffff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          padding: 6px 18px;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.6);
          transition: all 0.22s ease;
          pointer-events: auto;
        }
        .p3-back-btn:hover {
          background: #c4001a;
          border-color: #ffffff;
          color: #ffffff;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .p3-back-btn {
            top: 12px;
            right: 12px;
            font-size: 16px;
            padding: 4px 12px;
          }

          .resume-stack {
            position: relative;
            top: 4vh;
            left: 50%;
            transform: translateX(-50%) scale(1);
            width: 90vw;
          }

          .resume-list-tag {
            font-size: 42px;
            margin: 0 0 2px 8px;
          }

          .resume-card {
            height: 68px;
          }

          .resume-card-inner {
            padding: 6px 12px 6px 44px;
          }

          .resume-badge {
            width: 36px;
            height: 44px;
            top: 6px;
            left: -4px;
          }
          .resume-badge-text {
            font-size: 22px;
          }

          .resume-title {
            font-size: 28px;
          }

          .resume-rank-label {
            font-size: 16px;
          }
          .resume-rank-number {
            font-size: 36px;
          }

          .resume-subtitle-bar {
            left: 44px;
            height: 22px;
            bottom: 4px;
          }
          .resume-subtitle {
            font-size: 16px;
          }

          .resume-detail-panel {
            position: relative;
            top: 3vh;
            left: 50%;
            transform: translateX(-50%);
            right: auto;
            width: 90vw;
            min-height: auto;
            margin-top: 12px;
            padding: 14px 16px;
          }

          .resume-detail-top {
            grid-template-columns: 40px 1fr auto;
            min-height: 56px;
            padding: 0 10px;
            gap: 8px;
          }
          .resume-detail-top-index {
            font-size: 28px;
          }
          .resume-detail-top-title {
            font-size: 24px;
          }
          .resume-detail-top-progress {
            font-size: 24px;
          }

          .resume-detail-row {
            grid-template-columns: 32px 1fr auto;
            min-height: 40px;
            padding: 0 10px;
            gap: 8px;
          }
          .resume-detail-row-index {
            font-size: 18px;
          }
          .resume-detail-row-title {
            font-size: 18px;
          }
          .resume-detail-status {
            font-size: 16px;
          }

          .resume-detail-bottom-title {
            font-size: 22px;
          }
          .resume-detail-bullet {
            font-size: 16px;
          }
        }

      `}</style>

      <button
        className="p3-back-btn"
        onClick={() => {
          playSfx("deck_ui_out_of_game_detail");
          navigate(-1);
        }}
      >
        <span>◄</span> BACK
      </button>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                if (active !== index) playSfx("deck_ui_misc_10");
                setActive(index);
              }}
              onClick={() => {
                if (active !== index) playSfx("deck_ui_misc_10");
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">EDUCATION LOG</div>
              <div className="resume-detail-top-progress">7/5</div>
            </div>

            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet" style={{ color: "#ff4d4d", letterSpacing: "3px", fontSize: "24px" }}>CLASSIFIED</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
