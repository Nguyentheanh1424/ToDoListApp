import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TableView from "./pages/TableView";
import KanbanView from "./pages/KanbanView";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Navigate to="table" />} />
          <Route path="table" element={<TableView />} />
          <Route path="kanban" element={<KanbanView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
