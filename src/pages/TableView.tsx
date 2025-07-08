import React, {useState, useEffect} from "react";
import api from '../axios'
import "./TableView.css";
import { Task } from "../types/Task";
import { useTaskContext } from '../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function TableView() {
  const { tasks, setTasks } = useTaskContext()!;
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<keyof Task | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const statusOptions = ["New Task", "Scheduled", "In Progress", "Completed"];

  useEffect(() => {
  api
    .get('/task')
    .then((res) => setTasks(res.data))
    .catch((err) => console.error('Lỗi khi lấy danh sách Task:', err))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>

  //Delete task function
  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa task này không?");
    if (!confirmed) return;

    api.delete(`/task/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => {
        console.error("Lỗi khi xóa task:", err);
      });
  };

  // Update task function
  const updateTask = (id: string, data: Partial<Task>) => {
    return api.put(`/task/${id}`, data);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateTask(id, { status: newStatus })
      .then(() => {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch(err => console.error("Lỗi khi cập nhật task:", err));
  };

  // Handle sorting function
  const handleSort = (column: keyof Task) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  }

  // Sort tasks based on the selected column and direction
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortBy) return 0;

    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "string" && typeof valB === "string") {
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);

    //TODO: If want to update backend after drag, need to add order property and call API here
  }

  return (
    <div className="table-view">
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="task-table">
          <thead className="table-header">
            <tr>
              <th onClick={() => handleSort("title")}>
                Title {sortBy === "title" && (sortDirection === "asc" ? "↑" : "↓")} </th>
              <th onClick={() => handleSort("status")}>
                Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")} </th>
              <th onClick={() => handleSort("dueDate")}>
                Due Date {sortBy === "dueDate" && (sortDirection === "asc" ? "↑" : "↓")} </th>
              <th onClick={() => handleSort("estimate")}>
                Estimate {sortBy === "estimate" && (sortDirection === "asc" ? "↑" : "↓")} </th>
              <th >Actions</th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-table-body" direction="vertical">
            {(provided) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sortedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td>{task.title}</td>
                        
                        <td onClick={() => setEditingId(task.id)}>
                          {editingId === task.id ? (
                            <select
                              value={task.status || ""}
                              onBlur={() => setEditingId(null)}
                              onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            >
                              {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span>{task.status || "New Task"}</span>
                          )}
                        </td>

                        <td>{new Date(task.dueDate * 1000).toLocaleDateString()}</td>
                        <td>{task.estimate}</td>
                        <td>
                          <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
}
