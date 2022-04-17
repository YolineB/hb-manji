function FriendRow({friend, onFriendClick}){    
    const clickHandler = () => {
        onFriendClick(friend.id)
      };
    
    return(
        <div>
            <button id="friends" onClick={clickHandler}>{friend.name} </button>
        </div>
    )
}

function FriendsList({onFriendClick}){    
    const [friendArr, setFriendArr] = React.useState([]);

    React.useEffect( () => {
        fetch("/show_users_friends")
            .then((response => response.json()))
            .then((data) => {setFriendArr(data)})
    } ,[]);

    return (
        <React.Fragment>
        <div className="friend-container justify-content-end col-3">
            <img id="friends-list" src="/static/images/manjifriends.png"/>
            <div className="grid">
                {friendArr.map((friend) => 
                <FriendRow 
                    key={friend.id} 
                    friend={friend} 
                    onFriendClick={onFriendClick}
                />)}
            </div>
        </div>  
        </React.Fragment>
    )
}