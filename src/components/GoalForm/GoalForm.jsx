import React, { useState } from 'react';
import './GoalForm.css';

function GoalForm({ onAddGoal, categories = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    savedAmount: 0,
    category: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new goal object with the form data
    const newGoal = {
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Call the onAddGoal function passed from the parent component
    onAddGoal(newGoal);
    
    // Reset the form
    setFormData({
      name: '',
      targetAmount: '',
      savedAmount: 0,
      category: '',
      deadline: '',
    });
  };

  return (
    <div className="goal-form-container">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0"><i className="bi bi-plus-circle"></i> Add New Goal</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Goal Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Travel Fund"
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="targetAmount" className="form-label">Target Amount ($)</label>
              <input
                type="number"
                className="form-control"
                id="targetAmount"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="e.g., 5000"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="savedAmount" className="form-label">Initial Saved Amount ($)</label>
              <input
                type="number"
                className="form-control"
                id="savedAmount"
                name="savedAmount"
                value={formData.savedAmount}
                onChange={handleChange}
                placeholder="e.g., 0"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              {categories.length > 0 ? (
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category...</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Travel, Emergency, Education"
                  required
                />
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">Deadline</label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-success w-100 mt-3"><i className="bi bi-plus-lg"></i> Add Goal</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GoalForm;