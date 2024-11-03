document.addEventListener("DOMContentLoaded", () => {
  const toDoList = document.getElementById("todo-list");
  const addBtn = document.getElementById("add-btn");
  const toDoInput = document.getElementById("todo-input");

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToDom(task));
  };

  const saveTasks = (task) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const removeTasks = (taskText) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTaskToDom = (task) => {
    const li = document.createElement("li");
    li.textContent = task;
    const removeBtn = document.createElement("span");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", () => {
      toDoList.removeChild(li);
      removeTasks(task);
    });
    li.appendChild(removeBtn);
    toDoList.appendChild(li);
  };

  addBtn.addEventListener("click", () => {
    const task = toDoInput.value.trim();
    if (task !== "") {
      addTaskToDom(task);
      saveTasks(task);
      toDoInput.value = "";
    }
  });
  loadTasks();
});
