import svgUrl from "../../img/icons.svg";
import listingElement from "./listingElement";
import view from "./views";

class bookMarksView extends view {
 _parentClass = document.querySelector(".bookmarks");
 



_generateHTML(val){
  
 
let resultList = val.map(obj=> listingElement._generateHTML(obj)).join('')
return resultList
}







  

}

export default new bookMarksView();
