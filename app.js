const number = document.querySelector('#number');
const fromSystem = document.querySelector('#fromSystem');
const toSystem = document.querySelector('#toSystem');
const resultsFontSize = document.querySelector('#resultsFontSize');
const convertForm = document.querySelector('#convertForm');
const resultsArea = document.querySelector('#resultsArea');
const allowedNumbers = '0123456789ABCDEF';
let results;

convertForm.addEventListener('submit', (e) => {
    e.preventDefault();

    results = '';

    if (new RegExp(`[^${allowedNumbers.substr(0, fromSystem.value)}]`, 'g').test(number.value.toUpperCase())) return urDumb();
    if (!number.value) return urDumb();

    if (fromSystem.value != 10 && fromSystem.value != toSystem.value) {
        calculating(number.value.toUpperCase(), fromSystem.value);
        results += '\n\n';
    }
    if (toSystem.value != 10 && fromSystem.value != toSystem.value) {
        dividing(parseInt(number.value, fromSystem.value), toSystem.value, 0, 0, '');
        results += '\n';
    }

    results += `${number.value.toUpperCase()}(${fromSystem.value}) = ${parseInt(number.value, fromSystem.value)
        .toString(parseInt(toSystem.value))
        .toUpperCase()}(${toSystem.value})`;

    resultsArea.style.fontSize = resultsFontSize.value;
    resultsArea.innerHTML = results;
});

function calculating(n, fS) {
    let addedNumbers = '';
    let nOfAddedNumbers = 0;
    
    results += `${n}(${fS}) =`;
    
    for (let i = 0; i < n.length; i++) {
        results += ` ${parseInt(n[i], fS)}×${fS}^${n.length - i - 1} +`;
    }
    results = results.slice(0, -1);

    for (let i = 0; i < n.length; i++) {
        if (n[i] != 0) {
            addedNumbers += ` ${parseInt(n[i], fS) * Math.pow(fS, n.length - i - 1)} +`;
            nOfAddedNumbers++;
        }
    }
    addedNumbers = '=' + addedNumbers.slice(0, -1);
    results += (nOfAddedNumbers > 1 ? addedNumbers : '') + `= ${parseInt(n, fS)}(10)`;
}

function dividing(n, tS, nMaxLength, resultMaxLength) {
    const calcResult = Math.floor(n / tS);
    const remainder = n % tS;

    results += `${n.toString().padStart(nMaxLength, '\xa0')} : ${tS} = ${calcResult
        .toString()
        .padEnd(resultMaxLength, '\xa0')} | ${remainder}\n`;

    if (calcResult == 0) return;

    dividing(
        calcResult,
        tS,
        n.toString().length > nMaxLength ? n.toString().length : nMaxLength,
        calcResult.toString().length > resultMaxLength ? calcResult.toString().length : resultMaxLength
    );
}

function urDumb() {
    resultsArea.innerHTML = "You're dumb :)"
}