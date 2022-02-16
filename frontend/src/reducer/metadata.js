import {MetadataType} from '../actionType/index.js'

const initState = {
    metadata: {results: []}
};

const MetadataReducer = (state = initState, action) => {
    switch (action.type) {
        case MetadataType.getAllMetadata:
            // action: {type: {MetadataType.getAllMetadata}, value: [...]}
            const response = {
                metadata: {'results': action.value}
            };
            return response;
        default:
            return state;
    }
};

export default MetadataReducer;