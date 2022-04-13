function UserCard({onCurrentUserClick}) {
    const [userInfo, setUserInfo] = React.useState({})

    React.useEffect(() => {
        fetch('/userProfile/')
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data)
            });
    }, []);

    return (
        <div className="justify-content-center">
            <button onClick={() => onCurrentUserClick()}><h2>CURRENT_USER_NAME: {userInfo.first}</h2></button>
        </div>
     ) 
}
//get all user informaation w/out needing hidden thing

function HomepageContainer(){
    const currentUserID = document.querySelector('#user_id').value
    const [activeUserID, setActiveUserID] = React.useState(currentUserID)

    const onCurrentUserClick = () => {
       setActiveUserID(currentUserID)
    };
    
    const onFriendClick = (friendID) => {
        setActiveUserID(friendID);
    };

    const canEdit = currentUserID === activeUserID

    return (
        <div className='homepage-container'>
            <div className="row">
                <UserCard onCurrentUserClick={onCurrentUserClick}/>
            </div>
            <div className="row" id="map-friend">
                <MapContainer userId={activeUserID} className="map-container"/>
                <FriendsList onFriendClick={onFriendClick} />
            </div>
        
            <RestaurantsList userId={activeUserID} canEdit={canEdit}/>
        </div>
    )  
}

ReactDOM.render(<HomepageContainer />, document.getElementById('homepage'));

