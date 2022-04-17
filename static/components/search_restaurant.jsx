
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
   
    return (
        <React.Fragment>
            <div className="col-sm-4" key={idx}>
                <div className="card text-center"> 
                    <div className="card-body overflow-auto">
                        <a href={restaurantObj['url']} target="_blank">
                            <h5 className="restaurant-title">{restaurantObj['name']}</h5>
                        </a>
                        <p className="card-text">{restaurantObj['location']['display_address']}</p>
                    </div>
                    <div className="card-footer text-center">
                        { isFav && msg }
                        { !isFav && 
                            <button 
                            onClick={(evt) => addToFavList(evt.target,chosenRestaurant)} 
                            id="fav-btn">
                            </button> 
                        }
                    </div> 
                </div>
            </div>
        </React.Fragment>
    )
}

function SearchForm({onSearch, onLoading}){
    const [term, setTerm] = React.useState('');
    const [location, setCity] = React.useState('');

    function submitSearch(){
        const queryString = new URLSearchParams({'term': term, 'location': location}).toString();
        const url = `/api_rest_search?${queryString}`;
        onLoading(true);

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let results = [];
            for (let [i, restaurant] of Object.entries(data['yelp_results'])){
                results.push(restChoice(i, restaurant, data['favorites']));
            };
            onSearch(results);
            onLoading(false);
        });
    }

   return (
       <React.Fragment>
                <div className='row'>
                    <h2>Search Name of Restaurant</h2>
                    <input id="search-keyword" onChange={(event) => setTerm(event.target.value)}
                    type="text" name="search-keyword"></input>
                </div>
                <div className='row'>
                    <label htmlFor="search-city"> City </label>
                    <input id="search-city" onChange={(event) => setCity(event.target.value)} 
                    type="text" name="search-city"></input>
                </div>
                <button type='button' onClick={submitSearch}>
                    <div id="submit-search"></div> 
                </button>
                <div id="cake"></div>
       </React.Fragment>
   )
}


function SearchRestaurantContainer() {
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const currentPage = "Restaurants to add to your list"

    const onSearch = (results) => setSearchResults(results)
    const onLoading = (loading) => setIsLoading(loading)

    return (
        <React.Fragment>
            <div className="container" id="nav-profile">
                <div className="row" >
                    <NavBar canEdit={true} currentPage={currentPage}/>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <SearchForm onSearch={onSearch} onLoading={onLoading}/>
                    </div>
                    <div className="col-md-8 offset-1">
                        <h2>Search Results</h2>
                        {isLoading && 'Loading...'}
                        {!isLoading &&
                            <div id="search-grid">
                                {searchResults}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(<SearchRestaurantContainer  />, document.getElementById('search_restaurant'));


