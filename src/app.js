const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(article => {
            const articleItem = `<div><h3>` + article.keyword + `</h3><p>` + article.tCode + `</p></div>`
            feedDisplay.insertAdjacentHTML("beforeend", articleItem)
        })

    })
    .catch(err => console.log(err))


