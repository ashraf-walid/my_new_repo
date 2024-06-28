let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayList = [];

if (localStorage.getItem("tasks")){
    let Data = localStorage.getItem("tasks");
    arrayList = JSON.parse(Data);
    addElementToPage();
}

function addElementToPage() {
    tasksDiv.innerHTML = "";
    arrayList.forEach(function(task) {
      let div = document.createElement("div");
      let checkIcon = document.createElement("i");
      let delIcon = document.createElement("i");
      let taskText = document.createElement("span");
  
      delIcon.className = "fa-solid fa-check deleteBtn";
      checkIcon.className = "fa-solid fa-pen-to-square editBtn";
      taskText.textContent = task.title;
      taskText.className = "task-text";
  
      div.className = "task";
  
      let iconsDiv = document.createElement("div");
      iconsDiv.className = "task-icons";
      iconsDiv.appendChild(checkIcon);
      iconsDiv.appendChild(delIcon);
  
      div.appendChild(taskText);
      div.appendChild(iconsDiv);
      div.setAttribute("data-id", task.id);
      tasksDiv.appendChild(div);

      // Event listener for edit button
      checkIcon.addEventListener("click", function() {
      input.value = task.title;
      submit.value = "Update Task";
      submit.onclick = function() {
        if (input.value != "") {
          task.title = input.value;
          localStorage.setItem("tasks", JSON.stringify(arrayList));
          addElementToPage();
          input.value = "";
          submit.value = "Add Task";
          submit.onclick = addTask;
        }
      }
    });
    });
    deleteElement();
  }
  
  function deleteElement() {
    tasksDiv.onclick = function(e) {
      if (e.target.classList.contains("deleteBtn")) {
        let targetDeleteId = e.target.parentElement.parentElement.getAttribute("data-id");
        arrayList = arrayList.filter(function(del) {
          return del.id != targetDeleteId;
        });
        e.target.parentElement.parentElement.remove();
        localStorage.setItem("tasks", JSON.stringify(arrayList));
      }
    }
  }
  
  function addTask() {
    if (input.value != "") {
      let task = {
        id: Date.now(),
        title: input.value,
      };
      arrayList.push(task);
      addElementToPage();
      localStorage.setItem("tasks", JSON.stringify(arrayList));
      input.value = "";
    }
  }
  
  submit.onclick = addTask;
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  