import {createStore, combineReducers, applyMiddleware} from 'redux';
import DatalistReducer from '../reducer/datalist';
import MemberlistReducer from '../reducer/memberlist';
import StaticlistReducer from '../reducer/staticlist';
import MetadataReducer from '../reducer/metadata';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    MemberlistReducer,
    DatalistReducer,
    StaticlistReducer,
    MetadataReducer
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;