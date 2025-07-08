import React, {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import api from '../axios';
import { Task } from '../types/Task';
import { TaskContext } from '../context/TaskContext';
import "./MainLayout.css";

export default function MainLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/task')
      .then(res => setTasks(res.data))
      .catch(err => console.error("Lỗi lấy task:", err));
  }, []);

  // Add new task function
  const addTask = async (taskData: Partial<Task>) => {
    try {
      console.log("Adding new task:", taskData);
      const res = await api.post('/task', taskData);
      setTasks(prev => [...prev, res.data]);
      return res.data;
    } 
    catch (err) {
      console.error("Error adding new task:", err); 
      throw err;
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask }}>
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <div className="page-content">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </TaskContext.Provider>
    
  );
}