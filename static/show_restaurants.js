'use strict';


function queryResults(result){
    document.querySelector('#restaurants').innerHTML = result;
    //document.querySelector('#restaurants').innerHTML = 'DID I CHANGE';
}


function restaurantResults(evt) {
    evt.preventDefault();


    const formInputs ={
        term: document.querySelector('#keyword').value,
        city: document.querySelector('#search-city').value,
        //zip: document.querySelector('#search-zip').value
    };


    fetch('/api/restaurant_search', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(jsonResponse => {document.querySelector('#restaurants').innerHTML = jsonResponse});

};

document.querySelector('#restaurant-search').addEventListener('submit', restaurantResults);


//from html, got to JS file, and make a callback function.
//In callback function, create FormInputs w/ search results

// function orderMelons(evt) {
//     evt.preventDefault();
  
//     const formInputs ={
//       melon_type: document.querySelector('#melon-type-field').value,
//       qty: document.querySelector('#qty-field').value,
//     };
  
//     fetch('/order-melons.json', { <-- this is the python server call
//       method: 'POST',
//       body: JSON.stringify(formInputs),
//       headers: { 
//         'Content-Type' : 'application/json',
//       },
//     })
//       .then(response => response.json()) <--returned results
//       .then(melonUpdate) <-- w/ returned search object, send to the callback function 
//                                 that will help render the list onto the page
//   }
//   document.querySelector('#order-form').addEventListener('submit', orderMelons);

// Python flask route
// @app.route('/afterparty/search')
// def find_afterparties():
//     """Search for afterparties on Eventbrite"""

//     keyword = request.args.get('keyword', '')
//     postalcode = request.args.get('zipcode', '')
//     radius = request.args.get('radius', '')
//     unit = request.args.get('unit', '')
//     sort = request.args.get('sort', '')
// url = 'https://app.ticketmaster.com/discovery/v2/events'
//     payload = {'apikey': API_KEY,
//                'keyword': keyword,
//                'postalCode': postalcode,
//                'radius': radius,
//                'unit': unit,
//                'sort': sort}

//     response = requests.get(url, params=payload)
//     data = response.json()

//     if '_embedded' in data:
//         events = data['_embedded']['events']
//     else:
//         events = []

// @app.route('/order-melons.json', methods=['POST'])
// def order_melons():
//     """Order melons and return a dictionary of result-code and result-msg."""
//     melon = request.json.get('melon_type')
//     qty = int(request.json.get('qty'))

//     if qty > 10:
//         result_code = 'ERROR'
//         result_text = "You can't buy more than 10 melons"
//     elif qty > 0:
//         result_code = 'OK'
//         result_text = f"You have bought {qty} {melon} melons"
//     else:
//         result_code = 'ERROR'
//         result_text = "You want to buy fewer than 1 melons? Huh?"

//     return jsonify({'code': result_code, 'msg': result_text})