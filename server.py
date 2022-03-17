"""Server for Manjie App """

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)

import crud
import yelp_search
#Helps reflect error w/ undefined variables
from jinja2 import StrictUndefined
from pprint import pformat
import os
import json
import requests


app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined

from model import connect_to_db, db



@app.route('/')
def log_in_page():
    """First page to prompt log-in"""

    return render_template('log_in_page.html')

@app.route("/login", methods=["POST"])
def process_login():
    """Process user login"""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")

        return redirect("/")
    else:
        # log in and store user's email in session
        session["user_email"] = user.email
        
        #pass user to template
        return render_template('homepage.html', user=user)

@app.route('/register')
def registration_form():

    return render_template('registration.html')

@app.route('/registration', methods=["POST"])
def registration_request():
    """Completes registration and goes back to log in page """

    email = request.form.get("email")
    fname = request.form.get("fname")
    lname = request.form.get("lname")
    home_zip = request.form.get("home_zip")
    password = request.form.get("password")


    check_email = crud.get_user_by_email(email)
    
    if check_email:
        flash("Cannot create an account with that email. Try again.")
        return redirect('/register')
    else:
        user = crud.create_user(fname, lname, email, home_zip, password)
        db.session.add(user)
        db.session.commit()
        flash('You registered! Try logging in')

    
    return redirect('/')


@app.route('/homepage')
def home_page():
    """User main page """
    
    return render_template('homepage.html')

@app.route('/add_restaurant')
def add_restaurant():
    """ Add a restaurant to user list """

    return render_template('add_restaurants.html')


@app.route('/api/resaurant_search')
def search_restaurants():
    """Search for restaurants on Yelp"""
    term = request.json.get("term")
    location = request.json.get("city")

    print('/n' *20)
    print(term)
    print(location)
    print('/n' *20)

    results = search_restaurant(term, location)

    return jsonify(results)



if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')