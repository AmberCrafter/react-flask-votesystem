import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { StaticlistType } from '../../../../actionType';

function staticTableHeaderClickHandler(target, status) {
  if (target===status.target) {
    return (dispatch) => {
      dispatch({
        type: StaticlistType.updateSort,
        value: {
          ...status,
          asc: !status.asc
        }
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: StaticlistType.updateSort,
        value: {
          target: target,
          asc: true
        }
      })
    }
  }
}


function StaticTableHeader() {
  const dispatch = useDispatch();
  const sortInfo = useSelector(state => state.StaticlistReducer.staticList.meta);

  return (<div>
    <div className='static_table_header'>
      <div onClick={()=>{staticTableHeaderClickHandler('id'  , sortInfo)(dispatch)}}>編號</div>
      <div onClick={()=>{staticTableHeaderClickHandler('name', sortInfo)(dispatch)}}>姓名</div>
      <div onClick={()=>{staticTableHeaderClickHandler('number_voted', sortInfo)(dispatch)}}>獲得票權數</div>
      <div onClick={()=>{staticTableHeaderClickHandler('voted', sortInfo)(dispatch)}}>得票率(%)</div>
      <div onClick={()=>{staticTableHeaderClickHandler('rank', sortInfo)(dispatch)}}>名次</div>
      <div>備註</div>
    </div>
  </div>)
}

export default StaticTableHeader;
