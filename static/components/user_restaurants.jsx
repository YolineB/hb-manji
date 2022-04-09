function RestaurantCommentModal({restaurant}) {
    const [comment, setComment] = React.useState("");

    const onSave = (evt) => {
        commentEdit(evt, restaurant.fav_id, comment)
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
                        <button type="button" className="btn btn-primary" onClick={onSave}>Save changes</button>
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
        <tr> 
            <th scope="row">
                <a href={restaurant.url} target="_blank" className="link-success">{restaurant.name}</a>
            </th>
            <td>{restaurant.city}</td>
            <td>
                {canEdit && 
                (<div>
                    {restaurant.comment}
                        <button
                            onClick={onCommentClick}
                            className="btn btn-primary btn-sm"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#restaurantCommentModal"
                        >
                         edit comment
                        </button>
                </div>
                )
                }
                {!canEdit && restaurant.comment}
            </td>
            <td>{
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
            </td>
        </tr>
    );
}

function RestaurantsList({restaurants, canEdit}) {
    const [editEnabled, setEditEnabled] = React.useState(false);
    const [cityFilter, setCityFilter] = React.useState("");
    const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
    
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
            <RestaurantCommentModal restaurant={selectedRestaurant} />
            <table className="table table-dark table-striped table-responsive-xxl table-responsive table-sm ">
                <thead> 
                    <tr>
                        <th scope="col">Restaurant Name </th>
                        <th scope="col">City
                        <input
                            type="text"
                            placeholder="city filter" 
                            onChange={(evt)=> setCityFilter(evt.target.value)}
                        />
                        </th>
                        <th scope="col"> Comment </th>
                        <th scope="col">
                            {canEdit && 
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    id="restaurant_edit" 
                                    onClick ={() => setEditEnabled(!editEnabled)} > 
                                    Edit List 
                                </button>
                            }
                        </th>
                    </tr>
                </thead>
                <tbody> 
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
                </tbody>
            </table>
        </React.Fragment>
    )
}
