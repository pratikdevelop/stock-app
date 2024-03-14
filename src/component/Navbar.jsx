import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CollapsibleExample() {
  return (


<nav  className="navbar navbar-expand-lg bg-primary text-white fixed-top">
  <div className="container-fluid d-flex justify-content-between">
    <a className="navbar-brand mr-auto" href="#">Stock</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
      <li className="nav-item">
            <NavLink to="/" active="true" className="navlink block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">Search</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/watchlist" className="navlink block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Watchlist</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/portfolio" className="navlink block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Portfolio</NavLink>
            </li>
      </ul>
     
    </div>
  </div>
</nav>

  );
}

export default CollapsibleExample;