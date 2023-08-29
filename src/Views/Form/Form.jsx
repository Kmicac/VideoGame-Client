import React, { useState, useEffect } from 'react'
import NavBar from '../../Components/NavBar';
import validate from '../Form/ValidationForm';
import { 
  createGame, 
  getGamesGenres, 
  getVideogames } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import platformsArray from '../Platforms/platformsArray.js';
import '../Form/form.css';
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';


const Form = () => {

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.getGenres);
  const [ error, setError ] = useState({});
  const [state, setState] = useState({
    name:"",
    image:"",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGamesGenres());
    dispatch(getVideogames());
    }, [dispatch]);

  
  const handlerChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,

    })
    setError(validate({
      ...state,
      [event.target.name]: event.target.value,
    }))
  };

  const handlerGenres = (genres) => {
    const selectedGenres = genres.map((item) => item.name);
    setState((state) => ({
      ...state,
      genres: selectedGenres,
    }));
  };
  

  const allPlatforms = platformsArray.map(item => item);


  const handlePlatformSelect = (selected) => {
    setState((state) => ({
      ...state,
      platforms: [...state.platforms, selected],
    }));
  };
  
  const handlePlatformRemove = (removed) => {
    setState((state) => ({
      ...state,
      platforms: state.platforms.filter((platform) => platform !== removed),
    }));
  };
  
  

  const handlerSubmit = (event) => {
    event.preventDefault();
    const errorOn = validate(state);
    if(Object.values(errorOn).length !== 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'Please fill in the required fields correctly!'
      })
    } else {
      dispatch(createGame(state))
      Swal.fire("Video Game created with success!");
    setState({
      name:"",
      image:"",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    })
  }
  };
  
  const handleReset = (e) => {
    e.preventDefault();
    setError(validate({}));
    setState({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres:[],
      platforms:[],
    });
  };

  let style = {
    fontWeight:'bold',
    color:'red',
  };

  return (

    <div>
      <NavBar/>
      <div>
       <h1>Let's create a new game..!</h1> 
      </div>
      <div className="create__container">
        <form onSubmit={handlerSubmit}>
          <div>
            <label>Name:</label>
            <input name="name" onChange={handlerChange} type="text" />
            <p style={style}>{error.name && (<span>{error.name}</span>)}</p>
          </div>
          <div>
            <label>Image:</label>
          <input name="image" onChange={handlerChange} type="url" />
          <p style={style}>{error.image && (<span>{error.image}</span>)}</p>
          </div>
          <div>
            <label>Platforms:</label>
          <Multiselect
          id="platform"
          isObject={false}
          onRemove={handlePlatformRemove}
          onSelect={handlePlatformSelect}
          options={allPlatforms}

          />
          <p style={style}>{error.platforms && <span>{error.platforms}</span>}</p> 
          </div>
          <div>
            <label>Released:</label>
          <input name="released" onChange={handlerChange} type="date" />
           <p style={style}>{error.released && (<span>{error.released}</span>)}</p>
          </div>
          <div>
            <label>Rating:</label>
          <input name="rating" onChange={handlerChange} type="text" />
          <p style={style}>{error.rating && (<span>{error.rating}</span>)}</p>
          </div>
          <div>
          <label htmlFor="genres">Genres:</label>
            <Multiselect 
              id="genres"
              options={genres}
              displayValue="name"
              onSelect={handlerGenres}
              onRemove={handlerGenres}
              selectedValues={state.genres.map((genre) => ({ name: genre }))}
            />
          <p style={style}>{error.genres && (<span>{error.genres}</span>)}</p>
          </div>
          <div>
            <label>Description:</label>
          <textarea name="description" onChange={handlerChange} type="text" rows="10" cols="40" placeholder='Write here the description game..'></textarea>
          <p style={style}>{error.description && (<span>{error.description}</span>)}</p>
          </div>
          <div>
          <button className="button_form" type="submit">Create VideoGame</button>
          </div>
          <div>
          <button className="button_form" type="reset" onChange={handleReset}>Reset</button>
          </div>
        </form>
        </div>
    </div>

    
  )
};

export default Form