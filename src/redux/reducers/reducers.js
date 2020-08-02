const initialState = {
     snackbar: {
          queue: [],
     },
     customers: [],
     products: [],
     invoices: [],
     quotations: [],
     loaderEnabled: false,
}

const enableLoader = (state) => {
     let { loaderEnabled } = state;
     loaderEnabled = true;
     return { ...state, loaderEnabled };
}

const reducers = (state = initialState, action) => {
     let { snackbar } = state;
     switch (action.type) {
          case 'AUTHENTICATE_USER':
               return enableLoader(state);
          case 'GET_CUSTOMERS':
               return { ...state };
          case 'CUSTOMERS_FETCHED':
               return { ...state, customers: action.payload };
          case 'ADD_CUSTOMER':
               return enableLoader(state);
          case 'ADD_CUSTOMER_SUCCESS':
               let { customers } = state;
               customers.push(action.payload);
               return { ...state, customers };
          case 'GET_PRODUCTS':
               return { ...state };
          case 'PRODUCTS_FETCHED':
               return { ...state, products: action.payload };
          case 'ADD_PRODUCT':
               return enableLoader(state);
          case 'ADD_PRODUCT_SUCCESS':
               let { products } = state;
               products.push(action.payload);
               return { ...state, products };
          case 'GET_QUOTATION':
               return { ...state };
          case 'QUOTATIONS_FETCHED':
               return { ...state, quotations: action.payload };
          case 'CREATE_QUOTATION':
               return enableLoader(state);
          case 'CREATE_QUOTATION_SUCCESS':
               let { quotations } = state;
               quotations.push(action.payload);
               return { ...state, quotations };
          case 'DOWNLOAD_QUOTATION_AS_DOCX':
               return enableLoader(state);
          case 'GET_INVOICE':
               return { ...state };
          case 'INVOICES_FETCHED':
               return { ...state, invoices: action.payload };
          case 'CREATE_INVOICE':
               return enableLoader(state);
          case 'CREATE_INVOICE_SUCCESS':
               let { invoices } = state;
               invoices.push(action.payload);
               return { ...state, invoices };
          case 'DOWNLOAD_INVOICE_AS_DOCX':
               return enableLoader(state);
          case 'SNACKBAR_SHOW':
               snackbar.queue.push({ id: Date.now(), ...action.payload });
               let { loaderEnabled } = state;
               loaderEnabled = false;
               return { ...state, snackbar, loaderEnabled };
          case 'SNACKBAR_HIDE':
               snackbar.queue = snackbar.queue.filter((snackbar) => snackbar.id !== action.payload.id);
               return { ...state, snackbar };
          case 'AUTHENTICATION_SUCCESS':
               window.sessionStorage.setItem("token", action.payload);
               return state;
          default:
               return state;
     }
};
export default reducers;