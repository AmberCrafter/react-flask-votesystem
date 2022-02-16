import {MemberlistType} from '../actionType/index.js'

const initState = {
    memberList: {results: []}
};

const MemberlistReducer = (state = initState, action) => {
    switch (action.type) {
        case MemberlistType.getAllMember:
            // action: {type: {MemberlistType.getAllMember}, value: [...]}
            const response = {
                memberList: {'results': action.value}
            };
            return response;
        default:
            return state;
    }
};

export default MemberlistReducer;