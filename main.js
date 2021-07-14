let btn = document.getElementById('submit-form');
let inp = document.getElementsByTagName('input');

// validate empty input
const isRequired = value => value === '' ? false : true;

// Validate inputs only numbers
for (let i = 0; i < inp.length; i++) {
  inp[i].addEventListener("keypress", (i) => {
    if (i.which < 48 || i.which > 57) {
      i.preventDefault();
    }
  });
}

// Monthly payment formula
// r - the monthly interest rate.
// N - the number of monthly payments, called the loan's term, and
// P - the amount borrowed, known as the loan's principal.

function calculateMortage(p, r, n) {
  // convert this precentage to a decimal
  r = precentToDecimal(r)

  // convert years to months
  n = yearsToMonth(n);
  let toPayment = (r * p) / (1 - (Math.pow((1 + r), (-n))))
  return parseFloat(toPayment.toFixed((2)));
}

function precentToDecimal(precent) {
  return (precent / 12) / 100;
}

function yearsToMonth(year) {
  return year * 12;
}

// Show monthly payments
function postPayments(payment) {
  let htmlEele = document.getElementById('outMonthly');
  htmlEele.innerText = `${payment} руб`
}

function totalOfLoan(total) {
  let totalEle = document.getElementById('totalofLoan');
  totalEle.innerText = `${total} руб`
}

function totalSum(prec, dolg) {
  let totalValue = document.getElementById('total');
  totalValue.innerText = `${prec + dolg} руб`
}

btn.addEventListener('click', (e) => {
  e.preventDefault()
  let cost = document.getElementById('property_vlaue').value
  let downPayment = document.getElementById('initial_fee').value
  let interest = document.getElementById('interest_rate').value
  let term = document.getElementById('credit-term').value
  
  // validate inputs

  if (!isRequired(cost)) {
    alert('Стоимость недвижимости Обязательное поле')
    return false
  }
  
  if(downPayment > cost) {
    alert('Первоначальный взнос не может быть больше стоимости покупки')
    return false
  } else if(downPayment >= cost) {
    alert('Первоначальный взнос не может быть как стоимость покупки')
    return false
  }

  if(!isRequired(interest)) {
    alert('Процентная ставка Обязательное поле')
    return false
  }

  if(!isRequired(term)) {
    alert('Срок кредита  Обязательное поле')
    return false
  }  else if(term <= 0) {
    alert('Минимальное значение Срок кредита 1 год')
    return false
  }

  
  let amountBorrowed = (cost - downPayment);
  let pmt = calculateMortage(amountBorrowed, interest, term);
  let totalinterest = ((pmt * term * 12) - amountBorrowed);
  totalSum(Math.trunc(totalinterest), Math.trunc(amountBorrowed))
  postPayments(pmt);
  totalOfLoan(amountBorrowed)
  document.getElementById('precent').innerText = totalinterest.toFixed(2)
  createChart(totalinterest, amountBorrowed)
})

// chart function
let ctx = document.getElementById('myChart');
let myChart;

function createChart(a, b) {
  if (myChart) myChart.destroy()
  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Проценты', 'Сумма кредита'],
      datasets: [{
        label: 'График',
        data: [a, b],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 1
      }]
    }
  });
}