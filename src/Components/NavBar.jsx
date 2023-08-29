import React, { useState } from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import './Styles/navbar.css';
import { getGamesByName } from '../Redux/actions';
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchChange = (e) => {
    setName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if(window.location.pathname === '/home'){
      e.preventDefault();
      dispatch(getGamesByName(name))
      setName('');
    }
    if (window.location.pathname === '/Form') {
        history.push('/home');
        e.preventDefault();
        dispatch(getGamesByName(name))
        setName('');
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="navUl">
          <li>
            <NavLink valeu="home" className="navbar__link" to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar__link" to="Form">
              Create Video Game
            </NavLink>
          </li>
        </ul>
        <form className="searchForm" onSubmit={handleSearchSubmit}>
          <input
            className="searchInput"
            type="text"
            placeholder="Search..."
            value={name}
            onChange={(e) => handleSearchChange(e)}
          />
          
          <button  className="searchButton" type="submit">
            Search
          </button>
          
        </form>
      </nav>
    </header>
  );
};

export default NavBar;
