console.log("Hello from the client side JS!!");


const searchButton = document.querySelector('form')
const address = document.querySelector('input')
const message1 = document.getElementById("message1")
const message2 = document.getElementById("message2")

searchButton.addEventListener('submit',(e)=>{
    message1.textContent = "loading...... "
    e.preventDefault();
    const location = address.value;

    
    const url = "http://localhost:3000/weather?address="+location;

    fetch(url).then( (response)=>{
        response.json().then( (data)=>{
            if(data.error){
               message1.textContent = data.error;
            }
            else{
                message1.textContent ="For location " + data.name
                message2.textContent = data.weather
            }
        })
    })

})