import { format } from 'react-string-format';

export async function get_all_member() {
  return await fetch(
    'http://localhost:5000/api/get_all_member'
  ).then(data => data.json())
}

export async function get_all_data() {
  return await fetch(
    'http://localhost:5000/api/get_all_data'
  ).then(data => data.json())
}

export async function get_meta() {
  return await fetch(
    'http://localhost:5000/api/get_meta'
  ).then(data => data.json())
}


export async function get_id_data(id) {
  let url = 'http://localhost:5000/api/get_id_data?id={0}';
  url = format(url, id);
  return await fetch(url).then(data => data.json())
}

export async function new_member(setter, name, contribution, comment) {
  let url = 'http://localhost:5000/api/new_member?name={0}&contribution={1}&comment={2}';
  url = format(url, name, contribution, comment);
  let status = await fetch(url).then(data => data.status);
  setter(status)
  return status;
}

export async function upload_member(setter, file) {
  const formData = new FormData();
  formData.append('File', file);

  let url = 'http://localhost:5000/api/upload_member';

  let status = await fetch(
    url,
    {
      method: 'POST',
      body: formData
    }
  ).then(data => data.status);
  setter(status)
  return status;
}

export async function update_member(setter, name, contribution, comment) {
  let url = 'http://localhost:5000/api/update_member_contribution?name={0}&contribution={1}&comment={2}';
  url = format(url, name, contribution, comment);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function update_meta(setter, key, value) {
  let url = 'http://localhost:5000/api/update_meta?key={0}&value={1}';
  url = format(url, key, value);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function delete_member(setter, name) {
  let url = 'http://localhost:5000/api/delete_member?name={0}';
  url = format(url, name);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function frash_table(setter, tablename) {
  let url = 'http://localhost:5000/api/frash_table?tablename={0}';
  url = format(url, tablename);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function update_data_vote(setter, name, round, value) {
  let url = 'http://localhost:5000/api/update_data_vote?name={0}&vote_round={1}&value={2}';
  url = format(url, name, round, value);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function get_vote_results() {
  return await fetch(
    'http://localhost:5000/api/get_vote_results'
  ).then(data => data.json())
}

export function get_upload_file_template() {
  // ref: https://stackoverflow.com/questions/51509970/download-file-in-react-client-from-flask-remote-server
  let url = 'http://localhost:5000/api/download_upload_member_template';

  fetch(url).then((response) => {
    console.log(response);
    // console.log(response.headers.get('Content-Disposition'));  not work
    let resType = response.headers.get('Content-Type');
    console.log(resType);
    let a = response.body.getReader();

    a.read().then(({ done, value }) => {
      // console.log(new TextDecoder("utf-8").decode(value));
      // saveAsFile(new TextDecoder("utf-8").decode(value), resType, 'template.xlsx');
      saveAsFile(value, resType, 'template.xlsx');
    });
  });


  function saveAsFile(text, type, filename) {
    // Step 1: Create the blob object with the text you received
    // const type = 'application/text'; // modify or get it from response
    const blob = new Blob([text], { type });

    // Step 2: Create Blob Object URL for that blob
    const url = URL.createObjectURL(blob);

    // Step 3: Trigger downloading the object using that URL
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click(); // triggering it manually
  }
}

// export async function reindex_database(setter) {
//   let url = 'http://localhost:5000/api/frash_table?tablename={0}';
//   url = format(url, 'member');
//   let member_status = await fetch(url).then(data => data.status);

//   url = 'http://localhost:5000/api/frash_table?tablename={0}';
//   url = format(url, 'data');
//   let data_status = await fetch(url).then(data => data.status);

//   let status = Promise.all([member_status, data_status]).then(status=>Math.max(...status));
//   setter(status);
//   return status;
// }

export async function clear_database(setter) {
  let url = 'http://localhost:5000/api/clear_database';
  let status = await fetch(url).then(data => data.status);
  setter(status)
  return status;
}

export function export_data_asfile() {
  // ref: https://stackoverflow.com/questions/51509970/download-file-in-react-client-from-flask-remote-server
  let url = 'http://localhost:5000/api/export_data';

  fetch(url).then((response) => {
    console.log(response);
    // console.log(response.headers.get('Content-Disposition'));  not work
    let resType = response.headers.get('Content-Type');
    console.log(resType);
    let a = response.body.getReader();

    a.read().then(({ done, value }) => {
      // console.log(new TextDecoder("big5").decode(value));
      // saveAsFile(new TextDecoder("utf-8").decode(value), resType, 'data.csv');
      saveAsFile(value, resType, 'data.xlsx');
    });
  });


  function saveAsFile(text, type, filename) {
    // Step 1: Create the blob object with the text you received
    // const type = 'application/text'; // modify or get it from response
    const blob = new Blob([text], { type });

    // Step 2: Create Blob Object URL for that blob
    const url = URL.createObjectURL(blob);

    // Step 3: Trigger downloading the object using that URL
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click(); // triggering it manually
  }
}

