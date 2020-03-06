const initialState = {
     snackbar: {
          queue: [],
     },
     customers: [],
}

const reducers = (state = initialState, action) => {
     let { snackbar } = state;
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
               return { ...state, customers };
          case 'SNACKBAR_SHOW':
               snackbar.queue.push({ id: Date.now(), ...action.payload });
               return { ...state, snackbar };
          case 'SNACKBAR_HIDE':
               snackbar.queue = snackbar.queue.filter((snackbar) => snackbar.id !== action.payload.id);
               return { ...state, snackbar };
          default:
               return state;
     }
};
export default reducers;