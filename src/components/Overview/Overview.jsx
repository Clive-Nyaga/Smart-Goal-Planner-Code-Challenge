import React from 'react';
import './Overview.css';

function Overview({ goals }) {
  // Calculate total saved amount across all goals
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  
  // Calculate total target amount across all goals
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  
  // Count completed goals
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  // Count goals with deadlines within 30 days that are not complete
  const today = new Date();
  const urgentGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return daysRemaining <= 30 && daysRemaining > 0 && goal.savedAmount < goal.targetAmount;
  }).length;
  
  // Count overdue goals
  const overdueGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    return deadline < today && goal.savedAmount < goal.targetAmount;
  }).length;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Calculate overall progress percentage
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="overview-container">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0"><i className="bi bi-graph-up"></i> Savings Overview</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3 stat-card">
                <div className="card-body overview-card">
                  <h5 className="card-title">Total Goals</h5>
                  <p className="display-4">{goals.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3 stat-card">
                <div className="card-body overview-card">
                  <h5 className="card-title">Completed Goals</h5>
                  <p className="display-4">{completedGoals}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3 stat-card">
                <div className="card-body overview-card">
                  <h5 className="card-title">Total Saved</h5>
                  <p className="display-4">{formatCurrency(totalSaved)}</p>
                  <p className="text-muted">of {formatCurrency(totalTarget)} target</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3 stat-card">
                <div className="card-body overview-card">
                  <h5 className="card-title">Overall Progress</h5>
                  <div className="progress mt-2 mb-2" style={{ height: '30px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${overallProgress}%` }}
                      aria-valuenow={overallProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {overallProgress}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3 stat-card warning-card">
                <div className="card-body overview-card">
                  <h5 className="card-title">Urgent Goals</h5>
                  <p className="display-4">{urgentGoals}</p>
                  <p className="text-muted">due within 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3 stat-card danger-card">
                <div className="card-body overview-card">
                  <h5 className="card-title">Overdue Goals</h5>
                  <p className="display-4">{overdueGoals}</p>
                  <p className="text-muted">past deadline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;