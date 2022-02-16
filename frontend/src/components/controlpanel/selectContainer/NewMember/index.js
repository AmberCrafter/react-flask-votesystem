import './index.css'
import {new_member, upload_member, get_upload_file_template} from '../../../../lib/api'
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { sync_all_data } from '../../../../App/scripts';

function uploadinputChangeHandler(event, setSelectedFile, setIsFilePicked) {
  setSelectedFile(event.target.files[0]);
  setIsFilePicked(true);
}

function NewMember() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(-1);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0.0);
  const [comment, setComment] = useState('');

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  return (
    <div className='new_member_container'>
      <div className="new_member_item">
        <div className="new_member_item_name">人員名稱:</div>
        <input type={'text'} className='new_member_item_input' value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="new_member_item">
        <div className="new_member_item_name">出資額:</div>
        <input type={'text'} className='new_member_item_input' value={weight} onChange={(e)=>setWeight(e.target.value)}/>
      </div>
      <div className="new_member_item">
        <div className="new_member_item_name">備註:</div>
        <input type={'text'} className='new_member_item_input' value={comment} onChange={(e)=>setComment(e.target.value)}/>
      </div>
      <div className="new_member_submit">
        <input 
          type={'submit'} 
          className="new_member_submit_input" 
          value={'Submit'} 
          onClick={()=>{
            new_member(setStatus,name,weight,comment).then(
              (code) => {
                sync_all_data()(dispatch);
                if (code===200) {
                  alert('Successful!')
                } else if (parseInt(code/100)===4) {
                  alert('Client error!')
                } else if (parseInt(code/100)===5) {
                  alert('Server error!')
                } else {
                  alert('['+code+'] Not work!')
                };
              }
            );
          }}
        />
      </div><hr/>
      <div className='upload_file_container'>
        <div className='upload_file_template'>
          <button className='upload_file_template_button' onClick={()=>get_upload_file_template()}>下載模板</button>
        </div>
        {/* ref: https://www.pluralsight.com/guides/uploading-files-with-reactjs */}
        <input 
          id='upload_file_member' 
          type={'file'} 
          name='member'
          className='upload_file_member_input'
          onChange={(e)=>uploadinputChangeHandler(e, setSelectedFile, setIsFilePicked)}
        />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (<p>Select a file to show details</p>)}
        <div className="upload_member_submit">
          <input 
            type={'submit'} 
            className="upload_member_submit_input" 
            value={'Upload'} 
            onClick={()=>{
              upload_member(setStatus,selectedFile).then(
                (code) => {
                  sync_all_data()(dispatch);
                  if (code===200) {
                    alert('Successful!')
                  } else if (parseInt(code/100)===4) {
                    alert('Client error!')
                  } else if (parseInt(code/100)===5) {
                    alert('Server error!')
                  } else {
                    alert('['+code+'] Not work!')
                  };
                }
              );
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NewMember;