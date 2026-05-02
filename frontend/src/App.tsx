import React, { useEffect, useState } from 'react'
import './App.css'
import type { Task } from './types.ts'
import Header from './components/Header.tsx';

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  
  const handleAddTask = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    const input = document.querySelector<HTMLInputElement>('input');
    if (!input || input.value.trim() === '') return;

    await fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ todoText: input.value.trim() }),
        }).then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log('Task added:', data);
          setTasks(currentTasks => [...currentTasks, data]);
          input.value = '';
        })
        .catch(error => console.error('Error adding task:', error));
  }

  useEffect(() => {
   
   async function getTodos() {
    await fetch('/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Tasks fetched:', data);
        setTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
   }
   
    getTodos();
    
  }, []);
  
  const handleDelete = async(e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.preventDefault();
    
    console.log('Deleting task with id:', id);
    // call backend API to delete the task
    await fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (response.status === 204 || response.status === 200) {
        // Poista task UI:sta käyttämättä responsea
        setTasks(tasks.filter(task => task.id !== id));
      }
    })
    .catch(error => console.error('Error deleting task:', error));
  }
  
  return (
    <>
    <div className="App">
      <Header />
      
      <div className='center'>
        <input className='bg-blue-50 text-black-100' type="text" placeholder="Enter a task" />
        <button className='btn rounded-full bg-blue-800 text-white text-xl' onClick={(e) => handleAddTask(e)}>Add Task</button>
      </div>
      
      <div className='center'>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet!</p>
        ) : (<>
        {tasks && tasks.map((task, index) => (
          <div key={index} className="task-item">
            <label>{task.todoName}</label>

            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => {
                const updatedDone = !task.done;
                
                const updatedTasks = tasks.map(t => 
                  t.id === task.id ? { ...t, done: updatedDone } : t
                );
                setTasks(updatedTasks);
                
                // Läheta backend-pyyntö
                fetch(`/todos/${task.id}`, {
                  headers: getAuthHeaders(),
                })
                  .then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    console.log('Task updated successfully');
                    return null;
                  })
                  .then(() => console.log('Update completed'))
                  .catch(error => console.error('Error toggling task:', error));
              }}
            />
            
            <svg onClick={(e) => handleDelete(e, task.id) } className='delete' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" /></svg>
            
          </div>
        ))}
        </>)}
      </div>
      </div>
    </div>
    </>
  )
}

export default App
