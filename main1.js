// ici nome toute les variables utiles (pour le scopes sinon des pb )

let tBody = document.createElement("tbody");
let table = document.getElementById("tableauNumeroapp");
let thEdit = document.createElement("th");

const queryS = (selecteur) => {
  return document.querySelector(selecteur);
};
const querySall = (selecteur) => {
  return document.querySelectorAll(selecteur);
};

const smallDevice = window.matchMedia("(min-width: 576px)");
thEdit.classList = "thEditMenage";
let responseExt;
// Create dropt down list
function handleDeviceChangeGouvernace(e) {
  if (e.matches) {
    console.log("big devise");
    document.querySelector("header").classList = "container-fluide sticky-top";
  } else {
    let rowsGouv = document.querySelectorAll(".trGouvernance");
    document.querySelector("header").classList = "container-fluide";
    rowsGouv.forEach((row) => {
      row.addEventListener("click", setModalSmalScreen);
    });
  }
}
const DropDownListStatus = () => {
  let listStatut = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];
  let select = document.createElement("select");
  select.classList = "selectStatut";
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
    "https://script.google.com/macros/s/AKfycby0Wn8zAfWuV6452DEE60lXDmm24QYb78WPViknHcAvmNiTSvq5x1AwxzqPAeP6xMbj/exec";

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
      // test delete typo
      // let typo = delete headers[2];
      let baground = delete headers[7];
      return headers;
    })
    .then((headers) => {
      let thead = document.createElement("thead");
      let trHeader = document.createElement("tr");
      headers.forEach((header) => {
        let th = document.createElement("th");
        if (header === "numeroApp") {
          th.innerText = "#";
          th.setAttribute("scope", "col");
          trHeader.appendChild(th);
        } else {
          th.innerkey = header;
          th.innerkey = header;
          th.innerText = header;
          th.classList = header;
          // th.classList = th.classList + "col-lg";
          th.setAttribute("scope", "col");
          trHeader.appendChild(th);
        }
        trHeader.appendChild(thEdit);
        return th;
      });
      thead.classList = "thead-light";
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
            cell.classList =
              "t" + infoappartement.typologie + " numeroApp align-middle";
            if (infoappartement[key] === 18) {
              cell.id = "premier";
            } else if (infoappartement[key] === 124) {
              cell.id = "deuxieme";
            }
            cell.innerHTML = infoappartement[key];

            cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          }

          if (key == "status") {
            let listStatut = DropDownListStatus();
            let cell = document.createElement("td");

            //if (infoappartement[key] === "occupé") {
            if (infoappartement[key] === "occupé") {
              listStatut.classList = "occuper ";
              listStatut.options[0].setAttribute("selected", true);
            } else if (infoappartement[key] == "app en chauffe") {
              listStatut.classList = "app-en-chauffe";
              listStatut.options[1].setAttribute("selected", true);
            } else if (infoappartement[key] == "prêt") {
              listStatut.classList = "pret";
              listStatut.options[2].setAttribute("selected", true);
            } else if (infoappartement[key] == "BCS") {
              listStatut.classList = "bcs";
              listStatut.options[3].setAttribute("selected", true);
            } else if (infoappartement[key] == "libre/sale") {
              listStatut.classList = "libre-sale";
              listStatut.options[4].setAttribute("selected", true);
            }

            listStatut.classList =
              "form-control form-control-lg selectStatut " +
              listStatut.classList;
            cell.classList = "status align-items-center";
            cell.appendChild(listStatut);

            // console.log(DropDownListStatus());
            trbody.appendChild(cell);
            //  }
          }
          // numeroApp: 221, status: "prêt BCS", typologie: "2p4", arrive: "oui", depart: "oui", ck: "", commentaire: ""

          ///// comentaire typologie pour test
          else if (key === "typologie") {
            let cell = document.createElement("td");
            cell.classList =
              " align-middle typologie ty" + infoappartement.typologie;
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "name") {
            let cell = document.createElement("td");
            cell.classList = "name align-middle";
            cell.innerHTML = infoappartement[key];
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "arrive") {
            let cell = document.createElement("td");
            if (infoappartement[key] === "oui") {
              // add incon of boostrap
              cell.classList = "arrive align-middle bi-box-arrow-in-right";
              cell.value = "oui";
            } else {
              cell.classList = "arrive align-middle ";
            }

            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "depart") {
            let cell = document.createElement("td");
            if (infoappartement[key] === "oui") {
              cell.classList = "depart align-middle bi bi-box-arrow-right";
              cell.value = "oui";
            } else {
              cell.classList = "depart align-middle ";
            }
            //
            // cell.innerHTML = ;
            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          }
          // else if (key === "depart") {
          //   let cell = document.createElement("td");
          //   cell.classList = "depart align-middle";
          //   cell.innerHTML = infoappartement[key];
          //   // cell.setAttribute("scope", "row");
          //   trbody.appendChild(cell);
          // }
          else if (key === "ck") {
            let cell = document.createElement("td");
            if (infoappartement[key] === "oui") {
              cell.classList = "ck align-middle bi bi-key-fill";
              cell.value = "oui";
            } else {
              cell.classList = "ck align-middle ";
            }
            //
            // cell.innerHTML =

            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
          } else if (key === "commentaire") {
            let cell = document.createElement("td");
            // let inputComent = document.createElement("input");
            // inputComent.classList =
            //   " form-control form-control-lg align-middle";
            // inputComent.type = "text";
            cell.classList = "commentaire align-middle";
            cell.innerHTML = infoappartement[key];

            // cell.setAttribute("scope", "row");
            trbody.appendChild(cell);
            let btn = document.createElement("button");
            btn.classList =
              "btn btn-primary btn-sm btn-test-Modal edit bi bi-pencil-square";
            // btn.innerText = "Edit";
            btn.setAttribute("type", "button");
            btn.setAttribute("data-toggle", "modal");
            btn.setAttribute("data-target", "#exampleModal");
            let cellBtn = document.createElement("td");
            cellBtn.classList = "align-middle tdEditGouv";
            cellBtn.appendChild(btn);
            trbody.appendChild(cellBtn);
          }
          //// ici comment btn

          // createbtn();
        }
        trbody.classList = "trGouvernance";
        tBody.appendChild(trbody);

        table.appendChild(tBody);
      });
      document.querySelectorAll(".edit").forEach((item) => {
        item.addEventListener("click", (event) => {
          setModal(event);
        });
      });
    })
    .then(() => {
      getAppsStatutOneLoad();
    })
    .then((reponses) => {
      handleDeviceChangeGouvernace(smallDevice);
    });
};

