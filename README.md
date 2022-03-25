Manji:

Application to share your trusted restaurants with your friends, and see what their trusted restaurants are as well. Help coordinate your restaurant wish-list for places you have never been to!

Tech Stack:
Javascript - React
Python - Flask(2.03), SqlAlchemy(1.4.32)
Database - PostgreSQL
Styling - HTML/CSS, Bootstrap 5.0

APIs:
Yelp Fusion API

Ensure you have PYTHON 3.8.10

clone respository
git clone https://github.com/YolineB/hb-manji
cd hb-manji

create virtualenv and activate it: 
virtualenv env
source env/bin/activate

Install dependencies:
pip3 install -r requirements.txt

API:
Sign up for YELP API(https://fusion.yelp.com/) to get an API key. Save API key in a secrets.sh file w/ no spaces before and after the equal sign. 
	eg: export YELP_KEY=”your_yelp_key_here”
https://fusion.yelp.com/



execute secrets.sh into shell environment to load YELP_KEY variable
	→ source secrets.sh

To run server:
python3 server.py

Web Navigation:
/ → Log in page, prompt log in or registration page
/registration → Enter credentials to create and account
/my_manji → homepage that reflects user restaurants info
/add_restaurant → add restaurants to your favorite list
navBar → log out, and homepage
