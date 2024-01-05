import { async } from "regenerator-runtime";
import {API_URL,RES_PER_PAGE,KEY} from "./config";
import { getJSON, sendJSON } from "./helper";

export const state = {
    recipe:{},
    search:{
        query:'',
        result:[],
        page:1,
        resultsPerPage:RES_PER_PAGE,
       
    },
    bookmarks:[]
    
};

const createRecipeObject = function(data){
    const {recipe} = data.data;
    return {
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        sourceUrl:recipe.source_url,
        serving:recipe.servings,
        cookingTime:recipe.cooking_time,
        ingredients:recipe.ingredients,
        image:recipe.image_url,
        ...(recipe.key && {key:recipe.key})
       };
}
export const loadRecipe = async function (id){
    
    try {
        const data = await getJSON(`${API_URL}${id}`)
        
        state.recipe = createRecipeObject(data);

        if(state.bookmarks.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true;
        else
        state.recipe.bookmarked = false;
        
    } catch (error) {
       throw error;
    }

}

export const loadSearchResults = async(query)=>{

    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
    //  console.log(data);

      state.search.result = data.data.recipes.map(rec=>{
            return {
                id:rec.id,
                title:rec.title,
                publisher:rec.publisher,
                image:rec.image_url
            }
        })
    
        state.search.page = 1;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getSearchResultsPage = function(page= state.search.page){
    state.search.page = page;

    const start =(page-1) * state.search.resultsPerPage  // 0;
    const end = page * state.search.resultsPerPage; // 9
    const res = state.search.result.slice(start,end)
    // console.log(res)
    return res;
}

export const updateServing = function(newServing){
state.recipe.ingredients.forEach(ing=>{
    ing.quantity = (ing.quantity * newServing) / state.recipe.serving;
    // newQut = oldQut*newServing/oldServing;
});

state.recipe.serving = newServing;

}

const persistBookmark = function(){
localStorage.setItem("bookmarks",JSON.stringify(state.bookmarks))

}

export const addBookmark = function(recipe){
    // add bookmark
    state.bookmarks.push(recipe);

    // mark current recipe as bookmark
    persistBookmark();

    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}

export const deleteBookmark = function(id){
    // delete bookmark
    const index = state.bookmarks.findIndex(ele => ele.id===id);
    state.bookmarks.splice(index,1);
    persistBookmark();
  if (state.recipe.id === id) state.recipe.bookmarked = false;  
}

const init = function(){
   const storage = localStorage.getItem("bookmarks");
   if(storage) state.bookmarks = JSON.parse(storage);
}
init();

export const uploadRecipe = async function (newRecipe){
    try{
        const ingredients = Object.entries(newRecipe).filter(
            entry =>entry[0].startsWith('ingredient') &&
                entry[1] !=='').map(ing=>{
            const ingArr = ing[1].replaceAll(' ','').split(',');
            if(ingArr.length !== 3){
                throw new Error('Wrong ingredient format! Please use the correct format')
            }
            const [quantity, unit, description] = ingArr;
            return {quantity:quantity ? +quantity: null, unit, description};
        })
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }
        const data = await sendJSON(`${API_URL}?key=${KEY}`,recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    }catch (error){
        throw error;
    }
}