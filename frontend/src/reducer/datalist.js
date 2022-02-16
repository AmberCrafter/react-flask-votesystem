import {DatalistType} from '../actionType/index.js'

const initState = {
    dataList: {results: [
        {
            id: null,
            name: null,
            contribution: null,
            number_vote: null,
            comment: null,
            vote_1_id: null,
            vote_1_name: null,
            vote_2_id: null,
            vote_2_name: null,
            vote_3_id: null,
            vote_3_name: null,
            vote_4_id: null,
            vote_4_name: null,
            vote_5_id: null,
            vote_5_name: null,
            vote_6_id: null,
            vote_6_name: null,
            vote_7_id: null,
            vote_7_name: null,
        }
    ]}
};

const DatalistReducer = (state = initState, action) => {
    switch (action.type) {
        case DatalistType.updateData:
            // action: {
            //    type: DatalistType.updateData, 
            //    value: {
            //     'voter': {},
            //     'vote_round': int,
            //     'target_value': {'id': int, 'name': string},
            //    }
            // }
            // console.log(action.value);
            // console.log(state);
            
            // find voter index in array
            let index = -1;
            state.dataList.results.forEach((v,ind)=>{
                if (v.name===action.value.voter.name) {
                    return index=ind;
                }
            });

            // take old data
            if (index===-1){
                return state;
            } else {
                let row_data = state.dataList.results[index];
                row_data['vote_'+action.value.vote_round+'_id'] = parseInt(action.value.target_value.id);
                row_data['vote_'+action.value.vote_round+'_name'] = action.value.target_value.name;
    
                let results = {...state};
                results.dataList.results[index]=row_data;
                return results
            }

            return state;

        case DatalistType.getAllData:
            // action: {type: {DatalistType.getAllData}, value: [...]}
            const response = {
                dataList: {'results': action.value}
            };
            return response;
        default:
            return state;
    }
};

export default DatalistReducer;