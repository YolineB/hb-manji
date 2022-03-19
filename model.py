"""Models for Mangi app """

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

    #reccs = a list of Recc Objects

class Restaurant(db.Model):
    """Create a Restaurant"""

    __tablename__= "restaurants"

    rest_id = db.Column(db.Integer, autoincrement=True, primary_key=True) 
    yelp_id = db.Column(db.String(50), nullable=False)
    rest_name = db.Column(db.String(50), nullable=False)
    rest_addy = db.Column(db.String(50), nullable=False)
    rest_city = db.Column(db.String(50), nullable=False)
    rest_zip = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        """Provide output when printing """

        return f"<Restaurant rest_id= {self.rest_id} name={self.rest_name} zip={self.rest_zip}>"

    #reccs = a list of Recc Objects

class Recc(db.Model):
    """ Create a Recommendation """

    __tablename__ = 'recommendations'

    recc_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    rest_id = db.Column(db.Integer, db.ForeignKey('restaurants.rest_id'))
    user_id= db.Column(db.Integer, db.ForeignKey('users.user_id'))
    comment = db.Column(db.Text)

    def __repr__(self):
        """Provide output when printing """

        return f"<Recommendation id={self.recc_id} on {self.rest_id} by {self.user_id}>"

    restaurant = db.relationship("Restaurant", backref="reccs")
    user = db.relationship("User", backref="reccs")



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