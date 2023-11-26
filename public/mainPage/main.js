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