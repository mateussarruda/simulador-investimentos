function calculaJuros(capital, taxa) {
    let juros =  capital * taxa;
    return juros;
}

function calculaDados2(inicInvst, monthlyInv, periodo) {
    let arr = [];
    let i = jurosAnualToMensal(0.10, 12);
    let juros = calculaJuros(inicInvst, i);
    let montante = inicInvst + juros;
    arr.push([String(0), montante]);
    for (let ano = 1; ano <= periodo; ano++) {
        montante = montante + calculaJuros(montante, i) + monthlyInv;
        arr.push([String(ano), montante]);
    }
    return arr;
}

function roundToDecimal(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}
console.log(calculaDados2(100, 100, 12));

function jurosAnualToMensal(r, n) {
    let i = ((1 + r)**(1/n)) - 1;
    return i;
}
let i = jurosAnualToMensal(0.10, 12);
console.log(i);