const reducers = (state = {}, action) => {
     switch (action.type) {
          case 'GET_CUSTOMERS':
               return { ...state };
          case 'CUSTOMERS_FETCHED':
               return { ...state, customers: action.payload };
          case 'ADD_CUSTOMER':
               return {...state};
          case 'ADD_CUSTOMER_SUCCESSFUL':
               return { ...state, customers: action.payload };
          default:
               return state;
     }
};
export default reducers;