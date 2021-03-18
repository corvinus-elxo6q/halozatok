window.onload = function () {
    let hova = document.getElementById('pascal');
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement('div');
        sor.classList.add('sorClass');
        hova.appendChild(sor);

        for (var o = 0; o < 10; o++) {
            let szám = document.createElement('div');
            szám.classList.add('számClass');
            szám.innerText = (faktoriálisR(s)) / ((faktoriálisR(o) - faktoriális(s - o))
        }
    }
}


var faktoriális = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}

var faktoriálisR = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1)
    }
}