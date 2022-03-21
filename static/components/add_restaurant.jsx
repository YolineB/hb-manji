'use strict';

function restChoice(restObj) {
    
    let answer = <li>
    <div className="restaurant-body">
        <h5 className="restaurant-title">${restObj['name']}</h5>
        <div className="restaurant addy"> ${restObj['location']['display_address']} </div>
        <button value="${restObj}" onclick="addToUserList(this)" className="btn btn-primary">Add to my list</button> 
    </div>
    </li>;
    
    return answer
}


function SubmitSearch(prop){

    const [term, setTerm] = React.useState('');
    const [location, setCity] = React.useState('');


    function submitSearch(){
        const queryString = new URLSearchParams({'term': term, 'location': location}).toString();
        const url = `/test_fetch?${queryString}`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let result = [];
            for (let rest of data){
                result.push(restChoice(rest));
            };
            prop.addResults(result);
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

    function addResults(results) {
        setSearchResults(results);
    }

    return (
        <React.Fragment>
            <SubmitSearch  addResults={addResults}/>
            < h2>Search Results</h2>
            <div className="grid">{searchResults}</div>
        </React.Fragment>
    )
}


ReactDOM.render(<AddRestaurantContainer  />, document.getElementById('add_restaurant'));

// Post method not working
// function submitSearch(){
//         fetch("/restaurant_search.json", {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             body: JSON.stringify({"term": term, "location":location}),
//             }
//         })
//         .then((response) => response.json())
//         .then((restData) => {
//             console.log(restData);
//             prop.addResults(restData);
//         });
//     }

// (
//     <ol>
//       {reptiles.map(reptile => (
//         <li key={reptile}>{reptile}</li>
//       ))}
//     </ol>
//   );
