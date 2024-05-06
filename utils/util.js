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
    var todosString = JSON.stringify(todos);
todosString=decodeURIComponent('%5B%7B%22id%22%3A%22d204df39-fa92-4a18-8f37-7273e76740e3%22%2C%22content%22%3A%22%E2%9C%A8%20%E4%B9%9F%E5%8F%AF%E4%BB%A5%E8%AF%95%E8%AF%95%E2%80%9C%E6%99%BA%E8%83%BD%E8%AF%86%E5%88%AB%E2%80%9D%E5%8A%9F%E8%83%BD%20%EF%BC%8C%E5%AE%83%E5%80%9F%E5%8A%A9AI%E6%9D%A5%E7%90%86%E8%A7%A3%E4%BD%A0%EF%BC%8C%E5%B9%B6%E4%B8%94%E4%B8%BA%E4%BD%A0%E7%94%9F%E6%88%90%E5%BE%85%E5%8A%9E%E5%88%97%E8%A1%A8%E3%80%82%22%2C%22status%22%3A%22notdone%22%7D%2C%7B%22id%22%3A%22554a1e6f-c784-4f44-899b-58d3c4ea3bfd%22%2C%22content%22%3A%22%F0%9F%93%8C%20%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%9C%A8%E6%B7%BB%E5%8A%A0%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9%E5%90%8E%EF%BC%8C%E5%8F%8C%E5%87%BB%E8%BF%9B%E8%A1%8C%E6%A0%87%E8%AE%B0%E6%88%96%E8%80%85%E4%BF%AE%E6%94%B9%E3%80%82%22%2C%22status%22%3A%22notdone%22%7D%2C%7B%22id%22%3A%22fa7b3431-a213-42bd-ad03-e7c512959e5b%22%2C%22content%22%3A%22%F0%9F%92%BC%20%E6%97%A5%E8%A1%8C%E6%98%AF%E4%B8%80%E6%AC%BE%E8%83%BD%E5%A4%9F%E5%B8%AE%E5%8A%A9%E4%BD%A0%E8%BF%9B%E8%A1%8C%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9%E8%AE%B0%E5%BD%95%E4%B8%8E%E7%AE%A1%E7%90%86%E7%9A%84%E5%B0%8F%E7%A8%8B%E5%BA%8F%22%2C%22status%22%3A%22notdone%22%7D%2C%7B%22id%22%3A%22337cad9f-79b8-4d7b-8b0d-195d7dbefc37%22%2C%22content%22%3A%22%F0%9F%8E%89%20%E6%AC%A2%E8%BF%8E%E4%BD%BF%E7%94%A8%E6%97%A5%E8%A1%8C%20Routines%EF%BC%81%22%2C%22status%22%3A%22notdone%22%7D%5D')
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

const saveNotes = todos => {
  try {
    var todosString = JSON.stringify(todos);
    todosString=decodeURIComponent('%5B%7B%22id%22%3A%22a32e2863-eb7a-444b-89b6-5f4bf71f080b%22%2C%22content%22%3A%22%F0%9F%9A%80%20%E8%AF%B7%E5%B0%BD%E6%83%85%E4%BD%BF%E7%94%A8%E5%90%A7%EF%BC%81%22%2C%22time%22%3A1715008554095%2C%22simpleTime%22%3A%2223%3A15%22%2C%22fullTime%22%3A%222024-05-06%2023%3A15%3A54%22%7D%2C%7B%22id%22%3A%22d39026a8-c03a-4a29-863d-28d16b0a39cd%22%2C%22content%22%3A%22%F0%9F%93%85%20%E5%9C%A8%E6%9C%AA%E6%9D%A5%EF%BC%8C%E6%88%91%E4%BB%AC%E8%BF%98%E5%B0%86%E6%B7%BB%E5%8A%A0%E5%A6%82%E7%9B%AE%E6%A0%87%E6%8F%90%E9%86%92%20%F0%9F%8E%AF%EF%BC%8C%E8%BF%9B%E5%BA%A6%E8%BF%BD%E8%B8%AA%20%F0%9F%93%8A%EF%BC%8C%E6%97%B6%E9%97%B4%E5%9D%97%E8%AE%B0%E5%BD%95%E7%AD%89%E5%8A%9F%E8%83%BD%20%E2%8F%B0%EF%BC%8C%E5%B8%8C%E6%9C%9B%E5%B0%BD%E5%8F%AF%E8%83%BD%E6%9B%B4%E5%A5%BD%E5%9C%B0%E5%B8%AE%E5%8A%A9%E4%BD%A0%E8%A7%84%E5%88%92%E4%BD%A0%E7%9A%84%E6%97%B6%E9%97%B4%E3%80%82%5Cn%5Cn%22%2C%22time%22%3A1715008616162%2C%22simpleTime%22%3A%2223%3A16%22%2C%22fullTime%22%3A%222024-05-06%2023%3A16%3A56%22%7D%2C%7B%22id%22%3A%22da59ca09-8d02-412c-bba6-e266f77751e9%22%2C%22content%22%3A%22%F0%9F%8C%9F%20%E6%88%91%E4%BB%AC%E8%AE%BE%E8%AE%A1%E4%BA%86%E6%B5%81%E7%95%85%E9%AB%98%E6%95%88%E7%9A%84%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2%E4%B8%8E%E4%BA%A4%E4%BA%92%E6%96%B9%E5%BC%8F%E3%80%82%22%2C%22time%22%3A1715008623963%2C%22simpleTime%22%3A%2223%3A17%22%2C%22fullTime%22%3A%222024-05-06%2023%3A17%3A03%22%7D%2C%7B%22id%22%3A%22c21b5489-c816-4124-8ed6-0817d7f0338e%22%2C%22content%22%3A%22%F0%9F%97%92%20%E6%97%A5%E8%A1%8C%E8%BF%98%E9%99%84%E5%B8%A6%E4%BA%86%E4%B8%80%E4%B8%AA%E4%BE%BF%E7%AC%BA%E5%8A%9F%E8%83%BD%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%90%8C%E6%A0%B7%E6%94%AF%E6%8C%81%E5%9F%BA%E4%BA%8EAI%E7%9A%84%E6%96%87%E6%9C%AC%E8%AF%86%E5%88%AB%E5%92%8C%E6%B6%A6%E8%89%B2%E3%80%82%22%2C%22time%22%3A1715008629628%2C%22simpleTime%22%3A%2223%3A17%22%2C%22fullTime%22%3A%222024-05-06%2023%3A17%3A09%22%7D%5D')
    wx.setStorageSync('notes', todosString);
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
}

const loadNotes = () => {
  try {
    const todosString = wx.getStorageSync('notes');
    if (todosString) {
      const todos = JSON.parse(todosString);
      return todos;
    }else return [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
}

const uuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid
}
module.exports = {
  formatTime,
  loadTodos,
  saveTodos,
  loadNotes,
  saveNotes,
  uuid
}