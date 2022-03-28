'use strict';
function addToUserList(btn,selectedRest){

    fetch('/add_to_restaurant_list', {
        method: 'POST',
        body: JSON.stringify(selectedRest),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    .then(response => response.text())
    .then(answer => {
        if (answer === "newFav") {
            btn.innerHTML = 'Added!!';
            btn.disabled = true;
        } else {
            alert(`${chosenRest['name']} has already been added to your list!`)
        }
    });
}
function RestaurantRow(props) {

    const chosenRest = {
        'restId' : props.restaurant.id, 
        'chosenRestObj' : "Rest ID already in system, not needed"
    }


    let showButton = ""
    if (!props.restaurant.fav) {
       showButton = <button onClick={(evt) => addToUserList(evt.target,chosenRest)}
       className="btn btn-primary">Add to your list too!</button>
    }

    return (
        <tr> 
            <th scope="row"> {props.restaurant.id} </th>
            <td>{props.restaurant.name}</td>
            <td>{showButton}</td>
        </tr>
    );
}

function UserRestaurantsContainer(props) {

    const [userArr, setUserArr] = React.useState([]);

    React.useEffect(() => {
        fetch(`/userRestaurants/${props.userID}`)
        .then((response) => response.json())
        .then((data) => {
            setUserArr(data)});
    }, []);

    return (
        <React.Fragment>
            <h2>So Yum</h2>
            <table className="table table-dark table striped">
                <thead>
                    <tr>
                    <th scope="col">Restaurant_ID</th>
                    <th scope="col">Restaurant Name</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody> 
                    {userArr.map(restaurant => <RestaurantRow key={restaurant.id} restaurant={restaurant}/>)}
                </tbody>
            </table>
        </React.Fragment>
    )
}
const userID = document.querySelector('#user_id').value;
ReactDOM.render(<UserRestaurantsContainer userID={userID}/>, document.getElementById('user_restaurants'));

