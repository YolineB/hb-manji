function NavBar({canEdit, currentPage}){


    return (
        <React.Fragment>
        <div className="navbar-brand navbar-light col-8" id="nav">
        <nav>
            <div>
                <button className="navbar-toggler" role="button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <img src="/static/images/manjimenu.png" className="navbar-toggler-icon" id="menu-icon"/>
                </button>
                <span id="current-page">{currentPage}</span>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/search_restaurant">Search new restaurants to add</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/my_profile">My profile</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/logout">Logout</a>
                </li>
            </ul>
            </div>
            <div id="logo-img" className="position-absolute top-0 end-0"> 
                <a className="navbar-brand" href="/my_manji">
                    <img id="nav-logo" src="/static/images/manji.png"/>
                </a>
            </div>
        </nav>
        </div>
        </React.Fragment>
    )
}