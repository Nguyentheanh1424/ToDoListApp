import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Tasks", path: "/tasks", icon: "📝" },
  { name: "Calendars", path: "/calendars", icon: "📅" },
  { name: "Notes", path: "/notes", icon: "🗒️" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h2>Tools</h2>
      <nav className="nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${
              location.pathname.startsWith(item.path) ? "active" : ""
            }`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}