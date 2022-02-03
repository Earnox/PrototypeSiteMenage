const GetData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbyAD4E6D4mX3sMR_sC23nmSwrR7AMNKEOLF2PH-azPdSWS3Ma5cAuvtTkTdbDwlZxN2Gg/exec";
  fetch(url).then((reponses) =>
    reponses.json().then((responses) => {
      const divTableauApp = document.getElementById("tableauNumeroapp");
      let table = document.createElement("table");
      let headerrow = document.createElement("tr");
      let headers = Object.keys(responses[0]);
      delete headers[6];
      let bagroundColorColum = [];
      //console.log(Object.keys(responses[0]));

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
        // console.log(bagroundColorColum);
        delete response.colorBagroud;

        Object.values(response).forEach((text) => {
          // console.log(response);
          let cell = document.createElement("td");
          let textnode = document.createTextNode(text);
          console.log("ici log text    " + text);
          console.log("ici rps status    " + response.status);
          // get if text is numb app then put the bagroud color
          if (text == response.numeroApp) {
            cell.classList = "t" + response.typologie;
          }
          if (text == response.status) {
            // switch (text) {
            //   case text == "occupé":
            //     cell.classList = "occuper";
            //     break;
            //   case text == "app en chauffe":
            //     cell.classList = "app-en-chauffe";
            //     break;
            //   case text == "prêt":
            //     cell.classList = "pret";
            //     break;
            //   case text == "prêt BCS":
            //     cell.classList = "pret-bcs";

            //   case text == "libre/sale":
            //     cell.classList = "libre-sale";
            // }
            if (text == "occupé") {
              cell.classList = "occuper";
            } else if (text == "app en chauffe") {
              cell.classList = "app-en-chauffe";
            } else if (text == "prêt") {
              cell.classList = "pret";
            } else if (text == "prêt BCS") {
              cell.classList = "pret-bcs";
            } else if (text == "libre/sale") {
              cell.classList = "libre-sale";
            }
          }

          cell.appendChild(textnode);
          row.appendChild(cell);
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
document.getElementById("btn-post").addEventListener("click", postData);
