const button = document.querySelector("button");

const lista = document.querySelector("ul");
async function git() {
  lista.innerHTML = "";
  const usuario = document.querySelector("input").value;
  const usuarioInfo = document.getElementById("user-info");

  const profileImage = document.createElement("img");
  const userName = document.createElement("h1");

  async function fetchData(user) {
    if (user === "") return alert("O campo usuario está vazio");
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const githubData = await response.json();
    return githubData;
  }

  const createList = (data) => {
    const text = document.createTextNode(
      "Desculpe este usuario não existe :( "
    );

    for (repo of data) {
      // informações do usuario
      usuarioInfo.innerHTML = "";
      profileImage.src = repo.owner.avatar_url;
      userName.textContent = repo.owner.login;
      usuarioInfo.appendChild(profileImage);
      usuarioInfo.appendChild(userName);
      // criando repositorios
      const textResponse = document.createTextNode(repo.name);
      const repoName = repo.name;
      const link = document.createElement("a");
      link.target = "_blank";
      link.href = `https://github.com/${usuario}/${repoName}`;
      link.appendChild(textResponse);
      const li = document.createElement("li");
      li.appendChild(link);
      lista.appendChild(li);
    }
  };

  createList(await fetchData(usuario));
}
// CHAMANDO A FUNÇÃO DE BUSCAR
window.onkeydown = (e) => {
  e.key === "Enter" && git();
};

button.addEventListener("click", () => git());
