'use strict';
function RestaurantRow(props) {
    
    return (
        <tr> 
            <th scope="row"> {props.restaurant.id} </th>
            <td>{props.restaurant.name}</td>
        </tr>
    );
}

function ProfilePageContainer(){
    const [userArr, setUserArr] = React.useState([]);

    React.useEffect(() => {
        fetch("/userRestaurants")
        .then((response) => response.json())
        .then((data) => {
            setUserArr(data)});
    }, []);


    return (
        <React.Fragment>
            <h2>So Yum</h2>
            <table className="table table-dark table striped">
                <thead>
                    <tr>
                    <th scope="col">Restaurant_ID</th>
                    <th scope="col">Restaurant Name</th>
                    </tr>
                </thead>
                <tbody> 
                    {userArr.map(restaurant => <RestaurantRow key={restaurant.id} restaurant={restaurant}/>)}
                </tbody>
            </table>
        </React.Fragment>
    )
}


ReactDOM.render(<ProfilePageContainer />, document.getElementById('profile'));

/* <ReactRouterDOM.BrowserRouter>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} />
        </ReactRouterDOM.Route>

        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage />
        </ReactRouterDOM.Route>
      </div>
</ReactRouterDOM.BrowserRouter> */