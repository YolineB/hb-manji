function ProfilePage(){
    let userID = document.querySelector('#user_id').value;
    let currentUserID = document.querySelector('#current_user_id').value;
    const canEdit = userID === currentUserID
    const [userRestaurants, setUserRestaurants] = React.useState([]);

    React.useEffect(() => {
        fetch(`/userRestaurants/${userID}`)
        .then((response) => response.json())
        .then((data) => {
            setUserRestaurants(data)});
    }, []);

    return <RestaurantsList restaurants={userRestaurants} canEdit={canEdit}/>
}

ReactDOM.render(<ProfilePage />, document.getElementById('restaurant_list'));