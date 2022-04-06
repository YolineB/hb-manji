'use_strict';
function initMap(){

  const homeCoords = {
      lat: 37.0902,
      lng: -95.7129,
    };

  window.basicMap = new google.maps.Map(document.querySelector('#maps'), {
      center: homeCoords,
      zoom: 4
    });

  const autoSearch = document.getElementById('autocomplete')
  
  const options = {
    types: ['(cities)'],
    componentRestrictions: { country: "us" },
    fields:['name', 'geometry']
  }
  
  const autocomplete = new google.maps.places.Autocomplete(autoSearch, options)
  console.log(autocomplete)
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      //in case user doesn't select autocomplete and just hit enter
      alert("Please select one of the autofilll features or try your search again");
      return;
    }

    if (place.geometry.viewport) {
      basicMap.fitBounds(place.geometry.viewport);
    } else {
      basicMap.setCenter(place.geometry.location);
      basicMap.setZoom(13);
    }

  })
  const userID = document.querySelector('#user_id').value;

  userMap(userID)
  let mapMarkers = [];

}

//clear markers
function userMap(userID){

  fetch(`/userRestaurants/${userID}`)
  .then((response) => response.json())
  .then((data) => {
    let favsArr = data.favs;
    for (let rest of favsArr){
      myMarker = new google.maps.Marker({
        position: rest['coords'],
        title: rest['name'],
        map: window.basicMap,
      });
    }
  })
  
  //   favsArr.forEach(restaurant => {
  //     mapMarkers.push(restaurant);
  //   })
  //   return mapMarkers;
  // })
  // .then((data)=>{
  //   // console.log(mapMarkers);
  //   for (let rest of data){
  //     myMarker = new google.maps.Marker({
  //       position: rest['coords'],
  //       title: rest['name'],
  //       map: window.basicMap,
  //     });
  //   }
  
  // bounds.extend(marker.position);
}

// function userMap(favArr, toShow){
  
//   for (let marker of favArr) {
//     if (toShow){
//       console.log(rest['name'])
//       marker.setMap(window.basicMap)
//     } else {
//       console.log('TRYING TO REMOVE')
//       marker.setMap(null)
//     }
//   }
// }