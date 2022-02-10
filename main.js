const GetData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbyAD4E6D4mX3sMR_sC23nmSwrR7AMNKEOLF2PH-azPdSWS3Ma5cAuvtTkTdbDwlZxN2Gg/exec";
  fetch(url).then((reponses) =>
    reponses.json().then((responses) => {
      const divTableauApp = document.getElementById("tableauNumeroapp");
      let table = document.createElement("table");
      let headerrow = document.createElement("tr");

      let headers = Object.keys(responses[0]); // get the key of only one object
      delete headers[6]; // delete the colum of baground colo
      let bagroundColorColum = [];
      // get an create a header row
      headers.forEach((headertext) => {
        let textNodeHeader = document.createTextNode(headertext);
        let header = document.createElement("th");
        header.appendChild(textNodeHeader);
        headerrow.appendChild(header);
      });

      table.appendChild(headerrow);
      // do a new loop to get deeper in the array and get the text of the key's
      responses.forEach((response) => {
        // création d'un row puit metre l'id en fonction du numéro de l'appartement
        let row = document.createElement("tr");
        row.id = "appt" + response.numeroApp;
        bagroundColorColum.push(response.colorBagroud);
        delete response.colorBagroud;
        //
        //

        Object.values(response).forEach((text) => {
          let textnode = document.createTextNode(text);
          let listStatut = [
            "occupé",
            "app en chauffe",
            "prêt",
            "prêt BCS",
            "libre/sale",
          ];
          let cell = document.createElement("td");
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
          } else if (response.commentaire === text && text != "") {
            let textareacom = document.createElement("textarea");
            textareacom.innerText = response.commentaire;
            placeholder = "je suis un text";
            textareacom.setAttribute("placeholder", "test");
            cell.appendChild(textareacom);
          } else {
            cell.appendChild(textnode);
          }
          row.appendChild(cell);

          // console.log(response);
        });
        if (row.lastChild.innerText === "") {
          let noTextArea = document.createElement("textarea");
          row.lastChild.appendChild(noTextArea);
        }
        table.appendChild(row);
      });

      divTableauApp.appendChild(table);
    })
  );
};

//document.getElementById("btn").addEventListener("click", GetData);

const asyncSendDATA = async function SenData(valueToSend) {
  const url =
    "https://script.google.com/macros/s/AKfycbzIhWBADaxc-r91AbymHClDJTqG5uX1hRGkzQ61psy1OoJmB6d-WgiGfm4G0OIZukAsOQ/exec";
  let reponsefetch = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    // credentials: "include", // include, *same-origin, omit

    headers: {
      "Content-Type": "application/json", // before ;charset=utf-8  text/plain
    },

    //redirect: "follow",
    body: JSON.stringify(valueToSend),
  });
  // get the response in a array to be able to read
  let data = await [reponsefetch];
  console.log(data);
  // if response is okay reload page to set the color
  if (data[0].status === 0) {
    location.reload();
  }

  // if (reponsefetch) {
  //   console.log("gg tous est bon ");
  // }
};

function getChangeStatus(event) {
  let target = event.target;
  console.log(event.target);
  let valueEvent = event.target.value;
  let parentTarget = target.parentElement;
  // go back utile get the row of the event
  let rowEvent = parentTarget.parentElement;
  // get first col for id
  let appartement = rowEvent.firstChild.innerText;
  // get las col for the commente
  let commentaire = rowEvent.lastChild.firstChild;
  // get the value of the cell
  commentaire = commentaire.value;
  // get first child of the row event
  let appartementTD = rowEvent.firstChild;
  // get the next td to get the statut
  let colStatut = appartementTD.nextSibling;
  // get the value of the cel statue
  let statut = colStatut.firstChild.value;
  console.log(statut);

  //body to send of the value ligne edited
  const valueToSend = {
    id: appartement,
    status: statut,
    commentaire: commentaire,
  };
  return asyncSendDATA(valueToSend);
}

const divtable = document.getElementById("tableauNumeroapp");

divtable.addEventListener("change", getChangeStatus);

window.addEventListener("load", GetData());
document.getElementById("btn-post").addEventListener("click", asyncSendDATA);
