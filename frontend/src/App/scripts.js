import {MemberlistType,DatalistType,MetadataType} from '../actionType/index.js'
import { get_all_member, get_all_data, get_meta} from "../lib/api";

export function sync_all_member(){
    return (dispatch) => {
        get_all_member()
        .then(data => {
            return dispatch({
                type: MemberlistType.getAllMember, 
                value: data.results
            })
        })
    }
}

export function sync_all_data(){
    return (dispatch) => {
        get_all_data()
        .then(data => {
            return dispatch({
                type: DatalistType.getAllData, 
                value: data.results
            })
        })
    }
}

export function sync_all_meta(){
    return (dispatch) => {
        get_meta()
        .then(data => {
            return dispatch({
                type: MetadataType.getAllMetadata, 
                value: data.results
            })
        })
    }
}