
//Timer Stuff
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if (request.query == "start") {
            let durationInMinutes
            if (request.time == "25") {
                durationInMinutes = 25;
                chrome.storage.local.set({working: true})
                chrome.storage.local.set({breaking: false})
            } else if (request.time == "10") {
                durationInMinutes = 10;
                chrome.storage.local.set({working: false})
                chrome.storage.local.set({breaking: true})
            }
            let endTime = new Date(new Date().getTime() + durationInMinutes * 60000);
            console.log(endTime);
            chrome.storage.local.set({"timer": endTime.toISOString()})
            let timer = setInterval(() => {
                chrome.storage.local.get(["timer"], (result) => {
                    let endTime = new Date(result.timer);
                    let now = new Date().getTime();
                    let differenceInMilliSeconds = endTime - now;
                    let differenceInSeconds = differenceInMilliSeconds / (1000);
                    let minutes = Math.floor(differenceInSeconds / 60);
                    let seconds = Math.ceil(differenceInSeconds % 60);
                   
                    if (minutes <= 0 && seconds <= 0) {
                        clearInterval(timer);
                        minutes = 0;
                        seconds = 0;
                    }
                    chrome.runtime.sendMessage({query: "time", minutes, seconds})
                })
            }, 1000)
        } else if (request.query == "pause") {

        } else if (request.query == "reset") {

        }
    }
)
