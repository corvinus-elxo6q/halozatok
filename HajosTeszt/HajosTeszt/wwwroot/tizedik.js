var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timerHandler;

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }



    //Kérdések száma

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Előre-hátra
    document.getElementById("elore_gomb").addEventListener("click", elore);
    document.getElementById("hatra_gomb").addEventListener("click", vissza);

    //Mentés visszatöltése
    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"))
    }
    if (localStorage.getItem("displayedQuestion")) {
        hotList = parseInt(localStorage.getItem("displayedQuestion"))
    }
    if (localStorage.getItem("nextQuestion")) {
        hotList = parseInt(localStorage.getItem("nextQuestion"))
    }


    //Kezdő kérdéslista betöltése

    if (hotList.length===0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        console.log("Local storage-ból beolvasott kérdésekkel dolgozunk!");
        kérdésMegjelenítés();
    }
}


function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error('Hibás letöltés: ${result.status}');
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotlist ${destination}. helyére`);
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        }
        )
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }

    for (var i = 1; i <= 3; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";


}

document.addEventListener("DOMContentLoaded", init);


function elore() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
}

function választás(n) {

    let kérdés = hotList[displayedQuestion].question;

    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers===3) {
            kérdékérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //ToDO: kérdéslista vége
        }

    }

    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
        hotList[displayedQuestion].goodAnswers = 0;

    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(elore, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}