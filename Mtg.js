const container = document.getElementById("card-container")
var currentPage = 1;
var maxPage = 500;

document.addEventListener("click", function (e) {
    if (e.target.id == "card-img" || e.target.id == "card-name") {
      cardDetail(e.target.alt);
    }
  });
  
  document.addEventListener("click", function (e) {
    if (e.target.id == "back-button" || e.target.id == "card-imgDetail") {
      changePage(currentPage);
    }
  });
  
//   document.addEventListener("click", function (e) {
//     if (e.target.id == "logo") {
//       currentPage = 1;
//       changePage(1);
//     }
//   });

function displayCards() {
    fetch("https://api.magicthegathering.io/v1/cards?page=4&pageSize=5")
        .then((response) => response.json())
        .then((data) => {
            data.cards.forEach((card) => {
                const cardDiv = document.createElement("div");
                const cardName = document.createElement("h2");
                const cardImg = document.createElement("img");
                cardDiv.id = "card-container";
                cardName.id = "card-name";
                cardName.alt = `${card.id}`;
                cardImg.id = "card-img";
                cardImg.alt = `${card.id}`;
                cardImg.title = `${card.name}`;
                cardName.textContent = card.name;
                cardImg.src = card.imageUrl;

                cardDiv.append(cardImg, cardName);
                    
                container.appendChild(cardDiv);
            });
        });
}

function cardDetail(id) {
    container.innerHTML = "";
    document.getElementById("navigation").style.display = "none";
    document.getElementById("navigation2").style.display = "none";
    fetch(`https://api.magicthegathering.io/v1/cards?${id}`)
        .then((response) => response.json())
        .then((card) => {
            const cardDiv = document.createElement("div");
            const cardName = document.createElement("h2");
            const cardImg = document.createElement("img");
            const cardDetails = document.createElement("p");
            cardDiv.id = "card-container";
            cardName.id = "card-nameDetail";
            cardImg.alt = card.id;
            cardImg.id = "card-imgDetail";
            cardImg.title = card.name;
            cardName.textContent = card.name;
            cardDetails.id = "card-details";
            cardDetails.innerHTML =
                `Type: ${card.type}` +
                "<br>" +
                `Cost: ${card.manaCost}` +
                "<br>" +
                `Set: ${card.set}`;
            cardImg.src = card.imageUrl;

            const backButton = document.createElement("button");
            backButton.innerHTML = "Go back";
            backButton.id = "back-button";
            cardDiv.append(
                cardName,
                cardImg,
                cardDetails,
                backButton
            );
            container.appendChild(cardDiv);
    })
}

// function searchCard() {

// }

// function displayCardsFromSet() {
//     if (selectedSet = sets.code)
//     {
//         fetch("https://api.magicthegathering.io/v1/cards/?sets=sets.code")
//         .then((response) => response.json())
//         .then((data) => {
//             data.cards.forEach((card) => {
//                 const cardDiv = document.createElement("div")
//                 const cardName = document.createElement("h2")
//                 const cardImg = document.createElement("img")
//                 cardDiv.id = "card-container"
//                 cardName.id = "card-name"

//                 cardName.textContent = card.name
//                 cardImg.src = card.imageUrl

//                 cardDiv.append(cardImg, cardName)

//                 container.appendChild(cardDiv)
//             });
//         });
//     }
// }

// function displaySets() {
//     fetch("https://api.magicthegathering.io/v1/sets")
//         .then((response) => response.json())
//         .then((data) => {
//             data.sets.forEach((set) => {
//                 const setDiv = document.createElement("div")
//                 const setName = document.createElement("h2")
//                 const setCode = document.createElement("h2")
//                 setDiv.id = "set-container"
//                 setName.id = "set-name"

//                 setName.textContent = set.name
//                 setCode.textContent = set.code

//                 setDiv.append(setName, setCode)

//                 container.appendChild(setDiv)
//             });
//         });
// }

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    if (currentPage < maxPage) {
        currentPage++;
        changePage(currentPage);
    }
}

function goPage(page) {
    currentPage = page;
    changePage(page);
}

function changePage(page) {
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const next2Btn = document.getElementById("next2Btn");
    const prev2Btn = document.getElementById("prev2Btn");

    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;

    container.innerHTML = "";
    if (page == 1) {
        prevBtn.style.visibility = "hidden";
        console.log(page);
    } else {
        prevBtn.style.visibility = "visible";
    }

    if (page == 1) {
        prev2Btn.style.visibility = "hidden";
        console.log(page);
      } else {
        prev2Btn.style.visibility = "visible";
      }
    
      if (page == maxPage) {
        next2Btn.style.visibility = "hidden";
      } else {
        next2Btn.style.visibility = "visible";
    }
    
    document.getElementById("navigation").style.display = "";
    document.getElementById("navigation2").style.display = "";

    displayCards();
    // displaySets();
}
    
window.onload = function () {
    changePage(1);
};
