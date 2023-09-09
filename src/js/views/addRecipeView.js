import svgUrl from "../../img/icons.svg";
import view from "./views";

class addRecipeView extends view {
 _parentClass=document.querySelector('.upload');
 _overLay = document.querySelector('.overlay');
 _window = document.querySelector('.add-recipe-window');
//  _form = ;
 _closeBtn = document.querySelector('.btn--close-modal');
 _openBtn = document.querySelector('.nav__btn--add-recipe');

 constructor(){
    super();
    this._PopUpOpen();
    this._PopUpClose()
 }

_toggle(){
    this._overLay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')

}

_PopUpOpen(){
    
this._openBtn.addEventListener('click', this._toggle.bind(this))
}
_PopUpClose(){
    
    this._closeBtn.addEventListener('click', this._toggle.bind(this))
    this._overLay.addEventListener('click', this._toggle.bind(this))

    }
   
addhandlerFormSubmit(callBack){
 
this._parentClass.addEventListener('submit',function (e) {
    e.preventDefault();
    let formFields =  [...new FormData(this)];
    let data = Object.fromEntries(formFields)
    callBack(data)
  })

}
    

}

export default new addRecipeView();
