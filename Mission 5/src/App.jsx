import { useState, useEffect, useRef } from 'react';
import './App.css';

const COLUMNS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done'
};

const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#eab308', 
  low: '#10b981'
};

const PRIORITY_LABELS = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW'
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const editRef = useRef(null);

  // 💾 LOAD from localStorage (runs ONCE on mount)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kanban-tasks');
      if (saved) {
        const parsedTasks = JSON.parse(saved);
        setTasks(parsedTasks);
        console.log('✅ Loaded', parsedTasks.length, 'tasks from localStorage');
      }
    } catch (error) {
      console.error('❌ Failed to load tasks:', error);
      setTasks([]);
    }
  }, []); // Empty array = run once

  // 💾 SAVE to localStorage (runs when tasks change)
  useEffect(() => {
    if (tasks.length > 0) {
      try {
        localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
        console.log('💾 Saved', tasks.length, 'tasks to localStorage');
      } catch (error) {
        console.error('❌ Failed to save tasks:', error);
      }
    }
  }, [tasks]);

  // Focus edit input
  useEffect(() => {
    if (editingTaskId && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [editingTaskId]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      priority: newTaskPriority,
      column: COLUMNS.TODO
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id, targetColumn) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, column: targetColumn } : task
    ));
  };

  const startEditing = (id, currentText) => {
    setEditingTaskId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText.trim() } : task
    ));
    setEditingTaskId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditText('');
  };

  const tasksByColumn = {
    [COLUMNS.TODO]: tasks.filter(task => task.column === COLUMNS.TODO),
    [COLUMNS.IN_PROGRESS]: tasks.filter(task => task.column === COLUMNS.IN_PROGRESS),
    [COLUMNS.DONE]: tasks.filter(task => task.column === COLUMNS.DONE)
  };

  const getMoveButtons = (task) => {
    switch (task.column) {
      case COLUMNS.TODO:
        return (
          <>
            <button onClick={() => moveTask(task.id, COLUMNS.IN_PROGRESS)}>
              ➡️ In Progress
            </button>
            <button onClick={() => moveTask(task.id, COLUMNS.DONE)}>
              ✅ Done
            </button>
          </>
        );
      case COLUMNS.IN_PROGRESS:
        return (
          <>
            <button onClick={() => moveTask(task.id, COLUMNS.TODO)}>
              ⬅️ To Do
            </button>
            <button onClick={() => moveTask(task.id, COLUMNS.DONE)}>
              ✅ Done
            </button>
          </>
        );
      case COLUMNS.DONE:
        return (
          <button onClick={() => moveTask(task.id, COLUMNS.TODO)}>
            🔄 Restart
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Kanban Task Board</h1>
        <p>💾 Persistence Working! Refresh to test.</p>
        <div className="stats">
          Total: {tasks.length} | To Do: {tasksByColumn[COLUMNS.TODO].length} | 
          In Progress: {tasksByColumn[COLUMNS.IN_PROGRESS].length} | 
          Done: {tasksByColumn[COLUMNS.DONE].length}
        </div>
      </header>

      <div className="add-task">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="What needs to be done?"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      <div className="board">
        {Object.entries(tasksByColumn).map(([columnId, columnTasks]) => (
          <Column
            key={columnId}
            title={
              columnId === COLUMNS.TODO ? '📋 To Do' :
              columnId === COLUMNS.IN_PROGRESS ? '⚡ In Progress' :
              '✅ Done'
            }
            count={columnTasks.length}
            tasks={columnTasks}
            editingTaskId={editingTaskId}
            onDelete={deleteTask}
            onMove={moveTask}
            onEditStart={startEditing}
            onEditSave={saveEdit}
            onEditCancel={cancelEdit}
            editText={editText}
            setEditText={setEditText}
            editRef={editRef}
            getMoveButtons={getMoveButtons}
          />
        ))}
      </div>

      <footer className="footer">
        <p>✅ Refresh page - tasks persist!</p>
      </footer>
    </div>
  );
}

function Column({ 
  title, 
  count, 
  tasks, 
  editingTaskId, 
  onDelete, 
  onEditStart, 
  onEditSave, 
  onEditCancel, 
  editText, 
  setEditText, 
  editRef,
  getMoveButtons 
}) {
  return (
    <div className="column">
      <h2>{title} ({count})</h2>
      <div className="tasks">
        {tasks.length === 0 ? (
          <div className="empty-state">🎉 Nothing here! Add a task above.</div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isEditing={editingTaskId === task.id}
              onDelete={() => onDelete(task.id)}
              onEdit={() => onEditStart(task.id, task.text)}
              onSave={() => onEditSave(task.id)}
              onCancel={onEditCancel}
              editText={editText}
              setEditText={setEditText}
              editRef={editRef}
              getMoveButtons={() => getMoveButtons(task)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  isEditing,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  editText,
  setEditText,
  editRef,
  getMoveButtons
}) {
  const priorityColor = PRIORITY_COLORS[task.priority];
  const priorityLabel = PRIORITY_LABELS[task.priority];

  return (
    <div className="task-card" style={{ borderLeft: `4px solid ${priorityColor}` }}>
      <div className="task-header">
        <span className="priority-badge" style={{ backgroundColor: priorityColor }}>
          {priorityLabel}
        </span>
        <div className="task-actions">
          {!isEditing && (
            <button className="edit-btn" onClick={onEdit} title="Edit (Click)">
              ✏️
            </button>
          )}
          <button className="delete-btn" onClick={onDelete} title="Delete">
            ❌
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="edit-mode">
          <input
            ref={editRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSave();
              if (e.key === 'Escape') onCancel();
            }}
            className="edit-input"
            placeholder="Edit task..."
          />
          <div className="edit-buttons">
            <button onClick={onSave}>💾 Save</button>
            <button onClick={onCancel}>❌ Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-text" onClick={onEdit}>
            {task.text}
          </div>
          <div className="move-buttons">
            {getMoveButtons()}
          </div>
        </>
      )}
    </div>
  );
}

export default App;