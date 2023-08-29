import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
   filterByApiOrDb,
   filterByGenre,
   getGamesGenres,
   getVideogames, 
   ordenAlfabetico, 
   orderByRating 
  } from '../../Redux/actions';
import DarkMode from '../../Components/DarkMode/DarkMode';
import NavBar from '../../Components/NavBar';
import Pagination from '../../Components/Pagination';
import Card from '../../Components/Card';
import Loading from '../Loading/Loading';
import '../Home/home.css';


const Home = () => {

  const dispatch = useDispatch();
  let [games, setGames] = useState('videogame');
  let [genre, setGenre] = useState('All');
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;
  const allGenres = useSelector((state) => state.getGenres);
  const allGames = useSelector((state) => state.getGames);
  const totalPages = Math.ceil(allGames.length / gamesPerPage);

  useEffect(() => {
    setLoader(true);
    dispatch(getVideogames());
    dispatch(getGamesGenres())
  }, [dispatch]);

  useEffect(() => {
    allGames.length > 0 
    ? setLoader(false) : setLoader(true);
    // if (allGames.length > 0) {
    //   setLoader(false);
    // } else {
    //   setTimeout(() => {
    //     setLoader(false)
    //   }, 6000);
    // }
  },[allGames]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = allGames.slice(startIndex, endIndex);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlerAlpha = (name) => {
    dispatch(ordenAlfabetico(name));
    setCurrentPage(1);
  };

  const handlerRating = (rating) => {
    dispatch(orderByRating(rating));
    setCurrentPage(1);
  };

  const handlerFilter = (value) => {
    value === 'created' ? dispatch(filterByApiOrDb('created')) : 
    dispatch(filterByApiOrDb('existing'))
     setCurrentPage(1);    
     setGames('videogame')
  };


  const handleFilterByGenre = (event, value) => {
    dispatch(filterByGenre(event.target.value));
    setGenre(value);
    setCurrentPage(1);
  };

  return (
    <div>
     {loader && <Loading/>}
      <NavBar />
      <DarkMode />
      <div>
        <div className="dropdown">
        <select className="dropbtn"
           value={genre}
           onChange={handleFilterByGenre}
         >
            <option value="All">All...</option>
            <optgroup label="Genders">
              {allGenres?.map((el) => (
                <option value={el.name} key={el.id}>
                  {el.name}
                </option>
              ))}
            </optgroup>
          </select>
          </div>
          <button className="Button" onClick={handlerAlpha}>Order A-Z</button>
          <button className="Button"onClick={handlerRating} >Order By Rating</button>
          <div className="dropdown">
          <select className="dropbtn"
                name='Videogames'
                value={games} 
                onChange={(e) => handlerFilter(e.target.value)}>
                    <option value="videogames">Videogames</option>
                    <option value='existing'>Existing</option>
                    <option value='created'>Created</option>
            </select>
            </div>
        <h1>Welcome Home!</h1>
      </div>
      <div className="container">
        {currentGames.map((game) => (
          <Card key={game.id} {...game} />
          ))}
      </div>
      <div>
        <nav>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
        />
        </nav>
      </div>
    </div>
  );
};

export default Home;
