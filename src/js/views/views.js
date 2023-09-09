import svgUrl from "../../img/icons.svg";

export default class view{
  _defaultErrorMessage = 'Something Went Wrong';


  /**
   * This will render the html on parent that has been passed in it
   * @param {Object | Array} data
   * @param {boolean} [secParam = true] if false,this will simply return's an html  
   * @returns 
   */
  render(data,secParam =true) {
    // this._data = data
    let innerHTMl = this._generateHTML(data);
    if(!secParam) return innerHTMl
    this._clearInnerHTML();

    this._parentClass.insertAdjacentHTML("afterbegin", innerHTMl);
    // this._parentClass.innerHTML = this._generateHTML(recipe)
  }


/**
 * 
 * @param {*} data 
 */
update(data){

// this._data = data;
let newMarkup = this._generateHTML(data);
let newDom = document.createRange().createContextualFragment(newMarkup);
let newElement = Array.from(newDom.querySelectorAll('*'))
let curElement = Array.from(this._parentClass.querySelectorAll('*'))
// console.log(newElement,curElement)

newElement.forEach((newEL,i)=>{
  let curEl = curElement[i];


if(!newEL.isEqualNode(curEl) && newEL.firstChild?.nodeValue.trim() !== ''){
curEl.textContent = newEL.textContent;


};

if(!newEL.isEqualNode(curEl)){

  Array.from(newEL.attributes).forEach((val,i)=>{

    if(Array.from(curEl.attributes)[i].value !== val.value){
      Array.from(curEl.attributes)[i].value = val.value
    }
  })
}

})

}

  loader(whereTodisplay) {
    this._parentClass.innerHTML = "";

    let spinner = ` 
    <div class="spinner">
            <svg>
              <use href="${svgUrl}#icon-loader"></use>
            </svg>
          </div> `;
          this._parentClass.insertAdjacentHTML("afterbegin", spinner);
  }

/**
 * @function [this._clearInnerHTML]  this return an HTML and this function only called by render method
 */

  _clearInnerHTML() {
    this._parentClass.innerHTML = "";
  }

  renderError(errorMessage = this._defaultErrorMessage){
this._clearInnerHTML();
this._parentClass.insertAdjacentHTML('afterbegin',this._generateErrorHtml(errorMessage))
    
 
  }

  _generateErrorHtml(errorMessage){

    
    return `<div class="error">
    <div>
      <svg>
        <use href='${svgUrl}#icon-alert-triangle'></use>
      </svg>
    </div>
    <p>${errorMessage}</p>
  </div>`
  }

}

