"""Script to seed database"""

# from model import User, Restaurant, Recc, connect_to_db, db
# from flask import Flask

# app = Flask(__name__)
# connect_to_db(app)

# os.system('dropdb ratings')
# os.system('createdb ratings')

# model.connect_to_db(server.app)
# model.db.create_all()

# def give_users_restaurants(user_id):
#     """Give list of user restaurants """

#     user_and_reccs = User.query.options(db.joinedload(''))

# test_user = User(fname='Test', lname='Tester', email='test@test.test', password='test', home_zip='94107')

# test_rest = Restaurant(yelp_id=123456789098765432123456, rest_name="A Test Restaurant", rest_addy="123 Test St", rest_city="Gotham City", rest_zip="94107")

# recc= Recc(rest_id=rests[0].rest_id, comment='A testing comment for a tested restaurant by a tested user', user_id=test_user[0].user_id)


# def print_humans_and_animals():
#     """Print a directory of humans and their animals"""

#     humans_and_animals = Human.query.options(db.joinedload('animals')).all()


#     for human in humans_and_animals:
#         human_first = human.fname
#         human_last = human.lname
#         print(f'{human_first} {human_last}')
#         for pet in human.animals:
#             pet_name = pet.name
#             species_name = pet.animal_species            
#             print (f" - {pet_name}, {species_name}")