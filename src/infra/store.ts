import { createReducer, rootSaga } from "@/features";
import { retrieveAccount } from "@/features/account/action";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const middleware = composeWithDevTools(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  );

  const store = createStore(createReducer(history), middleware);
  sagaMiddleware.run(rootSaga);
  initialSetup(store);

  return store;
}

function initialSetup(store: Store) {
  store.dispatch(retrieveAccount());
}

export default configureStore();
