import svgUrl from "../../img/icons.svg";
import view from "./views";

class RecipeView extends view {
  _parentClass = document.querySelector(".recipe");
 


addHandlerRander(calback){
  let whenToShowRecipe = ['hashchange','load']
whenToShowRecipe.forEach(val=> window.addEventListener(val ,calback))
}

addHandlerUpdate(calback){


this._parentClass.addEventListener('click',function (e) {
  let btn = e.target.closest('.btn--tiny');
  if(!btn) return;
  let { updateserving : newServing} = btn.dataset;


if(newServing > 0) calback(newServing);

  })



}

addHandlerAddBookmark(callback){

  this._parentClass.addEventListener('click',function (e) {
    let btn = e.target.closest('.btn--round')
    if(!btn) return;
    callback();

    })

}

  _generateHTML(recipeData) {
    let { recipe } = recipeData;

    return `
<figure class="recipe__fig">
          <img src='${recipe.image}' alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href='${svgUrl}#icon-clock'></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${"cookingTime"}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href='${svgUrl}#icon-users'></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-updateServing='${recipe.servings - 1}'>
                <svg>
                  <use href='${svgUrl}#icon-minus-circle'></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-updateServing='${recipe.servings + 1}'>
                <svg>
                  <use href='${svgUrl}#icon-plus-circle'></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href='${svgUrl}#icon-user'></use>
            </svg>
          </div>
          <button class="btn--round">
          ${recipe.bookMarked ? `<svg class="">
          <use href="${svgUrl}#icon-bookmark-fill"></use>
          </svg>`:`<svg class="">
          <use href="${svgUrl}#icon-bookmark"></use>
          </svg>`}
            
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map((ing) => this._generateIngridentHTML(ing))
              .join("")}

           
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href='${svgUrl}#icon-arrow-right'></use>
            </svg>
          </a>
        </div>
`;
  }
  _generateIngridentHTML(ing) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href='${svgUrl}#icon-check'></use>
    </svg>
     <div class="recipe__quantity">--- ${ing.qty} --</div>
    <div class="recipe__description">
      ${ing.ingridient}
    </div>
  </li>`;
  }

  renderError(errorMessage = this._defaultErrorMessage){
this._clearInnerHTML();
this._parentClass.insertAdjacentHTML('afterbegin',this._generateErrorHtml(errorMessage))
    
 
  }

  

}

export default new RecipeView();
