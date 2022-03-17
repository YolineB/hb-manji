"""CRUD operations """

from model import db, User, Restaurant, Recc, connect_to_db

def create_user(fname, lname, email, home_zip, password):
    """Create and return a new user"""

    user = User(fname=fname, lname=lname, email=email, 
                home_zip=home_zip, password=password)

    return user

def get_users():
    """Show all users """

    all_users = User.query.all()

    return all_users

def get_user_by_email(email):
    """Retrieve user details"""

    return User.query.filter(User.email == email).first()

def get_ratings_by_user(user_id):
    """ Return ratings by a user. """
    return Rating.query.filter_by(user_id=user_id).all()

if __name__ == '__main__':
    from server import app
    connect_to_db(app)