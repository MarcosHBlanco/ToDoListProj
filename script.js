document.addEventListener("DOMContentLoaded", () => {
  const toDoList = document.getElementById("todo-list");
  const addBtn = document.getElementById("add-btn");
  const toDoInput = document.getElementById("todo-input");

  // Load tasks from local storage and display them
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskData) => addTaskToDom(taskData));
  };

  // Save a new task to local storage
  const saveTasks = (taskData) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData); // Save taskData directly
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Remove task from local storage
  const removeTasks = (taskToRemove) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Filter out the task to remove it based on `text` property
    tasks = tasks.filter((task) => task.text !== taskToRemove.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Calculate how many days ago the task was created
  const calculateDaysAgo = (dateString) => {
    const today = new Date();
    const createdAt = new Date(dateString);
    const timeDiff = today - createdAt;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff === 0 ? "Today" : `${daysDiff} days ago`;
  };

  // Add a task to the DOM
  const addTaskToDom = (taskData) => {
    const { text, createdAt } = taskData;

    // Create main list item
    const li = document.createElement("li");
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
    li.textContent = text;

    const daysAgoText = calculateDaysAgo(createdAt);
    const taskText = document.createElement("span");
    taskText.textContent = `created: ${daysAgoText}`;
    taskText.classList.add("opacity-25", "float-end");

    const removeBtn = document.createElement("span");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("float-end", "me-2");

    removeBtn.addEventListener("click", () => {
      removeTasks(taskData); // Remove from local storage
      toDoList.removeChild(li); // Remove from DOM
    });

    li.appendChild(taskText);
    li.appendChild(removeBtn);
    toDoList.appendChild(li);
  };

  // Add button click event to create new tasks
  addBtn.addEventListener("click", () => {
    const taskText = toDoInput.value.trim();
    if (taskText !== "") {
      const taskData = { text: taskText, createdAt: new Date().toISOString() };
      addTaskToDom(taskData); // Display the new task immediately
      saveTasks(taskData); // Save the task to local storage
      toDoInput.value = ""; // Clear input
    }
  });

  // Load tasks when the page loads
  loadTasks();
});
