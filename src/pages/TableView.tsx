import React, {useState, useEffect} from "react";
import api from '../axios'
import "./TableView.css";

type Task = {
  id: string;
  title: string;
  status: string;
  dueDate: number;
  estimate: number;
  descriptione: string;
}

export default function TableView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/task')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy danh sách Task:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>


  return (
    <div className="table-view">
      <table className="task-table">
        <thead className="table-header">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Estimate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status || 'New Task'}</td>
              <td>{new Date(task.dueDate * 1000).toLocaleDateString()}</td>
              <td>{task.estimate}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
