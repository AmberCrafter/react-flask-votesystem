import './index.css'

function StaticTableMember(props) {
  return (<div>
    <div className='static_table_member'>
      <div>{props.index+1}</div>
      <div>{props.staticresult.name}</div>
      <div>{Math.floor(props.staticresult.number_voted*100000)/1000}</div>
      <div>{Math.floor(props.staticresult.voted*100000)/1000}</div>
      <div>{props.staticresult.rank}</div>
      <div></div>
    </div>
  </div>)
}

export default StaticTableMember;


// props: {
//   index: int,
//   staticresult: {
//     id: int,
//     name: String,
//     contribution: int,
//     number_voted: float,
//     ratio: float,
//     voted: float
//     rank: int,
//   }
// }