let value = document.getElementById('value');
let amount = document.getElementById('amount');
let clear = document.getElementById('clear')
let calculate = document.getElementById('calculate')
let error = document.getElementById('error')
let table = document.getElementById('table')

clear.addEventListener("click", function() {
    value.value = "";
    amount.value = "";
    error.innerHTML = "";
    table.innerHTML = "";
})

calculate.addEventListener("click", function() {
    if (value.value == "" || amount.value == "") {
        error.innerHTML = "Please fill the required fields";
    } else {
        let buyingPrice = parseFloat(amount.value);
        let noOfShares = parseFloat(value.value);

        let brokerCommission = 0;
        let brokerCommissionRate = 0;

        let shareAmount = buyingPrice * noOfShares;
        let seebonFee = (0.015 / 100) * shareAmount;
        let dpFee = 25;

        if (shareAmount <= 50000) {
            brokerCommissionRate = '0.40%';
            brokerCommission = (0.4 / 100) * shareAmount;
            if(brokerCommission <= 10){
                brokerCommission = 10;
            }
        } else if (shareAmount > 50000 && shareAmount <= 500000) {
            brokerCommissionRate = '0.37%';
            brokerCommission = (0.37 / 100) * shareAmount;
        } else if (shareAmount > 500000 && shareAmount <= 2000000) {
            brokerCommissionRate = '0.34%';
            brokerCommission = (0.34 / 100) * shareAmount;
        } else if (shareAmount > 2000000 && shareAmount <= 10000000) {
            brokerCommissionRate = '0.30%';
            brokerCommission = (0.30 / 100) * shareAmount;
        } else {
            brokerCommissionRate = '0.27%';
            brokerCommission = (0.27 / 100) * shareAmount;
        }
        let totalPayableAmount = shareAmount + seebonFee + dpFee + brokerCommission;
        let costPerShare = totalPayableAmount / noOfShares;
        // Adding table contents
        addElement('sa', 'sa-v', 'Share Amount', shareAmount);
        addElement('seebon', 'seebon-v', 'SEEBON Fee', seebonFee);
        addElement('dp', 'dp-v', 'DP Fee', dpFee);
        addElement('bc', 'bc-v', 'Broker Commission', brokerCommission);
        addElement('tpa', 'tpa-v', 'Total Paying Amount', totalPayableAmount);
        addElement('cps', 'cps-v', 'Cost per Share', costPerShare);
        if (document.getElementById('bc') != null) {
            document.getElementById('bc').innerHTML = "Broker Commission(" + brokerCommissionRate + ")";
        }
        error.innerHTML = "";
    }
});
const NumberFormatter = (value, decimal) => {
    return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString(
        "en-IN", {
            useGrouping: true,
        }
    );
};

// Function to add the table elements
function addElement(id1, id2, name, value) {
    let id = document.getElementById(id1);
    if (id == null) {
        let tr1 = document.createElement('tr');
        table.appendChild(tr1);

        let nam = document.createElement('td');
        nam.textContent = name;
        nam.id = id1;
        tr1.appendChild(nam);

        let name_v = document.createElement('td');
        name_v.textContent = "Rs. " + NumberFormatter(value, 2);
        name_v.id = id2;
        tr1.appendChild(name_v);
    } else {
        document.getElementById(id2).innerHTML = "Rs. " + NumberFormatter(value, 2);
    }
}
