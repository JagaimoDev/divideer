const number = document.querySelector('#number');
const fromSystem = document.querySelector('#fromSystem');
const toSystem = document.querySelector('#toSystem');
const resultsFontSize = document.querySelector('#resultsFontSize');
const convertForm = document.querySelector('#convertForm');
const resultsText = document.querySelector('#resultsText');
const allowedNumbers = '0123456789ABCDEF';
let results;

convertForm.addEventListener('submit', (e) => {
    e.preventDefault();

    results = '';

    if (new RegExp(`[^${allowedNumbers.substr(0, fromSystem.value)}]`, 'g').test(number.value.toUpperCase())) return urDumb();
    if (!number.value) return urDumb();

    if (fromSystem.value != 10 && fromSystem.value != toSystem.value) {
        calculating(number.value.toUpperCase(), fromSystem.value);
        results += '<br><br>';
    }
    if (toSystem.value != 10 && fromSystem.value != toSystem.value) {
        dividing(parseInt(number.value, fromSystem.value), toSystem.value, 0, 0, '');
        results += '<br>';
    }

    results += `${number.value.toUpperCase()}<sub>${fromSystem.value}</sub> = ${parseInt(number.value, fromSystem.value)
        .toString(parseInt(toSystem.value))
        .toUpperCase()}<sub>${toSystem.value}</sub>`;

    resultsText.style.fontSize = resultsFontSize.value;
    resultsText.innerHTML = results;
});

function calculating(n, fS) {
    let addedNumbers = '';
    let nOfAddedNumbers = 0;

    results += `${n}<sub>${fS}</sub> =`;

    for (let i = 0; i < n.length; i++) {
        results += ` ${parseInt(n[i], fS)}×${fS}<sup>${n.length - i - 1}</sup> +`;
    }
    results = results.slice(0, -1);

    for (let i = 0; i < n.length; i++) {
        if (n[i] != 0) {
            addedNumbers += ` ${parseInt(n[i], fS) * Math.pow(fS, n.length - i - 1)} +`;
            nOfAddedNumbers++;
        }
    }
    addedNumbers = '=' + addedNumbers.slice(0, -1);
    results += (nOfAddedNumbers > 1 ? addedNumbers : '') + `= ${parseInt(n, fS)}<sub>10</sub>`;
}

function dividing(n, tS, nMaxLength, resultMaxLength) {
    const calcResult = Math.floor(n / tS);
    const remainder = n % tS;

    results += `${n.toString().padStart(nMaxLength, '\xa0')} : ${tS} = ${calcResult
        .toString()
        .padEnd(resultMaxLength, '\xa0')} | ${remainder}<br>`;

    if (calcResult == 0) return;

    dividing(
        calcResult,
        tS,
        n.toString().length > nMaxLength ? n.toString().length : nMaxLength,
        calcResult.toString().length > resultMaxLength ? calcResult.toString().length : resultMaxLength
    );
}

function urDumb() {
    resultsText.innerHTML = "You're dumb :)"
}