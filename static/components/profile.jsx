function ProfilePage(){
    let userID = document.querySelector('#user_id').value;
    const [userRestaurants, setUserRestaurants] = React.useState({can_edit: false, favs: [], user_id:""});

    React.useEffect(() => {
        fetch(`/userRestaurants/${userID}`)
        .then((response) => response.json())
        .then((data) => {
            setUserRestaurants(data)});
    }, []);

   return (
    <React.Fragment> 
        <RestaurantsList restaurants={userRestaurants}/>
    </React.Fragment>
   )
}

ReactDOM.render(<ProfilePage />, document.getElementById('profile'));