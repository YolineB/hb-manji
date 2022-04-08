function useUsers(userId) {
    const [user, setUser] = React.useState([])

    React.useEffect(() => {
        fetch(`/userRestaurants/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data)
            });
    }, [user]);

    return restaurants
}
//get all user informaation w/out needing hidden thing

function useRestaurants(userId) {
    const [restaurants, setRestaurants] = React.useState([])

    React.useEffect(() => {
        fetch(`/userRestaurants/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data)
            });
    }, [userId]);

    return restaurants
}

function HomepageContainer(){
    const currentUserID = document.querySelector('#user_id').value
    const [activeUserID, setActiveUserID] = React.useState(currentUserID)
    const userRestaurants = useRestaurants(activeUserID)

    const onCurrentUserClick = () => {
       setActiveUserID(currentUserID)
    };
    
    const onFriendClick = (friendID) => {
        setActiveUserID(friendID);
    };

    const canEdit = currentUserID === activeUserID

    return (
        <div className='homepage-container'>
            <MapContainer restaurants={userRestaurants}/>
            <button onClick={onCurrentUserClick}><h2>{`CURRENT_USER_NAME ${currentUserID}`}</h2></button>
            <FriendsList onFriendClick={onFriendClick}/>
            <RestaurantsList restaurants={userRestaurants} canEdit={canEdit}/>
        </div>
    )  
}

ReactDOM.render(<HomepageContainer />, document.getElementById('homepage'));

