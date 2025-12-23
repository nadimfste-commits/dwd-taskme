import React, { useEffect, useState } from "react";
import TaskForm from "./taskPage/TaskForm";
import TaskTable from "./taskPage/TaskTable";

export interface Task {
  id:string,
  taskName:string,
  description:string,
  dueDate: string,
  remuneration: number,
  vehicle:boolean,
  mode: string,
  taskStatus: string
}

const TaskPage : React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const getTasks = async () => {

      try {
        const response = await fetch('http://localhost:4000/tasks',
                        {method:'GET'})
        if(!response.ok) throw new Error("la réponse à GET n'a pas réussi!")
        const data = await response.json();
        setTasks(data);

      } catch (error) {
        console.error('error')
      }
    }

    useEffect(()=>{
        getTasks();
    }, [])

    const  handleDeleteTask = (task: Task) => {
       setTasks(e => (e.filter(t=>t.id!==task.id)));
    }

    const handleEditClick = (task: Task) => {
        if(task) setEditingTask(task);
    }

    return(
        <>
            <TaskForm tasks={tasks} setTasks={setTasks} editingTask={editingTask}  setEditingTask={setEditingTask}/><TaskTable onEdit={handleEditClick} tasks = {tasks} onDelete={handleDeleteTask} />
        </>
    )
}

export default TaskPage;