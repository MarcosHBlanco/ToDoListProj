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
    const taskData = { text: task, createdAt: new Date().toISOString() };
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const removeTasks = (taskText) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const calculateDaysAgo = (dateString) => {
    const today = new Date();
    const createdAt = new Date(dateString);
    console.log("Today's date:", today);
    console.log("Created at:", createdAt);
    const timeDiff = today - createdAt;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    console.log("Days difference:", daysDiff);
    return daysDiff === 0 ? "Today" : `${daysDiff} days ago`;
  };

  const addTaskToDom = (taskData) => {
    const { text, createdAt } = taskData;

    const li = document.createElement("li");
    li.textContent = text;
    li.classList.add(
      "list-group-item",
      "m-1",
      "px-2",
      "border",
      "border-danger-subtle",
      "rounded",
      "w-75",
      "overflow-auto",
      "focus-ring"
    );
    const daysAgoText = calculateDaysAgo(createdAt);
    const taskText = document.createElement("span");
    taskText.textContent = `created: ${daysAgoText}`;
    taskText.classList.add("opacity-25", "float-end", "mx-2");

    const removeBtn = document.createElement("span");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("float-end");

    removeBtn.addEventListener("click", () => {
      toDoList.removeChild(li);
      removeTasks(task);
    });
    li.appendChild(taskText);
    li.appendChild(removeBtn);
    toDoList.appendChild(li);
  };

  addBtn.addEventListener("click", () => {
    const task = toDoInput.value.trim();
    if (task !== "") {
      const taskData = { text: task, createdAt: new Date().toISOString() };
      addTaskToDom(taskData);
      saveTasks(taskData);
      toDoInput.value = "";
    }
  });
  loadTasks();
});
