'use strict';
// function RestaurantRow(props) {
    
//     return (
//         <tr> 
//             <th scope="row"> {props.restaurant.id} </th>
//             <td>{props.restaurant.name}</td>
//         </tr>
//     );
// }

function ProfilePageContainer(props){

    //take in user_name
    //proved that it's user looking at own profile
    //show a button that will copy link
    //set a event lister on click of button
    //this react page is rendering that button
    //maybe even incorporate a coding syntax
    // const [userArr, setUserArr] = React.useState([]);
    
    // React.useEffect(() => {
    //     fetch("/userRestaurants")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setUserArr(data)});
    // }, []);


    return (
        <React.Fragment>
            <button onClick={(evt) => copyToClipbaord(evt.target,props.user_id)} 
            className="btn btn-primary">Click here to copy your profile link!</button>
        </React.Fragment>
    )
    
}

const userID = document.querySelector('#user_id').value;
ReactDOM.render(<ProfilePageContainer userID={userID}/>, document.getElementById('profile_page'));

