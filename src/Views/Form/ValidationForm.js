export default function validate(state) {
    let error = {};
  
    if (!state.name ) {
      error.name = 'This field is required.';
    } else if (!state.name.match(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/)) {
      error.name = 'The entered value is not valid.';
    } else if (state.name.length > 20 ){
      error.name = ' The field should have less than 20 characters!';
    }
  
    if (!state.image || !state.image.match(/(https?:\/\/.*\.(?:png|jpg|gif))/i)) {
      error.image = 'Enter a valid URL (.jpg, .png, .gif)';
    }
  
    if (!state.description || state.description.length < 20) {
      error.description = 'Please enter a minimum description of 20 characters.';
    }
  
    if (!state.released) {
      error.released = 'This field is required.';
    } else if (
      !state.released.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
    ) {
      error.released = 'Enter a valid date (YYYY-MM-DD).';
    }
  
    if (!state.rating || state.rating < 0 || state.rating > 5 || isNaN(parseInt(state.rating)) ) {
      error.rating = 'The rating number must be between 0 & 5.';
    }
  
    if (!state.genres.length) {
      error.genres = 'This field is required.';
    }
  
    if (!state.platforms.length) {
      error.platforms = 'This field is required.';
    }
  
    return error;
  };
  

  // Expresiones Regulares:
  //     - regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;           Solo es permitido espacios en blanco y letras..
  //     - regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;  Usuario valido solo: ssss@example.com
  //     - regexComments = /^.{1,255}$/;                        Solo se permite la cantidad de  255 caracteres..
  //     - regexImage = /(https?:\/\/.*\.(?:png|jpg|gif))/i);   Enter a valid URL (.jpg, .png, .gif)
  //     - regexDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;   Enter a valid date (YYYY-MM-DD)