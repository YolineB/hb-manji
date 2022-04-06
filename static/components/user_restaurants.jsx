function filterFavorites(citySearchString, favorites){
    
    let filtered_favorites = favorites.map((restaurant) => {
        if (restaurant.city.startsWith(citySearchString)){
            filtered_favorites
        }
    })
    console.log(filtered_favorites)
}

function RestaurantItem({restaurant, canEdit}) {
    
    const chosenRest = {
        'restID' : restaurant.id, 
        'chosenRestObj' : "Rest ID already in system, not needed"
    }
   
    const addFavoriteButton =  
            <button 
                onClick={(evt) => addToUserFavList(evt.target,chosenRest)}
                className="btn btn-primary btn-lg">
                Add to your list too!
            </button>
        

    const deleteButton = 
            <button onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
                className='btn btn-primary btn-sm' type='button' id='delete'>
                Remove
            </button>
        

    return (
        <tr> 
            <th scope="row"><a href={restaurant.url} target="_blank" className="link-success">{restaurant.name}</a></th>
            <td>{restaurant.city}</td>
            <td>{canEdit && deleteButton}
            {!canEdit && (restaurant.favorited ? null: addFavoriteButton)}
            </td>
        </tr>
    );
}

function RestaurantsList({restaurants}) {
    const {can_edit, favs} = restaurants;
    const [canEdit, setCanEdit] = React.useState(false);
    const [cityFilter, setCityFilter] = React.useState("")
    
    console.log(favs)
    if (cityFilter){
        filterFavorites(cityFilter, favs)
    }   
    //city search state, that give city string
    //filter favs
    //a helper function that takes favs, and returns only the restaurant
    //obj that are equal to search
    if (!favs) return "No favorites yet";
    
    let buttonEditOption = '';
    if (can_edit){
        buttonEditOption = <button className="btn btn-danger btn-sm" id="restaurant_edit" 
                        onClick ={() => setCanEdit(!canEdit)} > 
        Edit List </button>     
    }

    return (
        <table className="table table-dark table-striped table-responsive-xxl table-responsive table-sm ">
            <thead> 
                <tr>
                    <th scope="col">Restaurant Name </th>
                    <th scope="col">City
                    <input type="text" placeholder="city filter" 
                    onChange={(evt)=> setCityFilter(evt.target.value)}></input>
                    </th>
                    <th scope="col">{buttonEditOption}</th>
                </tr>
            </thead>
            <tbody> 
                {favs.map(restaurant => <RestaurantItem key={restaurant.id}
                restaurant={restaurant} canEdit={canEdit}/>)}
            </tbody>
        </table>
    )
}


{/* <FavoriteMarkers userID={props.userID} favs={userArr}/> */}

// fetch(`/userRestaurants/${userID}`)
//   .then((response) => response.json())
//   .then((data => {
//     for (let rest of Object.values(data.favs)){
//       myMarker = new google.maps.Marker({
//         position: rest['coords'],
//         title: rest['name'],
//         map: window.basicMap,
//       });
//     }
//   }))


// function FavoriteMarkers(props){
    // <FavoriteMarkers user_id={user_id}/>
//     //let markersArr = [];
//     const [favButton, setFavButton] = React.useState(false);

//     // for (let rest of Object.values(favArr)){
//     //     markersArr.push(new google.maps.Marker({
//     //       position: rest['coords'],
//     //       title: rest['name'],
//     //       // map: window.basicMap,
//     //     })); 
//     //   }


//     // const [markers, setMarkers] = React.useState(markersArr);

//     // console.log(favButton)

//     if (!favButton){
//         initMap()
//         userMap(props.user_id)
//     }
     
//     return (
//         <button className="btn btn-primary btn-sm" id="fav_markers" 
//                         onClick ={() => setFavButton(!favButton)} > Show Favs</button>
//     )
// }
