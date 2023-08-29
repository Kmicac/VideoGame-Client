import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getGamesById, resetDetails } from '../../Redux/actions';
import { NavLink } from 'react-router-dom';
import '../GameDetail/videoGameDetail.css'


const Details = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const videogame = useSelector((state) => state.getDetails);


    useEffect(() => {
     dispatch(getGamesById(id));

     return () => {
      dispatch(resetDetails());
    };

    },[dispatch, id]);

  return (
    <div>
      <div className='detail'>
      <h1>VideoGame Detail</h1>
      </div>
      <div className="detail__container">
        <div className="detail__content">
          <section className="detail__content_info">
            <picture className="detail__img">
              <img src={videogame.image} 
              alt={videogame.name}
              width="300px"
              weight="300px"/>
            </picture>
            <article>
              <h2 className="detail__title">{videogame.name}</h2>
              <h3>
                {videogame.genres ? videogame.genres.map(genre => genre.name).join(', ')
                 : videogame.genres}
              </h3>
              <h3 className="detail__platforms">{videogame.platforms ? videogame.platforms.map((p) => (p + ' ' )) : videogame.platforms}</h3>
              <h3 className="detail__date">{videogame.released}</h3>
              <h3 className="detail__date">{videogame.updated}</h3>
              <h3>{`🌟 ${videogame.rating}`}</h3>
              <h4>{videogame.webside}</h4>
              <h5 >{videogame.description}</h5>
            </article>
          </section>
        </div>
      </div>
      <div className="detail__btn">
      <NavLink to="/home">
      <button className="btn__back"><h3>Home</h3></button>
      </NavLink>
      </div>
    </div>
  )
}

export default Details