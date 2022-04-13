function RestaurantCommentModal({restaurant}) {
    const [comment, setComment] = React.useState("");

    const onSave = () => {
        commentEdit(restaurant.fav_id, comment);
    }

    return(
        <div className="modal fade" id="restaurantCommentModal" tabIndex="-1" aria-labelledby="restaurantCommentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="restaurantCommentModalLabel">{restaurant && restaurant.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="What do you think of this restaurant?"
                        onChange={(evt) => setComment(evt.target.value)}
                    />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RestaurantItem({restaurant, editEnabled, canEdit, onRestaurantCommentClick}) {
    const chosenRest = {
        'restID' : restaurant.id, 
        'chosenRestaurantObj' : "Restaurant ID already in system, not needed"
    }

    const onCommentClick = () => onRestaurantCommentClick(restaurant.id)

    return (
        <div>
            <div className="card text-center">
                <div className="card-body overflow-auto">
                    <a href={restaurant.url} target="_blank">
                        <h5 className="restaurant-title">{restaurant.name}</h5>
                    </a>
                    <p className="card-text"> {restaurant.city} </p>
                    <div className="comment-box">
                        {restaurant.comment}
                        {canEdit &&
                            <div id="comment-edit"> 
                                <button
                                    onClick={onCommentClick}
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#restaurantCommentModal"
                                >
                                    Edit
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div className="card-footer text-center">
                {
                editEnabled && canEdit &&
                <button
                    onClick={(evt) => deleteFromFavList(evt.target,chosenRest)}
                    className='btn btn-primary btn-sm' type='button' id='delete'>
                    Remove
                </button>
            }
            {
                !canEdit && !restaurant.favorited && 
                <button
                    onClick={(evt) => addToFavList(evt.target,chosenRest)}
                    className="btn btn-primary btn-lg">
                    Add to favorites!
                </button>
            }
                </div>
            </div>
        </div>
    );
}

function RestaurantsList({userId, canEdit}) {
    const [editEnabled, setEditEnabled] = React.useState(false);
    const [cityFilter, setCityFilter] = React.useState("");
    const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
    const restaurants = useRestaurants(userId)
    
    const filterRestaurants = () => restaurants.filter(
        (restaurant) => restaurant.city.toLowerCase().startsWith(cityFilter.toLowerCase())
    );

    if (restaurants.length === 0) return "No favorites yet";

    const onRestaurantCommentClick = (restaurant_id) => setSelectedRestaurant(
        restaurants.find(
            restaurant => restaurant.id === restaurant_id
        )
    );

    return (
        <React.Fragment>
            <RestaurantCommentModal restaurant={selectedRestaurant}/>
            <div id="restaurant-container"> 
                <div id="city-filter">
                    <input
                        className="col-4"
                        type="text"
                        placeholder="city filter" 
                        onChange={(evt)=> setCityFilter(evt.target.value)}
                    />
                <span className="col-5" id="edit-enable">
                    {canEdit && 
                        <button 
                            className="btn btn-danger btn-sm" 
                            id="restaurant_edit" 
                            onClick ={() => setEditEnabled(!editEnabled)} > 
                            Edit List 
                        </button>
                    }
                </span>
                <a class="btn btn-info btn-lg" href="/search_restaurant" > Search restaurants to add! </a>
                </div>  



                <div className="restaurant-grid">
                    {filterRestaurants().map(
                        restaurant =>
                            <RestaurantItem
                                key={restaurant.id}
                                restaurant={restaurant}
                                editEnabled={editEnabled}
                                canEdit={canEdit}
                                onRestaurantCommentClick={onRestaurantCommentClick}
                            />
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
