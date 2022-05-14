
const socket=io("http://localhost:8080");

const form=document.querySelector("#send-container");
const messageInput=document.querySelector("#messageInp");
const messageContainer=document.querySelector(".container");
var audio=new Audio("./pop.mp3");
 
const append=(message,position)=>{
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position==="left"){
        audio.play();
    }
}

form.addEventListener("submit",e=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,"right");
    socket.emit("send",message);
    messageInput.value="";
})

const name=prompt("Enter your name");
socket.emit("new-user-joined",name);

socket.on("user-joined",name=>{
    append(`${name} joined`, "right");
})

socket.on("receive",data=>{
    append(`${data.name}: ${data.message}`, "left");
})

socket.on("left",name=>{
    append(`${name} left`, "right");
})