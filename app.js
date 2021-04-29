const number = document.querySelector('#number');
const fromSystem = document.querySelector('#fromSystem');
const toSystem = document.querySelector('#toSystem');
const convertBtn = document.querySelector('#convertBtn');
const calculationsP = document.querySelector('#calculations');
const divideP = document.querySelector('#divide');
const resultP = document.querySelector('#result');
const allowedNumbers = '0123456789ABCDEF';

convertBtn.addEventListener('click', () => {
    calculationsP.innerHTML = '';
    divideP.innerHTML = '';
    resultP.innerHTML = '';

    if (new RegExp(`[^${allowedNumbers.substr(0, fromSystem.value)}]`, 'g').test(number.value.toUpperCase())) return urDumb();
    if (!number.value) return urDumb();

    if (fromSystem.value != 10 && fromSystem.value != toSystem.value) 
        calculating(number.value.toUpperCase(), fromSystem.value);
    if (toSystem.value != 10 && fromSystem.value != toSystem.value)
        dividing(parseInt(number.value, fromSystem.value), toSystem.value, 0, 0, '');

    resultP.innerHTML = `${number.value.toUpperCase()}<sub>${fromSystem.value}</sub> = ${parseInt(number.value, fromSystem.value)
        .toString(parseInt(toSystem.value))
        .toUpperCase()}<sub>${toSystem.value}</sub>`;
});

function calculating(n, fS) {
    let out = `${n}<sub>${fS}</sub> =`;
    let addedNumbers = '';
    let nOfAddedNumbers = 0;

    for (let i = 0; i < n.length; i++) {
        out += ` ${parseInt(n[i], fS)}×${fS}<sup>${n.length - i - 1}</sup> +`;
    }
    out = out.slice(0, -1);

    for (let i = 0; i < n.length; i++) {
        if (n[i] != 0) {
            addedNumbers += ` ${parseInt(n[i], fS) * Math.pow(fS, n.length - i - 1)} +`;
            nOfAddedNumbers++;
        }
    }
    addedNumbers = '=' + addedNumbers.slice(0, -1);
    out += (nOfAddedNumbers > 1 ? addedNumbers : '') + `= ${parseInt(n, fS)}<sub>10</sub>`;

    calculationsP.innerHTML = out;
}

function dividing(n, tS, nMaxLength, resultMaxLength) {
    const result = Math.floor(n / tS);
    const remainder = n % tS;

    divideP.innerHTML += `${n.toString().padStart(nMaxLength, '\xa0')} : ${tS} = ${result
        .toString()
        .padEnd(resultMaxLength, '\xa0')} | ${remainder}<br>`;

    if (result == 0) return;

    dividing(
        result,
        tS,
        n.toString().length > nMaxLength ? n.toString().length : nMaxLength,
        result.toString().length > resultMaxLength ? result.toString().length : resultMaxLength
    );
}

function urDumb() {
    resultP.innerHTML = "You are dumb :)"
}