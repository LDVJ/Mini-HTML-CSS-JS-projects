const dateTime = document.querySelector(".date-time");
const taskInput = document.getElementById("task-input");
const submitBtn = document.getElementById("submit-btn");
const allFilterBtn = document.getElementById("all-btn");
const activeFilterBtn = document.getElementById("active-btn");
const completeFilterBtn = document.getElementById("complete-btn");
const listContainer = document.querySelector(".list-values");
const itemCountSpan = document.getElementById("item-count-span");
const clearBtn = document.getElementById("clear-btn");
const defaultIcon = document.querySelector(".default-icon");
const tabFilters = document.querySelectorAll(".tab");

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = new Date();

let definedtasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskStatus = Object.freeze({
  PENDING: "pending",
  COMPLETE: "complete",
});

let currentFilter = allFilterBtn.id;

dateTime.innerText = `${dayList[date.getDay()]}, ${monthList[date.getMonth()]} ${date.getDate()}`;

submitBtn.addEventListener("click", (e) => {
  newTask(e);
});

taskInput.addEventListener("keydown", (e) => newTask(e));

function newTask(event) {
  if (event.type === "click" || event.key === "Enter") {
    let createTask = document.createElement("div");
    let createTaskID = Date.now();
    let taskValue = taskInput.value;
    if (!taskValue.trim()) return;
    createTask.classList.add("to-do");
    createTask.innerHTML = `<input type="checkbox" name="task" id="${createTaskID}">
    <label for="${createTaskID}"><span class="task-label ${taskStatus.PENDING}">${taskValue}</span></label>`;

    listContainer.append(createTask);

    taskInput.value = "";

    definedtasks.push({
      id: createTaskID,
      task: taskValue,
      status: taskStatus.PENDING,
    });
    localStorage.setItem("tasks", JSON.stringify(definedtasks));

    itemCountSpan.innerText = definedtasks.length;

    checkList();
    applyFilter(currentFilter);
  } else return;
}

function checkList() {
  if (listContainer.childElementCount > 0) {
    defaultIcon.classList.remove("active");
    listContainer.classList.add("active");
    return true;
  } else {
    defaultIcon.classList.add("active");
    listContainer.classList.remove("active");
    return false;
  }
}

checkList();

listContainer.addEventListener("click", (e) => {
  if (e.target.type !== "checkbox") return;
  let taskID = e.target.id;
  let checkboxElement = e.target.parentElement;
  let checkStatus = checkboxElement.querySelector("label span");
  if (checkStatus.classList.contains("pending") && e.target.checked) {
    checkStatus.classList.remove("pending");
    checkStatus.classList.add("complete");
    updateLocal(taskID);
  } else if (checkStatus.classList.contains("complete") && !e.target.checked) {
    checkStatus.classList.remove("complete");
    checkStatus.classList.add("pending");
    updateLocal(taskID);
  }

  setTimeout(() => applyFilter(currentFilter), 1000);
});

function updateLocal(taskID) {
  taskID = Number(taskID);
  definedtasks.forEach((task) => {
    if (task.id === taskID) {
      if (task.status === taskStatus.PENDING) {
        task.status = taskStatus.COMPLETE;
      } else {
        task.status = taskStatus.PENDING;
      }
    }
  });

  localStorage.setItem("tasks", JSON.stringify(definedtasks));
}

function setLocalValues() {
  definedtasks.forEach((task) => {
    let createTask = document.createElement("div");
    createTask.classList.add("to-do");
    createTask.innerHTML = `<input type="checkbox" name="task" id="${task.id}">
    <label for="${task.id}"><span class="task-label ${task.status}">${task.task}</span></label>`;
    if (task.status === taskStatus.COMPLETE) {
      createTask.querySelector("input").checked = true;
    } else if (task.status === taskStatus.PENDING) {
      createTask.querySelector("input").checked = false;
    }
    listContainer.append(createTask);
    itemCountSpan.innerText = definedtasks.length;
  });
  checkList();
}

tabFilters.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabFilters.forEach((tab) => tab.classList.remove("active"));

    tab.classList.add("active");

    if (listContainer.childElementCount > 0) {
      currentFilter = tab.id;
      applyFilter(currentFilter);
    }
  });
});

function applyFilter(ID) {
  const allTasks = document.querySelectorAll(".to-do");
  allTasks.forEach((task) => {
    if (ID === activeFilterBtn.id) {
      if (task.querySelector("label span").classList.contains("pending")) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    } else if (ID === completeFilterBtn.id) {
      if (task.querySelector("label span").classList.contains("complete")) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    } else if (ID === allFilterBtn.id) {
      task.style.display = "flex";
    }
  });
}

clearBtn.addEventListener("click", () => {
  const allTasks = document.querySelectorAll(".to-do");
  allTasks.forEach((task) => {
    if (
      task.querySelector("label span").classList.contains(taskStatus.COMPLETE)
    ) {
      let targetId = parseInt(task.querySelector("input").id);
      task.remove();
      definedtasks = definedtasks.filter((dtask) => dtask.id !== targetId);
      itemCountSpan.innerText = definedtasks.length;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(definedtasks));
  checkList();
});

setLocalValues();

const target_task = document.getElementById("1234");
