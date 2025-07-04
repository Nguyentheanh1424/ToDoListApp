import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
      <Header />
      <div className="page-content">
        <Outlet />
      </div>
</div>
    </div>
  );
}