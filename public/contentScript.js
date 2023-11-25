
var noteCount = 0;
init_notes();

function clear_notes() {
  document.querySelectorAll('.htn-sticky-note-class').forEach(e => e.remove());
  noteCount = 0;
}

function add_notes(notes) {
  var body = document.querySelector("body");
  for (let i = 0; i < notes.length; i++) {
    noteCount += 1;
    var noteContainer = document.createElement("div");
    var noteField = document.createElement("textarea");
    var closeButton = document.createElement("Button")
    closeButton.classList.add("close-button")
    closeButton.innerText = "X";
    noteField.classList.add("note-field")
    noteContainer.setAttribute("id", "htn-sticky-note-" + noteCount);
    noteContainer.setAttribute("class", "htn-sticky-note-class");
    noteField.value = notes[i];
    noteContainer.setAttribute("size", notes[i].length);
    noteContainer.style.left = (noteCount - 1) * 300 + "px";
    noteContainer.style.top = 10 + "px";
    noteContainer.appendChild(noteField)
    noteContainer.appendChild(closeButton)
    body.prepend(noteContainer);
    draggable(document.getElementById("htn-sticky-note-" + noteCount));
  }
}

function draggable(DOMelement) {
  var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;

  DOMelement.addEventListener("mousedown", dragMouseDown)

  function dragMouseDown(event) {
    if (event.target.classList.contains("htn-sticky-note-class")){
      function removeDrag(event) {
        document.onmousemove = null;
        document.removeEventListener("mouseup", removeDrag)
      }
      x2 = event.clientX;
      y2 = event.clientY;

      document.addEventListener("mouseup", removeDrag)
      document.onmousemove = elementDrag;
    } 
  }

  function elementDrag(event) {
    event = event || window.event;
    event.preventDefault();
    x1 = x2 - event.clientX;
    y1 = y2 - event.clientY;
    x2 = event.clientX;
    y2 = event.clientY;
    DOMelement.style.top = DOMelement.offsetTop - y1 + "px";
    DOMelement.style.left = DOMelement.offsetLeft - x1 + "px";
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-button")) {
    event.target.parentElement.remove();
  }
})

function init_notes() {
  let url = document.URL;
  chrome.storage.local.get(document.URL, notes => {
    if (notes[url]) {
      add_notes(notes[url]);
    }
  });
}

chrome.runtime.onMessage.addListener(
  (request, _, sendResponse) => {
    if (request.action == "clear") {  // Delete All Notes on the Page
      clear_notes();
      sendResponse({status: "complete"});
    }
    else if (request.action == "add") { // Add New Notes to Page
      add_notes(request.notes);
      sendResponse({status: "complete"});
    } 
    else {
      sendResponse({status: "error"});
    }
  }
);
