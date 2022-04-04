'use strict';

function RestaurantItem(props) {
    const {restaurant, canEdit} = props;
    //console.log(restaurant);
    const chosenRest = {
        'restID' : restaurant.id, 
        'chosenRestObj' : "Rest ID already in system, not needed"
    }
    const [isFavorite, setIsFavorite] = React.useState(restaurant.favorited);
    

    const addFavoriteButton = <td> 
            <button 
                onClick={(evt) => addToUserFavList(evt.target,chosenRest)}
                className="btn btn-primary btn-lg">
                Add to your list too!
            </button>
        </td>

    const deleteButton = <td> 
            <button onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
                className='btn btn-primary btn-sm' type='button' id='delete'>
                Remove
            </button>
        </td>

    //if Fav Button, user favorites already has that restaurnt id in their list
    //if it is the edit button is true (editable), user is looking at their own list
        //should have delete button
    //editable 
        // is ours 
            //if favorite is TRUE, then we what delete button
            // if false, NOTHING
    //else, false editable
        //not ours
            //if favorite is true, then nothing
            //else, add button
    
    return (
        <tr> 
            <th scope="row"> {restaurant.id}</th>
            <td>{restaurant.name}</td>
            {canEdit && (isFavorite ? deleteButton: null)}
            {!canEdit && (isFavorite ? null: addFavoriteButton)}
            {/* <td>{showButton} </td> */}
        </tr>
    );
}

function RestaurantsList(props) {
    console.log(props)
    const {rests} = props;
    const {can_edit, favs} = rests;


    if (!rests.favs) {
        return (<div></div>)
    }


    const [canEdit, setCanEdit] = React.useState(false);
    
    let buttonEditOption = '';
    // if (editButton){
    if (can_edit){
        buttonEditOption = <button className="btn btn-danger btn-sm" id="restaurant_edit" 
                        onClick ={() => setCanEdit(!canEdit)} > 
        Edit List </button>     
    }

    return (
        <React.Fragment>
            <table className="table table-dark table-striped table-responsive-xxl table-responsive table-sm ">
                <thead>
                    <tr>
                    <th scope="col">Restaurant_ID </th>
                    <th scope="col">Restaurant Name </th>
                    <th scope="col">{buttonEditOption}</th>
                    </tr>
                </thead>
                <tbody> 
                    {/* {userArr.map(restaurant => <RestaurantRow key={restaurant.id}  */}
                    {favs.map(restaurant => <RestaurantItem key={restaurant.id}
                    restaurant={restaurant} canEdit={canEdit}/>)}
                </tbody>
            </table>
        </React.Fragment>
    )
}
// const userID = document.querySelector('#user_id').value;
// ReactDOM.render(<RestaurantsList userID={userID}/>, document.getElementById('user_restaurants'));


{/* <FavoriteMarkers userID={props.userID} favs={userArr}/> */}
    // const {can_edit, favs} = rests;


    // const [userArr, setUserArr] = React.useState([]);
// const [editButton, setEditButton] = React.useState(false);

    // React.useEffect(() => {
    //     fetch(`/userRestaurants/${props.userID}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setEditButton(data.can_edit)
    //         setUserArr(data.favs)});
    // }, []);


        // let showButton = ""
    // if (!props.restaurant.favorited) {
    //    showButton = <button onClick={(evt) => addToUserFavList(evt.target,chosenRest)}
    //    className="btn btn-primary btn-lg">Add to your list too!</button>
    // } else if (props.restaurant.favorited && props.editable){
    //     showButton = <button onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
    //     className='btn btn-primary btn-sm' type='button' id='delete' >Remove</button>
    // }

    // function FavoriteMarkers(props){
    
//     let markersArr = [];
//     const [favButton, setFavButton] = React.useState(false);

//     for (let rest of Object.values(favArr)){
//         markersArr.push(new google.maps.Marker({
//           position: rest['coords'],
//           title: rest['name'],
//           // map: window.basicMap,
//         })); 
//       }


//     const [markers, setMarkers] = React.useState(markersArr);

//     console.log(favButton)

//     if (!favButton){
//         initMap()
//         userMap(markers, favButton)
//     }
    
    
//     return (
//         <button className="btn btn-primary btn-sm" id="fav_markers" 
//                         onClick ={() => setFavButton(!favButton)} > Show Favs</button>
//     )
// }

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