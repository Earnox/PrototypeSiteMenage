const GetData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbyAD4E6D4mX3sMR_sC23nmSwrR7AMNKEOLF2PH-azPdSWS3Ma5cAuvtTkTdbDwlZxN2Gg/exec";
  fetch(url).then((reponses) =>
    reponses.json().then((responses) => {
      const divTableauApp = document.getElementById("tableauNumeroapp");
      let table = document.createElement("table");
      let headerrow = document.createElement("tr");
      let headers = Object.keys(responses[0]); // get the key of only one object
      delete headers[6];
      let bagroundColorColum = [];

      headers.forEach((headertext) => {
        let textNodeHeader = document.createTextNode(headertext);
        let header = document.createElement("th");
        header.appendChild(textNodeHeader);
        headerrow.appendChild(header);
      });
      table.appendChild(headerrow);
      responses.forEach((response) => {
        let row = document.createElement("tr");
        row.id = "appt" + response.numeroApp;
        bagroundColorColum.push(response.colorBagroud);
        delete response.colorBagroud;
        Object.values(response).forEach((text) => {
          let cell = document.createElement("td");
          let textnode = document.createTextNode(text);
          let listStatut = [
            "occuper",
            "app en chauffe",
            "prêt",
            "prêt BCS",
            "libre/sale",
          ];
          let select = document.createElement("select");

          select.name = "status";

          // get if text is numb app then put the bagroud color
          if (text == response.numeroApp || text == response.typologie) {
            cell.classList = "t" + response.typologie;
          }
          // do a loop of the list statu to have value and text for drop down list

          // if statut in the loop then put the right class liste for color
          if (text == response.status) {
            let option;

            listStatut.forEach((statut) => {
              option = document.createElement("option");
              option.text = statut;
              select.appendChild(option);
            });
            if (text === "occupé") {
              option.classList = "occuper";
              select.classList = "occuper";
              option.setAttribute("selected", "");
              option.value = text;
              option.text = text;
            } else if (text == "app en chauffe") {
              select.classList = "app-en-chauffe";
              option.setAttribute("selected", "");
              option.text = text;
            } else if (text == "prêt") {
              select.classList = "pret";
              option.setAttribute("selected", "");
              option.text = text;
            } else if (text == "prêt BCS") {
              select.classList = "pret-bcs";
              option.setAttribute("selected", "");
              option.text = text;
            } else if (text == "libre/sale") {
              select.classList = "libre-sale";
              option.setAttribute("selected", "");
              option.text = text;
            }
            cell.appendChild(select);
            //console.log(table.rows.length);
          } else if (text.hasOwnProperty("commentaire")) {
            // console.log(text);
            let textareacom = document.createElement("textarea");
            textareacom.innerText = text;
            placeholder = "je suis un text";
            textareacom.setAttribute("placeholder", "test");
            cell.appendChild(textareacom);
          } else {
            cell.appendChild(textnode);
          }
          row.appendChild(cell);
          // console.log(response);
        });
        table.appendChild(row);
      });

      divTableauApp.appendChild(table);
    })
  );
};

document.getElementById("btn").addEventListener("click", GetData);

const postData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbzCEYJOzJug18AjxteAzrb1RATNHqv8aCLRNmafGwD026TTm6TuiqAKJ7bXrWVr5m7Yjw/exec";

  fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include", // include, *same-origin, omit
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({nom: "jhone"}),
  });
};
window.addEventListener("load", GetData);
document.getElementById("btn-post").addEventListener("click", postData);
