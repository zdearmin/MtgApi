const api = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

api.appendChild(container)

function displayCards() {
    fetch(`https://api.magicthegathering.io/v1/cards?page=1&pageSize=50`)
        .then(response => response.json())
        .then(data => {
            data.cards.forEach(cards => {
                if (cards.multiverseid != null) {
                    const card = document.createElement('div')
                    card.setAttribute('class', 'cardContainer')

                    const h2 = document.createElement('h2')
                    h2.textContent = cards.name

                    const img = document.createElement('img')
                    img.src = cards.imageUrl

                    card.append(h2, img)
                    container.appendChild(card)
                }
            })
        })
}

function displaySets() {
    fetch(`https://api.magicthegathering.io/v1/sets`)
        .then(response => response.json())
        .then(data => {
            data.sets.forEach((set) => {
                const setDiv = document.createElement("div")
                const setName = document.createElement("h2")
                setDiv.id = "set-container"
                setName.id = "set-name"

                setName.textContent = set.name

                setDiv.append(setName)
                container.appendChild(setDiv)
            });
        });
}

// displayCards();
displaySets();

