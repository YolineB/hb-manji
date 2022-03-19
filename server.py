"""Server for Manjie App """

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)

import crud
import os
import yelp_search
#Helps reflect error w/ undefined variables
from jinja2 import StrictUndefined
from pprint import pformat
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
        session["user_id"] = user.user_id
            
        #pass user to template
        return render_template('homepage.html', user=user)

@app.route('/register')
def registration_form():
    """Directs user to registration form """

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
    #if statement to make sure user name is in session
    if 'user_id' not in session:
        return redirect("/")
   
    
    return render_template('homepage.html')

@app.route('/add_restaurant_page')
def add_restaurant():
    """ Add a restaurant to user list """


    if 'user_id' not in session:
        return redirect("/")

    user_id = session['user_id']

    return render_template('add_restaurants.html', user_id=user_id)


@app.route('/restaurant_search.json', methods=["POST"])
def search_restaurants():
    """Search for restaurants on Yelp"""
    term = request.json.get("term")
    location = request.json.get("city")

    results = yelp_search.search_restaurant(term, location)
    
    return jsonify(results)

@app.route('/add_to_restaurant_list/<yelp_id>')
def add_to_user_list(yelp_id):
    """Add to user's list if not already there"""

   #-check if in users list
   #if no, crud funtion to add to user's list
   #session user_id


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')