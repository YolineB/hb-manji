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

    return User.query.filter_by(user_id).all()

def get_favorites_by_user(user_id):
    """Return restaurants by a user"""

    user_favs_list = Favorite.query.filter(Favorite.user_id == user_id).all()

    return user_favs_list

def get_yelp_ids_by_user(user_id):
    """Return list of yelp ids by user"""

    user_rests = get_favorites_by_user(user_id)

    yelp_list = []

    for item in user_rests:
        yelp_list.append(item.yelp_id)


    return yelp_list

def create_new_rest(rest_dict):
    """ Create and return a new restaurant. If already there, returns REST obj """

    yelp_id = rest_dict['id']
    rest_name = rest_dict['name']
    rest_addy = rest_dict['location']['display_address']
    rest_city = rest_dict['location']['city']
    rest_zip = rest_dict['location']['zip_code']
    rest_lat = rest_dict['coordinates']['latitude']
    rest_long = rest_dict['coordinates']['longitude']

    restaurant = Restaurant(yelp_id=yelp_id, rest_name=rest_name, rest_addy=rest_addy,
                        rest_city=rest_city, rest_zip=rest_zip,
                        rest_lat=rest_lat, rest_long=rest_long)

    return restaurant

def create_new_fav(user_id, yelp_id):
    """Create and return a favorite restauraunt by user to the DB"""

    favorite = Favorite(yelp_id=yelp_id, user_id=user_id)

    return favorite

#new function for restInFavs: return boolean
def get_restaurant_by_yelp_id(yelp_id):
    """Returns restaurant obj for if rest in db """
 
    return Restaurant.query.filter(Restaurant.yelp_id == yelp_id).first()



if __name__ == '__main__':
    from server import app
    connect_to_db(app)