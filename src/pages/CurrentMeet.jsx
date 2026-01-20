import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMedia } from '../context/MediaContext';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, Users, MessageSquare, MoreVertical, X, Copy, Send, Search, Smile, Hand } from 'lucide-react';

const FlowbitMeetingPage = () => {
 
  const [isDarkTheme, setIsDarkTheme] = useState(false);
 const [raisedHands, setRaisedHands] = useState([]); // just leave empty array
const [emojiReactions, setEmojiReactions] = useState({}); // just leave empty object

const [showEmojiPicker, setShowEmojiPicker] = useState(false); // toggle emoji picker

  const [activePanel, setActivePanel] = useState(null); // 'chat' | 'people' | 'details'
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, message: 'Hey bro, you free ah? Need to ask something.', isMe: false },
    { id: 2, message: "Ya I'm free. What do you want to ask?", isMe: true }
  ]);

  const participants = [
    { id: 1, name: 'John Dev', initial: 'J', color: '#C94A5C', isHost: true },
    { id: 2, name: 'Karthik S', initial: 'K', color: '#10B981', isHost: false },
    { id: 3, name: 'Lavanya K', initial: 'L', color: '#D9923F', isHost: false },
    { id: 4, name: 'Diya P', initial: 'D', color: '#B91C1C', isHost: false },
    { id: 5, name: 'Aarav M', initial: 'A', color: '#8B5CF6', isHost: false },
    { id: 6, name: 'Diya P', initial: 'D', color: '#B23939', isHost: false },
    { id: 7, name: 'Rahul T', initial: 'R', color: '#5B6FC7', isHost: false },
    { id: 8, name: 'Aarav M', initial: 'A', color: '#059669', isHost: false },
    { id: 9, name: 'Sneha R', initial: 'S', color: '#16A34A', isHost: false },
    { id: 10, name: 'Vikram J', initial: 'V', color: '#C77D3F', isHost: false },
    { id: 11, name: 'Ananya L', initial: 'A', color: '#14B8A6', isHost: false },
    { id: 12, name: 'Aarav M', initial: 'A', color: '#8B5CF6', isHost: false }
  ];
  const emojiList = ['👍', '👏', '❤️', '😂', '🎉', '🙌'];


   const {
    localStream,
    isMicOn,
    isCameraOn,
    isScreenSharing,
    startMedia,
    toggleMic,
    toggleCamera,
    startScreenShare,
    stopScreenShare
  } = useMedia();

   useEffect(() => {
    startMedia();
  }, []);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), message: chatMessage, isMe: true }
    ]);
    setChatMessage('');
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F2F3F5;
          padding: 20px;
        }

        .app-container.dark { background-color: #1a1a1a; }

        .meeting-container {
          width: 100%;
          max-width: 1280px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          position: relative;
        }

        .dark .meeting-container { background: #2a2a2a; }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 20px;
        }

        .video-tile {
          aspect-ratio: 16/9;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }

        .tile-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.15) 100%);
        }

        .avatar {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), rgba(0,0,0,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .avatar-text {
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .name-tag {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: none;
          backdrop-filter: blur(8px);
          padding: 6px 10px;
          border-radius: 5px;
        }

        .name-text {
          font-size: 13px;
          font-weight: 500;
          color: white;
          letter-spacing: 0.2px;
        }

        .mic-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .control-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-top: 1px solid #e8e8e8;
          background: #fafafa;
        }

        .dark .control-bar {
          background: #1f1f1f;
          border-top-color: #333;
        }

        .control-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .time-info {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          letter-spacing: 0.3px;
        }

        .dark .time-info { color: #9ca3af; }

        .control-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #e5e7eb;
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
        }

        .control-btn:hover {
          background: #d1d5db;
          transform: scale(1.05);
        }

        .dark .control-btn {
          background: #374151;
          color: #d1d5db;
        }

        .dark .control-btn:hover {
          background: #4b5563;
        }

        .control-btn.active {
          background: #ef4444;
          color: white;
        }

        .control-btn.active:hover {
          background: #dc2626;
        }

        .end-btn {
          width: auto;
          padding: 0 24px;
          border-radius: 22px;
          background: #f42c2cff;
          color: white;
        }

        .end-btn:hover {
          background: #ff0000ff;
        }

        .panel-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 360px;
          background: white;
          box-shadow: -2px 0 8px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .dark .panel-overlay {
          background: #2a2a2a;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #e8e8e8;
        }

        .dark .panel-header {
          border-bottom-color: #333;
        }

        .panel-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .dark .panel-title {
          color: #f3f4f6;
        }

        .close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .close-btn:hover {
          background: #f3f4f6;
        }

        .dark .close-btn:hover {
          background: #374151;
        }

        .panel-body {
          padding: 20px;
          height: calc(100% - 72px);
          overflow-y: auto;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .dark .search-bar {
          background: #1f2937;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          color: #111827;
        }

        .dark .search-input {
          color: #f3f4f6;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .section-header {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #6b7280;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
        }

        .participant-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
        }

        .participant-row:hover {
          background: #f9fafb;
        }

        .dark .participant-row:hover {
          background: #1f2937;
        }

        .row-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: white;
        }

        .row-info {
          flex: 1;
          min-width: 0;
        }

        .row-name {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .dark .row-name {
          color: #f3f4f6;
        }

        .row-role {
          font-size: 11px;
          color: #6b7280;
        }

        .row-icons {
          display: flex;
          gap: 10px;
          color: #9ca3af;
        }

        .muted { color: #ef4444 !important; }

        .detail-section {
          margin-bottom: 20px;
        }

        .detail-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #6b7280;
          margin-bottom: 12px;
          display: block;
        }

        .link-box {
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          font-size: 14px;
          color: #0051ffff;
          word-break: break-all;
          margin-bottom: 12px;
        }

        .dark .link-box {
          background: #1f2937;
          color: #328dfcff;
        }

        .copy-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border: 1px solid #d1d5db;
          background: transparent;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          color: #374151;
          transition: all 0.15s;
        }

        .dark .copy-btn {
          border-color: #4b5563;
          color: #d1d5db;
        }

        .copy-btn:hover {
          background: #f9fafb;
        }

        .dark .copy-btn:hover {
          background: #1f2937;
        }

        .chat-container {
          height: calc(100% - 72px);
          display: flex;
          flex-direction: column;
        }

        .messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          max-width: 75%;
          display: flex;
        }

        .message.me {
          align-self: flex-end;
        }

        .message-bubble {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.4;
        }

        .message:not(.me) .message-bubble {
          background: #f3f4f6;
          color: #111827;
        }

        .dark .message:not(.me) .message-bubble {
          background: #1f2937;
          color: #f3f4f6;
        }

        .message.me .message-bubble {
          background: #3b82f6;
          color: white;
        }

        .input-container {
          padding: 16px;
          border-top: 1px solid #e8e8e8;
          display: flex;
          gap: 10px;
        }

        .dark .input-container {
          border-top-color: #333;
        }

        .chat-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
          background: white;
          color: #111827;
        }

        .dark .chat-input {
          background: #1f2937;
          border-color: #4b5563;
          color: #f3f4f6;
        }

        .send-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
        }

        .send-btn:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .video-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .video-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 16px; }
          .control-bar { flex-wrap: wrap; gap: 8px; }
          .panel-overlay { width: 100%; }
        }
         
