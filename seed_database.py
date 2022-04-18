"""Script to seed database, w/ real restaurant details"""

import os
from model import User, Restaurant, Favorite, connect_to_db, db
from server import app

os.system('dropdb manji_data')
os.system('createdb manji_data')

connect_to_db(app)
db.create_all()


u1 = User(fname='Chloe', lname='Perrita', email='test1@test.test', password='password', home_city='Oakland')
u2 = User(fname='Trot', lname='Trotsky', email='test2@test.test', password='password', home_city='El Cerrito')
u3 = User(fname='Ilon', lname='Noli', email='test3@test.test', password='password', home_city='San Francisco')

r1 = Restaurant(rest_id='d0TL4FbfiRGbVwuCYUGaYA', rest_name="Vik's Chaat", rest_addy=['2390 4th St', 'Berkeley, CA 94710'],
                rest_city='Berkeley', rest_zip=94710, rest_lat=37.861283288997, rest_long=-122.29840243871, 
                rest_url='https://www.yelp.com/biz/viks-chaat-berkeley?adjust_creative=efD3cSVtJnvyd6NCgo7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=efD3cSVtJnvyd6NCgo7qSA')
r2 = Restaurant(rest_id='GW733IvxFMzWpk-y2reo6w', rest_name="Zachary's Chicago Pizza", rest_addy=['140 Crescent Dr', 'Pleasant Hill, CA 94523'],
                rest_city='Pleasant Hill', rest_zip=94523, rest_lat=37.944477, rest_long=-122.061433, 
                rest_url='https://www.yelp.com/biz/zacharys-chicago-pizza-pleasant-hill?adjust_creative=efD3cSVtJnvyd6NCgo7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=efD3cSVtJnvyd6NCgo7qSA')
r3 = Restaurant(rest_id='8ULbAsaRWW2O5VO5g7DQ4A', rest_name="Barney's Gourmet Hamburgers", rest_addy=['1600 Shattuck Ave', 'Ste 112', 'Berkeley, CA 94709'],
                rest_city='Berkeley', rest_zip=94709, rest_lat=37.878125, rest_long=-122.2693854, 
                rest_url='https://www.yelp.com/biz/barneys-gourmet-hamburgers-berkeley-2?adjust_creative=efD3cSVtJnvyd6NCgo7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=efD3cSVtJnvyd6NCgo7qSA')
r4 = Restaurant(rest_id='DceTpSF9RJ9PBvfX-_EImQ', rest_name="Shandong Restaurant", rest_addy=['328 10th St', 'Ste 101', 'Oakland, CA 94607'],
              rest_city='Oakland', rest_zip=94607, rest_lat=37.800607171031, rest_long=-122.26986193448, 
              rest_url='https://www.yelp.com/biz/shandong-restaurant-oakland?adjust_creative=efD3cSVtJnvyd6NCgo7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=efD3cSVtJnvyd6NCgo7qSA')
r5 = Restaurant(rest_id='d7GJAvw4exzOZWD07NER4Q', rest_name="Blue Bottle Coffee", rest_addy=['4270 Broadway', 'Oakland, CA 94611'],
                rest_city='Oakland', rest_zip=94611, rest_lat=37.831138, rest_long=-122.2542106, 
                rest_url='ttps://www.yelp.com/biz/blue-bottle-coffee-oakland?adjust_creative=efD3cSVtJnvyd6NCgo7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=efD3cSVtJnvyd6NCgo7qSA')
r6 = Restaurant(rest_id='zub6pgnoXv_PdwYi2KBDLw', rest_name="Gordo Taqueria", rest_addy=['1423 Solano Ave', 'Albany, CA 94706'],
                rest_city='Albany', rest_zip=94706, rest_lat=37.89098, rest_long=-122.28949, 
                rest_url='https://www.yelp.com/biz/gordo-taqueria-albany?adjust_creative=efD3cSVtJnvyd6NCgo7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=efD3cSVtJnvyd6NCgo7qSA')

db.session.add_all([u1, u2, u3, r1, r2, r3, r4, r5, r6])
db.session.commit()

#Must add & commit user and restaurant data before favorting

f1 = Favorite(rest_id='d0TL4FbfiRGbVwuCYUGaYA', user_id='1')
f2 = Favorite(rest_id='GW733IvxFMzWpk-y2reo6w', user_id='1')
f3 = Favorite(rest_id='DceTpSF9RJ9PBvfX-_EImQ', user_id='1')
f4 = Favorite(rest_id='GW733IvxFMzWpk-y2reo6w', user_id='2')
f5 = Favorite(rest_id='d7GJAvw4exzOZWD07NER4Q', user_id='2')
f6 = Favorite(rest_id='zub6pgnoXv_PdwYi2KBDLw', user_id='2') 
f7 = Favorite(rest_id='GW733IvxFMzWpk-y2reo6w', user_id='3')
f8 = Favorite(rest_id='8ULbAsaRWW2O5VO5g7DQ4A', user_id='3')
f9 = Favorite(rest_id='zub6pgnoXv_PdwYi2KBDLw', user_id='3') 
f10 = Favorite(rest_id='DceTpSF9RJ9PBvfX-_EImQ', user_id='3')

db.session.add_all([f1, f2, f3, f4, f5, f6, f7, f8, f9, f10])
db.session.commit()