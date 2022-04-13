function FriendRow({friend, onFriendClick}){    
    const clickHandler = () => {
        onFriendClick(friend.id)
      };
    
    return(
        <div id="friends">
         <button className='btn btn-primary btn-lrg' onClick={clickHandler}>{friend.name} </button>
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
            <h2>Friends' List</h2> 
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