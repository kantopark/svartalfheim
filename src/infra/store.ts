import { createReducer, rootSaga } from "@/features";
import { retrieveAccount } from "@/features/account/action";
import RootState from "@/features/root-state";
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

const initialSetup = (store: Store) => {
  const { pathname } = getState(store).router.location;
  store.dispatch(retrieveAccount(pathname));
};

const getState = (store: Store): RootState => store.getState();

export default configureStore();
