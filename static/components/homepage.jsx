'use strict';
function UserRestaurants(props) {
    
    return (
        <tr> 
            <th scope="row"></th>
            <td>Thornton</td>
            <td>{props.rest_name}</td>
        </tr>
    );
}


function HomepageContainer() {

    const [userArr, setuserArr] = React.useState([]);

    React.useEffect(() => {
        fetch("/userRestaurants.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setuserArr(data.favs)});
    }, []);

    let favRestaurants = []

    for (let userFav in userArr) {
        let userBlock = UserRestaurants(userFav);
        favRestaurants.push(userBlock);
    }


    return (
        <React.Fragment>
            <h2>So Yum</h2>
            <table className="table table-dark table striped">{userRests}
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Restaurant Name</th>
                    </tr>
                </thead>
                <tbody> {favRestaurants} </tbody>
            </table>
        </React.Fragment>
    )
}

ReactDOM.render(<HomepageContainer  />, document.getElementById('user_restaurants'));

