const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const completedCounter = document.getElementById("completedCounter");
const uncompletedCounter = document.getElementById("uncompletedCounter");

function updateCounters() {
    const completed = document.querySelectorAll(".completed").length;
    const uncompleted = document.querySelectorAll("li:not(.completed)").length;
    completedCounter.textContent = completed;
    uncompletedCounter.textContent = uncompleted;
}

function addTask() {
    const text = inputBox.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${text}</span>
        </label>
        <span class="editBtn">Edytuj</span>
        <span class="deleteBtn">Usuń</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";

    const checkbox = li.querySelector("input");
    const taskSpan = li.querySelector("span");
    const editBtn = li.querySelector(".editBtn");
    const deleteBtn = li.querySelector(".deleteBtn");

    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", () => {
        const updated = prompt("Edytuj zadanie:", taskSpan.textContent);
        if (updated !== null) {
            taskSpan.textContent = updated;
            checkbox.checked = false;
            li.classList.remove("completed");
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateCounters();
    });

    updateCounters();
}
