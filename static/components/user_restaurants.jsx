function restaurantComment(restaurant){
    // console.log(restaurant);
    return restaurant.fav_id
}

function RestaurantItem({restaurant, editEnabled, canEdit}) {
    const chosenRest = {
        'restID' : restaurant.id, 
        'chosenRestaurantObj' : "Restaurant ID already in system, not needed"
    }
    const [currentComment, setCurrentComment] = React.useState(restaurant.comment)
    console.log(restaurant.fav_id)

    const onCommentClick = () => {
        let newComment = restaurantComment(restaurant)
        setCurrentComment(newComment)
    };
    return (
        <tr> 
            <th scope="row">
                <a href={restaurant.url} target="_blank" className="link-success">{restaurant.name}</a>
            </th>
            <td>{restaurant.city}</td>
            <td>
                {canEdit && 
                (<div>
                    {currentComment}
                    <button
                        onClick={onCommentClick}
                        className='btn btn-primary btn-sm' type='button' id='comment'>
                        edit
                    </button>
                </div>
                )
                }
                {!canEdit && restaurant.comment}
            </td>
            <td>{
                editEnabled && canEdit &&
                <button
                    onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
                    className='btn btn-primary btn-sm' type='button' id='delete'>
                    Remove
                </button>
            }
            {
                !canEdit && !restaurant.favorited && 
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
                    <th scope="col"> Comment </th>
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
                            canEdit={canEdit}
                        />
                    )
                }
            </tbody>
        </table>
    )
}

{/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}
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
