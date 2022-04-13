const AUTOCOMPLETE_OPTIONS = {
  types: ['(cities)'],
  componentRestrictions: { country: "us" },
  fields:['name', 'geometry']
}

const HOME_COORDS = {
  lat: 37.0902,
  lng: -95.7129,
};

function MapContainer({userId}) {
  const mapRef = React.useRef(null);
  const citySearchRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const restaurants = useRestaurants(userId)
 
  React.useEffect(() => {
    if (mapRef.current && google) {
      setMap(new google.maps.Map(mapRef.current, {
        zoom: 4,
        center: HOME_COORDS,
        disableDefaultUI: true,
      }));
    }
  }, []);

  React.useEffect(() => {
    if (map) {
      const autocomplete = new google.maps.places.Autocomplete(citySearchRef.current, AUTOCOMPLETE_OPTIONS)

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          //in case user doesn't select autocomplete and just hits enter
          alert("Please select one of the autofilll features or try your search again");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(13);
        }
      })
    }
  }, [map]);

  let markers = [];
  React.useEffect(() => {
    if (map) {
      restaurants.forEach(restaurant => {
        let marker = new google.maps.Marker({
                    position: restaurant.coords,
                    info: { name: restaurant.name,
                            url: restaurant.url,
                            comment: restaurant.comment ? restaurant.comment : ""
                          },
                    icon: {
                      url: '/static/images/manjiicecream.svg',
                      scaledSize: new google.maps.Size(100, 100),
                    },
                    animation: google.maps.Animation.DROP,
                    map: map,
                    });
        markers.push(marker)

        for (const marker of markers) {
          const markerInfo = `<div id="marker-info" >
                                <h5><a href=${marker.info.url} target="_blank">${marker.info.name}</a></h5>
                                <p>
                                ${marker.info.comment}
                                </p>
                              </div>
                          `          
          const infoWindow = new google.maps.InfoWindow({
            content: markerInfo,
            maxWidth: 200,
          });
          
          marker.addListener('mouseover', () => {
            marker.setLabel(marker.info.name);
          });

          marker.addListener('mouseout', ()=> {
            marker.setLabel('');
            setTimeout(()=> infoWindow.close(), 3000)
          })
          
          marker.addListener('click', ()=> {
            infoWindow.setContent(markerInfo);
            infoWindow.open(map, marker);
           
          }) 
        }
      });
      return ()=> {
        for (let marker of markers) {
          marker.setMap(null);
        }
      }
    }
  }, [restaurants]);
  
 
  
  return (
    <React.Fragment>
        <div
          ref={mapRef}
          className="map-container col-9"
        />
      <input id="map-search" ref={citySearchRef} placeholder="Enter a city" type="text"/>
    </React.Fragment>
	)
}

// https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1