// const asyncSendDATA = async
function SenData(valueToSend) {
  let spiner = document.getElementById("spinerHeader");
  spiner.classList = "spinner-border";
  const url =
    "https://script.google.com/macros/s/AKfycbxlL-y_XcTtmCX8AK4YIkKxN5s7Y9-HJLggorsn1ngI1cwCBFkb7f3ivje028EJSoe1/exec";

  fetch(url, {
    method: "POST",

    mode: "no-cors",

    cache: "no-cache",
    credentials: "same-origin", // include, *same-origin, omit

    headers: {
      "Content-Type": "application/json", // before ;charset=utf-8  text/plain
    },

    //redirect: "follow",
    body: JSON.stringify(valueToSend),
  })
    // .then((reponsefetch) => {
    //   reponsefetch = reponsefetch.json();
    .catch((erreur) => {
      console.log(erreur);
    })
    .then(
      (response) => {
        if (response.status == 0) {
          spiner.classList = "spinner-border d-none";
          // if()

          if (
            document.getElementById("exampleModal").classList.contains("show")
          ) {
            location.reload();
            // $("#exampleModal").modal("hide");
          }
        }
      }

      // })

      // get the response in a array to be able to read
      //

      // // if response is okay reload page to set the color
      // if (data[0].status === 0) {
      //   //
      //   // here to check if all is good in the response
      //   console.log([reponsefetch]);
      //
    )
    .then();
}
// get the element to send to the google sheet
async function getChangeStatus(event) {
  let target = event.target;

  let valueEvent = event.target.value;

  let parentTarget = target.parentElement;
  // go back utile get the row of the event
  let rowEvent = parentTarget.parentElement;
  // get first col for id
  let appartement = rowEvent.firstChild.innerText;
  // get las col for the commente

  let commentaireTD = rowEvent.querySelector(".commentaire");

  // get the value of the cell
  // let commentairetextarea = commentaireTD.lastChild;
  // get again the last chile of the td first is text ^^
  let commentairetextareavalue = commentaireTD.innerText;

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
  return SenData(valueToSend);
}

