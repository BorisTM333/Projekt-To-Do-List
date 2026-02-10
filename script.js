var zadania = [];

function addTask() {
    var pole = document.getElementById("inputBox");
    var t = pole.value;
    var p = document.getElementById("priorityInput").value;
    var d = document.getElementById("dateInput").value;

    if (t == ""){
        return alert("Wpisz coś...");
    }
    
    var obj = {
        id: Math.random(),
        txt: t,
        prio: p,
        data: d,
        spr: false
    };

    zadania.push(obj);
    pole.value = "";
    render();
}

function render() {
    var lista = document.getElementById("listContainer");
    lista.innerHTML = "";
    var szukaj = document.getElementById("searchBox").value.toLowerCase();
    
    for (var i = 0; i < zadania.length; i++) {
        var z = zadania[i];
        
        if (z.txt.toLowerCase().indexOf(szukaj) == -1) continue;

        var li = document.createElement("li");
        if (z.spr) li.className = "completed";
        
        li.innerHTML = '<input type="checkbox" ' + (z.spr ? "checked" : "") + ' onclick="klik(' + z.id + ')">' +
            '<div class="task-content"><b>' + z.txt + '</b><br><small>' + z.prio + ' | ' + z.data + '</small></div>' +
            '<span class="editBtn" onclick="edytuj(' + z.id + ')">Edytuj</span>' +
            '<span class="deleteBtn" onclick="usun(' + z.id + ')">X</span>';

        lista.appendChild(li);
    }
    licz();
}

function klik(id) {
    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].id == id) {
            zadania[i].spr = !zadania[i].spr;
        }
    }
    render();
}

function usun(id) {
    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].id == id) {
            zadania.splice(i, 1);
            break;
        }
    }
    render();
}

function edytuj(id) {
    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].id == id) {
            var n = prompt("Nowa nazwa:", zadania[i].txt);
            if (n) zadania[i].txt = n;
        }
    }
    render();
}

function licz() {
    var ok = 0;
    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].spr) ok++;
    }
    document.getElementById("completedCounter").innerHTML = ok;
    document.getElementById("uncompletedCounter").innerHTML = zadania.length - ok;
}

function setFilter(f) {
    var wszystkie = document.querySelectorAll("#listContainer li");
    for (var i = 0; i < wszystkie.length; i++) {
        if (f == 'done' && !wszystkie[i].classList.contains("completed")) {
            wszystkie[i].style.display = "none";
        } else {
            wszystkie[i].style.display = "flex";
        }
    }
}