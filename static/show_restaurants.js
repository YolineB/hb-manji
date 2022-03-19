'use strict';

// function addToUserList(id){
//     //feth request to url adding id, and server will add to database

//     let id = btn.value;

//     evt.target.remove()
//     return id

    // function handler(btn) {
    //     const id = btn.value;
    //     // use id to make fetch() call
    //     btn.remove()
    //     // or
    //     btn.disabled = true;
    // }



//make react component, onClick for react
function returnResultCard(obj){

    let answer = `<li>
    <div class="restaurant-body">
        <h5 class="restaurant-title">${obj['name']}</h5>
        <div class="restaurant addy"> ${obj['location']['display_address']} </div>
        <button value="${obj['id']}" onclick="addToUserList(this)" class="btn btn-primary">Add to my list</button> 
    </div>
    </li>` ;
    
    return answer
    
}

//switch to react as well....
function restaurantResults(evt) {
    evt.preventDefault();

    const formInputs ={
        term: document.querySelector('#search-keyword').value,
        city: document.querySelector('#search-city').value,
    };

    //document.querySelector('#restaurants').innerHTML = JSON.stringify(formInputs);

    fetch('/restaurant_search.json', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            for (const res_obj of jsonResponse){
                let restChoice = returnResultCard(res_obj);
                document.querySelector('#restaurants').insertAdjacentHTML('beforeend', restChoice);
            }
        });

};


document.querySelector('form').addEventListener('submit', restaurantResults);
