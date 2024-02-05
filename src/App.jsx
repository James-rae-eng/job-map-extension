/*global chrome*/

//import { useState } from 'react'
import './styles/App.css';
//import Scan from './components/Scan';

export default function App() {
  function toggleGrayscale() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, {
          action: 'removeColorControl',
        });
      }
    });
  }

  return (
    <section>
      <h1>Hello</h1>
      <button onClick={toggleGrayscale}>Toggle colour</button>
    </section>
  )
}
