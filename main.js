const GetData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycby9GV22oKinoCbdMRzqiLhWHKBtbh-3-Ghs9oMNDZ98-HVs33OksWwZU6bZSa5yzd7Z2w/exec";
  fetch(url).then((reponses) =>
    reponses.json().then((responses) => {
      const divTableauApp = document.getElementById("tableauNumeroapp");
      let table = document.createElement("table");
      let headerrow = document.createElement("tr");
      let thead = document.createElement("thead");
      let tBody = document.createElement("tbody");
      let headers = Object.keys(responses[0]); // get the key of only one object
      delete headers[6]; // delete the colum of baground colo
      let bagroundColorColum = [];
      // get an create a header row
      headers.forEach((headertext) => {
        let textNodeHeader = document.createTextNode(headertext);
        let header = document.createElement("th");
        header.classList = "table";
        header.appendChild(textNodeHeader);
        headerrow.appendChild(header);
      });
      thead.appendChild(headerrow);
      table.appendChild(thead);
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

            // textareacom.setAttribute("placeholder", "t");
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
        tBody.appendChild(row);
      });
      table.appendChild(tBody);
      divTableauApp.appendChild(table);
    })
  );
};

//document.getElementById("btn").addEventListener("click", GetData);

const asyncSendDATA = async function SenData(valueToSend) {
  const url =
    "https://script.google.com/macros/s/AKfycbx8GyMdIe077rPFgD4ibfNkoA-lGCr4Au5o3izsS-uZ08glwmfKI8m5MHsivGheTYZtTQ/exec";
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

  // if response is okay reload page to set the color
  if (data[0].status === 0) {
    // location.reload();
    // here to check if all is good in the response
  }
};

async function getChangeStatus(event) {
  let target = event.target;

  let valueEvent = event.target.value;

  let parentTarget = target.parentElement;
  // go back utile get the row of the event
  let rowEvent = parentTarget.parentElement;
  // get first col for id
  let appartement = rowEvent.firstChild.innerText;
  // get las col for the commente
  let commentaireTD = rowEvent.lastChild;

  // get the value of the cell
  let commentairetextarea = commentaireTD.lastChild;
  // get again the last chile of the td first is text ^^
  let commentairetextareavalue = commentairetextarea.value;

  // get first child of the row event
  let appartementTD = rowEvent.firstChild;
  // get the next td to get the statut
  let colStatut = appartementTD.nextSibling;
  // get the value of the cel statue
  let statut = colStatut.firstChild.value;

  //body to send of the value ligne edited
  const valueToSend = {
    id: appartement,
    status: statut,
    commentaire: commentairetextareavalue,
  };
  return asyncSendDATA(valueToSend);
}

const divtable = document.getElementById("tableauNumeroapp");

divtable.addEventListener("change", getChangeStatus);

window.addEventListener("load", GetData());
document.getElementById("btn-post").addEventListener("click", asyncSendDATA);
