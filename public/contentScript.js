/*global chrome*/

function getDomElement() {
    // Get each job item as a node in a nodelist
    const group = document.querySelector('[data-genesis-element="CARD_GROUP_CONTAINER"]');   
    const nodes = group.querySelectorAll('[data-genesis-element="CARD_CONTENT"]');

    // Below block works to just get the text fro the job card items
    //let list = [].slice.call(nodes);
    //let content = list.map(function(e) {return e.innerText;}); 
    //return content;

    // main array to push to
    let mainArray = [];

    for (let i=0; i < nodes.length; i+1) {
        let node = nodes[i];
        console.log(node);
        //For each item in nodes, create temp array, 
        let tempArray = [];
        //push h2 innertext & href to temp array
        const title = node.querySelector("h2 a");
        tempArray.push(title.innerText);
        const link = "https://totaljobs.com" + title.getAttribute('href');
        tempArray.push(link);
        //push data-at="job-item-location" innertext to temp array
        const location = node.querySelector('[data-at="job-item-location"]');
        tempArray.push(location.innerText);
        //push temp array to main array above
        mainArray.push(tempArray);
    }

    //nodes.forEach((e) => {
        
    //});

    console.log(mainArray);
    if (mainArray === undefined || mainArray.length == 0){
        return "empty";
    } else {
        return mainArray;  
    }
}
   
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getDomElement') {
        let result = getDomElement();
        // The line below sends the info back to the react app
        sendResponse(result);
    }
});