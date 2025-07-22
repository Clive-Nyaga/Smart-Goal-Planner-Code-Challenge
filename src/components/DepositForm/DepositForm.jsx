import React, { useState, useMemo } from 'react';
import './DepositForm.css';

function DepositForm({ goals, onMakeDeposit }) {
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter out completed goals
  const activeGoals = useMemo(() => {
    return goals.filter(goal => goal.savedAmount < goal.targetAmount);
  }, [goals]);

  // Calculate remaining amount for selected goal
  const selectedGoal = formData.goalId ? goals.find(goal => goal.id === formData.goalId) : null;
  const remainingAmount = selectedGoal ? selectedGoal.targetAmount - selectedGoal.savedAmount : 0;
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.goalId) newErrors.goalId = 'Please select a goal';
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (selectedGoal && parseFloat(formData.amount) > remainingAmount) {
      newErrors.amount = `Amount exceeds the remaining goal amount (${remainingAmount.toFixed(2)})`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Call the onMakeDeposit function passed from the parent component
      onMakeDeposit(formData.goalId, parseFloat(formData.amount))
        .then(() => {
          // Reset the form on success
          setFormData({
            goalId: '',
            amount: ''
          });
          setErrors({});
        })
        .catch(error => {
          setErrors({ submit: error.message || 'Failed to make deposit' });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="deposit-form-container">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0"><i className="bi bi-piggy-bank"></i> Make a Deposit</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="goalId" className="form-label">Select Goal</label>
              <select
                className={`form-select ${errors.goalId ? 'is-invalid' : ''}`}
                id="goalId"
                name="goalId"
                value={formData.goalId}
                onChange={handleChange}
              >
                <option value="">Choose a goal...</option>
                {activeGoals.length > 0 ? (
                  activeGoals.map(goal => (
                    <option key={goal.id} value={goal.id}>
                      {goal.name} ({(goal.savedAmount / goal.targetAmount * 100).toFixed(0)}% complete)
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No active goals available</option>
                )}
              </select>
              {errors.goalId && <div className="invalid-feedback">{errors.goalId}</div>}
              {activeGoals.length === 0 && <div className="form-text text-muted">All goals are completed! Create a new goal to make deposits.</div>}
            </div>
            
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount ($)</label>
              <input
                type="number"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g., 100"
                min="0.01"
                step="0.01"
              />
              {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
              {selectedGoal && (
                <div className="form-text">
                  Remaining to goal: ${remainingAmount.toFixed(2)} of ${selectedGoal.targetAmount.toFixed(2)}
                </div>
              )}
            </div>
            
            {errors.submit && <div className="alert alert-danger mb-3">{errors.submit}</div>}
            
            <button 
              type="submit" 
              className="btn btn-info w-100 text-white mt-3" 
              disabled={isSubmitting || activeGoals.length === 0}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                <>
                  <i className="bi bi-cash-coin"></i> Make Deposit
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DepositForm;