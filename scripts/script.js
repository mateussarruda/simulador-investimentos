const anualRateRange = document.querySelector('#anualRateRange');
const anualRateInput = document.querySelector('#anualRateInput');
const iniInv = document.querySelector('#IniInv');
const MonContr = document.querySelector('#MonContr');
const invPeriod = document.querySelector('#invPeriod');
const periodSelect = document.querySelector('#invPeriodSelect');
export const form = document.querySelector('#form');
try {
    google.charts.load('current', {'packages': ['corechart']});
    
    google.charts.setOnLoadCallback(drawChart);
} catch(err) {
    console.log('erro:jgf');    
}

anualRateRange.addEventListener('input', () => {
    anualRateInput.value = anualRateRange.value;
});
anualRateInput.addEventListener('input', () => {
    anualRateRange.value = anualRateInput.value;
});
export function getDataInput() {
    let data = [];
    data.push(Number(iniInv.value));
    data.push(Number(MonContr.value));
    data.push(Number(anualRateInput.value / 100));
    if (periodSelect.value === 'year') {
        data.push(Number(invPeriod.value) * 12);
    } else {
        data.push(Number(invPeriod.value));
    }
    return data;
}

export function formataData(valor) {
    let valorFormatado = valor.toLocaleString('pt-BR', {currency: 'BLR', minimumFractionDigits: 2, maximumFractionDigits: 2});
    return valorFormatado;

}

function jurosAnualToMensal(r, n) {
    let i = ((1 + r)**(1/n)) - 1;
    console.log(i);
    return i;
}

export function calculaDados2(inicInvst, monthlyInv, taxa, periodo) {
    let arr = [];
    let i = jurosAnualToMensal(taxa, 12);
    let aportes = totalApostesACadaMes(inicInvst, monthlyInv, periodo);
    /* let juros = calculaJuros(inicInvst, i);*/
    let montante = inicInvst;
    arr.push([`Mês 0`, montante, aportes[0]]);
    for (let anoOuMes = 1; anoOuMes <= periodo; anoOuMes++) {
        montante = montante + calculaJuros(montante, i) + monthlyInv;
        arr.push([`${anoOuMes}° Mês`, montante, aportes[anoOuMes]]);
    }
    return arr;
}
let inputDatas = getDataInput();
export let datas = calculaDados2(...inputDatas);

function calculaJuros(capital, taxa) {
    let juros =  capital * taxa;
    return juros;
}

function totalApostesACadaMes(inicInvst, monthlyInv, periodo) {
    let arr = [];
    let montante = +inicInvst;
    if (periodSelect.value === 'year') {
        periodo = +periodo * 12;
    }
    arr.push(montante);
    for (let mes = 1; mes <= periodo; mes++) {
        montante = montante + +monthlyInv;
        arr.push(montante);
    }
    return arr;
}

function drawChart() {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Month');
    data.addColumn('number', 'Valor Investido');
    data.addColumn('number', 'Total Aportado');

    let arr = getDataInput();
    //console.log(document.querySelector('#finalValue').textContent);
    
    let valores = calculaDados2(...arr);
    /* let valorFinal = valores[valores.length -1][1];
    let valorFinalFormatado = valorFinal.toLocaleString('pt-BR', {currency: 'BLR', minimumFractionDigits: 2});
    document.querySelector('#finalValue').textContent = `R$${valorFinalFormatado}`;
     */
    console.log(valores);
    data.addRows(valores);
    let options = {'title': 'Investimento ao longo do tempo',
                    'width': 800,
                    'height': 300,
                    'pointSize': 5,
                    'chartArea': {
                        width: '90%',
                        height: '80%'
                    },
                    'colors': ['green', 'blue', '#000f6e', '#00049f', '#f6c706'],
    };
    try {
        let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    } catch (error) {
        console.log('erro 1');
    }
}

form.addEventListener('input', () => {
    let inputDatas = getDataInput();
    datas = calculaDados2(...inputDatas);
    try {
        google.charts.setOnLoadCallback(drawChart);
    } catch(error) {
        console.log('error');
    }

});
