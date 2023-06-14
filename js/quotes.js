const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

function getQuote() {
    axios.get('https://api.adviceslip.com/advice')
    .then(res => res.data)
    .then(data => { 
         quote.innerText = data.slip.advice;
    });
}

getQuote();
setInterval(getQuote, 60000);
