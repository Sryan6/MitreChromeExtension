const feedDisplay = document.querySelector('#feed')

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: reddenPage
        });
    }
});

fetch('http://localhost:8000/results')
    .then(response => { return response.json() })
    .then(data => {
        data.forEach(article => {
            const articleItem = `<div><h3>` + article.keyword + `</h3><p>` + article.tCode + `</p></div>`
            feedDisplay.insertAdjacentHTML("beforeend", articleItem)
        })

    })
    .catch(err => console.log(err))



function reddenPage() {
    document.body.style.backgroundColor = 'red';
}