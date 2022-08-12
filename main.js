const button = document.querySelector('button');
const lista = document.querySelector('ul');
let usuario = document.querySelector('input');

function makeRepositoryList(name) {
  const textResponse = document.createTextNode(name);
  const link = document.createElement('a');
  const li = document.createElement('li');
  link.target = '_blank';
  link.href = `https://github.com/${usuario.value}/${name}`;
  link.appendChild(textResponse);
  li.appendChild(link);

  return li;
}

function makeUser(avatar, user) {
  lista.innerHTML = '';
  const usuarioInfo = document.getElementById('user-info');
  const profileImage = document.createElement('img');
  const userName = document.createElement('h1');
  usuarioInfo.innerHTML = '';
  profileImage.src = avatar;
  userName.textContent = user;
  usuarioInfo.appendChild(profileImage);
  usuarioInfo.appendChild(userName);
}

async function fetchData(user) {
  if (user === '') return alert('O campo usuario está vazio');
  const githubData = await (
    await fetch(`https://api.github.com/users/${user}/repos`)
  ).json();

  return githubData;
}

const createList = (data) => {
  if (data.message) {
    alert(' Desculpe este usuario não existe :( ');
    document.location.reload();
  }
  makeUser(data[0].owner.avatar_url, data[0].owner.login);

  const repositories = data.map((repo) => {
    return makeRepositoryList(repo.name);
  });

  lista.replaceChildren(...repositories);
};

async function git() {
  createList(await fetchData(usuario.value));
}

// CHAMANDO A FUNÇÃO DE BUSCAR
window.onkeydown = (e) => {
  e.key === 'Enter' && git();
};

button.addEventListener('click', () => git());
