'use strict';
function RestaurantRow(props) {
    
    return (
        <tr> 
            <th scope="row"> {props.restaurant.id} </th>
            <td>{props.restaurant.name}</td>
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

