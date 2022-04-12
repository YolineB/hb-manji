
function restChoice(idx,restaurantObj, favArr) {
    let isFav = favArr.includes(restaurantObj['id']);
    let msg;
    if (isFav) {
        msg = 'Already a favorite!'
    } else {
        msg = 'Add to favorites'
    }

    const chosenRestaurant = {
        'restID' : restaurantObj['id'], 
        'chosenRestaurantObj' : restaurantObj
    }

    let favoriteButton = <button 
                            onClick={(evt) => addToFavList(evt.target,chosenRestaurant)} 
                            className="btn btn-primary" disabled={isFav}>
                            {msg}
                        </button> 
    
    return (
        <React.Fragment>
            <div className="col-sm-4">
                <div className="card text-center"> 
                    <div className="card-body">
                    <a href={restaurantObj['url']} target="_blank"><h5 className="restaurant-title">{restaurantObj['name']}</h5></a>
                        <p class="card-text">{restaurantObj['location']['display_address']}</p>
                        {favoriteButton}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
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
            for (let [i, restaurant] of Object.entries(data['yelp_results'])){
                result.push(restChoice(i, restaurant, data['favorites']));
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
            <h2>Search Results</h2>
            <div className="row">
                {searchResults}
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<SearchRestaurantContainer  />, document.getElementById('search_restaurant'));

