function git() {
  var usuario = document.querySelector("input").value
  var lista = document.querySelector("#lista")
  axios.get("https://api.github.com/users/" + usuario + "/repos")

    .then(function (response) {
      var ul = document.createElement("ul")
      console.log(response)
      for (repo in response.data) {
        lista.innerHTML=''

        var textResponse = document.createTextNode(response.data[repo].name)
        var repoString = JSON.stringify(response.data[repo].name).replace(/"/g,'')
        var link = document.createElement("a")
        link.target="_blank"
        link.href=("https://github.com/" + usuario +"/"+ repoString )
        link.appendChild(textResponse)
        var li = document.createElement("li")
        li.appendChild(link)
        ul.appendChild(li)
        lista.appendChild(ul)
      }
    })

    .catch(function (error) {
      console.log(error)

      var ul = document.createElement("ul")
      var li = document.createElement("li")
      var textError = document.createTextNode("Desculpe este usuario não existe :( ")
      li.appendChild(textError)
      ul.appendChild(li)
      lista.appendChild(ul)

    })
}