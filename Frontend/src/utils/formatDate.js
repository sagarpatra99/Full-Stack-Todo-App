export const formatDate = (date) => {
  const taskDate = new Date(date);
//   const now = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const taskDay = new Date(taskDate);
  taskDay.setHours(0, 0, 0, 0);

  const time = taskDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();

  if (taskDay.getTime() === today.getTime()) {
    return `Today, ${time}`;
  }

  if (taskDay.getTime() === tomorrow.getTime()) {
    return `Tomorrow, ${time}`;
  }

  if (taskDay.getTime() === yesterday.getTime()) {
    return `Yesterday, ${time}`;
  }

  return taskDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
};