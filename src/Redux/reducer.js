import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_NAME_VIDEOGAMES,
  GET_DETAILS,
  POST_VIDEOGAME,
  FILTER_GENRES,
  FILTER_BY_API_OR_DB,
  ORDER_ALFA,
  ORDER_RATING,
  RESET_DETAILS,
  DELETE_GAME,
} from '../Redux/actions';

const initialState = {
    getGames: [],
    getAllGames: [],
    getDetails: [],
    getGenres:[]
  };

  function rootReducer(state = initialState, action) {
     switch(action.type){
      case GET_VIDEOGAMES:
        return {
          ...state,
          getGames: [...action.payload],
         getAllGames: [...action.payload],
        };
      
      case GET_GENRES:
        return {
          ...state,
          getGenres: action.payload,
      };
      
      case GET_NAME_VIDEOGAMES:
        return {
          ...state,
          getGames: [...action.payload],
          getAllGames: [...action.payload],
        };


      case GET_DETAILS:
          return {
            ...state,
            getDetails: action.payload,
          };

      case POST_VIDEOGAME:
            return {
              ...state,
              getGames: [...state.getGames, action.payload],
              getAllGames: [...state.getAllGames, action.payload],
            };

      case FILTER_GENRES:
        const allGame = state.getAllGames;   
        const genresFilter = action.payload === "All" 
        ? allGame : allGame.filter((game) => game.genres.find((el) => el === action.payload));
         return {
          ...state,
           getGames: genresFilter
        };
        
      case FILTER_BY_API_OR_DB:
        const allGames = state.getAllGames;
            const filterId = action.payload === 'created' 
            ? allGames.filter(el => typeof el.id === 'string') 
            : action.payload === 'Videogames'
            ? state.getAllGames : allGames.filter(el => typeof el.id === 'number');
           
        return {
          ...state,
          getGames: filterId,
        };      
       
      case ORDER_ALFA:
        const orden = state.orden === 1 ? -1 : 1;
        const orderAlpha = [...state.getGames].sort((a, b) =>
           a.name.localeCompare(b.name) * orden );
        return {
        ...state,
        getGames: orderAlpha,
        orden: orden,
      };

      case ORDER_RATING:
        const ratingOrder = state.sortOrder === 1 ? -1 : 1;
        const orderRating = [...state.getGames].sort(
          (a, b) => (a.rating - b.rating) * ratingOrder
        );
        return {
          ...state,
          getGames: orderRating,
          sortOrder: ratingOrder,
        };

      case RESET_DETAILS:
          return {
            ...state,
            getDetails: [],
          };
      case DELETE_GAME: 
      return {
        ...state,
        getGames: [action.payload],
      };
        
      default:
            return { ...state };
    };

  };

  export default rootReducer;