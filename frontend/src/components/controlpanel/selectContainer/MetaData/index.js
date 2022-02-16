import './index.css'
import {update_meta, frash_table} from '../../../../lib/api'
import { sync_all_meta } from '../../../../App/scripts';
import { useEffect } from 'react';
import { useDispatch, useSelector }from 'react-redux';
import MetaCard from './metaCard';

function MetaData() {
  const dispatch = useDispatch();
  const metadata = useSelector(state => state.MetadataReducer.metadata.results);

  useEffect(()=>{
    sync_all_meta()(dispatch);
  },[])

  return (
    <div className='meta_container'>
      {/* {Object.keys(metadata).map((key)=>{
        return <MetaCard key={'card'+key} database_key={key} header={key} body={metadata[key]}/>
      })} */}
      <MetaCard database_key={'converter'} header={'票權基數'} body={metadata['converter']}/>
    </div>
  )
}

export default MetaData;