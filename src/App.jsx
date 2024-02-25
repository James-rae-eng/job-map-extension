/*global chrome*/

import { useState } from 'react'
import './styles/App.css';
//import Scan from './components/Scan';

export default function App() {
  const [pageInfo, setPageInfo] = useState(null);
  const [searchAddress, setsearchAddress] = useState(null);

  function getInfo() {
  // Get the address searched for from the page URL
    function getAddress() {
      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // have to deal with `url` here inside the callback because the query is asynchronous
        let u = JSON.stringify(url);
        //Get address from url
        let urlAddress = u.substring(u.indexOf("-")+1, u.lastIndexOf("?"));
        //Strip any punctuation from address if muliple words
        let result = urlAddress.replace(/\W|_/g, ' ');
        setsearchAddress(result);
      });      
    }
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.id !== undefined) {
        // Below sendMessage sends an action (e.g. execute this function) in the contentscript
        chrome.tabs.sendMessage(tab.id, {
          action: 'getDomElement',
        }, function(response) {
          //This is the response from the content script:
          setPageInfo(response);
          // trigger address function
          getAddress();
        });
      }
    });
  }

  return (
    <section>
      <h1>Hello</h1>
      <button onClick={getInfo}>Get dom elements</button>
      <h1>{searchAddress}</h1>
      <h2>{pageInfo}</h2>
    </section>
  )
}
