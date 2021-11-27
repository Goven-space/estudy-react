import {createStore} from 'redux';
import reducers from '@/reducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {persistStore, persistReducer} from 'redux-persist';

const config = {
  key: 'estudy',
  storage,
  whitelist: ['AuthorizationReducer']
};

const reducer = persistReducer(config, reducers);

export default function configureStore(){
  let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//redex-devtool调试插件
  );
  
  let persistor = persistStore(store);
  return { persistor, store };
};