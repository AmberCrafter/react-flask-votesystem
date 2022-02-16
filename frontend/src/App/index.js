import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VoteTable from '../components/voteTable'
import ControlPanel from '../components/controlpanel';
import StaticPanel from '../components/staticpanel';
import NavigationBar from '../components/navigationBar'
import {sync_all_member, sync_all_data} from './scripts.js'

function App() {
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.MemberlistReducer.memberList);
  const dataList = useSelector(state => state.DatalistReducer.dataList);
  const [page, setPage] = useState(<VoteTable/>);

  // sync metadata with sql
  useEffect(()=>{
    sync_all_data()(dispatch)
    sync_all_member()(dispatch)
  },[dispatch,page])

  return (
    <div>
      <NavigationBar setter={setPage} pages={{
        'votePage': <VoteTable/>,
        'controlPage': <ControlPanel />,
        'staticPage': <StaticPanel />
      }} />
      {page}
    </div>
  )
}

export default App;