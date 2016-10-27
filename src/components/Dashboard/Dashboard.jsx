import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import styles from './Dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Navbar dark full color="inverse">
          <NavbarBrand tag={Link} to="/dashboard">Dashboard</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <Link className="nav-link" to="/code" activeClassName="active">Code</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/assembly"activeClassName="active">Assembly</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/f2f" activeClassName="active">F2F</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/ui-prototype" activeClassName="active">UI prototype</Link>
            </NavItem>
          </Nav>
          <Nav navbar className="float-xs-right">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret tabIndex={0} tag="a" className="nav-link">
                Welcome {localStorage.handle}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    delete localStorage.handle;
                    window.location.href = '/login';
                  }}
                >Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
        <div className="container-fluid">
          {children}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CSSModules(Dashboard, styles);
