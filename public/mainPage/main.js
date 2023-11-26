//Timer

chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    if (request.query === "time") {
        let minutes = request.minutes;
        let seconds = request.seconds;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.querySelector("#time").innerText = `${minutes}:${seconds}`;
    } else {
        console.log("broken")
    }
})

document.addEventListener("click", (event) => {
    if (event.target.id == "work") {
        chrome.runtime.sendMessage({query: "start", time: `${25}`}, function(response) {
            console.log("Response from background:", response);
        });
    } else if (event.target.id == "break") {
        chrome.runtime.sendMessage({query: "start", time: `${10}`}, function(response) {
            console.log("Response from background:", response);
        });
    }
})




function onClose(){
    const sidebar = document.getElementById("chat-container");
    const button = document.getElementById("open-Chat");
    button.style.display = "flex";
    sidebar.style.display = "none";
    (document.getElementById("open-Chat")).style.display ="flex";

}
function onOpen(){
    const sidebar = document.getElementById("chat-container");
    const button = document.getElementById("open-Chat");
    button.style.display = "none";
    sidebar.style.display = "flex";
    (document.getElementById("open-Chat")).style.display ="none";


}
document.getElementById('open-Chat').addEventListener('click', onOpen);
document.getElementById('close-Chat').addEventListener('click', onClose);

document.getElementById("submit-button").addEventListener("click", () => {
    const userMessage = document.getElementById('user-message').value;

    // fetch('http://localhost:8000/api/chat', {
    // method: 'POST',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({ message: userMessage }),
    // })
    // // .then(response => JSON.parse(response)) // Parse the JSON from the response
    // .then(data => {
    //     console.log('Data received:', data.message);
    //     alert("angry")
    // })
    // .catch(
    //     (err) => {
    //         // alert(data)
    //         alert (err)
    //     }
    // )


    fetch('http://localhost:8000/chat', {
    method: 'POST'
    })
    .then(response => response.text()) // Process the text response
    .then(text => {
        alert(text); // Should alert "OK"
    })
    .catch(error => {
        alert('Error: ' + error);
    });
    // const response = fetch('http://localhost:3000/api/chat', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message: userMessage }),
    // })
    // .then(data => {
    //     console.log(data)
    // })
})