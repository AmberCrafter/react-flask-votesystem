//ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup
import './index.css';
import {update_meta} from '../../../../../lib/api.js'
import {sync_all_meta} from '../../../../../App/scripts.js'
import { useDispatch } from 'react-redux';

function show_popup(dispatch, key, value, header) {
    const val = window.prompt("Please set a new value for ["+header+"]:", value)
    if (val == null || "") {
        alert("已取消修改!");
    } else {
        update_meta((code)=>{
            if (code===200) {
              alert('Successful!');
              sync_all_meta()(dispatch);
            } else {
              alert('['+code+'] Failed!');
            }
          }, key, val);
    }
}

function MetaCard(props) {
    const dispatch = useDispatch();
    return (<div className="metacard_container" onClick={()=>show_popup(dispatch, props.database_key, props.body, props.header)}>
        <div className="metacard_header">{props.header}:</div>
        <div className="metacard_body">{props.body}</div>
    </div>)
}

export default MetaCard;


// props: {
//     database_key: sting,
//     header: String,
//     body: any
// }