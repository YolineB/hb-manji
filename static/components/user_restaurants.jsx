'use strict';


function RestaurantRow(props) {
    
    const chosenRest = {
        'restID' : props.restaurant.id, 
        'chosenRestObj' : "Rest ID already in system, not needed"
    }

    let showButton = ""
    if (!props.restaurant.fav) {
       showButton = <button onClick={(evt) => addToUserFavList(evt.target,chosenRest)}
       className="btn btn-primary btn-lg">Add to your list too!</button>
    } else if (props.restaurant.fav && props.editable){
        showButton = <button onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
        className='btn btn-primary btn-sm' type='button' id='delete' >Remove</button>
    }

    return (
        <tr> 
            <th scope="row"> {props.restaurant.id}</th>
            <td>{props.restaurant.name}</td>
            <td>{showButton} </td>
        </tr>
    );
}

function UserRestaurantsContainer(props) {

    const [userArr, setUserArr] = React.useState([]);
    const [editButton, setEditButton] = React.useState(false);
    const [ownBox, setOwnBox] = React.useState(false);

    React.useEffect(() => {
        fetch(`/userRestaurants/${props.userID}`)
        .then((response) => response.json())
        .then((data) => {
            setOwnBox(data.can_edit)
            setUserArr(data.favs)});
    }, []);

let buttonOption = '';
if (ownBox){
    buttonOption = <button className="btn btn-danger btn-sm" id="restaurant_edit" 
                    onClick ={() => setEditButton(!editButton)} > 
    Edit List </button>     
}

    return (
        <React.Fragment>
            <table className="table table-dark table-striped table-responsive-xxl table-responsive table-sm ">
                <thead>
                    <tr>
                    <th scope="col">Restaurant_ID</th>
                    <th scope="col">Restaurant Name</th>
                    <th scope="col">{buttonOption}</th>
                    </tr>
                </thead>
                <tbody> 
                    {userArr.map(restaurant => <RestaurantRow key={restaurant.id} 
                    restaurant={restaurant} editable={editButton}/>)}
                </tbody>
            </table>
        </React.Fragment>
    )
}
const userID = document.querySelector('#user_id').value;
ReactDOM.render(<UserRestaurantsContainer userID={userID}/>, document.getElementById('user_restaurants'));

//delete={delete_option}




// function addToUserList(btn,selectedRest){

//     fetch('/add_to_restaurant_list', {
//         method: 'POST',
//         body: JSON.stringify(selectedRest),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//     .then(response => response.text())
//     .then(answer => {
//         if (answer === "newFav") {
//             btn.innerHTML = 'Added!!';
//             btn.disabled = true;
//         } else {
//             alert(`${selectedRest['name']} has already been added to your list!`)
//         }
//     });
// }