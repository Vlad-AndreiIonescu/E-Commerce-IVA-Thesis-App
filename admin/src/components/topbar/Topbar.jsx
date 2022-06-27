import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin IVA</span>
        </div>
        <div className="topRight">
          <img src="https://thumbs.dreamstime.com/z/creative-element-design-stock-market-icons-collection-pixel-perfect-avatar-fashion-boss-men-clothing-icon-commercial-168197015.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
