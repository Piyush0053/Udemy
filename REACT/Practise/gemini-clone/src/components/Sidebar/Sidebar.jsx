import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [sidebarExtend, setSideBarExtend] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const toggleTheme = () => {
    setDarkTheme(prev => !prev);
  };

  // Effect to apply dark theme class to body
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkTheme]);

  return (
    <div className={`sidebar ${darkTheme ? 'dark' : ''}`} 
      onMouseEnter={() => setSideBarExtend(true)} 
      onMouseLeave={() => setSideBarExtend(false)}
    >
      {/* Theme toggle button */}
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkTheme ? 'Light Mode' : 'Dark Mode'}
      </div>
      {/* Sidebar top View */}
      <div className="top">
        <img onClick={() => setSideBarExtend(prev => !prev)} className="menu" src={assets.menu_icon} alt="top" />
        <div onClick={() => newChat()} className="newchat">
          <img src={assets.plus_icon} alt="newchat" />
          {sidebarExtend ? <p>New Chat</p> : null}
        </div>
        {sidebarExtend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Sidebar Bottom View  */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {sidebarExtend ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {sidebarExtend ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {sidebarExtend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
