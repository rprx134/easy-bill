const reducers = (state = {}, action) => {
     switch (action.type) {
          case 'GET_CUSTOMERS':
               return { ...state };
          case 'CUSTOMERS_FETCHED':
               return { ...state, customers: action.payload };
          case 'ADD_CUSTOMER':
               return { ...state };
          case 'ADD_CUSTOMER_SUCCESS':
               let { customers } = state;
               customers.push(action.payload);
               return { ...state, customers};
          default:
               return state;
     }
};
export default reducers;