
function initMap(){

    const homeCoords = {
        lat: 37.8336,
        lng: -122.2030,
      };

    const basicMap = new google.maps.Map(document.querySelector('#map'), {
        center: homeCoords,
        zoom: 13
      });
    
    //const locationFavs = [];

    fetch('/userRestaurants/3')
      .then((response) => response.json())
      .then((data => {
        for (let rest of Object.values(data.favs)){
          new google.maps.Marker({
            position: rest['coords'],
            title: rest['name'],
            map: basicMap,
          });

        }
      }))

}



// fetch('/api/bears')
//     .then((response) => response.json())
//     .then((bears) => {
//       for (const bear of bears) {
//         // Define the content of the infoWindow
//         const bearInfoContent = `
//         <div class="window-content">
//           <div class="bear-thumbnail">
//           </div>

//           <ul class="bear-info">
//             <li><b>Bear gender: </b>${bear.gender}</li>
//             <li><b>Bear birth year: </b>${bear.birthYear}</li>
//             <li><b>Year captured: </b>${bear.capYear}</li>
//             <li><b>Collared: </b>${bear.collared}</li>
//             <li><b>Location: </b>${bear.capLat}, ${bear.capLong}</li>
//           </ul>
//         </div>
//       `;

//         const bearMarker = new google.maps.Marker({
//           position: {
//             lat: bear.capLat,
//             lng: bear.capLong,
//           },
//           title: `Bear ID: ${bear.bearId}`,
//           icon: {
//             url: '/static/img/polarBear.svg',
//             scaledSize: new google.maps.Size(50, 50),
//           },
//           map, // same as saying map: map
//         });

//         bearMarker.addListener('click', () => {
//           bearInfo.close();
//           bearInfo.setContent(bearInfoContent);
//           bearInfo.open(map, bearMarker);
//         });
//       }
//     })

//clearInnerHTML of selected map div

// markersButton = <button onClick={(evt) => initMap(evt.target,userID)}
//         className='btn btn-primary btn-sm' type='button' id='delete' >Remove</button>
