'use strict';

function addToUserList(chosenRest){

    let yelpId = chosenRest['id'];

    const formInputs = {
        'yelpId' : yelpId, 
        'chosenRestObj' : chosenRest
    }

    fetch('/add_to_restaurant_list', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    .then(response => response.text())
    .then(answer => {
        if (answer === "newFav") {
            alert(`You have added ${chosenRest['name']} to your list!`)
        } else {
            alert(`${chosenRest['name']} has already been added to your list!`)
        }
    });
}
//makes list of restaurant choices, checks if rest already in favs and disables button
function restChoice(idx,restObj, favArr) {
    
    if (favArr.includes(restObj['id'])) {
        return (
            <span key={idx} className="restaurant-body">
                <h5 className="restaurant-title">{restObj['name']}</h5>
                <div className="restaurant addy"> {restObj['location']['display_address']} </div>
                <button onClick={() => addToUserList(restObj)} className="btn btn-primary" disabled>Already in your list!</button> 
            </span>);
    } else {
        return (
        <span key={idx} className="restaurant-body">
            <h5 className="restaurant-title">{restObj['name']}</h5>
            <div className="restaurant addy"> {restObj['location']['display_address']} </div>
            <button onClick={() => addToUserList(restObj)} className="btn btn-primary">Add to my list</button> 
        </span>);
    }
    
    //return answer
}

//enter a favs list in 
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
            console.log(data['yelp_favs'])
            for (let [i, rest] of Object.entries(data['yelp_results'])){
                result.push(restChoice(i, rest, data['yelp_favs']));
            };
            props.addResults(result);
        });
    }

   return (
       <React.Fragment>
           <div className="container col" >
                <h2>Add Restaurant</h2>
                <form>
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
                </form>
            </div>
       </React.Fragment>
   )
}


function AddRestaurantContainer() {

    const [searchResults, setSearchResults] = React.useState([]);

    return (
        <React.Fragment>
            <SubmitSearch  addResults={setSearchResults}/>
            < h2>Search Results</h2>
            <div className="grid">{searchResults}</div>
        </React.Fragment>
    )
}


ReactDOM.render(<AddRestaurantContainer  />, document.getElementById('add_restaurant'));


