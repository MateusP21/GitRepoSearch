async function git() {
  const usuario = document.querySelector("input").value;
  const lista = document.getElementById("lista");
  const usuarioInfo = document.getElementById("user-info");
  const ul = document.createElement("ul");
  const profileImage = document.createElement("img");
  const userName = document.createElement("h1");

  const response = await axios
    .get("https://api.github.com/users/" + usuario + "/repos")
    .catch((error) => {
      lista.innerHTML = "";
      const ul = document.createElement("ul");
      const li = document.createElement("li");
      const textError = document.createTextNode(
        "Desculpe este usuario não existe :( "
      );
      li.appendChild(textError);
      ul.appendChild(li);
      lista.appendChild(ul);
    });
  const data = response.data;
  data.map((item) => {
    usuarioInfo.innerHTML = "";
    profileImage.src = item.owner.avatar_url;
    userName.textContent = item.owner.login;
    usuarioInfo.appendChild(profileImage);
    usuarioInfo.appendChild(userName);
    return usuarioInfo;
  });

  for (repo in data) {
    lista.innerHTML = "";
    const textResponse = document.createTextNode(data[repo].name);
    const repoString = JSON.stringify(data[repo].name).replace(/"/g, "");
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = "https://github.com/" + usuario + "/" + repoString;
    link.appendChild(textResponse);
    const li = document.createElement("li");
    li.appendChild(link);
    ul.appendChild(li);
    lista.appendChild(ul);
  }
}

// CHAMANDO A FUNÇÃO DE BUSCAR
window.onkeydown = (e) => {
  e.key === "Enter" && git();
};
