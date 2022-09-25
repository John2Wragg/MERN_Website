import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/index">
        Homepage
      </a>
      <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/logout">
              Logout
            </a>
          </li>
      </ul>
    </nav>
  );
};

export default Navigation;
