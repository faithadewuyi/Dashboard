fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        // Getting authors name from API
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })

    //Getting Cypto Data

    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))