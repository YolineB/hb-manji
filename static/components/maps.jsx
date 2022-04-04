
function MapsContainer(props) {

  const ref = React.useRef(null);
  const [map, setMap] = React.useState(null);
 
  let userID=props.userID

  const homeCoords = {
    lat: 37.0902,
    lng: -95.7129,
  };
 
  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        zoom: 4,
        center: homeCoords,
        disableDefaultUI: true,
      }));
    }
  }, [ref, map]);

  const autoSearch = document.getElementById('autocomplete')

    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: "us" },
      fields:['name', 'geometry']
    }
  
    const autocomplete = new google.maps.places.Autocomplete(autoSearch, options)

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        //in case user doesn't select autocomplete and just hit enter
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

  
  return (
    <div
      id="google-map"
      ref={ref}
      style={{ width: '700px', height: '350px' }}
    />
	)
}
const userID = document.querySelector('#user_id').value;
ReactDOM.render(<MapsContainer userID={userID}/>, document.getElementById('rest_maps'));
{/* 
<script src="/static/components/maps.jsx" type="text/jsx"></script> */}

{/* <script src="/static/components/maps.jsx" type="text/jsx"></script> */}

// https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1