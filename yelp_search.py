
import json
from pprint import pprint
import os
import requests

# IMPORT USER SESSION HOME ZIP FOR AUTO ZIP FILL UNLESS FILLED OUT ??

url = 'https://api.yelp.com/v3/businesses/search'

key=os.environ["YELP_KEY"]

headers = { 'Authorization' : 'Bearer %s' % key}

def search_restaurant(term, location='home_zip'):
    """Return dictionary of restaurant results"""

    param = { 'term': term, 'location': location, 'limit': '6' }

    response = requests.get(url=url, params=param, headers=headers)

    search_results = response.json()
    return search_results['businesses']

# print(search_results['total'], search_results['businesses'][0]['name'] )




