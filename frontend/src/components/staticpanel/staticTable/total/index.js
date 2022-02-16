import './index.css'

function StaticTableTotal(props) {
  console.log(props);
  return (<div>
    <div className='static_table_total'>
      <div>總人數</div>
      <div>{props.staticList.length}</div>
      <div></div>
      <div>總票權數</div>
      <div>{props.staticList.reduce((sum,value) => sum+value.number_voted, 0)}</div>
    </div>
  </div>)
}

export default StaticTableTotal;


// props: {
//   staticList: [{
//     contribution: float,
//     id: int,
//     name: string,
//     number_vote: float,
//     number_voted: float,
//     rank: int,
//     ratio: float,
//     voted: float,
//   }]
// }