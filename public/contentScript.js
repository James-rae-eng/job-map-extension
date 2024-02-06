/*global chrome*/

function getDomElement() {
  
    const nodes = document.querySelectorAll('[data-genesis-element="CARD_GROUP_CONTAINER"]');
    let list = [].slice.call(nodes);
    let content = list.map(function(e) {return e.innerText;}); 
    return content;
}
   
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getDomElement') {
        let result = getDomElement();
        // The line below sends the info back to the react app
        sendResponse(result);
    }
});