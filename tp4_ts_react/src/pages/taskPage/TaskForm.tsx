import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Task } from "../TaskPage";
import { NotificationContext } from "../../context/NotificationContext";

interface TaskPropos {
    editingTask : Task | null;
    setEditingTask: (task:Task) => void;
    setTasks: React.Dispatch<SetStateAction<Task[]>>
    tasks: Task[]
}

const TaskForm : React.FC<TaskPropos> = ({editingTask, setEditingTask, setTasks, tasks}) => {
    const [taskName, setTaskName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [dueDate, setDueDate] = useState(""); 
    const [remuneration, setRemuneration] = useState<number | "">(""); 
    const [vehicle, setVehicle] = useState(false); 
    const [mode, setMode] = useState("manuel"); 
    const [taskStatus, setTaskStatus] = useState("ouverte");

    const notificationContext = useContext(NotificationContext);

    useEffect (()=>{
        if(editingTask)
        {
            setTaskName(editingTask.taskName);
            setDescription(editingTask.description);
            setDueDate(editingTask.dueDate);
            setMode(editingTask.mode);
            setTaskStatus(editingTask.taskStatus);
            setRemuneration(editingTask.remuneration);
            setVehicle(editingTask.vehicle);
        }else{
            setTaskName('');
            setDescription('');
            setDueDate('');
            setMode('');
            setTaskStatus('');
            setRemuneration('');
            setVehicle(false);
        }
    }, [editingTask])

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if(editingTask) {
                    try {
            const task = {
                id: editingTask.id,
                taskName: taskName,
                mode: mode,
                taskStatus: taskStatus,
                vehicle:vehicle,
                remuneration:remuneration,
                description:description,
                dueDate:dueDate
            }
            const response = await fetch(`http://localhost:4000/tasks/${editingTask.id}`,
                            {method:'PUT', 
                             headers:{'Content-type':'application/json'},
                             body: JSON.stringify(task)
                            })
            if(!response.ok) throw new Error("la réponse à PUT n'a pas réussi!")
            const data = await response.json();
            setTasks(prev => prev.map(t=>(t.id===data.id?t=data:t))); 

            const notification = {id:crypto.randomUUID(), 
                message:'Update avec succee', 
                type:'success',
                 duration:15000}
            notificationContext?.showNotification(notification)
            } catch (error) {
                console.error('error')
            }
        }else {
            try {
                const task = {
                id: crypto.randomUUID(),
                taskName: taskName,
                mode: mode,
                taskStatus: taskStatus,
                vehicle:vehicle,
                remuneration:remuneration,
                description:description,
                dueDate:dueDate
            }
            const response = await fetch(`http://localhost:4000/tasks`,
                            {method:'POST', 
                             headers:{'Content-type':'application/json'},
                             body: JSON.stringify(task)
                            })
                        
                        
            if(!response.ok) throw new Error("la réponse à POST n'a pas réussi!")
            const data = await response.json();
            setTasks([...tasks, data]);

            } catch (error) {
                console.error('error')
            }
        }
    }

    return (<>
        <aside>
      <h2>{editingTask?'Editer une tâche':'Créer une tâche'}</h2>
      <form onSubmit={(e:React.FormEvent)=>handleSubmit(e)}>
        <label htmlFor="taskName">Nom :</label>
        <input value={taskName} onChange={(e)=>setTaskName(e.target.value)} type="text" id="taskName" name="taskName" required placeholder="Nom de la tâche" aria-required="true"/><br/>

        <label htmlFor="description">Description :</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} id="description" name="description" required placeholder="Détails de la tâche" aria-required="true"></textarea><br/>

        <label htmlFor="dueDate">Date :</label>
        <input value={dueDate} onChange={(e)=>setDueDate(e.target.value)} type="date" id="dueDate" name="dueDate" required aria-required="true"/><br/>

        <label htmlFor="remuneration">Rémunération :</label>
        <input value={remuneration} onChange={(e)=>setRemuneration(Number(e.target.value))} type="number" id="remuneration" name="remuneration"/><br/>

        <label htmlFor="vehicle">Besoin en véhicule :</label>
        <input checked={vehicle} onChange={(e)=>setVehicle(e.target.checked)} type="checkbox" id="vehicle" name="vehicle"/><br/>

        <label htmlFor="mode">Mode d’affectation :</label>
        <select value={mode} onChange={(e)=>setMode(e.target.value)} id="mode" name="mode">
          <option value="manuel">Manuel</option>
          <option value="semi">Semi-automatisé</option>
          <option value="auto">Automatisé</option>
        </select><br/>

        <label htmlFor="status">Statut :</label>
        <select value={taskStatus} onChange={(e)=>setTaskStatus(e.target.value)} id="status" name="status">
          <option value="ouverte">Ouverte</option>
          <option value="en-cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select><br/>

        <button id="btn-submit" type="submit">
            {editingTask?'Editer la tâche':'Ajouter la tâche'}
        </button>
      </form>
    </aside>
    </>)
}

export default TaskForm;