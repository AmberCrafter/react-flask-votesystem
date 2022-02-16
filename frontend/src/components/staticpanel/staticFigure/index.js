import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { sync_all_results } from './scripts';
import Plot from 'react-plotly.js'

function StaticFigure() {
  const dispatch = useDispatch();
  const staticList = useSelector(state => state.StaticlistReducer.staticList.results);

  // sync metadata with sql
  useEffect(()=>{
    sync_all_results()(dispatch);
  },[]);

  const values = staticList.map((member)=>member.voted);
  const labels = staticList.map((member)=>member.name);
  const config = {displayModeBar: false}

  return (
    <div className='static_container'>
        <Plot 
          data={[
            {
              values: values,
              labels: labels,
              type: 'pie',
              textinfo: "label+percent",
              textfont: {size: 20},
              insidetextorientation: "radial",
              showlegend: false
            },
          ]}
          layout={ {title: {text: '得票率', font: {size: 50}}, autosize: true, pad: 'center'} }
          style={{ width: "100%", height: "100%" }}
          config={config}
        />
    </div>
  )
}

export default StaticFigure;