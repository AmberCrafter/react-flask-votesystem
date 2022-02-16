import { useState } from 'react';
// import './index.css'
import StaticTable from './staticTable';
import StaticFigure from './staticFigure';
import { useSelector } from 'react-redux';

function StaticPanel() {
  const [page, setPage] = useState(<StaticTable />);
  let barItem = [
    <button className='barItem' key={'static_table'} onClick={() => setPage(<StaticTable />)}>統計表格</button>,
    <button className='barItem' key={'static_figure'} onClick={() => setPage(<StaticFigure />)}>統計圖</button>,
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

export default StaticPanel;