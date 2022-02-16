import { format } from 'react-string-format';

// const root_path='http://localhost:5000';
const root_path='';

export async function get_all_member() {
  let url = "{0}/api/get_all_member";
  url = format(url, root_path);
  return await fetch(
    url
  ).then(data => data.json())
}

export async function get_all_data() {
  let url = "{0}/api/get_all_data";
  url = format(url, root_path);
  return await fetch(
    url
  ).then(data => data.json())
}

export async function get_meta() {
  let url = "{0}/api/get_meta";
  url = format(url, root_path);
  return await fetch(
    url
  ).then(data => data.json())
}


export async function get_id_data(id) {
  let url = "{0}/api/get_id_data?id={1}";
  url = format(url, root_path, id);
  return await fetch(url).then(data => data.json())
}

export async function new_member(setter, name, contribution, comment) {
  let url = '{0}/api/new_member?name={1}&contribution={2}&comment={3}';
  url = format(url, root_path, name, contribution, comment);
  let status = await fetch(url).then(data => data.status);
  setter(status)
  return status;
}

export async function upload_member(setter, file) {
  const formData = new FormData();
  formData.append('File', file);

  let url = '{0}/api/upload_member';
  url = format(url, root_path);

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
  let url = '{0}/api/update_member_contribution?name={1}&contribution={2}&comment={3}';
  url = format(url, root_path, name, contribution, comment);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function update_meta(setter, key, value) {
  let url = '{0}/api/update_meta?key={1}&value={2}';
  url = format(url, root_path, key, value);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function delete_member(setter, name) {
  let url = '{0}/api/delete_member?name={1}';
  url = format(url, root_path, name);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function frash_table(setter, tablename) {
  let url = '{0}/api/frash_table?tablename={1}';
  url = format(url, root_path, tablename);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function update_data_vote(setter, name, round, value) {
  let url = '{0}/api/update_data_vote?name={1}&vote_round={2}&value={3}';
  url = format(url, root_path, name, round, value);
  let status = await fetch(url).then(data => data.status);
  setter(status);
  return status;
}

export async function get_vote_results() {
  let url = '{0}/api/get_vote_results';
  url = format(url, root_path);
  return await fetch(
    url
  ).then(data => data.json())
}

export function get_upload_file_template() {
  // ref: https://stackoverflow.com/questions/51509970/download-file-in-react-client-from-flask-remote-server
  let url = '{0}/api/download_upload_member_template';
  url = format(url, root_path);

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
  let url = '{0}/api/clear_database';
  url = format(url, root_path);
  let status = await fetch(url).then(data => data.status);
  setter(status)
  return status;
}

export function export_data_asfile() {
  // ref: https://stackoverflow.com/questions/51509970/download-file-in-react-client-from-flask-remote-server
  let url = '{0}/api/export_data';
  url = format(url, root_path);

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