// funtion to change the colot of the column statut changed
// befor form-control form-control-lg selectStatut pret
// after occuper form-control form-control-lg
const changeColorStatut = (e) => {
  let tdStatut = table.getElementsByClassName("status")[0];
  // console.log(tdStatut);
  let listStatut = DropDownListStatus();
  let classtdStatut = tdStatut.classList;
  // console.log(e.target.parentElement);
  // console.log(tdStatut);
  let eventTarget = e.target;
  let eventTargetValue = eventTarget.value;

  if (eventTargetValue === "occupé") {
    // console.log(eventTargetValue);

    // console.log("event class : " + eventTarget.classList);
    eventTarget.classList = "form-control form-control-lg occuper selectStatut";
    // eventTarget.options[0].setAttribute("selected", true);
    // console.log("event class : " + eventTarget.classList);
    // console.log("on est dans occ");
  } else if (eventTargetValue == "app en chauffe") {
    eventTarget.classList =
      "form-control form-control-lg app-en-chauffe selectStatut";
    // eventTarget.options[1].setAttribute("selected", true);
  } else if (eventTargetValue == "prêt") {
    eventTarget.classList = "pret  form-control form-control-lg selectStatut";
    //eventTarget.options[2].setAttribute("selected", true);
  } else if (eventTargetValue == "BCS") {
    eventTarget.classList = "bcs  form-control form-control-lg selectStatut";
    //eventTarget.options[3].setAttribute("selected", true);
  } else if (eventTargetValue == "libre/sale") {
    eventTarget.classList =
      "libre-sale form-control form-control-lg selectStatut";
  }
};

