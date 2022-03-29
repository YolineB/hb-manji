'use strict';

function FriendRow(props){

    let userID = props.friend.id;
    let userTag = '#' + 'user' + userID
    let userEleID = 'user' + userID
    return(
        <React.Fragment>
            <h3><button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={userTag}
            aria-expanded="false" aria-controls="collapseExample">{props.friend.name} </button></h3>
            <div className="collapse" id={userEleID}> <UserRestaurantsContainer userID={userID}/> </div>
        </React.Fragment>
    )
}

function UserFriendsContainer(){

    const [friendArr, setFriendArr] = React.useState([]);
    
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
