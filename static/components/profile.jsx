function ProfileCard({canEdit, userID}){

    let name = document.querySelector('#name').value;
    let isFriend = document.querySelector('#isFriend').value;

    const onFriendshipClick = (evt) => {
        fetch(`/add_friend_to_list/${userID}`)
        .then(response => response.text())
        .then(answer => {
            if (answer === "Connected!") {
                evt.disabled = true;
                alert("Connected!")
            } else {
                alert('Error from profile.jsx request')
            }
        });
    }


    return (
        <React.Fragment>
       { !canEdit && (isFriend == "False") &&
            <button id="profile-follow-btn" className="col-2 offset-1" 
            onClick={(evt) => onFriendshipClick(evt)} >
            </button>
        }
        { !canEdit && ((isFriend == "True")) &&
            <div id="current-user-btn" className="col-2 offset-1">
                Already friends!
            </div> 
        }

        { canEdit && 
            <div id="current-user-btn" className="col-2 offset-1">
                <button className="col-10" 
                onClick={() => {
                    navigator.clipboard.writeText(`http://localhost:5000/my_manji/${userID}`);
                    }} >
                    <h6 id="user-name">Share your link</h6>
                </button>
             </div>
        }
        <div>
           <h2>{name}</h2>
        </div>
        </React.Fragment>
    )

}


function ProfilePage(){
    let userID = document.querySelector('#user_id').value;
    let currentUserID = document.querySelector('#current_user_id').value;
    let currentPage="Profile Page"
    const canEdit = userID === currentUserID
    
    return (
        <div className='profile-container'>
            <div className='row'>
                <NavBar canEdit={canEdit} currentPage={currentPage}/>
                <ProfileCard  canEdit={canEdit} userID={userID}/>
            </div>
        <div className="row" id='map-friend'>
            <MapContainer userId={userID} className="map-container"/>
        </div>
            <RestaurantsList userId={userID} canEdit={canEdit}/>
        </div>
    )
}

ReactDOM.render(<ProfilePage />, document.getElementById('profile-page'));

{/* <div class="container">
            {%if user_id != session['user_id'] %}
                {%if is_friend %}
                    Already friends!
                {% else %}
                    <div id='connect_friend'>
                        <a class="btn btn-success btn-lg" href="/add_friend_to_list/{{user_id}}" >Add friend</a>
                    </div>
                {%endif%}
            {% else %}
                    <div id="user_share_link">
                        Share your friendship link! Then friends can see your favorites
                        Copy this:
                        my_manji/{{user_id}}
                    </div>
            {%endif%}
</div> */}