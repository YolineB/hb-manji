function ProfilePage(){
    let userID = document.querySelector('#user_id').value;
    let currentUserID = document.querySelector('#current_user_id').value;
    const canEdit = userID === currentUserID
    
    return (
        <div className='profile-container'>
            <div className="row" id='map-friend'>
                <MapContainer userId={userID} className="map-container"/>
            </div>
            <RestaurantsList userId={userID} canEdit={canEdit}/>
        </div>
    )
}

ReactDOM.render(<ProfilePage />, document.getElementById('restaurant_list'));