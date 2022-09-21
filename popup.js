//var app = chrome.runtime.getBackgroundPage();

async function hello() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['alert.js'],
    }, function(data){
        feedDisplay = document.querySelector('#texthere');
        console.log("feedDisplay in popup: " + feedDisplay);
        feedDisplay.insertAdjacentHTML("beforeend", "Sample text");
    });
}

document.getElementById('clickme').addEventListener('click', hello);