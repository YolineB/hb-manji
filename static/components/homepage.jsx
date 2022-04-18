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
        <div id="current-user-btn" className="col-2 offset-1">
            <button className="col-10" onClick={() => onCurrentUserClick()}>
                <h2 id="user-name">{userInfo.first}</h2>
            </button>
         </div> 
    ) 
}
{/* <a className="btn btn-success btn-sm col-1 z-index-3" href="/my_manji/{{user.user_id}}">P</a> */}

function HomepageContainer(){
    const currentUserID = document.querySelector('#user_id').value
    const currentPage = "Homepage"
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
            <div className="row" id="nav-profile">
                <NavBar canEdit={canEdit} currentPage={currentPage}/>
                <UserCard onCurrentUserClick={onCurrentUserClick}/>
            </div>
            <div className="row" id="map-friend">
                <MapContainer userId={activeUserID} className="map-container"/>
                <FriendsList onFriendClick={onFriendClick} />
            </div>
            <div className="row">
                <RestaurantsList userId={activeUserID} canEdit={canEdit}/>
            </div>
        </div>
    )  
}

ReactDOM.render(<HomepageContainer />, document.getElementById('homepage'));

