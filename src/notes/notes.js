// import {useState, useEffect} from 'react'
import "./notes.css"

function AddNoteButton() {
  // Save Note
  function saveNote() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      // Something
      let url = tabs[0].url;
      let note = "";
      chrome.storage.local.get(url, notes => {
        if (notes[url]){
          notes[url].push(note);
        }
        else {
          notes[url] = [note];
        }
        chrome.tabs.sendMessage(tabs[0].id, {notes: [note], action: "add"}, _ => {
          console.log("Added Note: '"+ note);
        });
        chrome.storage.local.set(notes);
      });
    });
  };


  return (
    <button className='button save-button' id='save-note' onClick={saveNote}>Create Note</button>
  )

}

function ClearNoteButton() {
  function clear() {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, tabs => {
      let url = tabs[0].url;
      chrome.storage.local.get(url, notes => {
        notes[url] = []
        chrome.storage.local.set(notes);
        chrome.tabs.sendMessage(tabs[0].id, {notes: notes[url], action: "clear"}, _ => {
          console.log("Cleared page");
        });
      });
    });
  }

  return (
    <button className='button clear-button' id='delete-notes' onClick={clear}>Clear Notes</button>
  )
}

function Notes() {
  return (
    <>
      <AddNoteButton></AddNoteButton>
      <ClearNoteButton></ClearNoteButton>
    </>
  )
}

export default Notes;
