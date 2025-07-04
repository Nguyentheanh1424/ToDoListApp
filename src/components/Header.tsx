import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {

    const size = 100;
    const avatarUrl = `https://i.pravatar.cc/${size}`;

    const handleAddTask = () => {
        // Thêm hàm
    };

      const handleSearch = () => {
        // Thêm hàm
    };

    return (
        <header className="header">
            <button className="add-task-btn" onClick={handleAddTask}></button>
            
            <div className="view-switch">
                <NavLink
                    to="/dashboard/table"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    📋 Table view
                </NavLink>

                <NavLink
                    to="/dashboard/kanban"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    > 
                    🗂️ Kanban board
                </NavLink>
            </div>

            <button className="search-btn" onClick={handleSearch}> 🔍 </button>

            <div className="user-info">
                <span className="username">Thế Anh</span>
                <img src={avatarUrl} alt="avatar" className="avatar" />
            </div>
        </header>
    );
}
