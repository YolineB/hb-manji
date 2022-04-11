function MainUser({onCurrentUserClick}) {
    const [userInfo, setUserInfo] = React.useState({})

    React.useEffect(() => {
        fetch('/userProfile/')
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data)
            });
    }, []);

    return (
        <div>
            <button onClick={() => onCurrentUserClick()}><h2>CURRENT_USER_NAME: {userInfo.first}</h2></button>
        </div>
     ) 
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
    // const [currentUserID, setCurrentUsesrID] =  React.useState('')
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
            <MainUser onCurrentUserClick={onCurrentUserClick}/>
            {/* <button onClick={onCurrentUserClick}><h2>{`CURRENT_USER_NAME ${currentUserID}`}</h2></button> */}
            <MapContainer restaurants={userRestaurants}/>
            <FriendsList onFriendClick={onFriendClick}/>
            <RestaurantsList restaurants={userRestaurants} canEdit={canEdit}/>
        </div>
    )  
}

ReactDOM.render(<HomepageContainer />, document.getElementById('homepage'));

