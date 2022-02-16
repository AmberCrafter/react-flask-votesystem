import { useState } from 'react';
import './index.css'
import NewMember from './selectContainer/NewMember';
import ModifiedMember from './selectContainer/ModifiedMember';
import MetaData from './selectContainer/MetaData';
import { useDispatch, useSelector } from 'react-redux';
// import {reindex_database, clear_database, export_data_asfile} from '../../lib/api.js';
import {clear_database, export_data_asfile} from '../../lib/api.js';
import { sync_all_data } from '../../App/scripts';

function statusHandler(func, dispatch) {
  func(()=>{}).then(
    (code) => {
      sync_all_data()(dispatch);
      if (code===200) {
        alert('Successful!')
      } else if (parseInt(code/100)===4) {
        alert('Client error!')
      } else if (parseInt(code/100)===5) {
        alert('Server error!')
      } else {
        alert('['+code+'] Not work!')
      };
    }
  );
}

// function reindexDatabaseHandler(func, dispatch) {
//   if (window.confirm("您確定要重新排序資料庫嗎?") === true) {
//     statusHandler(func, dispatch);
//     alert("資料庫重新排序流程進行中...請稍等!");
//   } else {
//     alert("已取消重新排序流程!");
//   }
// }

function clearDatabaseHandler(func, dispatch) {
  if (window.confirm("您確定要刪除資料庫嗎?") === true) {
    statusHandler(func, dispatch);
    alert("資料庫刪除流程進行中...請稍等!");
  } else {
    alert("已取消刪除流程!");
  }
}

function exportDataHandler() {
  export_data_asfile();
}

function ControlPanel() {
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.MemberlistReducer.memberList);

  const [page, setPage] = useState(<NewMember />);
  let barItem = [
    <button className='barItem' key={'new_member'} onClick={() => setPage(<NewMember />)}>新增人員</button>,
    <button className='barItem' key={'modified_member'} onClick={() => setPage(<ModifiedMember />)}>修改資訊</button>,
    <button className='barItem' key={'export_data'} onClick={() => exportDataHandler()}>匯出資料</button>,
    <button className='barItem' key={'meta_data'} onClick={() => setPage(<MetaData />)}>參數設定</button>,
    // <button className='barItem' key={'reindex_database'} onClick={() => reindexDatabaseHandler(reindex_database, dispatch)}>重新排序</button>,
    <button className='barItem' key={'clear_database'} onClick={() => clearDatabaseHandler(clear_database, dispatch)}>刪除資料庫</button>,
  ]

  return (
    <div>
      <div className="selectBar">
        {barItem.map((item) => item)}
      </div>
      {page}
    </div>
  )
}

export default ControlPanel;