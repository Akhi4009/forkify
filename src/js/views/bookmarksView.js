// import PreviewView from "./PreviewView.js";
import View from "./view.js";
import previewView from "./PreviewView.js"


class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list")
    _errorMessage = `No bookmarks yet. Find a nice recipe and bookmak it.`

   addHandlerRender(handler){
    window.addEventListener('load',handler)
   }

    _generateMarkup(){
      // console.log(this._data)
        return  this._data.map(bookmark=>previewView.render(bookmark,false)).join('');
      }
    

    
    

}

export default new BookmarksView();