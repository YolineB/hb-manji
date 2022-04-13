function ProfilePage(){
    let userID = document.querySelector('#user_id').value;
    let currentUserID = document.querySelector('#current_user_id').value;
    const canEdit = userID === currentUserID
    
    return <RestaurantsList userId={userID} canEdit={canEdit}/>
}

ReactDOM.render(<ProfilePage />, document.getElementById('restaurant_list'));