console.log("Client side javascript file is loaded!")




const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    
    const url = "http://localhost:3000/weather?address=" + location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            }
            else{
                console.log(data.name)
                console.log(data.forecast)
                messageOne.textContent = data.name
                messageTwo.textContent = data.forecast
            }
        })
    })
})

