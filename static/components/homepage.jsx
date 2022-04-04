'use strict';


function HomepageContainer(){

    const sessID = document.querySelector('#user_id').value
    // const [restsID, setRestsID] = React.useState(sessID)

    const [userRestaurants, setUserRestaurants] = React.useState({can_edit: false, favs: [], user_id:""});
    const [friendRestaurants, setFriendRestaurants] = React.useState(null);

    React.useEffect(() => {
        fetch(`/userRestaurants/${sessID}`)
        .then((response) => response.json())
        .then((data) => {
            setUserRestaurants(data)});
    }, []);

    const clickHandler = () => {
        setFriendRestaurants(null);
      };
    
    return (
        
        <React.Fragment>
        <div>
           {friendRestaurants && <button onClick={clickHandler}> My Restaurants List </button>}
            <ul className="list-group" id="user_restaurants"> 
                <RestaurantsList rests={friendRestaurants || userRestaurants}/>    
            </ul> 
            <FriendsList setRests={setFriendRestaurants}/>
        </div>
        </React.Fragment>
    )
    
}


// const userID = document.querySelector('#user_id').value;
ReactDOM.render(<HomepageContainer />, document.getElementById('homepage'));

