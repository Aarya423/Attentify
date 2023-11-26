import {useState, useEffect} from "react"
import "./timer.css"

function Timer() {
    const [seconds, setSeconds] = useState();
    const [minutes, setMinutes] = useState();
    const [working, setWorking] = useState(false);
    const [breaking, setBreaking] = useState(false);

    chrome.storage.local.get(["timer", "working", "breaking"], (result => {
        // if (result.timer) {
        //     let endTime = new Date(result.timer);
        //     let now = new Date().getTime();
        //     let differenceInMilliSeconds = endTime - now;
        //     let differenceInSeconds = differenceInMilliSeconds / (1000);
        //     let minutes = Math.floor(differenceInSeconds / 60);
        //     let seconds = Math.ceil(differenceInSeconds % 60);
        //     setMinutes(minutes)
        //     setSeconds(seconds)
        // } else {
        //     setMinutes("25")
        //     setSeconds("00");
        // }
        if (result.working != null) {
            setWorking(result.working)
        } 

        if (result.breaking != null) {
            setBreaking(result.breaking)
        }
    }))

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
            if (request.query === "time") {
                setMinutes(request.minutes)
                setSeconds(request.seconds)
            } else {
                console.log(error)
            }
        })
    },[seconds, minutes])
    function startTimer(durationInMinutes) {
        chrome.runtime.sendMessage({query: "start", time: `${durationInMinutes}`}, function(response) {
            console.log("Response from background:", response);
        });
    }

    function startWork() {
        startTimer(25);
        setBreaking(false)
        setWorking(true);
    }

    function startBreak() {
        startTimer(10);
        setBreaking(true)
        setWorking(false);
    }

    return(
        <div id="timer">
            <Display working={working} breaking={breaking} minutes={minutes} seconds={seconds}/>
            <div id="timer-buttons">
                <WorkButton startWork={startWork} working={working}/>
                <BreakButton startBreak={startBreak} breaking={breaking}/>
            </div>
        </div>
    )
}

function Display(props) {    
    if (props.minutes && props.seconds) {
        let minutes = props.minutes;
        let seconds = props.seconds;
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
        console.log(minutes)
        console.log(seconds)
        return (
            <div id="display">{`${minutes}:${seconds}`}</div>
        )
    } else {
        return (
            <div id="display">{`25:00`}</div>
        )
    } 
}

function WorkButton(props) {
    if (!props.working) {
        return (
            <button className="off" id="work-button" onClick={props.startWork}>Work</button>
        )
    } else {
        return (
            <button className="on" id="work-button" onClick={props.startWork}>Work</button>
        )
    }
    
}

function BreakButton(props) {
    if (!props.breaking) {
        return (
            <button className="off" id="break-button" onClick={props.startBreak}>Break</button>
        )
    } else {
        return (
            <button className="on" id="break-button" onClick={props.startBreak}>Break</button>
        )
    }
}

export default Timer;