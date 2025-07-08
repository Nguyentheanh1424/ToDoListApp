import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useTaskContext } from '../context/TaskContext';
import "./Header.css";

type Task = {
    id: string;
    title: string;
    status?: string;
    dueDate: number;
    estimate: number;
    description: string;
}

export default function Header() {
    const { addTask } = useTaskContext()!;
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        status: 'New Task',
        dueDate: new Date().toISOString().split('T')[0],
        estimate: 0,
        description: ''
    });
    const statusOptions = ["New Task", "Scheduled", "In Progress", "Completed"];

    const size = 50;
    const avatarUrl = `https://i.pravatar.cc/${size}`;

    

    const handleAddTask = () => {
        setShowModal(true);
    };

    const handleSubmitNewTask = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            alert("Please enter a title for the new task.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const taskData = {
            ...formData,
            dueDate: Math.floor(new Date(formData.dueDate).getTime() / 1000)
            };
            
            if (addTask) {
            await addTask(taskData);
            }
            
            handleCloseModal();
            alert("Task added successfully!");
            
        } catch (err) {
            console.error("Error adding task:", err);
            alert("Failed to add new task. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
        };

        const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            title: '',
            status: 'New Task',
            dueDate: new Date().toISOString().split('T')[0],
            estimate: 0,
            description: ''
        });
        };

        const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        };

        const handleSearch = () => {
    };

    return (
        <header className="header">
            <button className="add-task-btn" onClick={handleAddTask}>Add Task</button>
            
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

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Add New Task</h3>
                        <button className="close-btn" onClick={handleCloseModal}>×</button>
                    </div>
                    
                    <form onSubmit={handleSubmitNewTask}>
                        <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            required
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                        >
                            {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        </div>

                        <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            id="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="estimate">Estimate (hours)</label>
                        <input
                            id="estimate"
                            type="number"
                            min="0"
                            value={formData.estimate}
                            onChange={(e) => handleInputChange('estimate', parseInt(e.target.value) || 0)}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Enter task description (optional)"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                        />
                        </div>

                        <div className="modal-actions">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Task'}
                        </button>
                        <button type="button" onClick={handleCloseModal}>
                            Cancel
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            )}
        </header>
    );
}
