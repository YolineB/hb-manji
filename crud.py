"""CRUD operations """

from model import db, User, Restaurant, Favorite, connect_to_db

def create_user(fname, lname, email, home_city, password):
    """Create and return a new user"""

    user = User(fname=fname, lname=lname, email=email, 
                home_city=home_city, password=password)

    return user

def get_user_by_email(email):
    """Retrieve user details"""

    return User.query.filter(User.email == email).first()

def get_user_by_id(user_id):
    """Get user details by ID"""

    return User.query.filter(User.user_id == user_id).first()

def get_favorites_by_user(user_id):
    """Return restaurants by a user"""

    user_favs_list = Favorite.query.filter(Favorite.user_id == user_id).all()

    return user_favs_list


def get_favorite_rest_ids_by_user(user_id):
    """Return list of rest ids by user"""

    user_rests = get_favorites_by_user(user_id)

    rest_ids_list = []

    for item in user_rests:
        rest_ids_list.append(item.rest_id)

    return rest_ids_list

def button_choices(restaurant_id, user_id):
    """Return bool if restaurant_id in fav list of user in session"""

    fav_rest_ids = get_favorite_rest_ids_by_user(user_id)

    return restaurant_id in fav_rest_ids

def create_new_rest(rest_dict):
    """ Create and return a new restaurant. """
   
    rest_id = rest_dict['id']
    rest_name = rest_dict['name']
    rest_addy = rest_dict['location']['display_address']
    rest_city = rest_dict['location']['city']
    rest_zip = rest_dict['location']['zip_code']
    rest_lat = rest_dict['coordinates']['latitude']
    rest_long = rest_dict['coordinates']['longitude']
    rest_url = rest_dict['url']

    restaurant = Restaurant(rest_id=rest_id, rest_name=rest_name, rest_addy=rest_addy,
                        rest_city=rest_city, rest_zip=rest_zip,
                        rest_lat=rest_lat, rest_long=rest_long,
                        rest_url=rest_url)

    return restaurant

def create_new_fav(user_id, rest_id):
    """Create and return a favorite restauraunt by user to the DB"""

    favorite = Favorite(rest_id=rest_id, user_id=user_id)

    return favorite

def get_restaurant_by_rest_id(rest_id):
    """Returns restaurant obj if rest in db """

    return Restaurant.query.filter(Restaurant.rest_id == rest_id).first()


def add_a_friend(main_id, friend_id):
    """Add a new friend to user's list, return updated friends's list """
    main_user = User.query.filter(User.user_id == main_id).first()
    new_friend = User.query.filter(User.user_id == friend_id).first()

    if new_friend not in main_user.my_friends:
        main_user.my_friends.insert(0, new_friend)
        return main_user
    else:
        return None

def get_friends_list_by_user(user_id):
    """Return list of  """

    user = User.query.filter(User.user_id == user_id).first()

    friends_list = user.my_friends

    return friends_list

def friends_user_ids(main_user_id):
    """returns a list of just the ids of main user's friends """
    friends_objs = get_friends_list_by_user(main_user_id)

    friends_ids = []

    for friend in friends_objs:
        friends_ids.append(friend.user_id)

    return friends_ids

def get_fav_by_user_and_rest(user_id, rest_id):
    """return favorite obj of user & rest_id"""

    fav_to_delete = Favorite.query.filter(Favorite.user_id == user_id, Favorite.rest_id == rest_id).first()

    return fav_to_delete

def get_restaurant_by_friend_id(friend_id, user_id ):
    """Return a restaurant w/ info"""


    friend_restaurants = get_favorites_by_user(friend_id)

    favorites = []

    for friend_restaurant in friend_restaurants:
        restaurant_info = {
            'id': friend_restaurant.rest_id,
            'name': friend_restaurant.restaurant.rest_name,
            'favorited': button_choices(friend_restaurant.rest_id, user_id),
            'coords': {
                'lat': friend_restaurant.restaurant.rest_lat,
                'lng': friend_restaurant.restaurant.rest_long
            }
        }

        favorites.append(restaurant_info)

    return favorites

def edit_comment(favorite_id, new_comment):
    """ add a comment to favorited restaurant"""

    fav_to_edit = Favorite.query.filter(Favorite.fav_id == favorite_id).first()

    fav_to_edit.comment = new_comment

    return fav_to_edit

if __name__ == '__main__':
    from server import app
    connect_to_db(app)