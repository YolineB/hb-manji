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
   
    if 'user_id' in session:
        return redirect('/my_manji')

    return render_template('log_in_page.html')

@app.route('/my_manji')
def home_page():
    """User main page """
    #if statement to make sure user name is in session
    if 'user_id' not in session:
        return redirect("/")
    else:
        user_id = session['user_id']
        user = crud.get_user_by_id(user_id)

        return render_template('homepage.html', user=user)

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
        # log in and store user's id in session
        session["user_id"] = user.user_id
        
        return redirect('/my_manji')

@app.route("/logout")
def process_logout():
    """Log user out"""
    session.pop('user_id')

    return redirect("/")

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

@app.route('/userRestaurants/<int:user_id>')
def restaurants_favs_of_user(user_id):
    """Return json user restaurant list"""

    user_restaurants = crud.get_favorites_by_user(user_id)

    can_edit = False
    if user_id == session['user_id']:
        can_edit = True
    
    favs = []

    for user_rest in user_restaurants:
        rest_info = {'id': user_rest.rest_id, 'name': user_rest.restaurant.rest_name,
                      'fav': crud.button_choices(user_rest.rest_id, session['user_id'])}

        favs.append(rest_info)


    return jsonify({'can_edit':can_edit, 'favs': favs})

@app.route('/search_restaurant')
def add_restaurant():
    """ Add a restaurant to user list """
    if 'user_id' not in session:
        return redirect("/")

    user_id = session['user_id']

    return render_template('search_restaurant.html', user_id=user_id)

@app.route('/api_rest_search')
def search_restaurants():
    """Search for restaurants on Yelp"""
    term = request.args.get("term")
    location = request.args.get("location")
    user_id = session['user_id']

    yelp_results = yelp_search.search_restaurant(term, location)
    # return a list of favs as well to disable button on search
    rest_favs = crud.get_rest_ids_by_user(user_id)
    results = {'yelp_results': yelp_results, 'rest_favs': rest_favs}

    return jsonify(results)

@app.route('/add_to_restaurant_list', methods=["POST"])
def add_to_user_list():
    """Add to user's list if not already there"""
    rest_id = request.json.get("restID")
    chosen_rest_obj = request.json.get("chosenRestObj")

    user_id = session['user_id']
    #checks if user has rest in their favorites
    rest_list = crud.get_rest_ids_by_user(user_id)

    if (rest_id in rest_list):
        return 'notNew'

    #check if rest in db, then creates rest 
    if not crud.get_restaurant_by_rest_id(rest_id):
        rest = crud.create_new_rest(chosen_rest_obj)
        db.session.add(rest)
        db.session.commit()

    fav =  crud.create_new_fav(user_id, rest_id)
    db.session.add(fav)
    db.session.commit()

    return 'newFav'

@app.route('/delete_from_fav_list', methods=["POST"])
def delete_fav_rest():
    """Remove a fav from user's list"""
    rest_id = request.json.get("restID")

    fav_id_delete = crud.get_fav_by_user_and_rest(session['user_id'], rest_id)
    print('\n'*5)
    print(fav_id_delete)
    print('\n'*5)

    db.session.delete(fav_id_delete)
    db.session.commit()

    return 'removed'

@app.route('/show_users_friends')
def get_user_friends_list():
    """Retrieve list of user's friends"""
    user = session['user_id']
    user_friends = crud.get_friends_list_by_user(user_id=user)

    friends = []

    for friend in user_friends:
        friends.append({'id': friend.user_id, 'name': friend.fname})

    return jsonify(friends)

@app.route('/add_friend_to_list/<friend_id>')
def make_a_friendship(friend_id):
    """Create a frienship between user """
    user = session['user_id']
   
    user_friend_updated = crud.add_a_friend(main_id=user, friend_id=friend_id)

    if user_friend_updated is not None:
        db.session.add(user_friend_updated)
        db.session.commit()
        flash('You have added your friend!')
    else:
        flash('Already homies')
    
    return redirect(f'/my_manji/{friend_id}')

@app.route('/my_profile')
def my_profile():
    """From nav bar, redirect to user's profile page"""
    user_id = session['user_id']
    return redirect(f'/my_manji/{user_id}')

@app.route('/my_manji/<int:profile_user_id>')
def profile_page(profile_user_id):
    """user profile """

    prof_user_info = crud.get_user_by_id(profile_user_id)

    name = prof_user_info.fname + " " + prof_user_info.lname
    fav_obj = crud.get_favorites_by_user(profile_user_id)
  
    is_friend = False
    if 'user_id' in session:
        the_friends = crud.friends_user_ids(session['user_id'])

        if profile_user_id in the_friends:
            is_friend = True

    fav_list = []
    for fav in fav_obj:
        fav_list.append(fav.restaurant.rest_name)

    #get user from db and render profile template w/ restaurants and follow button

    return render_template('/profile.html', user_id=profile_user_id,
                            fav_list=fav_list, name=name, is_friend=is_friend)


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
