import { datas, form, formataData, getDataInput } from './script.js';

const summaryContr = document.querySelector('#totalContr');
const totalReturns = document.querySelector('#totalReturnsValue');
const returnOnInvestiment = document.querySelector('#returnsInvestiments');
const warningReturns = document.querySelector('.warning-return');
const warningContribution = document.querySelector('.warning-contribution');
const warningExceed = document.querySelector('.warning-exceed');
const finalValue = document.querySelector('#finalValue');

function getFinalValue() {
    return datas[datas.length -1][1];
}
console.log(getFinalValue());
function getTotalContribution() {
    let datas = getDataInput();
    return datas[0] + datas[1] * datas[3];
}
function getTotalReturns() {
    let finalValue = datas[datas.length -1][1];
    return finalValue - getTotalContribution();
}
function getReturnsOnInvestiment() {
    return getTotalReturns() / getTotalContribution();
}
function formataPorcentagem(valor) {
    return (valor * 100).toFixed(2);
}
form.addEventListener('input', () => {
    console.log(getFinalValue());

    let totalContribution = getTotalContribution();
    let totalContributionFormadado = formataData(totalContribution);
    let totalReturnsValue = getTotalReturns();
    let totalReturnsFormatado = formataData(getTotalReturns());
    let returnsOnInvestimentFormatado = formataPorcentagem(getReturnsOnInvestiment());
    let finalValueFormatado = formataData(getFinalValue());
    finalValue.textContent = `R$ ${finalValueFormatado}`;
    summaryContr.textContent = `R$ ${totalContributionFormadado}`;
    totalReturns.textContent = `R$ ${totalReturnsFormatado}`;
    returnOnInvestiment.textContent = `${returnsOnInvestimentFormatado}%`;
    warningReturns.textContent = `R$ ${totalReturnsFormatado}`;
    warningContribution.textContent = `R$ ${totalContribution}`;
    warningExceed.textContent = `R$ ${formataData(totalReturnsValue - totalContribution)}`;
});

window.addEventListener('load', () => {

    let totalContribution = getTotalContribution();
    let totalContributionFormadado = formataData(totalContribution);
    let totalReturnsValue = getTotalReturns();
    let totalReturnsFormatado = formataData(getTotalReturns());
    let returnsOnInvestimentFormatado = formataPorcentagem(getReturnsOnInvestiment());
    let finalValueFormatado = formataData(getFinalValue());
    finalValue.textContent = `R$ ${finalValueFormatado}`;    summaryContr.textContent = `R$ ${totalContributionFormadado}`;
    totalReturns.textContent = `R$ ${totalReturnsFormatado}`;
    returnOnInvestiment.textContent = `${returnsOnInvestimentFormatado}%`;
    warningReturns.textContent = `R$ ${totalReturnsFormatado}`;
    warningContribution.textContent = `R$ ${totalContribution}`;
    warningExceed.textContent = `R$ ${formataData(totalReturnsValue - totalContribution)}`;
});