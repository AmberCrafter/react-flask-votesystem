import {StaticlistType} from '../actionType/index.js'

const initState = {
    staticList: {results: [], meta: {target:null, asc: true}}
};

const StaticlistReducer = (state = initState, action) => {
    let response = state;
    switch (action.type) {
        // case StaticlistType.updateData:
        //     // action: {
        //     //    type: StaticlistType.updateData, 
        //     //    value: {
        //     //     'voter': {},
        //     //     'vote_round': int,
        //     //     'target_value': {'id': int, 'name': string},
        //     //    }
        //     // }
        //     // console.log(action.value);
        //     // console.log(state);
            
        //     // find voter index in array
        //     let index = -1;
        //     state.dataList.results.forEach((v,ind)=>{
        //         if (v.name===action.value.voter.name) {
        //             return index=ind;
        //         }
        //     });

        //     // take old data
        //     if (index===-1){
        //         return state;
        //     } else {
        //         let row_data = state.dataList.results[index];
        //         row_data['vote_'+action.value.vote_round+'id'] = action.value.target_value.id;
        //         row_data['vote_'+action.value.vote_round+'name'] = action.value.target_value.name;
    
        //         let results = {...state};
        //         results.dataList.results[index]=row_data;
        //         console.log(results);
        //         return results
        //     }

        //     return state;

        case StaticlistType.getAllResults:
            // action: {type: {StaticlistType.getAllResults}, value: [...]}
            response = {
                staticList: {
                    ...state.staticList,
                    'results': action.value
                }
            };
            return response;

        case StaticlistType.updateSort:
            // action: {type: {StaticlistType.updateSort}, value: [...]}
            response = {
                staticList: {
                    ...state.staticList,
                    'meta': action.value
                }
            };
            return response;

        default:
            return state;
    }
};

export default StaticlistReducer;