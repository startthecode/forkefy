import svgUrl from "../../img/icons.svg";
import listingElement from "./listingElement";
import view from "./views";

class resultsView extends view {
 _parentClass = document.querySelector(".results");
 

 addHandlerSearchResult(calback){
  let whenToShowRecipe = ['hashchange']
whenToShowRecipe.forEach(val=> window.addEventListener(val ,calback))
}


_generateHTML(val){
   
let resultList = val.map(obj=> listingElement._generateHTML(obj)).join('')
return resultList
}

_previewList(val){
  let id = window.location.hash.slice(1)
 
    return  `<li class="preview">
    <a class="preview__link ${val.recipe_id == id ? 'preview__link--active' :''}" href="#${val.recipe_id}">
      <figure class="preview__fig">
        <img src="${val.image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${val.title}</h4>
        <p class="preview__publisher">${val.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
    </li>`
}





  

}

export default new resultsView();
