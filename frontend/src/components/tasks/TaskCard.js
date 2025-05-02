import { useState } from 'react';
import TaskForm from './TaskForm';
import { format } from 'date-fns';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await onUpdate(task._id, { status: newStatus });
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task._id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {showEditForm && (
        <TaskForm
          task={task}
          onClose={() => setShowEditForm(false)}
          onSubmit={(taskData) => {
            onUpdate(task._id, taskData);
            setShowEditForm(false);
          }}
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : task.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {task.status.replace('-', ' ')}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>
            Created: {format(new Date(task.createdAt), 'MMM d, yyyy h:mm a')}
          </p>
          {task.completedAt && (
            <p>
              Completed: {format(new Date(task.completedAt), 'MMM d, yyyy h:mm a')}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleStatusChange('todo')}
            className={`px-3 py-1 text-xs rounded ${
              task.status === 'todo'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            To Do
          </button>
          <button
            onClick={() => handleStatusChange('in-progress')}
            className={`px-3 py-1 text-xs rounded ${
              task.status === 'in-progress'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className={`px-3 py-1 text-xs rounded ${
              task.status === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Completed
          </button>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowEditForm(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}