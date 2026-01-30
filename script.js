const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const completedCounter = document.getElementById("completedCounter");
const uncompletedCounter = document.getElementById("uncompletedCounter");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Wpisz zadanie");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="editBtn">Edytuj</span>
    <span class="deleteBtn">Usun</span>
  `;

    listContainer.appendChild(li);
    inputBox.value = "";

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".editBtn");
    const taskSpan = li.querySelector("label span");
    const deleteBtn = li.querySelector(".deleteBtn");

    checkbox.addEventListener("click", () => {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", () => {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", () => {
        if (confirm("Czy napewno chcesz usunac to zadanie?")) {
            li.remove();
            updateCounters();
        }
    });

    updateCounters();
}