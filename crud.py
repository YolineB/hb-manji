"""CRUD operations """

from model import db, User, Restaurant, Favorite, connect_to_db

def create_user(fname, lname, email, home_zip, password):
    """Create and return a new user"""

    user = User(fname=fname, lname=lname, email=email, 
                home_zip=home_zip, password=password)

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

def get_rest_ids_by_user(user_id):
    """Return list of rest ids by user"""

    user_rests = get_favorites_by_user(user_id)

    rest_ids_list = []

    for item in user_rests:
        rest_ids_list.append(item.rest_id)

    return rest_ids_list

def create_new_rest(rest_dict):
    """ Create and return a new restaurant. """

    rest_id = rest_dict['id']
    rest_name = rest_dict['name']
    rest_addy = rest_dict['location']['display_address']
    rest_city = rest_dict['location']['city']
    rest_zip = rest_dict['location']['zip_code']
    rest_lat = rest_dict['coordinates']['latitude']
    rest_long = rest_dict['coordinates']['longitude']

    restaurant = Restaurant(rest_id=rest_id, rest_name=rest_name, rest_addy=rest_addy,
                        rest_city=rest_city, rest_zip=rest_zip,
                        rest_lat=rest_lat, rest_long=rest_long)

    return restaurant

def create_new_fav(user_id, rest_id):
    """Create and return a favorite restauraunt by user to the DB"""

    favorite = Favorite(rest_id=rest_id, user_id=user_id)

    return favorite

def get_restaurant_by_rest_id(rest_id):
    """Returns restaurant obj if rest in db """

    return Restaurant.query.filter(Restaurant.rest_id == rest_id).first()

def get_friends_list_by_user(user_id):
    """Return list of  """

    user = User.query.filter(User.user_id == user_id).first()

    friends_list = user.my_friends

    return friends_list

def add_a_friend(main_id, friend_id):
    """Add a new friend to user's list, return updated friends's list """
    main_user = User.query.filter(User.user_id == main_id).first()
    print('\n'*5)
    print(main_user)
    
    new_friend = User.query.filter(User.user_id == friend_id).first()
    print(new_friend)
    print('\n'*5)
    if new_friend not in main_user.my_friends:
        main_user.my_friends.insert(0, new_friend)
        return main_user
    else:
        return None



if __name__ == '__main__':
    from server import app
    connect_to_db(app)