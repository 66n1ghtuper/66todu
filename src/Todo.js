import React, { useState } from 'react';
import './Todo.css';
import Header from './Header'; 

const TodoApp = () => {
    const [inputValue, setInputValue] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all'); 

    const handleAddTask = () => {
        if (inputValue.trim()) {
            setTaskList(prevTasks => [...prevTasks, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleToggleTask = (index) => {
        const updatedTasks = taskList.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
    };

    const handleClearCompleted = () => {
        const remainingTasks = taskList.filter(task => !task.completed);
        setTaskList(remainingTasks);
    };

   
    const getFilteredTasks = taskList.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'incomplete') return !task.completed;
        return true; 
    });


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="todo">
            <Header onFilterChange={setCurrentFilter} />
            <div className="task-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress} 
                    placeholder="Добавьте новую задачу..."
                />
                <button onClick={handleAddTask}>+</button>
            </div>
            <ul className="task-list">
                {getFilteredTasks.map((task, index) => (
                    <li key={index} className="task-item" onClick={() => handleToggleTask(index)}>
                        <span className="check-icon">
                            {task.completed ? '✅' : '⬜️'}
                        </span>
                        <span className={task.completed ? 'completed' : ''}>
                            {task.text}
                        </span>
                        <button className="delete" onClick={(e) => { e.stopPropagation(); handleDeleteTask(index); }}>
                            ❌ 
                        </button>
                    </li>
                ))}
            </ul>
         
            {(currentFilter === 'completed' || currentFilter === 'all') && (
                <button onClick={handleClearCompleted} className="clear">
                    Очистить выполненные
                </button>
            )}
        </div>
    );
};

export default TodoApp;
