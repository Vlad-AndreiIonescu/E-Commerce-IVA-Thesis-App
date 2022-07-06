import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper" style={{backgroundColor:'black'}}>
        
          <span className="logo" style={{color:'white', alignItems:'center'}}>Admin</span>
       
        <div className="topRight">
          <img src="https://thumbs.dreamstime.com/z/creative-element-design-stock-market-icons-collection-pixel-perfect-avatar-fashion-boss-men-clothing-icon-commercial-168197015.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
