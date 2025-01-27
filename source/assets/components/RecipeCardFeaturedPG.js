import { checkFav, rmFav, addFav } from "../scripts/helpCrudFunc.js";
import { getImgUrl, getTitle, getTime } from "../scripts/helpGetDataFunc.js";

class RecipeCardFeaturedPG extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(data) {
    // This is the CSS that you"ll use for your recipe cards
    const styleElem = document.createElement("style");
    const styles = `

      * {
      margin: 0;
      padding: 0;
    }
    
    article {
      align-items: center;
      border: 1px solid rgb(223, 225, 229);
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      height: 300px;
      justify-content:space-between;
      margin: 25px;
      padding: 0 16px 16px 16px;
      transition: all 0.4s linear;
      width: 200px;
      -moz-transition: all 0.4s linear;
      -o-transition: all 0.4s linear;
      -webkit-transition: all 0.4s linear; 
    }
    article:hover {
      box-shadow:0px 1px 17px -8px #000;
      transform: scale(1.02);
    }
    article p {
      color: #305A50;
      font-size: 16px;
      text-align: center;
    }
    article .recipe-img {
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      height: 120px;
      object-fit: cover;
      width: calc(100% + 32px);
    }

    article .favorite {
      align-self: flex-end;
      height: 20px;
      width: 20px;
    }

    article button {
      border: 1px solid #ccccd8;
      background-color: #fff;
      border-radius: 14px;
      color: #305A50;
      cursor: pointer;
      font-size: 17px;
      padding: 4px 26px;
    }
    
    article button:hover {
      border: 1px solid #313131;
      background: darkgreen;
      color: white;
    }

    article .cook-time {
      font-size: 13px;
    }
    `;
    styleElem.innerHTML = styles;

    // recipe card
    const card = document.createElement("article");

    // recipe card image
    const recipeImg = document.createElement("img");
    recipeImg.classList.add("recipe-img");
    recipeImg.src = getImgUrl(data);
    recipeImg.alt = getTitle(data);
    card.appendChild(recipeImg);

    // recipe card favorite button
    const heartImg = document.createElement("img");
    heartImg.classList.add("favorite");
    if (checkFav(getTitle(data))) {
      heartImg.setAttribute("src", "assets/images/icons/fillHeart.svg");
    }
    else {
      heartImg.setAttribute("src", "assets/images/icons/emptyHeart.svg");
    }

    heartImg.addEventListener("click", () => {
      changeHeart(data, heartImg);
    });

    card.appendChild(heartImg);

    // p element - title
    const recipeTitle = document.createElement("p");
    recipeTitle.classList.add("title");
    recipeTitle.textContent = getTitle(data);
    card.appendChild(recipeTitle);

    // time element
    const time = document.createElement("p");
    time.classList.add("cook-time");
    const totalTime = getTime(data);
    time.textContent = `${totalTime} min`;
    card.appendChild(time);

    // button element - check recipe
    const checkButton = document.createElement("button");
    checkButton.classList.add("cook");
    checkButton.textContent = "COOK!";
    card.appendChild(checkButton);
    checkButton.addEventListener("click", () => {
      viewRecipe(data);
    });


    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(card);

  }
}


/**
 * Toggles on and off the heart based on favorite
 * @returns void
 */
function changeHeart(data, cardObj) {
  if (checkFav(getTitle(data))) {
    cardObj.setAttribute("src", "assets/images/icons/emptyHeart.svg");
    rmFav(getTitle(data));
  }
  else {
    cardObj.setAttribute("src", "assets/images/icons/fillHeart.svg");
    addFav(data);
  }
}

/**
 * Load Featured Recipe Page
 * @returns void
 */
function viewRecipe(data) {
  $("#view-recipe-page").classList.add("main-shown");
  const viewRecipePage = document.createElement("view-fea-recipe");
  viewRecipePage.data = data;
  $("#view-recipe-page").appendChild(viewRecipePage);
  leaveMain();
}

// Define the Class so you can use it as a custom element.
customElements.define("recipe-card-featured-pg", RecipeCardFeaturedPG);

