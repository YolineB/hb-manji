"""Models for Mangi App """

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Create a User """

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    home_zip = db.Column(db.Integer, nullable=False)
    profile_pic = db.Column(db.String)
    password = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        """Provide output when printing """

        return f"<User user_id= {self.user_id} name={self.fname} zip={self.home_zip}>"

    #favs = a list of Fav Objects

class Restaurant(db.Model):
    """Create a Restaurant"""

    __tablename__= "restaurants"

    yelp_id = db.Column(db.String(50), nullable=False, primary_key=True)
    rest_name = db.Column(db.String(50), nullable=False)
    rest_addy = db.Column(db.String(50), nullable=False)
    rest_city = db.Column(db.String(50), nullable=False)
    rest_zip = db.Column(db.Integer, nullable=False)
    rest_lat = db.Column(db.Float, nullable=False)
    rest_long = db.Column(db.Float, nullable=False)


    def __repr__(self):
        """Provide output when printing """

        return f"<Restaurant yelp_id= {self.yelp_id} name={self.rest_name}>"

    #favs = a list of Fav Objects

class Favorite(db.Model):
    """ Create a Favorite """

    __tablename__ = 'favorites'

    fav_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    yelp_id = db.Column(db.String, db.ForeignKey('restaurants.yelp_id'))
    user_id= db.Column(db.Integer, db.ForeignKey('users.user_id'))
    comment = db.Column(db.Text)

    def __repr__(self):
        """Provide output when printing """

        return f"<Favorite id={self.fav_id} on {self.yelp_id} by {self.user_id}>"

    restaurant = db.relationship("Restaurant", backref="favs")
    user = db.relationship("User", backref="favs")



def connect_to_db(app, db_URI="postgresql:///manji_data"):
    """Connect to database """

    app.config["SQLALCHEMY_DATABASE_URI"] = db_URI
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to manji__data!")

if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    db.create_all()