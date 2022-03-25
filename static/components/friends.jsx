'use strict';

function FriendRow(props){

    let userID = props.friend.id;
    return(
        <React.Fragment>
            <h3>{props.friend.name}</h3>
            <UserRestaurantsContainer userID={userID}/>
        </React.Fragment>
    )
}

function UserFriendsContainer(){

    const [friendArr, setFriendArr] = React.useState([]);
    console.log(friendArr);
    React.useEffect( () => {
        fetch("/show_users_friends")
            .then((response => response.json()))
            .then((data) => {setFriendArr(data)})
    } ,[]);


    {friendArr.map((friend) => {<li>{friend.id}</li>})}

    return (
        <React.Fragment>
            <h2>Friends' List</h2>
            <ul>{friendArr.map((friend,i) => <FriendRow key={i} friend={friend}/>)}</ul>
        </React.Fragment>
    )
}

ReactDOM.render(<UserFriendsContainer />, document.getElementById('friends'));