.dark .control-btn.end-btn {
  background: #f42c2cff;
  color: white;
}

.dark .control-btn.end-btn:hover {
  background: #ff0000ff;
}

      `}</style>

      <div className={`app-container ${isDarkTheme ? 'dark' : ''}`}>
        <div className="meeting-container">
        <div className="video-grid">
  {participants.map((p, index) => {
    const isLocal = index === 0;

    return (
      <div key={p.id} className="video-tile" style={{ backgroundColor: p.color }}>
        {/* LOCAL USER: Show video only if camera is on */}
        {isLocal && localStream && isCameraOn ? (
          <video
            className="video-element"
            ref={(el) => {
              if (el) el.srcObject = localStream;
            }}
            autoPlay
            muted
          />
        ) : (
          <>
            {/* SHOW INITIALS IF CAMERA OFF */}
            <div className="tile-gradient"></div>
            <div className="avatar">
              <span className="avatar-text">{p.initial}</span>
            </div>
          </>
        )}

        {/* NAME TAG */}
        <div className="name-tag">
          <span className="name-text">{p.name}</span>
        </div>

        {/* MIC INDICATOR */}
        <div className="mic-indicator">
          {isLocal
            ? isMicOn
              ? <Mic size={14} color="#ffffff" />
              : <MicOff size={14} color="#ffffff" />
            : p.isMicOn
              ? <Mic size={14} color="#ffffff" />
              : <MicOff size={14} color="#ffffff" />
          }
        </div>

        {/* OPTIONAL: SCREEN SHARE ICON */}
        {isLocal && isScreenSharing && (
          <div className="screen-share-indicator">
            <Monitor size={16} color="#ffffff" />
          </div>
        )}
      </div>
    );
  })}
</div>



          <div className="control-bar">
            <div className="control-section">
              <span className="time-info">02:30 PM | qfn-nohn-yup</span>
            </div>

            <div className="control-section">
              <button
  className={`control-btn ${!isMicOn ? 'active' : ''}`}
  onClick={toggleMic}
>
  {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
</button>

              <button
  className={`control-btn ${!isCameraOn ? 'active' : ''}`}
  onClick={toggleCamera}
>
  {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
</button>

              <button
  className={`control-btn ${isScreenSharing ? 'active' : ''}`}
  onClick={() =>
    isScreenSharing ? stopScreenShare() : startScreenShare()
  }
>
  <Monitor size={20} />
</button>

              <button className="control-btn">
                <Smile size={20} />
              </button>
              <button className="control-btn">
                <span style={{ fontSize: '14px', fontWeight: '600' }}>CC</span>
              </button>
              {/* Raise Hand */}
<button
  className={`control-btn ${raisedHands.includes(1) ? 'active' : ''}`}
  onClick={() => {
    const participantId = 1; // local participant
    setRaisedHands(prev =>
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId) // lower hand
        : [...prev, participantId] // raise hand
    );
  }}
>
  <Hand size={20} />
</button>


{/* Emoji Picker */}
<div style={{ position: 'relative' }}>
  <button
    className="control-btn"
    onClick={() => setShowEmojiPicker(prev => !prev)}
  >
    <Smile size={20} />
  </button>

  {showEmojiPicker && (
    <div
      style={{
        position: 'absolute',
        bottom: '50px',
        left: '-10px',
        background: isDarkTheme ? '#1f1f1f' : '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '8px',
        display: 'flex',
        gap: '6px',
        zIndex: 20,
      }}
    >
      {emojiList.map((emoji) => (
        <span
          key={emoji}
          style={{ fontSize: '20px', cursor: 'pointer' }}
          onClick={() => {
            const participantId = 1; // local participant ID
            setEmojiReactions(prev => ({ ...prev, [participantId]: emoji }));
            setShowEmojiPicker(false);
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )}
</div>


              <button className="control-btn" onClick={() => setActivePanel('details')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
              </button>
              <button className="control-btn">
                <MoreVertical size={20} />
              </button>
              <button className="control-btn end-btn">
                <PhoneOff size={20} />
              </button>
            </div>

            <div className="control-section">
              <button className="control-btn" onClick={() => setActivePanel('people')}>
                <Users size={20} />
              </button>
              <button className="control-btn" onClick={() => setActivePanel('chat')}>
                <MessageSquare size={20} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {activePanel && (
              <motion.div
                initial={{ x: 360 }}
                animate={{ x: 0 }}
                exit={{ x: 360 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="panel-overlay"
              >
                {activePanel === 'details' && (
                  <>
                    <div className="panel-header">
                      <h3 className="panel-title">Meeting Details</h3>
                      <button className="close-btn" onClick={() => setActivePanel(null)}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="panel-body">
                      <div className="detail-section">
                        <label className="detail-label">Joining Information</label>
                        <div className="link-box">https://meet.google.com/qfn-nohn-yup</div>
                        <button className="copy-btn">
                          <Copy size={16} />
                          <span>Copy Joining Info</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activePanel === 'people' && (
                  <>
                    <div className="panel-header">
                      <h3 className="panel-title">People</h3>
                      <button className="close-btn" onClick={() => setActivePanel(null)}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="panel-body">
                      <div className="search-bar">
                        <Search size={16} color="#9ca3af" />
                        <input type="text" placeholder="Search for People" className="search-input" />
                      </div>
                      <div className="section-header">
                        <span>IN THE MEETING</span>
                        <span>Members <strong>12</strong> ▲</span>
                      </div>
                      {participants.map((p) => (
                        <div key={p.id} className="participant-row">
                          <div className="row-avatar" style={{ backgroundColor: p.color }}>{p.initial}</div>
                          <div className="row-info">
                            <div className="row-name">{p.name}</div>
                            {p.isHost && <div className="row-role">Meeting Host</div>}
                          </div>
                          <div className="row-icons">
                            <MicOff size={16} className="muted" />
                            <MoreVertical size={16} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activePanel === 'chat' && (
                  <>
                    <div className="panel-header">
                      <h3 className="panel-title">In Call Message</h3>
                      <button className="close-btn" onClick={() => setActivePanel(null)}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="chat-container">
                      <div className="messages">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className={`message ${msg.isMe ? 'me' : ''}`}>
                            <div className="message-bubble">{msg.message}</div>
                          </div>
                        ))}
                      </div>
                      <div className="input-container">
                        <input
                          type="text"
                          className="chat-input"
                          placeholder="Send a Message"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="send-btn" onClick={handleSendMessage}>
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default FlowbitMeetingPage;