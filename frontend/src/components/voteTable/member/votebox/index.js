import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatalistType } from '../../../../actionType/index.js'
import { update_data_vote } from "../../../../lib/api"

function handleChange(event, setter, dispatch, votedinfo, memberlist, voter, vote_n, status) {
  let votedlist = [
    votedinfo.vote_1_id,
    votedinfo.vote_2_id,
    votedinfo.vote_3_id,
    votedinfo.vote_4_id,
    votedinfo.vote_5_id,
    votedinfo.vote_6_id,
    votedinfo.vote_7_id,
  ];

  if (votedlist.some((value)=>value==event.target.value)) {
    alert("[Error] 重複投票，投票失敗!");
    return 1;
  }

  // update select value
  setter(event.target.value);

  // console.log(event);
  // take target member's information
  let target = {'id': 0, 'name':''};
  memberlist.forEach(value => {
    if (value.id===parseInt(event.target.value)) {
      target = value
    }
  });

  dispatch({'type': DatalistType.updateData, 'value': {
    'voter': voter,
    'vote_round': vote_n,
    'target_value': {
      'id': event.target.value,
      'name': target.name,
    },
  }})
  update_data_vote((e)=>{console.log(e)}, voter.name, vote_n, event.target.value)
}

function normalize_select_value(value) {
  if (value===null) {
    return 0;
  } else {
    return value;
  }
}

function VoteBox(props) {
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.MemberlistReducer.memberList.results);
  const dataList = useSelector(state => state.DatalistReducer.dataList.results);
  const [selectValue, setSelectValue] = useState(normalize_select_value(props.selectedmember.id));
  const votedinfo = dataList[props.info.ind]

  useEffect(()=>
    setSelectValue(normalize_select_value(props.selectedmember.id))
  ,[props]);

  return (
    <div>
      <select value={selectValue} onChange={(e) => handleChange(e, setSelectValue, dispatch, votedinfo, memberList, props.info.voter, props.info.round)}>
        <option value={-1} key={'option_default'}>選擇人員</option>
        {
          props.memberlist.map(function(member,ind){
            return <option value={member.id} key={'option_'+member.id+'_'+ind}>{ind+1}. {member.name}</option>
          })
        }
      </select>
    </div>
  )



  // if (props.selectedmember.id==null) {
  //   return (
  //     <div>
  //       <select onChange={(e) => handleChange(e, dispatch, memberList, props.info.voter, props.info.round)}>
  //         <option value={null} defaultValue key={'option_default'}>選擇人員</option>
  //         {
  //           props.memberlist.map(function(member, ind){
  //             return <option value={member.id} key={'option_'+member.id+'_'+ind}>{member.id}. {member.name}</option>
  //           })
  //         }
  //       </select>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       <select value={props.selectedmember.id} onChange={(e) => handleChange(e, dispatch, memberList, props.info.voter, props.info.round)}>
  //         <option value={null} key={'option_default'}>選擇人員</option>
  //         {
  //           props.memberlist.map(function(member,ind){
  //             return <option value={member.id} key={'option_'+member.id+'_'+ind}>{member.id}. {member.name}</option>
  //           })
  //         }
  //       </select>
  //     </div>
  //   )
  // }
}

export default VoteBox;

// props: {
//   info: {
//   ind: int,
//     voter: {
//       id: int,
//       name: str
//     },
//     round: int
//   },
//   selectedmember: {
//     id: int
//     name: string,
//   },
//   datalist: [],
//   memberlist: [],
// }

// memberlist = [
//   {
//     id: int
//     name: string,
//     weight: float
//   }
// ]