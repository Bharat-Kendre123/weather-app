console.log('Clined side js called');



const form = document.querySelector('form');
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';


form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading Weather Info......'
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${searchLocation.value}`).then(response => {

        response.json().then(data => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.foreCastData;
            }
        })
    })

});