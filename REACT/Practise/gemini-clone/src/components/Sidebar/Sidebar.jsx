import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
const Sidebar = () => {
  const [sidebarExtend, setSideBarExtend] = useState(false);

  return (
    // SideBAr
    <div className="sidebar">
      {/* Sidebar top View */}
      <div className="top">
        {/* It can add the functionality that if we click on the sidebar it will shows all the hiddn texts
             */}
        <img onClick={()=>setSideBarExtend(prev=>!prev)} className="menu" src={assets.menu_icon} alt="top" />
        <div className="newchat">
          <img src={assets.plus_icon} alt="newchat" />
          {sidebarExtend ? <p>New Chat</p> : null}
        </div>
        {sidebarExtend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>What is react ...</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Sidebar Bottom View  */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {sidebarExtend? <p>Help</p>:null}
          
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
            {sidebarExtend?<p>Activity</p>:null}
          
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
            {sidebarExtend? <p>Settings</p>:null}
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
