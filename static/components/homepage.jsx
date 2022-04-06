function HomepageContainer(){
    const currentUserID = document.querySelector('#user_id').value
    const [activeUserID, setActiveUserID] = React.useState(currentUserID)
    const [userRestaurants, setUserRestaurants] = React.useState({can_edit: false, favs: []});

    React.useEffect(() => {
        fetch(`/userRestaurants/${activeUserID}`)
        .then((response) => response.json())
        .then((data) => {
            setUserRestaurants(data)});
    }, [activeUserID]);

    const onCurrentUserClick = () => {
       setActiveUserID(currentUserID)
      };
    
    const onFriendClick = (friendID) => {
        setActiveUserID(friendID);
    };

    return (
            <div className='homepage-container'>
                <button onClick={onCurrentUserClick}><h2>{`CURRENT_USER_NAME ${currentUserID}`}</h2></button>
                <RestaurantsList restaurants={userRestaurants}/>    
                <FriendsList onFriendClick={onFriendClick}/>
            </div>
    )  
}

ReactDOM.render(<HomepageContainer />, document.getElementById('homepage'));

