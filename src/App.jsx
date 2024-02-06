/*global chrome*/

import { useState } from 'react'
import './styles/App.css';
//import Scan from './components/Scan';

export default function App() {
  const [pageInfo, setPageInfo] = useState(null);

  function getInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.id !== undefined) {
        // Below sendMessage sends an action (e.g. execute this function) in the contentscript
        chrome.tabs.sendMessage(tab.id, {
          action: 'getDomElement',
        }, function(response) {
          //This is the response from the content script:
          setPageInfo(response);
        });
      }
    });
  }

  return (
    <section>
      <h1>Hello</h1>
      <button onClick={getInfo}>Get dom elements</button>
      <h2>{pageInfo}</h2>
    </section>
  )
}
