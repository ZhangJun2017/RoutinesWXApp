const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const saveTodos = todos => {
  try {
    const todosString = JSON.stringify(todos);
    wx.setStorageSync('todos', todosString);
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
}

const loadTodos = () => {
  try {
    const todosString = wx.getStorageSync('todos');
    if (todosString) {
      const todos = JSON.parse(todosString);
      return todos;
    }
    return [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
}

module.exports = {
  formatTime,
  loadTodos,
  saveTodos
}