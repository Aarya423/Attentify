import button from "./Logo.png"
import "./logo.css"

function Logo() {
    var mainUrl = chrome.runtime.getURL('./mainPage/main.html');
    return (
        <a href={mainUrl} target="_blank">
            <img className="logo" src={button}></img>
        </a>
    )
}
export default Logo