import VoteBox from "./votebox";
import './index.css'
import { isEmpty } from "../../../lib/tool";
import {useSelector} from 'react-redux';

function MemberList() {
  const memberlist = useSelector(state => state.MemberlistReducer.memberList.results);
  const datalist = useSelector(state => state.DatalistReducer.dataList.results);
  
  return (
    <div className="vote_table_member_container">
      {memberlist.map(function(member,ind){
        if (isEmpty(datalist) | (ind+1>datalist.length)) {
          return <div className="vote_table_member_row" key={'table_row_'+ind}>
            <div className="vote_table_member_item" key={'table_cell_id_'+ind}>{member.id}</div>
            <div className="vote_table_member_item" key={'table_cell_name_'+ind}>{member.name}</div>
            <div className="vote_table_member_item" key={'table_cell_contribution_'+ind}>{member.contribution/10000}</div>
            <div className="vote_table_member_item" key={'table_cell_number_vote_'+ind}>{member.number_vote}</div>
            <div className="vote_table_member_item" key={'table_cell_vote1_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 1}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote2_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 2}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote3_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 3}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote4_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 4}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote5_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 5}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote6_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 6}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote7_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 7}} memberlist={memberlist} selectedmember={{id: -1, name: ''}}/>}</div>
          </div>
        } else {
          return <div className="vote_table_member_row" key={'table_row_'+ind}>
            <div className="vote_table_member_item" key={'table_cell_id_'+ind}>{member.id}</div>
            <div className="vote_table_member_item" key={'table_cell_name_'+ind}>{member.name}</div>
            <div className="vote_table_member_item" key={'table_cell_contribution_'+ind}>{member.contribution/10000}</div>
            <div className="vote_table_member_item" key={'table_cell_number_vote_'+ind}>{member.number_vote}</div>
            <div className="vote_table_member_item" key={'table_cell_vote1_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 1}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_1_id, name: datalist[ind].vote_1_name}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote2_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 2}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_2_id, name: datalist[ind].vote_2_name}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote3_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 3}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_3_id, name: datalist[ind].vote_3_name}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote4_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 4}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_4_id, name: datalist[ind].vote_4_name}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote5_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 5}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_5_id, name: datalist[ind].vote_5_name}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote6_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 6}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_6_id, name: datalist[ind].vote_6_name}}/>}</div>
            <div className="vote_table_member_item" key={'table_cell_vote7_'+ind}>{<VoteBox info={{ind: ind, voter: {id: member.id, name: member.name}, round: 7}} memberlist={memberlist} selectedmember={{id: datalist[ind].vote_7_id, name: datalist[ind].vote_7_name}}/>}</div>
          </div>
        }
      })}
    </div>
  );
}

export default MemberList;

// props = {
//   memberlist = [],
//   candidatelist = [],
//   data = []
// }


// memberlist = [
//   {
//     id: int
//     name: string,
//     weight: float
//   }
// ]

// data = [
//   {
//     id: int,
//     name: str,
//     weight: float,
//     vote_1_id: int,
//     vote_1_name: str,
//     vote_2_id: int,
//     vote_2_name: str,
//     vote_3_id: int,
//     vote_3_name: str,
//     vote_4_id: int,
//     vote_4_name: str,
//     vote_5_id: int,
//     vote_5_name: str,
//     vote_6_id: int,
//     vote_6_name: str,
//     vote_7_id: int,
//     vote_7_name: str,
//   }
// ]