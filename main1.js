// ici nome toute les variables utiles (pour le scopes sinon des pb )
let tBody = document.createElement("tbody");
let table = document.getElementById("tableauNumeroapp");
let responseExt;
// Create dropt down list
const DropDownListStatus = () => {
  let listStatut = [
    "occupé",
    "app en chauffe",
    "prêt",
    "prêt BCS",
    "libre/sale",
  ];
  let select = document.createElement("select");

  listStatut.forEach((statut) => {
    let option = document.createElement("option");
    option.key = statut;
    option.value = statut;
    option.text = statut;
    // option.text = statut;
    // select.name = "statut";
    select.appendChild(option);
  });

  // console.log(select);
  return select;
};

const getDataAppart = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbxoguMqlooE-Sgucqc3f9CDfgseHlhtPBLhz4XeYGO-uAVN9Leentfo0MfMK4Bsb71Kgw/exec";
  fetch(url)
    .then((reponses) => {
      return reponses.json();
    })
    .then((reponses) => {
      responseExt = reponses;
      return reponses;
    })
    .then((reponses) => {
      let headers = Object.keys(reponses[0]).slice();
      let baground = delete headers[7];
      return headers;
    })
    .then((headers) => {
      let thead = document.createElement("thead");
      let trHeader = document.createElement("tr");
      headers.forEach((header) => {
        let th = document.createElement("th");
        th.innerkey = header;
        th.innerText = header;
        th.setAttribute("scope", "col");
        trHeader.appendChild(th);
        return th;
      });

      thead.appendChild(trHeader);
      table.appendChild(thead);
      return headers;
    })
    .then(() => {
      responseExt.forEach((infoappartement) => {
        let trbody = document.createElement("tr");
        for (const key in infoappartement) {
          if (key == "numeroApp") {
            let cell = document.createElement("td");
            cell.classList = "t" + infoappartement.typologie;
            cell.innerHTML = infoappartement[key];
            cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          }

          if (key == "status") {
            let listStatut = DropDownListStatus();
            let cell = document.createElement("td");

            //if (infoappartement[key] === "occupé") {
            if (infoappartement[key] === "occupé") {
              listStatut.classList = "occuper";
              listStatut.options[0].setAttribute("selected", true);
            } else if (infoappartement[key] == "app en chauffe") {
              listStatut.classList = "app-en-chauffe";
              listStatut.options[1].setAttribute("selected", true);
            } else if (infoappartement[key] == "prêt") {
              listStatut.classList = "pret";
              listStatut.options[2].setAttribute("selected", true);
            } else if (infoappartement[key] == "prêt BCS") {
              listStatut.classList = "pret-bcs";
              listStatut.options[3].setAttribute("selected", true);
            } else if (infoappartement[key] == "libre/sale") {
              listStatut.classList = "libre-sale";
              listStatut.options[4].setAttribute("selected", true);
            }
            listStatut.classList =
              "form-control form-control-lg " + listStatut.classList;
            cell.classList = "status d-flex align-items-center";
            cell.appendChild(listStatut);

            // console.log(DropDownListStatus());
            trbody.appendChild(cell);
            //  }
          }
          // numeroApp: 221, status: "prêt BCS", typologie: "2p4", arrive: "oui", depart: "oui", ck: "", commentaire: ""
          else if (key === "typologie") {
            let cell = document.createElement("td");
            cell.classList = "t" + infoappartement.typologie;
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "name") {
            let cell = document.createElement("td");
            cell.classList = "name";
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "arrive") {
            let cell = document.createElement("td");
            cell.classList = "arrive";
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "depart") {
            let cell = document.createElement("td");
            cell.classList = "depart";
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "depart") {
            let cell = document.createElement("td");
            cell.classList = "depart";
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "ck") {
            let cell = document.createElement("td");
            cell.classList = "ck";
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "commentaire") {
            let cell = document.createElement("td");
            let inputComent = document.createElement("input");
            inputComent.classList = " form-control form-control-lg";
            inputComent.type = "text";
            cell.classList = "commentaire";

            inputComent.value = infoappartement[key];
            cell.appendChild(inputComent);
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          }
          tBody.appendChild(trbody);
        }
        table.appendChild(tBody);
      });
    });
};

const asyncSendDATA = async function SenData(valueToSend) {
  const url =
    "https://script.google.com/macros/s/AKfycbxoguMqlooE-Sgucqc3f9CDfgseHlhtPBLhz4XeYGO-uAVN9Leentfo0MfMK4Bsb71Kgw/exec";
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
  })
    .then((reponsefetch) => {
      return reponsefetch;
    })
    .then(
      () => {
        console.log(reponses);
      }
      // get the response in a array to be able to read
      // let data = [reponsefetch];

      // // if response is okay reload page to set the color
      // if (data[0].status === 0) {
      //   // location.reload();
      //   // here to check if all is good in the response
      //   console.log([reponsefetch]);
      // }
    );
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

window.addEventListener("load", getDataAppart());
table.addEventListener("change", getChangeStatus);
