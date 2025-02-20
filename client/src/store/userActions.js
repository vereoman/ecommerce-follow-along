export const setEmail = (email) => {
    return {
      type: 'SET_EMAIL',
      payload: email
    };
  };
  
  export const clearEmail = () => {
    return {
      type: 'CLEAR_EMAIL'
    };
  };