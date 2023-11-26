document.getElementById('chat-form').addEventListener('submit', async (event) => {
    // event.preventDefault();
    const userMessage = document.getElementById('user-message').value;
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    document.getElementById('bot-response').textContent = data.message;
});


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


//faseeh stuff underneath

// let buttonToggle = true;

// function toggleSidebar() {
//     const sidebar = document.getElementById("chat");
//     const button = document.getElementById("toggle-Chat");

//     buttonToggle = !buttonToggle;

//     if (buttonToggle) {
//         sidebar.style.display = "none";
//         console.log("collapse");
//     } else {
//         sidebar.style.display = "flex";
//         console.log("show");
//     }
// }

function onClose(){
    const sidebar = document.getElementById("chat-container");
    const button = document.getElementById("toggle-Chat");
    sidebar.style.display = "none";
}
function onOpen(){
    const sidebar = document.getElementById("chat-container");
    const button = document.getElementById("toggle-Chat");
    sidebar.style.display = "flex";

}