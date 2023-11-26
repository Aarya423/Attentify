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
        document.querySelector("#time").innerText = `${request.minutes}:${request.seconds}`;
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
    const button = document.getElementById("toggle-Chat");
    sidebar.style.display = "none";
    (document.getElementById("open-Chat")).style.display ="flex";

}
function onOpen(){
    const sidebar = document.getElementById("chat-container");
    const button = document.getElementById("toggle-Chat");
    sidebar.style.display = "flex";
    (document.getElementById("open-Chat")).style.display ="none";

}