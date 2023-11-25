import {useState, useEffect} from "react"
import "./timer.css"

function Timer() {
    const [seconds, setSeconds] = useState();
    const [minutes, setMinutes] = useState();
    const [working, setWorking] = useState(false);
    const [breaking, setBreaking] = useState(false);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
            if (request.query === "time") {
                setMinutes(request.minutes)
                setSeconds(request.seconds)
            } else {
                console.log(error)
            }
        })
    },[])
    
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
            <Display minutes={minutes} seconds={seconds}/>
            <div id="timer-buttons">
                <WorkButton startWork={startWork} working={working}/>
                <BreakButton startBreak={startBreak} breaking={breaking}/>
            </div>
        </div>
    )
}

function Display(props) {
    if (props.minutes && props.seconds) {
        return (
            <div id="display">{props.minutes + ":" + props.seconds}</div>
        )
    } else {
        return (
            <div id="display">25:00</div>
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