import React from 'react';
import { useDispatch } from 'react-redux';
import './Styles/card.css';
import { NavLink } from "react-router-dom";
import { getVideogames, deleteGame } from '../Redux/actions';
import Swal from 'sweetalert2'

const Card = ({ image, name, genres, rating, id }) => {

  const dispatch = useDispatch(); 

  const handleDelete = () => {
    dispatch(deleteGame(id));
    Swal.fire("You've deleted the game with success");
    dispatch(getVideogames());
  };
  
  return (
    <div>
      <div className="cards">
      {typeof id === 'string' && <button className='button' onClick={handleDelete}>X</button>}
        <div className="card-image">
          <img src={image} alt={name} />
        </div>
        <h2 className="card-text">{name}</h2>
        <h3 className="card__genders">{typeof genres[0] === "object" ? genres.map((elem) => elem.name + " ") : genres.map((elem) => elem + " ")}</h3>
        <h4 className="card-text">{`🌟 ${rating}`}</h4>
        <div className="card-footer">
          <NavLink to={`/videogame/${id}`}>
            <button>Detail</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;