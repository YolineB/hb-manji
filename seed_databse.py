"""Script to seed database"""

test_user = User(fname='Test', lname='Tester', email='test@test.test', password='test', home_zip='94107')

test_rest = Restaurant(yelp_id=123456789098765432123456, rest_name="A Test Restaurant", rest_addy="123 Test St", rest_city="Gotham City", rest_zip="94107")

recc= Recc(rest_id=rests[0].rest_id, comment='A testing comment for a tested restaurant by a tested user', user_id=test_user[0].user_id)


