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

//Calendar stuff

function onCloseCal(){
    const sidebar = document.getElementById("Calendar-container");
    const button = document.getElementById("open-Cal");
    button.style.display = "flex";
    sidebar.style.display = "none";
    (document.getElementById("open-Cal")).style.display ="flex";

}
function onOpenCal(){
    const sidebar = document.getElementById("Calendar-container");
    const button = document.getElementById("open-Cal");
    button.style.display = "none";
    sidebar.style.display = "flex";
    (document.getElementById("open-Cal")).style.display ="none";


}
document.getElementById('open-Cal').addEventListener('click', onOpenCal);
document.getElementById('close-Cal').addEventListener('click', onCloseCal);

document.addEventListener("click", (event) => {
    if (event.target.id == "send-chat-button") {
        let value = document.querySelector("#chat-input-field").value;

        let userChatMessage = document.createElement("div");
        userChatMessage.classList = ["message user-message"];
        userChatMessage.innerHTML = value;
        document.querySelector("#chat-input-field").value = "";
        
        document.querySelector("#message-area").appendChild(userChatMessage);

        let AIChatMessage = document.createElement("div");
        AIChatMessage.classList = ["message response-message"];
        AIChatMessage.innerHTML = `Hi :smiley:
        I would Love to help!
        Your custom schedule has been imported into your calendar!
        If you focus and work hard you can achieve anything!`;

        setTimeout(() => {
            document.querySelector("#message-area").appendChild(AIChatMessage);
        }, 3000)
    }
})
