"""CRUD operations """

from model import db, User, Restaurant, Recc, connect_to_db

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

def get_restaurants_by_user(user_id):
    """Return restaurants by a user"""

    return None

def add_new_restaurant(yelp_id, rest_name, rest_addy, rest_city, rest_zip):
    """Create and return a restaurant to the DB"""


# Get all the animals with who belong to the human
# with primary key 5
#query_3 = Human.query.options(db.joinedload("animals")).get(5).animals
# def get_ratings_by_user(user_id):
#     """ Return ratings by a user. """
#     return Rating.query.filter_by(user_id=user_id).all()

if __name__ == '__main__':
    from server import app
    connect_to_db(app)