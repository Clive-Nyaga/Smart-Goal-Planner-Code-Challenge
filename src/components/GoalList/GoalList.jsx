import React, { useState } from 'react';
import GoalItem from '../GoalItem/GoalItem.jsx';
import './GoalList.css';

function GoalList({ goals, onDelete, onUpdate }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('');

  // Get unique categories for filter dropdown
  const categories = [...new Set(goals.map(goal => goal.category))];

  // Sort and filter goals
  const filteredGoals = goals
    .filter(goal => filterCategory === '' || goal.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'progress') {
        return (b.savedAmount / b.targetAmount) - (a.savedAmount / a.targetAmount);
      }
      return 0;
    });

  return (
    <div className="goal-list-container">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0"><i className="bi bi-list-check"></i> Your Goals</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Sort by:</label>
              <select 
                className="form-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="deadline">Deadline</option>
                <option value="progress">Progress</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Filter by category:</label>
              <select 
                className="form-select" 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredGoals.length === 0 ? (
            <div className="alert alert-info">No goals found. Add a new goal to get started!</div>
          ) : (
            <div className="goals-container">
              {filteredGoals.map(goal => (
                <GoalItem 
                  key={goal.id} 
                  goal={goal} 
                  onDelete={onDelete} 
                  onUpdate={onUpdate} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GoalList;