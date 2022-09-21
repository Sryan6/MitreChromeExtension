console.log("window.location.href here:");
console.log(window.location.href);

/*
function reddenPage() {
    document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: reddenPage
        });
    }
});
axios(window.location.href)
    .then(response => {
        const html = response.data
        //console.log("html")
        //console.log(html)
        const $ = cheerio.load(html)
        const articles = []
        const tCodes = {
            "links": "T1566.002", "malicious": "T1566.001",
            "spearphishing": "T1566.001", "attachment": "T1566.001",
            "email": "T1566.001", "file": "T1566.001",
            "files": "T1566.001", "services": "T1566.003",
            "spearphishing": "T1566.003", "social media": "T1566.003",
            "phishing": "T1566", "credentials": "T1212",
            "exploitation": "T1212", "command and control": "T1041",
            "control": "T1041", "channel": "T1041",
            "communications": "T1041", "command": "T1041",
            "traffic": "T1071.001", "protocols": "T1071.001",
            "communicate": "T1071.001", "web": "T1071.001",
            "network": "T1071.001", "commands": "T1071.001",
            "https": "T1071.001", "http": "T1071.001"
        };
        const tCodeKeys = Object.keys(tCodes);

        const sampleDict = {
            "automatically": "T1337.001",
            "manually": "T1337.002",
            "Semantically": "T1337.003"
        }
        const sampleDictKeys = Object.keys(sampleDict);

        $('p', html).each(function () { //<-- cannot be a function expression
            const paragraphs = $(this).text()
            for (let i = 0; i < tCodeKeys.length; i++) {
                if (paragraphs.includes(tCodeKeys[i])) {
                    keyword = tCodeKeys[i];
                    tCode = tCodes[keyword]
                    articles.push({
                        keyword,
                        tCode
                    })
                }
            }
        })

        // Declare variables
        var pos = 0;
        var num = -1;
        var i = -1;
        newHTML = html



        // Search the string and counts the number of e's
        while (pos != -1) {
            pos = newHTML.indexOf("automatically", i + 1);
            //newHTML = newHTML.slice(0, pos) + "<span style='background-color: #FFFF00'>" + newHTML.slice(pos, pos + 13) + "</span>" + newHTML.slice(pos + 13);
            num += 1;
            i = pos;
        }
        //console.log("newHTML");
        //console.log(newHTML);
        console.log("Keys");
        console.log(tCodeKeys);
        console.log("articles");
        console.log(articles);
        console.log("num");
        console.log(num);
        //res.json(articles)
        //res.json(html)
    }).catch(err => console.log(err))
    */