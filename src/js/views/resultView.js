import View from "./view"

import previewView from "./PreviewView.js"
class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipe found for your query! Please try again 😿😢`

    _generateMarkup(){
      // console.log(this._data)
        return  this._data.map(result=>previewView.render(result,false)).join('');
      }

}

export default new ResultView();