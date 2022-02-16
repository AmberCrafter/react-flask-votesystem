import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { get_id_data, update_member, delete_member } from '../../../../lib/api';
import { sync_all_member } from '../../../../App/scripts';

function modifierSelectorHandler(event, setter) {
  get_id_data(event.target.value).then(data=>{
    let item = data.results[0];
    setter({
      id: item.id,
      name: item.name,
      contribution: item.contribution,
      comment: item.comment,
      vote_1: item.vote_1_name,
      vote_2: item.vote_2_name,
      vote_3: item.vote_3_name,
      vote_4: item.vote_4_name,
      vote_5: item.vote_5_name,
      vote_6: item.vote_6_name,
      vote_7: item.vote_7_name,
    })
  });
}

function modifierDeleteHandler(event, dispatch, memberInfo, setter) {
  delete_member((code)=>{
    if (code===200) {
      alert('Successful!');
      sync_all_member()(dispatch);
    } else {
      alert('['+code+'] Failed!');
    }
  }, memberInfo.name);
  setter({
    id: '',
    name: '',
    contribution: 0,
    comment: '',
    vote_1: '',
    vote_2: '',
    vote_3: '',
    vote_4: '',
    vote_5: '',
    vote_6: '',
    vote_7: '',
  });
}

function modifierSubmitHandler(event, memberInfo) {
  update_member((code)=>{
    if (code===200) {
      alert('Successful!');
    } else {
      alert('['+code+'] Failed!');
    }
  }, memberInfo.name, memberInfo.contribution, memberInfo.comment)
}

function ModifiedMember() {
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.MemberlistReducer.memberList.results);

  const [memberInfo, setMemberInfo] = useState({
    id: '',
    name: '',
    contribution: 0,
    comment: '',
    vote_1: '',
    vote_2: '',
    vote_3: '',
    vote_4: '',
    vote_5: '',
    vote_6: '',
    vote_7: '',
  });

  return (
    <div className='modified_member_container'>
      <div className='modified_member_selectdiv'>
        <select className='modified_member_selectdiv_selecter' onChange={(e)=>modifierSelectorHandler(e,setMemberInfo)}>
          <option value={-1}>請選擇人員</option>
          {memberList.map((member, ind) => {
            return <option value={member.id} key={'modified_member_selectdiv_selecter_' + ind}>{ind+1}. {member.name}</option>
          })}
        </select>
        <div className='modified_member_buttondiv'>
          <button className='modified_member_button_delete' onClick={(e)=>modifierDeleteHandler(e, dispatch, memberInfo, setMemberInfo)}>刪除</button>
          <button className='modified_member_button_submit' onClick={(e)=>modifierSubmitHandler(e,memberInfo)}>確認</button>
        </div>
      </div>
      
      <hr />
      <div className='modified_member_info_container'>
        <div className='modified_member_info_name'>
          姓名: {memberInfo.name}
        </div>
        <div className='modified_member_info_contribution'>
          出資額:
          <input
            type={'text'}
            className='modified_member_info_contribution_input'
            value={memberInfo.contribution}
            onChange={(e)=>setMemberInfo({...memberInfo,'contribution': e.target.value})}
          />
        </div>
        <div className='modified_member_info_comment'>
          備註:
          <input
            type={'text'}
            className='modified_member_info_comment_input'
            value={memberInfo.comment}
            onChange={(e)=>setMemberInfo({...memberInfo,'comment': e.target.value})}
          />
        </div><br />
        <div className='modified_member_info_vote'>
          <div className='modified_member_info_vote_title'>投票資訊:</div>
          <div className='modified_member_info_vote_value_container'>
            <div className='modified_member_info_vote_value'>選擇1: {memberInfo.vote_1}</div>
            <div className='modified_member_info_vote_value'>選擇2: {memberInfo.vote_2}</div>
            <div className='modified_member_info_vote_value'>選擇3: {memberInfo.vote_3}</div>
            <div className='modified_member_info_vote_value'>選擇4: {memberInfo.vote_4}</div>
            <div className='modified_member_info_vote_value'>選擇5: {memberInfo.vote_5}</div>
            <div className='modified_member_info_vote_value'>選擇6: {memberInfo.vote_6}</div>
            <div className='modified_member_info_vote_value'>選擇7: {memberInfo.vote_7}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ModifiedMember;