import view from "./views";

class paginationView extends view{
    _parentClass = document.querySelector(".pagination");



addHendlerRender(callback){
this._parentClass.addEventListener('click' ,function (e) { 
    let btn = e.target.closest('button')
    let pageIndex = btn.dataset.page;
   
    callback(pageIndex)

});

}



    _generateHTML(val){
console.log(val)
        let currentPage = val.currentPage;
        let totalPages = Math.round(val.recipeList.length / val.resultsPerPage);
       

if(currentPage===1 && totalPages > 1){
    let html  = this._nextHTML(val.currentPage + 1)
    return html
}


if(currentPage > 1 && totalPages > currentPage){
    let html = ` ${this._nextHTML(val.currentPage + 1)} ${this._currentHTML(val.currentPage)} ${this._previousHTML(val.currentPage - 1)}`
    return html
}



if(currentPage === totalPages){
    let html  = this._previousHTML(val.currentPage - 1)
    return html
}

        
    }

_previousHTML(val){
    return ` <button class="btn--inline pagination__btn--prev" data-page='${val}'>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${val}</span>
          </button>`

}

_currentHTML(val){
    return ` <button class="btn--inline pagination__btn--prev" '>
           
            <span>Current Page ${val}</span>
          </button>`

}

_nextHTML(val){
return  `<button class="btn--inline pagination__btn--next" data-page='${val}'>
            <span>Page ${val}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
`
}

}

export default new paginationView()