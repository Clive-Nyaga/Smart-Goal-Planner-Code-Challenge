import React, { useState } from 'react';
import './GoalItem.css';

function GoalItem({ goal, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
  
  // Calculate days remaining
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  
  // Determine goal status
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysRemaining < 0 && !isCompleted;
  const isWarning = daysRemaining <= 30 && daysRemaining > 0 && !isCompleted;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({
      ...editedGoal,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedGoal);
    setIsEditing(false);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`goal-item-card ${isCompleted ? 'completed-goal' : isOverdue ? 'overdue-goal' : isWarning ? 'urgent-goal' : ''}`}>
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Goal Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editedGoal.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Target Amount:</label>
              <input
                type="number"
                className="form-control"
                name="targetAmount"
                value={editedGoal.targetAmount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category:</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={editedGoal.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Deadline:</label>
              <input
                type="date"
                className="form-control"
                name="deadline"
                value={editedGoal.deadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditing(false)}>
                <i className="bi bi-x-circle"></i> Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle"></i> Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title mb-0">{goal.name}</h5>
              <span className="badge bg-secondary">{goal.category}</span>
            </div>
            
            <div className="progress mb-3" style={{ height: '20px', overflow: 'hidden' }}>
              <div
                className={`progress-bar ${isCompleted ? 'bg-success' : isOverdue ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-primary'}`}
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progressPercentage}%
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <p className="mb-1"><strong>Saved:</strong> {formatCurrency(goal.savedAmount)}</p>
                <p className="mb-1"><strong>Target:</strong> {formatCurrency(goal.targetAmount)}</p>
                <p className="mb-1"><strong>Remaining:</strong> {formatCurrency(Math.max(0, goal.targetAmount - goal.savedAmount))}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><strong>Deadline:</strong> {formatDate(goal.deadline)}</p>
                <p className="mb-1">
                  <strong>Status:</strong>{' '}
                  {isCompleted ? (
                    <span className="text-success"><i className="bi bi-check-circle-fill"></i> Completed</span>
                  ) : isOverdue ? (
                    <span className="text-danger"><i className="bi bi-exclamation-triangle-fill"></i> Overdue</span>
                  ) : isWarning ? (
                    <span className="text-warning"><i className="bi bi-clock-fill"></i> Urgent ({daysRemaining} days left)</span>
                  ) : (
                    <span>{daysRemaining} days remaining</span>
                  )}
                </p>
                <p className="mb-1"><strong>Created:</strong> {formatDate(goal.createdAt)}</p>
              </div>
            </div>
            
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setIsEditing(true)}
              >
                <i className="bi bi-pencil"></i> Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(goal.id)}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GoalItem;