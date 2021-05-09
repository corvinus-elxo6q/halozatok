//var kerdesek;
sorszam = 0;
var haladas = 1;
var dummy;

window.onload = () => {
    letoltes()
}

function letoltes() {

    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésMegjelenites(data)
        );
}

//function letöltésBefejeződött(data) {
//    console.log("Sikeres letöltés")
//    console.log(d)
//    kerdesek = d;
//    kerdesMegjelenites(0);
//}

function kérdésMegjelenites(kérdés) {
    console.log(kérdés)
    dummy = kérdés;
    document.getElementById("kérdés_szöveg").innerHTML = kérdés.questionText;
    document.getElementById("válasz1").innerHTML = kérdés.answer1;
    document.getElementById("válasz2").innerHTML = kérdés.answer2;
    document.getElementById("válasz3").innerHTML = kérdés.answer3;
    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    else {
        document.getElementById("kép1").src = "";
    }
}


function elore() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    haladas++
    if (haladas == 860) {
        haladas = 1;
    }
    kérdésBetöltés(haladas);
}

function vissza() {
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    haladas--;
    if (haladas == 0) {
        haladas = 859;
    }
    kérdésBetöltés(haladas);
}

function szinez() {
    var jovalasz = dummy.correctAnswer;
    //console.log(jovalasz)
    if (jovalasz == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green"
        document.getElementById("válasz2").style.backgroundColor = "red"
        document.getElementById("válasz3").style.backgroundColor = "red"
    }
    else if (jovalasz == 2) {
        document.getElementById("válasz1").style.backgroundColor = "red"
        document.getElementById("válasz2").style.backgroundColor = "green"
        document.getElementById("válasz3").style.backgroundColor = "red"
    }
    else {
        document.getElementById("válasz1").style.backgroundColor = "red"
        document.getElementById("válasz2").style.backgroundColor = "red"
        document.getElementById("válasz3").style.backgroundColor = "green"
    }
}

function kérdésBetöltés(id) {
    sorszam = id;
    fetch(`/questions/${sorszam}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenites(data));
}