var zadania = [];

function addTask() {
    var pole = document.getElementById("inputBox");
    var t = pole.value;
    var p = document.getElementById("priorityInput").value;
    var d = document.getElementById("dateInput").value;

    if (t == "") {
        alert("Wpisz treść zadania");
        return;
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

function sortujPrio() {
    zadania.sort(function(a, b) {
        if (a.prio === "Wysoki" && b.prio === "Normalny") return -1;
        if (a.prio === "Normalny" && b.prio === "Wysoki") return 1;
        return 0;
    });
}

function render() {
    sortujPrio(); 

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
            var n = prompt("Zmień nazwę zadania:", zadania[i].txt);
            if (n) zadania[i].txt = n;
        }
    }
    render();
}

function sortData() {
    zadania.sort(function(a, b) {
        var d1 = new Date(a.data);
        var d2 = new Date(b.data);
        return d1 - d2;
    });
    render();
}

function licz() {
    var ok = 0;
    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].spr) ok++;
    }

    var wynik_proc = 0;
    if (zadania.length > 0) {
        wynik_proc = (ok / zadania.length) * 100;
    }

    document.getElementById("completedCounter").innerHTML = ok;
    document.getElementById("uncompletedCounter").innerHTML = zadania.length - ok;
    document.getElementById("procent").innerHTML = Math.round(wynik_proc) + "%";
}

function setFilter(f) {
    var li = document.querySelectorAll("#listContainer li");
    for (var i = 0; i < li.length; i++) {
        if (f == 'done' && !li[i].classList.contains("completed")) {
            li[i].style.display = "none";
        } else {
            li[i].style.display = "block";
        }
    }
}