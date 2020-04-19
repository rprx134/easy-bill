const initialState = {
     snackbar: {
          queue: [],
     },
     customers: [],
     products: [],
     invoices: [],
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
          case 'GET_PRODUCTS':
               return { ...state };
          case 'PRODUCTS_FETCHED':
               return { ...state, products: action.payload };
          case 'ADD_PRODUCT':
               return { ...state };
          case 'ADD_PRODUCT_SUCCESS':
               let { products } = state;
               products.push(action.payload);
               return { ...state, products };
          case 'GET_INVOICE':
               return { ...state };
          case 'INVOICES_FETCHED':
               return { ...state, invoices: action.payload };
          case 'CREATE_INVOICE':
               return { ...state };
          case 'CREATE_INVOICE_SUCCESS':
               let { invoices } = state;
               invoices.push(action.payload);
               return { ...state, invoices };
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