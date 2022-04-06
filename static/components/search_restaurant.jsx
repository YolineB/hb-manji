'use strict';

//makes list of restaurant choices, checks if rest already in favs and disables button
function restChoice(idx,restObj, favArr) {
    let isFav = favArr.includes(restObj['id']);
    let msg;
    if (isFav) {
        msg = 'Already in your list!!'
    } else {
        msg = 'Add to favorites'
    }

    const chosenRest = {
        'restID' : restObj['id'], 
        'chosenRestObj' : restObj
    }
    
    return (
        <span key={idx} className="restaurant-body">
            <h5 className="restaurant-title">{restObj['name']}</h5>
            <div className="restaurant addy"> {restObj['location']['display_address']} </div>
            <a href={restObj['url']} className="link-success">{restObj['name']} site info</a>
            <button onClick={(evt) => addToUserFavList(evt.target,chosenRest)} className="btn btn-primary" disabled={isFav}>{msg}</button> 
            <button onClick={(evt) => addToUserFavList(evt.target,chosenRest)} className="btn btn-primary" disabled={isFav}>{msg}</button> 
        </span>);

}

function SubmitSearch(props){

    const [term, setTerm] = React.useState('');
    const [location, setCity] = React.useState('');


    function submitSearch(){
        const queryString = new URLSearchParams({'term': term, 'location': location}).toString();
        const url = `/api_rest_search?${queryString}`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let result = [];
            for (let [i, rest] of Object.entries(data['yelp_results'])){
                result.push(restChoice(i, rest, data['rest_favs']));
            };
            props.addResults(result);
        });
    }

   return (
       <React.Fragment>
           <div className="container col" >
                <h2>Add Restaurant</h2>
                <div>
                    <div className='row'>
                        <label htmlFor="search-keyword">Search Name of Restaurant</label>
                        <input id="search-keyword" onChange={(event) => setTerm(event.target.value)}
                        type="text" name="search-keyword"></input>
                    </div>
                    <div className='row'>
                        <label htmlFor="search-city"> City </label>
                        <input id="search-city" onChange={(event) => setCity(event.target.value)} 
                        type="text" name="search-city"></input>
                    </div>
                    <button type='button' onClick={submitSearch}>Search Restaurants </button>
                </div>
            </div>
       </React.Fragment>
   )
}
//change to RestChoice to help make it a generator that will make a card with each button choice
function SearchRestaurantContainer() {

    const [searchResults, setSearchResults] = React.useState([]);

    return (
        <React.Fragment>
            <SubmitSearch  addResults={setSearchResults}/>
            < h2>Search Results</h2>
            <div className="grid">{searchResults}</div>
        </React.Fragment>
    )
}

ReactDOM.render(<SearchRestaurantContainer  />, document.getElementById('search_restaurant'));

