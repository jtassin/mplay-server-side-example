import { createStore as createStoreRedux } from 'redux';

export const createStore = () => {
  return createStoreRedux(
    () => {},
    (typeof window !== 'undefined') && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
