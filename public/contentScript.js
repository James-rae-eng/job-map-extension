/*global chrome*/

function getDomElement() {
    // Get each job item as a node in a nodelist
    const group = document.querySelector('[data-genesis-element="CARD_GROUP_CONTAINER"]');   
    const nodes = group.querySelectorAll('[data-genesis-element="CARD_CONTENT"]');

    // main array to push to
    let mainArray = [];

    // Get the info we want out of each job card
    nodes.forEach((e, index) => {
        // only run on every 3rd object (to ignore the description blocks after the main title info)
        if(index % 3 == 0) {
          let node = e;
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
    });

    // If no jobs found return empty (NOT FINISHED YET, CHECK LATER)
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