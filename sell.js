let shareQuantity = document.getElementById('shareQuantity');
let purchasePrice = document.getElementById('purchasePrice');
let sellPrice = document.getElementById('sellPrice');
let clearSell = document.getElementById('clearSell');
let calculateSell = document.getElementById('calculateSell');
let tax = document.getElementById('investor');
let table2 = document.getElementById('table');



clearSell.addEventListener("click", function() {
    shareQuantity.value = "";
    purchasePrice.value = "";
    error.innerHTML = "";
    sellPrice.value = "";
    tax.value = "5";
    table.innerHTML = "";
});


calculateSell.addEventListener("click", function() {
    if (shareQuantity.value == "" || purchasePrice.value == "" || sellPrice.value == "") {
        error.innerHTML = "Please fill the required fields";
    } else {
        let investorType = '';
        let capitalTaxGain = parseFloat(document.getElementById('investor').value);
        if (capitalTaxGain == 5 || capitalTaxGain == 7.5) {
            investorType = 'Individual';
        } else {
            investorType = 'Institutional';
        }

        let buyingPrice = parseFloat(purchasePrice.value);
        let noOfShares = parseFloat(shareQuantity.value);
        let sellingPrice = parseFloat(sellPrice.value);

        let brokerCommission = '';
        let brokerCommissionRate = '';
        let profitOrLoss = 0;

        let shareAmount = buyingPrice * noOfShares;
        let totalAmount = sellingPrice * noOfShares;
        let seebonFee = (0.015 / 100) * totalAmount;
        let dpFee = 25;
        let seebonFeeb = (0.015 / 100) * shareAmount;

        if (shareAmount <= 50000) {
            brokerCommissionb = (0.4 / 100) * shareAmount;
        } else if (shareAmount > 50000 && shareAmount <= 500000) {
            brokerCommissionb = (0.37 / 100) * shareAmount;
        } else if (shareAmount > 500000 && shareAmount <= 2000000) {
            brokerCommissionb = (0.34 / 100) * shareAmount;
        } else if (shareAmount > 2000000 && shareAmount <= 10000000) {
            brokerCommissionb = (0.30 / 100) * shareAmount;
        } else {
            brokerCommissionb = (0.27 / 100) * shareAmount;
        }

        if (totalAmount <= 50000) {
            brokerCommissionRate = '0.40%';
            brokerCommission = (0.4 / 100) * totalAmount;
            if(brokerCommission <= 10){
                brokerCommission = 10;
            }
        } else if (totalAmount > 50000 && totalAmount <= 500000) {
            brokerCommissionRate = '0.37%';
            brokerCommission = (0.37 / 100) * totalAmount;
        } else if (totalAmount > 500000 && totalAmount <= 2000000) {
            brokerCommissionRate = '0.34%';
            brokerCommission = (0.34 / 100) * totalAmount;
        } else if (totalAmount > 2000000 && totalAmount <= 10000000) {
            brokerCommissionRate = '0.30%';
            brokerCommission = (0.30 / 100) * totalAmount;
        } else {
            brokerCommissionRate = '0.27%';
            brokerCommission = (0.27 / 100) * totalAmount;
        }
        let totalPayableAmount = shareAmount + seebonFee + dpFee + brokerCommissionb;
        let totalCommission = seebonFee + dpFee + brokerCommission;
        let cgt = (sellingPrice - buyingPrice) * (capitalTaxGain / 100) * noOfShares;
        let cgta = 0;
        if (cgt < 0) {
            cgta = 0;
        } else {
            cgta = cgt;
        }
        let totalRecievingAmount = totalAmount - cgta - totalCommission;
        profitOrLoss = totalRecievingAmount - totalPayableAmount;
        // Adding table contents
        addElement2('it', 'it-v', 'Investor Type', shareAmount);
        addElement2('ta', 'ta-v', 'Total Amount', totalAmount);
        addElement2('seebons', 'seebons-v', 'SEEBON Fee', seebonFee);
        addElement2('dps', 'dps-v', 'DP Fee', dpFee);
        addElement2('bcs', 'bcs-v', 'Broker Commission', brokerCommission);
        addElement2('tra', 'tra-v', 'Total Recieving Amount', totalRecievingAmount);
        addElement2('ctg', 'ctg-v', 'Capital Gain Tax', cgta);
        addElement2('pol', 'pol-v', "Profit/Loss", profitOrLoss);

        if (document.getElementById('bcs') != null) {
            document.getElementById('bcs').innerHTML = "Broker Commission(" + brokerCommissionRate + ")";
        }

        if (document.getElementById('ctg') != null) {
            document.getElementById('ctg').innerHTML = "Capital Tax Gain(" + capitalTaxGain + "%)";
        }
        if (document.getElementById('it-v') != null) {
            document.getElementById('it-v').innerHTML = investorType;
        }
        if (document.getElementById('pol-v') != null) {
            if (profitOrLoss < 0) {
                absProfitOrLoss = NumberFormatterr(Math.abs(profitOrLoss), 2);
                document.getElementById('pol').innerHTML = 'Loss';
                document.getElementById('pol-v').innerHTML = "Rs. " + absProfitOrLoss;
                document.getElementById('pol-v').style.color = 'red ';
            } else {
                document.getElementById('pol').innerHTML = 'Profit';
                document.getElementById('pol-v').style.color = 'green';
            }
        }
        error.innerHTML = "";
    }
});


function addElement2(id1, id2, name, value) {
    let id = document.getElementById(id1);
    if (id == null) {
        let tr1 = document.createElement('tr');
        table2.appendChild(tr1);

        let nam = document.createElement('td');
        nam.textContent = name;
        nam.id = id1;
        tr1.appendChild(nam);

        let name_v = document.createElement('td');
        name_v.textContent = "Rs. " + NumberFormatterr(value, 2);
        name_v.id = id2;
        tr1.appendChild(name_v);
    } else {
        document.getElementById(id2).innerHTML = "Rs. " + NumberFormatterr(value, 2);
    }

}

const NumberFormatterr = (value, decimal) => {
    return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString(
        "en-IN", {
            useGrouping: true,
        }
    );
};
