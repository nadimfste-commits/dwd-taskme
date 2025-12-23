import React, { useEffect, useState } from "react";
import { Task } from "../TaskPage";

interface TaskProp {
    tasks: Task[];
    onDelete: (task:Task)=>void;
    onEdit: (task:Task)=>void;
}

const TaskTable : React.FC<TaskProp> = ({tasks, onDelete, onEdit}) => {

    const deleteTask = async (task:Task) => {
        try {
        if(!window.confirm("Etes vous sur de vouloir supprimer le task"+ task.id))
            return;
        const response = await fetch(`http://localhost:4000/tasks/${task.id}`,
                        {method:'DELETE'})
        if(!response.ok) throw new Error("la réponse à DELETE n'a pas réussi!")
        onDelete(task);

      } catch (error) {
        console.error('error')
      }
    }

    return(<>
        <section aria-labelledby="tasks-list">
      <h2 id="tasks-list">Liste des tâches</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="taskTableBody">
         {
            tasks.map(t => (
              <tr key={t.id}>
                    <td>{t.taskName}</td>
                    <td>{t.description}</td>
                    <td>{t.dueDate}</td>
                    <td>{t.taskStatus}</td>
                    <td><button onClick={()=>onEdit(t)} className="edit">editer</button>
                    <button onClick={()=>deleteTask(t)} className="delete">supprimer</button>
                    </td>
              </tr>
            )
            )
         }
        </tbody>
      </table>

    </section>
    </>)
}

export default TaskTable;