function setModal(event) {
  let headerModal = document.getElementById("headermodal");
  let modalBody = document.getElementById("modalBody");
  let tdStatut = document.getElementById("modal-td-status");
  tdStatut.classList = "align-middle";
  let tdtypo = document.getElementById("modal-td-typo");
  let tdname = document.getElementById("modal-td-name");
  let tdarrive = document.getElementById("modal-td-arrive");
  let tddepart = document.getElementById("modal-td-depart");
  let tdck = document.getElementById("modal-td-ck");
  let textAreaCommentaire = document.getElementById("modal-commentaire-text");
  // modifier le parent
  let target = event.target;
  let valueEvent = event.target.value;
  let parentTarget = target.parentElement.parentElement;

  let appartement = parentTarget.firstChild.innerText;
  let status = parentTarget.firstChild.nextSibling.firstChild.value;
  let status2 = parentTarget.querySelector(".depart").classList;

  headerModal.innerText = appartement;

  tdStatut.innerText = status;
  // typologie
  tdtypo.innerText = parentTarget.querySelector(".typologie").innerText;
  //name
  tdname.innerText = parentTarget.querySelector(".name").innerText;

  // arrive
  // tdarrive.innerText = parentTarget.querySelector(".arrive").innerText;
  tdarrive.classList = parentTarget.querySelector(".arrive").classList;
  //depart
  // tddepart.innerText = parentTarget.querySelector(".depart").innerText;
  tddepart.classList = parentTarget.querySelector(".depart").classList;
  console.log(tddepart);
  //ck
  // tdck.innerText = parentTarget.querySelector(".ck").innerText;
  tdck.classList = parentTarget.querySelector(".ck").classList;
  //commentaire

  textAreaCommentaire.value =
    parentTarget.querySelector(".commentaire").innerText;

  $("#myModal").modal("handleUpdate");
  $("#myModal").modal("show");
}
function setModalSmalScreen(event) {
  let headerModal = document.getElementById("headermodal");
  let modalBody = document.getElementById("modalBody");
  let tdStatut = document.getElementById("modal-td-status");
  tdStatut.classList = "align-middle";
  let tdtypo = document.getElementById("modal-td-typo");
  let tdname = document.getElementById("modal-td-name");
  let tdarrive = document.getElementById("modal-td-arrive");
  let tddepart = document.getElementById("modal-td-depart");
  let tdck = document.getElementById("modal-td-ck");
  let textAreaCommentaire = document.getElementById("modal-commentaire-text");
  // modifier le parent
  let target = event.target;
  let valueEvent = event.target.value;
  let parentTarget = target.parentElement;

  let appartement = parentTarget.querySelector(".numeroApp ").innerHTML;
  let status = parentTarget.querySelector(".selectStatut").value;
  let status2 = parentTarget.querySelector(".depart").classList;

  headerModal.innerText = appartement;

  tdStatut.innerText = status;
  // typologie
  tdtypo.innerText = parentTarget.querySelector(".typologie").innerHTML;
  //name
  tdname.innerText = parentTarget.querySelector(".name").innerHTML;

  // arrive
  // tdarrive.innerText = parentTarget.querySelector(".arrive").innerText;
  tdarrive.classList = parentTarget.querySelector(".arrive").classList;
  //depart
  // tddepart.innerText = parentTarget.querySelector(".depart").innerText;
  tddepart.classList = parentTarget.querySelector(".depart").classList;
  //ck
  // tdck.innerText = parentTarget.querySelector(".ck").innerText;
  tdck.classList = parentTarget.querySelector(".ck").classList;
  //commentaire

  textAreaCommentaire.value =
    parentTarget.querySelector(".commentaire ").innerHTML;
  console.log("ttteee");
  $("#exampleModal").modal("handleUpdate");
  $("#exampleModal").modal("show");
}
function SendValueModal() {
  let headerModal = document.getElementById("headermodal");
  let tdStatut = document.getElementById("modal-td-status");
  let textAreaCommentaire = document.getElementById("modal-commentaire-text");
  let appartement = headerModal.innerText;
  let statut = tdStatut.innerText;
  let commentairetextareavalue = textAreaCommentaire.value;

  const valueToSend = {
    id: appartement,
    status: statut,
    commentaire: commentairetextareavalue,
  };

  return SenData(valueToSend);
}
const findAppartementTypo = (listtypo, statutRechercher) => {
  let div = document.createElement("div");
  let nbTypo = listtypo.filter((x) => x === statutRechercher).length;

  if (nbTypo > 0) {
    div.innerText = statutRechercher + "x " + nbTypo;
    return div;
  } else {
    return div;
  }
};
function getAppsStatut() {
  let rowsApps = document.querySelectorAll(".trGouvernance");
  let listStatut = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];

  let nombreDappartementoccupé = 0;
  let nombreDappartementappEnChauffe = 0;
  let nombreDappartementPret = 0;
  let nombreDappartementBCS = 0;
  let nombreDappartementlibreSale = 0;
  let appPrets = [];
  let appPretsBcs = [];
  let appChauffe = [];
  let appLibreSale = [];
  let appOccupes = [];

  rowsApps.forEach((row) => {
    if (row.querySelector(".selectStatut").value == listStatut[0]) {
      nombreDappartementoccupé++;
      appOccupes.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[1]) {
      nombreDappartementappEnChauffe++;
      appChauffe.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[2]) {
      nombreDappartementPret++;
      appPrets.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[3]) {
      nombreDappartementBCS++;
      appPretsBcs.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[4]) {
      nombreDappartementlibreSale++;
      appLibreSale.push(row.querySelector(".typologie").innerText);
    }
  });

  let spanResultOCC = document.querySelector(".resltaOcc-span-occ");

  spanResultOCC.innerHTML = nombreDappartementoccupé;
  queryS(".result-occ-detail").append(
    findAppartementTypo(appOccupes, "2p4"),
    findAppartementTypo(appOccupes, "2p4-5"),
    findAppartementTypo(appOccupes, "3p6"),
    findAppartementTypo(appOccupes, "3p6-7")
  );

  document.querySelector(".resltaOcc-span-appChauffe").innerText =
    nombreDappartementappEnChauffe;
  queryS(".result-chauffe-detail").append(
    findAppartementTypo(appChauffe, "2p4"),
    findAppartementTypo(appChauffe, "2p4-5"),
    findAppartementTypo(appChauffe, "3p6"),
    findAppartementTypo(appChauffe, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-pret").innerText =
    nombreDappartementPret;
  queryS(".result-pret-detail").append(
    findAppartementTypo(appPrets, "2p4"),
    findAppartementTypo(appPrets, "2p4-5"),
    findAppartementTypo(appPrets, "3p6"),
    findAppartementTypo(appPrets, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-BCS").innerText =
    nombreDappartementBCS;
  queryS(".result-BCS-detail").append(
    findAppartementTypo(appPretsBcs, "2p4"),
    findAppartementTypo(appPretsBcs, "2p4-5"),
    findAppartementTypo(appPretsBcs, "3p6"),
    findAppartementTypo(appPretsBcs, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-LibreSale").innerText =
    nombreDappartementlibreSale;
  queryS(".result-libre-sale-detail").append(
    findAppartementTypo(appLibreSale, "2p4"),
    findAppartementTypo(appLibreSale, "2p4-5"),
    findAppartementTypo(appLibreSale, "3p6"),
    findAppartementTypo(appLibreSale, "3p6-7")
  );
  document.querySelector(".container-modal-gouv").style.display = "block";
}

function getAppsStatutOneLoad() {
  let rowsApps = document.querySelectorAll(".trGouvernance");
  let listStatut = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];

  let nombreDappartementoccupé = 0;
  let nombreDappartementappEnChauffe = 0;
  let nombreDappartementPret = 0;
  let nombreDappartementBCS = 0;
  let nombreDappartementlibreSale = 0;
  let appPrets = [];
  let appPretsBcs = [];
  let appChauffe = [];
  let appLibreSale = [];
  let appOccupes = [];

  rowsApps.forEach((row) => {
    if (row.querySelector(".selectStatut").value == listStatut[0]) {
      nombreDappartementoccupé++;
      appOccupes.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[1]) {
      nombreDappartementappEnChauffe++;
      appChauffe.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[2]) {
      nombreDappartementPret++;
      appPrets.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[3]) {
      nombreDappartementBCS++;
      appPretsBcs.push(row.querySelector(".typologie").innerText);
    } else if (row.querySelector(".selectStatut").value == listStatut[4]) {
      nombreDappartementlibreSale++;
      appLibreSale.push(row.querySelector(".typologie").innerText);
    }
  });

  let spanResultOCC = document.querySelector(".resltaOcc-span-occ-count-typo");

  spanResultOCC.innerHTML = nombreDappartementoccupé;
  queryS(".result-occ-2p4-2p5-detail-count-typo").append(
    findAppartementTypo(appOccupes, "2p4"),
    findAppartementTypo(appOccupes, "2p4-5")
  );
  queryS(".result-occ-3p6p5-detail-count-typo").append(
    findAppartementTypo(appOccupes, "3p6"),
    findAppartementTypo(appOccupes, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-appChauffe-count-typo").innerText =
    nombreDappartementappEnChauffe;
  queryS(".result-appChauffe-2p4-2p5-detail-count-typo").append(
    findAppartementTypo(appChauffe, "2p4"),
    findAppartementTypo(appChauffe, "2p4-5")
  );
  queryS(".result-appChauffe-3p6p5-detail-count-typo").append(
    findAppartementTypo(appChauffe, "3p6"),
    findAppartementTypo(appChauffe, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-pret-count-typo").innerText =
    nombreDappartementPret;
  queryS(".result-pret-2p4-2p5-detail-count-typo").append(
    findAppartementTypo(appPrets, "2p4"),
    findAppartementTypo(appPrets, "2p4-5")
  );
  queryS(".result-pret-3p6p5-detail-count-typo").append(
    findAppartementTypo(appPrets, "3p6"),
    findAppartementTypo(appPrets, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-BCS-count-typo").innerText =
    nombreDappartementBCS;
  queryS(".result-BCS-2p4-2p5-detail-count-typo").append(
    findAppartementTypo(appPretsBcs, "2p4"),
    findAppartementTypo(appPretsBcs, "2p4-5")
  );
  queryS(".result-BCS-3p6p5-detail-count-typo").append(
    findAppartementTypo(appPretsBcs, "3p6"),
    findAppartementTypo(appPretsBcs, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-LibreSale-count-typo").innerText =
    nombreDappartementlibreSale;
  queryS(".result-libre-sale-2p4-2p5-detail-count-typo").append(
    findAppartementTypo(appLibreSale, "2p4"),
    findAppartementTypo(appLibreSale, "2p4-5")
  );
  queryS(".result-libre-sale-3p6p5-detail-count-typo").append(
    findAppartementTypo(appLibreSale, "3p6"),
    findAppartementTypo(appLibreSale, "3p6-7")
  );
}

// funtion to get the number of appartement where arrive = oui

const getAppsArriveDirty = () => {
  let rowsApps = document.querySelectorAll(".trGouvernance");
  let listStatut = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];
  let nbAppMengage2p4 = 0;
  let nbAppMengage2p4_5 = 0;
  let nbAppMengage3p6 = 0;
  let nbAppMengage3p6_7 = 0;
  rowsApps.forEach((row) => {
    let tdArrive = row.querySelector(".arrive");
    let tdStatut = row.querySelector(".selectStatut");
    // get the value of the select

    if (tdArrive.value == "oui" && tdStatut.value == listStatut[4]) {
      let typo = row.querySelector(".typologie").innerText;
      if (typo == "2p4") {
        return nbAppMengage2p4++;
      } else if (typo == "2p4-5") {
        return nbAppMengage2p4_5++;
      } else if (typo == "3p6") {
        return nbAppMengage3p6++;
      } else if (typo == "3p6-7") {
        return nbAppMengage3p6_7++;
      }
    }
  });

  alert(
    "Nombre d'appartement mengagé 2p4 : " +
      nbAppMengage2p4 +
      "\n" +
      "Nombre d'appartement mengagé 2p4-5 : " +
      nbAppMengage2p4_5 +
      "\n" +
      "Nombre d'appartement mengagé 3p6 : " +
      nbAppMengage3p6 +
      "\n" +
      "Nombre d'appartement mengagé 3p6-7 : " +
      nbAppMengage3p6_7 +
      "\n"
  );
};

function getAppsStatutArring() {
  let rowsApps = document.querySelectorAll(".trGouvernance");
  let listStatut = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];

  let nombreDappartementoccupé = 0;
  let nombreDappartementappEnChauffe = 0;
  let nombreDappartementPret = 0;
  let nombreDappartementBCS = 0;
  let nombreDappartementlibreSale = 0;
  let appPrets = [];
  let appPretsBcs = [];
  let appChauffe = [];
  let appLibreSale = [];
  let appOccupes = [];
  rowsApps.forEach((row) => {
    let tdArrive = row.querySelector(".arrive");

    if (
      row.querySelector(".selectStatut").value == listStatut[0] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementoccupé++;
      appOccupes.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[1] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementappEnChauffe++;
      appChauffe.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[2] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementPret++;
      appPrets.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[3] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementBCS++;
      appPretsBcs.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[4] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementlibreSale++;
      appLibreSale.push(row.querySelector(".typologie").innerText);
    }
  });

  let spanResultOCC = document.querySelector(".resltaOcc-span-occ");

  spanResultOCC.innerHTML = nombreDappartementoccupé;
  queryS(".result-occ-detail").append(
    findAppartementTypo(appOccupes, "2p4"),
    findAppartementTypo(appOccupes, "2p4-5"),
    findAppartementTypo(appOccupes, "3p6"),
    findAppartementTypo(appOccupes, "3p6-7")
  );

  document.querySelector(".resltaOcc-span-appChauffe").innerText =
    nombreDappartementappEnChauffe;
  queryS(".result-chauffe-detail").append(
    findAppartementTypo(appChauffe, "2p4"),
    findAppartementTypo(appChauffe, "2p4-5"),
    findAppartementTypo(appChauffe, "3p6"),
    findAppartementTypo(appChauffe, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-pret").innerText =
    nombreDappartementPret;
  queryS(".result-pret-detail").append(
    findAppartementTypo(appPrets, "2p4"),
    findAppartementTypo(appPrets, "2p4-5"),
    findAppartementTypo(appPrets, "3p6"),
    findAppartementTypo(appPrets, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-BCS").innerText =
    nombreDappartementBCS;
  queryS(".result-BCS-detail").append(
    findAppartementTypo(appPretsBcs, "2p4"),
    findAppartementTypo(appPretsBcs, "2p4-5"),
    findAppartementTypo(appPretsBcs, "3p6"),
    findAppartementTypo(appPretsBcs, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-LibreSale").innerText =
    nombreDappartementlibreSale;
  queryS(".result-libre-sale-detail").append(
    findAppartementTypo(appLibreSale, "2p4"),
    findAppartementTypo(appLibreSale, "2p4-5"),
    findAppartementTypo(appLibreSale, "3p6"),
    findAppartementTypo(appLibreSale, "3p6-7")
  );
  document.querySelector(".container-modal-gouv").style.display = "block";
}

function getAppsStatutleaving() {
  let rowsApps = document.querySelectorAll(".trGouvernance");
  let listStatut = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];

  let nombreDappartementoccupé = 0;
  let nombreDappartementappEnChauffe = 0;
  let nombreDappartementPret = 0;
  let nombreDappartementBCS = 0;
  let nombreDappartementlibreSale = 0;
  let appPrets = [];
  let appPretsBcs = [];
  let appChauffe = [];
  let appLibreSale = [];
  let appOccupes = [];
  rowsApps.forEach((row) => {
    let tdArrive = row.querySelector(".depart");

    if (
      row.querySelector(".selectStatut").value == listStatut[0] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementoccupé++;
      appOccupes.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[1] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementappEnChauffe++;
      appChauffe.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[2] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementPret++;
      appPrets.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[3] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementBCS++;
      appPretsBcs.push(row.querySelector(".typologie").innerText);
    } else if (
      row.querySelector(".selectStatut").value == listStatut[4] &&
      tdArrive.value == "oui"
    ) {
      nombreDappartementlibreSale++;
      appLibreSale.push(row.querySelector(".typologie").innerText);
    }
  });

  let spanResultOCC = document.querySelector(".resltaOcc-span-occ");

  spanResultOCC.innerHTML = nombreDappartementoccupé;
  queryS(".result-occ-detail").append(
    findAppartementTypo(appOccupes, "2p4"),
    findAppartementTypo(appOccupes, "2p4-5"),
    findAppartementTypo(appOccupes, "3p6"),
    findAppartementTypo(appOccupes, "3p6-7")
  );

  document.querySelector(".resltaOcc-span-appChauffe").innerText =
    nombreDappartementappEnChauffe;
  queryS(".result-chauffe-detail").append(
    findAppartementTypo(appChauffe, "2p4"),
    findAppartementTypo(appChauffe, "2p4-5"),
    findAppartementTypo(appChauffe, "3p6"),
    findAppartementTypo(appChauffe, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-pret").innerText =
    nombreDappartementPret;
  queryS(".result-pret-detail").append(
    findAppartementTypo(appPrets, "2p4"),
    findAppartementTypo(appPrets, "2p4-5"),
    findAppartementTypo(appPrets, "3p6"),
    findAppartementTypo(appPrets, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-BCS").innerText =
    nombreDappartementBCS;
  queryS(".result-BCS-detail").append(
    findAppartementTypo(appPretsBcs, "2p4"),
    findAppartementTypo(appPretsBcs, "2p4-5"),
    findAppartementTypo(appPretsBcs, "3p6"),
    findAppartementTypo(appPretsBcs, "3p6-7")
  );
  document.querySelector(".resltaOcc-span-LibreSale").innerText =
    nombreDappartementlibreSale;
  queryS(".result-libre-sale-detail").append(
    findAppartementTypo(appLibreSale, "2p4"),
    findAppartementTypo(appLibreSale, "2p4-5"),
    findAppartementTypo(appLibreSale, "3p6"),
    findAppartementTypo(appLibreSale, "3p6-7")
  );
  document.querySelector(".container-modal-gouv").style.display = "block";
}

let btnModal = document.getElementsByClassName("Btn-test-Modal");
let colStatut = document.getElementsByClassName("status");
let tr = document.getElementsByClassName("tr");
let modalBtnSave = document.getElementsByClassName("btn-modal-save");
document.querySelector(".span-close").addEventListener("click", () => {
  location.reload();
});

queryS("#btn-stat-depart").addEventListener("click", getAppsStatutleaving);
window.addEventListener("load", getDataAppart());
table.addEventListener("change", getChangeStatus);
table.addEventListener("change", changeColorStatut);
// table.addEventListener("change", getChangeStatus);
document
  .querySelector("#btn-stat-arrive")
  .addEventListener("click", getAppsStatutArring);
// modalBtnSave.addEventListener("click", SendValueModal());
smallDevice.addListener(handleDeviceChangeGouvernace);
