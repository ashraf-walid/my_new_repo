let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayList = [];

if (localStorage.getItem("tasks")){
    let Data = localStorage.getItem("tasks");
    arrayList = JSON.parse(Data);
    addElementToPage();
}

submit.onclick = function(){
    if (input.value != ""){
        let task = {
            id : Date.now(),
            title : input.value,
        };
        arrayList.push(task);
        addElementToPage();
        localStorage.setItem("tasks",JSON.stringify(arrayList));
        input.value = "";
    }
}

function addElementToPage (){
    tasksDiv.innerHTML = "";
    arrayList.forEach(function(task){
    let div = document.createElement("div");
    div.className = "task";
    div.appendChild(document.createTextNode(task.title));
    div.setAttribute("data-id", task.id);
    let del = document.createElement("span");
    del.appendChild(document.createTextNode("Delete"));
    del.className = "del";
    div.appendChild(del);
    tasksDiv.appendChild(div);  
    })
    deleteElement();
}

function deleteElement() {
    tasksDiv.onclick = function(e) {
        if (e.target.classList.contains("del")) {
            let targetDeleteId = e.target.parentElement.getAttribute("data-id");
            arrayList = arrayList.filter(function(del) {
                return del.id != targetDeleteId;  
            });
            e.target.parentElement.remove();
            localStorage.setItem("tasks", JSON.stringify(arrayList));
        }
    }
}