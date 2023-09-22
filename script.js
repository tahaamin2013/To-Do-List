const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

   
    span.addEventListener("click", function () {
      li.remove(); 
      saveTasks(); 
    });

    li.appendChild(span);
    listContainer.appendChild(li);

    li.addEventListener("click", function () {
      if (!li.classList.contains("checked")) {
        li.classList.add("checked");
      } else {
        li.classList.remove("checked");
      }
      saveTasks(); 
    });

    saveTasks(); 
  }
  inputBox.value = "";
}


function saveTasks() {
  const tasks = [];
  const taskItems = listContainer.querySelectorAll("li");
  taskItems.forEach((item) => {
    tasks.push({
      content: item.innerHTML,
      checked: item.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = task.content;

      if (task.checked) {
        li.classList.add("checked");
      }

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";


      span.addEventListener("click", function () {
        li.remove();
        saveTasks();
      });

      li.appendChild(span);
      listContainer.appendChild(li);

      li.addEventListener("click", function () {
        if (!li.classList.contains("checked")) {
          li.classList.add("checked");
        } else {
          li.classList.remove("checked");
        }
        saveTasks();
      });
    });
  }
}

window.addEventListener("load", loadTasks);