'use strict';

function addToFavList(btn,selectedRest){
    
    fetch('/add_to_favorite_list', {
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
            btn.style.display = 'Added';
            btn.style.background = "transparent";
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
            btn.innerHTML = '';
            btn.disabled = true;
        } else {
            alert('Error from deleteFromFav js function')
        }
    });
}

function commentEdit(favoriteID, newComment){
    let formInput = {
        favoriteID,
        newComment
    }

    fetch('/edit_favorite_comment', {
        method: 'POST',
        body: JSON.stringify(formInput),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    .then(response => response.text())
    .then(answer => {
        if (answer === "comment_updated") {
            console.log(answer)
        } else {
            alert('Error from edit_favorite_button function')
        }
    });

}
