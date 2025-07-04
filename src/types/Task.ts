export type TaskStatus = 'New task' | 'Scheduled' | 'In progress' | 'Completed';
export type TaskType = 'Strategic' | 'Operational' | 'Financial';
export type Priority = 'Lowest' | 'Low' | 'Medium' | 'High' | 'Critical';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    type: TaskType;
    dueDate?: string;       
    assignee: string;        
    estimate?: number;    
    priority?: Priority;  
}