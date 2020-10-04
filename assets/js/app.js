const addForm = document.querySelector(".add");
let lists = document.querySelector(".list-collection");
let addInput = document.querySelector(".add-input");
let allItems = document.querySelectorAll(".item");
const searchTodo = document.querySelector(".search-input");
// LocalStorage
let tasks;
if (localStorage.getItem("tasks") == null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
// Add Task
addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = addInput.value.trim();
  if (task != "") {
    // LocalStorage SetItem
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const html = `
    <li class="list-group-item item inline-dif">
       ${task}
       <a class="dlt" >
       <i class="fas fa-trash-alt"></i>
       </a>
    </li>`;

    lists.innerHTML += html;
    addInput.value = "";
  } else {
    alert("Task Add Kor");
  }
});

// Show Todo from LocalStorage

tasks.forEach(function (task) {
  const html = `
  <li class="list-group-item item inline-dif">
  ${task}
  <a class="dlt"><i class="fas fa-trash-alt"></i></a>
  </li>
  `;
  lists.innerHTML += html;
  console.log("hello");
});

lists.addEventListener("click", function (e) {
  if (e.target.parentElement.classList.contains("dlt")) {
    let dltTask = e.target.parentElement.parentElement;
    dltTask.remove();
    // Dlt From LocalStorage
    removeFromLS(dltTask.textContent);
  }

  e.preventDefault();
});
function removeFromLS(taskItem) {
  tasks.forEach(function (task, index) {
    let string = taskItem.trim();
    console.log(string);
    if (task == string) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
searchTodo.addEventListener("keyup", function (e) {
  const inputValue = e.target.value.trim().toLowerCase();
  document.querySelectorAll(".item").forEach(function (task) {
    let selectItm = task.firstChild.textContent.toLowerCase();
    if (selectItm.indexOf(inputValue) == -1) {
      task.style.display = "none";
    } else {
      task.style.display = "inherit";
    }
  });
});
