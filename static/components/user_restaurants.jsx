function RestaurantItem({restaurant, editEnabled}) {
    const chosenRest = {
        'restID' : restaurant.id, 
        'chosenRestaurantObj' : "Restaurant ID already in system, not needed"
    }
        
    return (
        <tr> 
            <th scope="row">
                <a href={restaurant.url} target="_blank" className="link-success">{restaurant.name}</a>
            </th>
            <td>{restaurant.city}</td>
            <td>{
                editEnabled &&
                <button
                    onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
                    className='btn btn-primary btn-sm' type='button' id='delete'>
                    Remove
                </button>
            }
            {
                !editEnabled && !restaurant.favorited && 
                <button
                    onClick={(evt) => addToFavList(evt.target,chosenRest)}
                    className="btn btn-primary btn-lg">
                    Add to favorites!
                </button>
            }
            </td>
        </tr>
    );
}

function RestaurantsList({restaurants, canEdit}) {
    const [editEnabled, setEditEnabled] = React.useState(false);
    const [cityFilter, setCityFilter] = React.useState("");

    const filterRestaurants = () => restaurants.filter(
        (restaurant) => restaurant.city.toLowerCase().startsWith(cityFilter.toLowerCase())
    );

    if (restaurants.length === 0) return "No favorites yet";

    return (
        <table className="table table-dark table-striped table-responsive-xxl table-responsive table-sm ">
            <thead> 
                <tr>
                    <th scope="col">Restaurant Name </th>
                    <th scope="col">City
                    <input
                        type="text"
                        placeholder="city filter" 
                        onChange={(evt)=> setCityFilter(evt.target.value)}
                    />
                    </th>
                    <th scope="col">
                        {canEdit && 
                            <button 
                                className="btn btn-danger btn-sm" 
                                id="restaurant_edit" 
                                onClick ={() => setEditEnabled(!editEnabled)} > 
                                Edit List 
                            </button>
                        }
                    </th>
                </tr>
            </thead>
            <tbody> 
                {filterRestaurants().map(
                    restaurant =>
                        <RestaurantItem
                            key={restaurant.id}
                            restaurant={restaurant}
                            editEnabled={editEnabled}
                        />
                    )
                }
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
