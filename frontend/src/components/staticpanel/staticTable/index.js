import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import StaticTableHeader from './header';
import StaticTableMember from './member';
import { sync_all_results } from './scripts';

function sortStaticlist(info) {
  if (info.target===null) {return (a,b)=>{return 0;}};
  if ((info.target!=='name') & (info.target!=='comment')) {
    if (info.asc===true){
      return (a,b) => {return a[info.target]-b[info.target]};
    } else {
      return (a,b) => {return b[info.target]-a[info.target]};
    }
  } else {
    if (info.asc===true){
      return (a,b)=>{
        if (a[info.target]>b[info.target]) {
          return 1;
        } else if (a[info.target]===b[info.target]) {
          return 0;
        } else if (a[info.target]<b[info.target]) {
          return -1;
        } else {
          console.log('[Error]: Sort function -- cmp function error.')
        }
      }
    } else {
      return (a,b)=>{
        if (a[info.target]>b[info.target]) {
          return -1;
        } else if (a[info.target]===b[info.target]) {
          return 0;
        } else if (a[info.target]<b[info.target]) {
          return 1;
        } else {
          console.log('[Error]: Sort function -- cmp function error.')
        }
      }
    }
  }
}

function StaticTable() {
  const dispatch = useDispatch();
  const staticList = useSelector(state => state.StaticlistReducer.staticList.results);
  const sortInfo = useSelector(state => state.StaticlistReducer.staticList.meta);

  // sync metadata with sql
  useEffect(()=>{
    sync_all_results()(dispatch);
  },[]);

  return (
    <div className='static_container'>
      <div className='static_table_container'>
        <StaticTableHeader />
        <div className='static_table_member_container'>
          {/* {staticList.map((staticresult, index)=>{return <StaticTableMember key={'static_member_'+index} staticresult={staticresult}/>;})} */}
          {staticList.sort(sortStaticlist(sortInfo)).map((staticresult, index)=>{return <StaticTableMember key={'static_member_'+index} index={index} staticresult={staticresult}/>;})}
        </div>
      </div>
    </div>
  )
}

export default StaticTable;