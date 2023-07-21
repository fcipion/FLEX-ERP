// const url = "http://localhost:4201/api";
const url = "https://api.integra3d.com/api";
// const url = 'http://integra3dapp-alexander.ddns.net/api';

const Post = () => {};

const Get = () => {};

const Put = () => {};

const DeleteData = () => {};

const PostLogin = (usuario, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", usuario);
  urlencoded.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  const datos = fetch(`${url}/login_admin`, requestOptions)
    .then((response) => response.json())
    .then((result) => result);

  return datos.then((result) => result);

  // return fetch(`${url}/login_admin`, requestOptions).then((response) => {
  //     response.json().then((result) => result);
  // });
};

export { Post, Get, Put, DeleteData, PostLogin, url };
