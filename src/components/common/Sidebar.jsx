import React, { useState, useEffect } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
} from "@coreui/react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Logout icon
import image from "../../assets/Images/Icon.svg";
import profile from "../../assets/Images/profile.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export const Sidebar = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("")
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    navigate("/"); 
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setUserEmail(decodedToken.roles.split("_")[1]); 
        setUserName(decodedToken.sub);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
    else {
      console.log("Token not found");
    }
  }, []);

  return (
    <CSidebar
      className="border-end"
      unfoldable
      onMouseEnter={() => setShowEmail(true)}
      onMouseLeave={() => setShowEmail(false)}
    >
      {/* Brand Icon */}
      <CSidebarHeader className="mt-4 border-bottom">
        <CSidebarBrand className="flex items-center space-x-3">
          <img src={image} className="h-8" alt="brand-logo" />
          {showEmail && (
            <span
              className="text-gray-700 text-xl font-bold pl-2"
              style={{ textDecoration: "none !important" }}
            >
              PMS
            </span>
          )}
        </CSidebarBrand>
      </CSidebarHeader>

      {/* Profile Section */}
      <CSidebarHeader className="mt-2 mb-2 relative">
        <CSidebarBrand className="flex items-center space-x-3">
          <img src={profile} className="h-10 rounded-full" alt="profile" />
          {showEmail && (
            <span
              className="text-gray-500 text-sm font-medium "
              style={{ textDecoration: "none !important" }}
            >
              <span className="">
                  {`Hello, ${userName} 👋`} 
              </span>
              <br/>
              <span className="text-xs">
                  {userEmail || "Loading..."}
              </span>
            </span>
          )}
        </CSidebarBrand>
      </CSidebarHeader>

      {/* Sidebar Menu */}
      <CSidebarNav>
        <CNavItem href="/home">
          <DashboardIcon className="nav-icon !text-slate-500" /> Dashboard
        </CNavItem>
        <CNavItem href="/home/add-promotion">
          <ShoppingBagIcon className="nav-icon !text-slate-500" /> Add Promo
        </CNavItem>
        <CNavItem href="/home/users">
          <GroupIcon className="nav-icon !text-slate-500" /> Users
        </CNavItem>
      </CSidebarNav>

      {/* Logout Button */}
      <div className="mt-auto mb-4 mx-2">
        <button
          onClick={handleLogout}
          className="w-full hover:bg-prm text-black font-bold py-2 rounded"
        >
          <ExitToAppIcon className="" />
          {showEmail && (
            <span
              className="text-gray-700 text-sm font-medium"
              style={{ textDecoration: "none !important" }}
            >
              Logout
            </span>
          )}
        </button>
      </div>
    </CSidebar>
  );
};