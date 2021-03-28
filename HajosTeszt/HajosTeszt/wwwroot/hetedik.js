var kerdesek;
var haladas = 0;

window.onload = () => {
    letoltes()
}

function letoltes()
{
    fetch('questions.json').then(r => r.json()).then(d => letöltésBefejeződött(d));
}

function letöltésBefejeződött(d)
{
    console.log("Sikeres letöltés")
    console.log(d)
    kerdesek = d;
    kerdesMegjelenites(0);
}

function kerdesMegjelenites(k)
{
    document.getElementById("kérdés_szöveg").innerHTML = kerdesek[k].questionText;
    document.getElementById("válasz1").innerHTML = kerdesek[k].answer1;
    document.getElementById("válasz2").innerHTML = kerdesek[k].answer2;
    document.getElementById("válasz3").innerHTML = kerdesek[k].answer3;
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kerdesek[k].image;
}

function elore()
{
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    haladas++
    if (haladas == kerdesek.length) {
        haladas = 0;
    }
    kerdesMegjelenites(haladas);
}

function vissza()
{
    document.getElementById("válasz1").style.backgroundColor = "white"
    document.getElementById("válasz2").style.backgroundColor = "white"
    document.getElementById("válasz3").style.backgroundColor = "white"
    if (haladas == 0) {
        haladas = 2;
        kerdesMegjelenites(haladas)
    } else {
        haladas--;
        kerdesMegjelenites(haladas);
    }
    kerdesMegjelenites(haladas);
}

function szinez()
{
    var jovalasz = kerdesek[haladas].correctAnswer
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