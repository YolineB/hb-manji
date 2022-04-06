function FriendRow({friend, onFriendClick}){    
    const clickHandler = () => {
        onFriendClick(friend.id)
      };
    
    return(
        <li>
            <button className='btn btn-primary btn-lrg' onClick={clickHandler}>{friend.name} </button>
        </li>
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
            <h2>Friends' List</h2> 
            <ul>{friendArr.map((friend) => <FriendRow key={friend.id} friend={friend} onFriendClick={onFriendClick}/>)}</ul>
        </React.Fragment>
    )
}