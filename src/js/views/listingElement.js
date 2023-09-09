import svgUrl from "../../img/icons.svg";
import view from "./views";

class listingElements extends view {
 _parentClass='';
 
_generateHTML(val){
  let id = window.location.hash.slice(1)
 
    return  `<li class="preview">
    <a class="preview__link ${val.recipe_id == id || val.id == id ? 'preview__link--active' :''}" href="#${val.recipe_id || val.id}">
      <figure class="preview__fig">
        <img src="${val.image_url || val.image}" alt="Test" />
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

export default new listingElements();
