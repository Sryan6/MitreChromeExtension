//var app = chrome.runtime.getBackgroundPage();
let textToCopy = ""

async function hello() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        //files: ['alert.js'],
        func: testFunction,
    }, (data) => {
        feedDisplay = document.querySelector('#texthere');
        console.log("data");
        console.log(data);

        //console.log("data[0].result");
        //console.log(data[0].result);
        if (typeof (data) == 'undefined') {
            console.log("ERROR");
        }
        else {
            if (typeof (data[0]) == 'undefined') {
                console.log("ERROR2");
            }
            else {
                if (typeof (data[0].result) == 'undefined') {
                    console.log("ERROR3");
                }
                else {
                    if (data[0].result == null) {
                        console.log("ERROR4");
                    }
                    else {
                        if (data[0].result.length == 0) {
                            feedDisplay.insertAdjacentHTML("afterbegin", "No T-Codes found");
                        }
                        textToCopy = "";
                        for (let i = 0; i < data[0].result.length; i++) {
                            console.log("data.result");
                            console.log(data[0].result);
                            feedDisplay.insertAdjacentHTML("beforeend", data[0].result[i]);
                            feedDisplay.insertAdjacentHTML("beforeend", "<br />");
                            textToCopy = textToCopy + data[0].result[i] + ", ";
                        }
                        textToCopy = textToCopy.slice(0, -2);
                    }
                }
                //feedDisplay.insertAdjacentHTML("beforeend", data[0].result);
            }

        }
    });

}

async function copy() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        //files: ['alert.js'],
        func: copyText,
    }, (data) => {
        console.log("The returned data:");
        console.log(data);
        console.log("textToCopy: ");
        console.log(textToCopy);
        //Create a textbox field where we can insert text to. 
        var copyFrom = document.createElement("textarea");

        //Set the text content to be the text you wished to copy.
        copyFrom.textContent = textToCopy;

        //Append the textbox field into the body as a child. 
        //"execCommand()" only works when there exists selected text, and the text is inside 
        //document.body (meaning the text is part of a valid rendered HTML element).
        document.body.appendChild(copyFrom);

        //Select all the text!
        copyFrom.select();

        //Execute command
        document.execCommand('copy');

        //De-select the text using blur(). 
        copyFrom.blur();

        //Remove the textbox field from the document.body, so no other JavaScript nor 
        //other elements can get access to this.
        document.body.removeChild(copyFrom);
    })
}

async function copyText() {
    // get the text to be copied
    elem = document.getElementById('texthere')
    console.log(elem);
    console.log("in function copyText");
    if (elem.innerText != undefined) {
        console.log("in 1");
        text = elem.innerText;
    }
    else if (elem.value != undefined) {
        console.log("in 2")
        text = elem.value;
    } else {
        console.log("returned false")
        //return false;
    }

    console.log("text to copy:");
    console.log(text);

    // create a temporary box, and stop the viewport scrolling
    var box = document.createElement("textarea");
    box.value = text;
    document.body.appendChild(box);
    box.style.top = "0";
    box.style.left = "0";
    box.style.position = "fixed";

    // select the text in the box and copy it
    box.focus();
    box.select();
    box.setSelectionRange(0, 99999);
    document.execCommand("copy");

    // alert the user of the copy?
    //alert("text copied to your clipboard!");
}

document.getElementById('clickme').addEventListener('click', hello);
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copyButton').addEventListener('click', copy);
});


async function testFunction() {
    html = document.body.innerHTML;
    text = document.body.innerText;
    //alert('hello ' + document.location.href);
    console.log("HTML FOR THE BODY" + html);

    const articles = []
    const tCodeList = []
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

    for (let i = 0; i < tCodeKeys.length; i++) {
        if (text.includes(tCodeKeys[i])) {
            keyword = tCodeKeys[i];
            tCode = tCodes[keyword]
            articles.push({
                keyword,
                tCode
            })
            listMember = "Keyword: " + keyword + " /// T-Code: " + tCode;
            tCodeList.push(listMember);
        }
    }

    // Declare variables
    var pos = 0;
    var num = 0;
    var i = -1;
    //newHTML = document.innerHTML;
    newHTML = html;
    sizeOfhtml = html.length;

    console.log("newHTML.length");
    console.log(newHTML.length);
    // Search the string and counts the number of e's
    for (let j = 0; j < tCodeKeys.length; j++) {
        //for (let k = 0; k < sizeOfhtml; k++) {
        while (pos != -1) {
            pos = html.indexOf(tCodeKeys[j], i + 1);
            console.log(pos)
            html = html.slice(0, pos) + "<span style='background-color: #FFFF00'>" + html.slice(pos, pos + tCodeKeys[j].length) + "</span>" + html.slice(pos + tCodeKeys[j].length);

            //k = k + tCodeKeys[j].length + 47;
            num += 1;
            i = pos;
            i = i + tCodeKeys[j].length + 47;
            if (pos == -1) {
                break;
            }
        }
        console.log(html);
    }
    //console.log("newHTML");
    //console.log(newHTML);
    console.log("Keys");
    console.log(tCodeKeys);
    console.log("articles");
    console.log(articles);
    console.log("tCodeList");
    console.log(tCodeList);
    console.log("num");
    console.log(num);

    //document.body.style.backgroundColor = 'purple';
    //document.wrs.ryan2@acclaimite("<p>Test</p><strong>TEST</strong>")
    //document.write(html)
    return tCodeList;
}