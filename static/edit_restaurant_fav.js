'use strict';

function addToUserFavList(btn,selectedRest){
    
    fetch('/add_to_restaurant_list', {
        method: 'POST',
        body: JSON.stringify(selectedRest),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    .then(response => response.text())
    .then(answer => {
        if (answer === "newFav") {
            btn.innerHTML = 'Added!!';
            btn.disabled = true;
        } else {
            alert(`${selectedRest['name']} has already been added to your list!`)
        }
    });
}

function deleteFromFavList(btn,selectedRest){

    
    fetch('/delete_from_fav_list', {
        method: 'POST',
        body: JSON.stringify(selectedRest),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    .then(response => response.text())
    .then(answer => {
        if (answer === "removed") {
            btn.innerHTML = 'removed';
            btn.disabled = true;
        } else {
            alert('Error from deleteFromFav js function')
        }
    });
}

