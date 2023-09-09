import svgUrl from "../../img/icons.svg";

class searchView {
  _parentClass = document.querySelector(".search");

  searchedQuery() {
    let searchedQuery = this._parentClass.querySelector(".search__field").value.trim();
    this._clearInnerHTML();
    return searchedQuery;
  }

  _clearInnerHTML() {
    this._parentClass.querySelector(".search__field").value = "";
  }

  addHandlerRender(callback) {
    this._parentClass.addEventListener("submit", function (e) {
      e.preventDefault();
      callback();
    });
  }
}
export default new searchView();
