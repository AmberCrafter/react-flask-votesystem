import {get_vote_results} from '../../../lib/api.js'
import { StaticlistType } from '../../../actionType/index.js' 

export function sync_all_results(){
    return (dispatch) => {
        get_vote_results()
        .then(data => {
            return dispatch({
                type: StaticlistType.getAllResults, 
                value: data.results
            })
        })
    }
}