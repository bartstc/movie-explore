export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'SIGN_IN':
      return {
        ...state,
        currentUser: payload
      };

    case 'IS_SIGN_IN':
      return {
        ...state,
        isAuth: payload
      };

    case 'SIGN_OUT':
      return {
        ...state,
        isAuth: false,
        currentUser: null
      };

    default:
      return state;
  }
};