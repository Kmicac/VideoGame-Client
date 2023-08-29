import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_NAME_VIDEOGAMES = "GET_NAME_VIDEOGAMES";
export const GET_DETAILS = "GET_DETAILS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const FILTER_GENRES = "FILTER_GENRES";
export const FILTER_BY_API_OR_DB = "FILTER_BY_API_OR_DB";
export const ORDER_ALFA = "ORDER_ALFA";
export const ORDER_RATING = "ORDER_RATING";
export const RESET_DETAILS = "RESET_DETAILS";
export const DELETE_GAME = "DELETE_GAME";

export const getVideogames = () =>  async (dispatch) => {
    
      const res = await axios.get('/videogames')
      const resp = res.data
       return dispatch({
          type: "GET_VIDEOGAMES",
          payload: resp,
        });
      
      
  };

  export const getGamesGenres = () => {
      return async (dispatch) => {
        const res =  await axios.get('/genres');
        const result = await res.data
        dispatch({
          type: "GET_GENRES",
          payload: result,
        })
      };
  };

  export const getGamesByName = (name) => {
      return async (dispatch)  => {
        const res = await axios.get(`/videogames/?search=${name}`);
        const result = await res.data;
        dispatch({
          type: "GET_NAME_VIDEOGAMES",
          payload: result,
        });
      };
      
  };

  export const getGamesById = (id) => {
      return async (dispatch) => {
        const res = await axios.get(`/videogames/${id}`);
        const result = await res.data;
        dispatch({
          type: "GET_DETAILS",
          payload: result,
        });
      };

  };

  export const createGame = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.post('/videogames', payload);
        const post = await res.data;
        dispatch({
          type: POST_VIDEOGAME,
          payload: post,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  

export const filterByGenre = (payload) => {
  return {
    type: "FILTER_GENRES",
    payload,
  };
};

export const filterByApiOrDb = (source) => {
  return {
    type: "FILTER_BY_API_OR_DB",
    payload: source,
  };
};

export const ordenAlfabetico = (p) => {
  return dispatch => dispatch({
    type: "ORDER_ALFA",
    payload: p,
  });
};

export const orderByRating = (p) => {
  return dispatch => dispatch({
    type: "ORDER_RATING",
    payload: p,
  });
};

export const resetDetails = () => {
  return {
    type: 'RESET_DETAILS',
  };
};

export const deleteGame = (id) => {
  return async function (dispatch) {
    let json = await axios.delete(`/videogames/videogames/${id}`);
    return dispatch({
      type: "DELETE_GAME",
      paylaod: json.data,
    });
  };
}
