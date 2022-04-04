'use strict';

function FriendRow(props){

    const {friend, setRests} = props;
    console.log(friend);
    const clickHandler = () => {
        setRests({can_edit: false, favs: friend.favs})
      };
    
    let userID = friend.id;

    return(
        <React.Fragment>
            <li>
                <button className='btn btn-primary btn-lrg' onClick={clickHandler}>{friend.name} </button>
            </li>
        </React.Fragment>
    )
}


function FriendsList(props){

    const {setRests} = props;
    

    const [friendArr, setFriendArr] = React.useState([]);

    const mapFriends = (data) => {
        return data.map((friend,i) => <FriendRow key={i} friend={friend} setRests={setRests}/>)
    };

    React.useEffect( () => {
        fetch("/show_users_friends")
            .then((response => response.json()))
            .then((data) => {setFriendArr(data)})
    } ,[]);

    const friends = mapFriends(friendArr)
    // {friendArr.map((friend) => {<li>{friend.id}</li>})}

    return (
        <React.Fragment>
            <h2>Friends' List</h2> 
            <ul>{friends}</ul>
            {/* <ul>{friendArr.map((friend,i) => <FriendRow key={i} friend={friend}/>)}</ul> */}
        </React.Fragment>
    )
}

//ReactDOM.render(<UserFriendsContainer />, document.getElementById('friends'));


{/* <React.Fragment>
            <h3><button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={userTag}
            aria-expanded="false" aria-controls="collapseExample">{props.friend.name} </button></h3>
            <div className="collapse" id={userEleID}> <UserRestaurantsContainer userID={userID}/> </div>
</React.Fragment> */}

{/* <h3><button onClick={() => setRestsID(userID)}
className='btn btn-primary btn-lrg' type='button' id='testingFriend'>{props.friend.name}</button></h3>
<h3><button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={userTag}
aria-expanded="false" aria-controls="collapseExample">{props.friend.name} </button></h3>
<div className="collapse" id={userEleID}> <UserRestaurantsContainer userID={userID}/> </div> */}