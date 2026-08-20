
const checkDeadlineStatus = (deadlineDate) => {
  const now = new Date();
  const deadline = new Date(deadlineDate);
  
 
  const diffTime = deadline - now;
  
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return { status: 'Expired', daysRemaining: 0, alert: 'none' };
  } else if (daysRemaining <= 7) {
    return { status: 'Urgent', daysRemaining, alert: 'high' };
  } else if (daysRemaining <= 30) {
    return { status: 'Approaching', daysRemaining, alert: 'medium' };
  }

  return { status: 'Open', daysRemaining, alert: 'low' };
};

module.exports = { checkDeadlineStatus };