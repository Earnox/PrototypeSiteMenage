let tBody = document.createElement("tbody");
let table = document.getElementById("tableauIterventionTech");
let editTd = document.createElement("th");
editTd.classList = "tdheaderEdit";
const smallDevice = window.matchMedia("(min-width: 576px)");

function handleDeviceChange(e) {
  if (e.matches) {
  } else {
    let rowsInt = document.querySelectorAll(".trIntevention");
    document.querySelector("header").classList = "container-fluide";
    rowsInt.forEach((row) => {
      row.addEventListener("click", setEditModalMobil);
    });
  }
}
function setModal(event) {
  console.log("btn marche");
  let headerModal = document.getElementById("headermodal");
  let modalBody = document.getElementById("modalBody");

  $("#modalTech").modal("handleUpdate");
  $("#modalTech").modal("show");
}
const DropDownListStatus = () => {
  let listStatut = [
    "Action prioritaire",
    "Arrivée du jour",
    "demande inter",
    "résolu",
    "En Attente",
    "En Commande",
    "départ du client",
    "VTA",
    "bloqué tech",
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

function createDate(date) {
  var date = new Date(date);
  //2022-03-10

  const formatDate = (date) => {
    let formatted_date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    // + "-" + ;
    return formatted_date;
  };
  return formatDate(date);
}

const GetDataTech = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbzNtaNcX8zovKIEx0mZetSageepeBjYRzeqOvXWozThYJwXA4R2hFm6N1fEdgTJuOW6/exec";
  fetch(url).then((reponses) => {
    reponses
      .json()
      .then((reponses) => {
        let tableauInter = document.getElementById("tableauIterventionTech");
        let theadInter = document.createElement("thead");
        let theadRow = document.createElement("tr");
        let header = Object.keys(reponses[0]);
        // boucle pour chercher le les key de l'objet puis
        // ne pas montre certain element pour les stocker ou les rajouter au bessoin
        header.forEach((element) => {
          if (element == "id") {
            let th = document.createElement("th");
            th.innerText = element;
            th.style.display = "none";
            return theadRow.append(th);
          }
          if (element == "post") {
            let th = document.createElement("th");
            th.innerText = element;
            th.classList = "post";
            return theadRow.append(th);
          }
          if (element == "date") {
            let th = document.createElement("th");
            th.innerText = element;
            th.classList = "date";
            return theadRow.append(th);
          }
          // appartement
          if (element == "appartement") {
            let th = document.createElement("th");
            th.innerText = "#";
            th.classList = "appartementThead";
            return theadRow.append(th);
          } else if (element === "risque") {
            let th = document.createElement("th");
            th.style.display = "none";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else if (element === "information") {
            let th = document.createElement("th");
            th.style.display = "none";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else if (element === "dateIntevention") {
            let th = document.createElement("th");
            th.style.display = "none";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else if (element === "remarque") {
            let th = document.createElement("th");
            th.classList = "post";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else if (element === "statut") {
            let th = document.createElement("th");
            th.classList = "statut-Inter";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else if (element === "photo") {
            let th = document.createElement("th");
            th.style.display = "none";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else {
            let th = document.createElement("th");

            th.append(element);

            return theadRow.append(th);
          }
        });
        // editTd.innerText = "test";
        theadRow.appendChild(editTd);
        theadInter.append(theadRow);

        tableauInter.append(theadInter);
        theadInter.classList = "thead-light";
        return reponses;
      })
      //pareil que la premer boucle sauf  pour toute le tableau
      .then((reponses) => {
        reponses.forEach((infoIntervention) => {
          let trbody = document.createElement("tr");
          for (const key in infoIntervention) {
            if (key === "id") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "id";
              cell.setAttribute("scope", "row");
              cell.style.display = "none";
              trbody.appendChild(cell);
            }
            if (key === "date") {
              let cell = document.createElement("td");
              let date = infoIntervention[key];
              let dateformater = createDate(date);
              cell.innerHTML = dateformater;
              cell.classList = "date";
              trbody.appendChild(cell);
            }
            if (key === "post") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "post";
              trbody.appendChild(cell);
            } else if (key === "appartement") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "appartement";
              trbody.appendChild(cell);
            } else if (key === "natureInervention") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "natureInervention";
              trbody.appendChild(cell);
            } else if (key === "risque") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "risque";
              cell.style.display = "none";
              trbody.appendChild(cell);
            } else if (key === "information") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "information";
              cell.style.display = "none";
              trbody.appendChild(cell);
            } else if (key === "dateIntevention") {
              let cell = document.createElement("td");
              if (infoIntervention[key] === "") {
                cell.classList = "dateIntevention";
                cell.style.display = "none";
                trbody.appendChild(cell);
              } else if (infoIntervention[key] != "") {
                let date = infoIntervention[key];
                let dateFormater = createDate(date);
                cell.innerHTML = dateFormater;
                cell.classList = "dateIntevention";
                cell.style.display = "none";
                trbody.appendChild(cell);
              }
            } else if (key === "remarque") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "remarque";
              trbody.appendChild(cell);
            }

            if (key == "statut") {
              // let listStatut = DropDownListStatus();
              let span = document.createElement("div");
              let cell = document.createElement("td");
              span.innerHTML = infoIntervention[key];

              // liste des statu possible
              // Action prioritaire,Arrivée du jour,demande inter,résolu,En Attente,En Commande,départ du client,
              //VTA, bloqué tech
              if (infoIntervention[key] === "Action prioritaire") {
                span.classList = "action-prioritaire ";
                // listStatut.options[0].setAttribute("selected", true);
              } else if (infoIntervention[key] == "Arrivée du jour") {
                span.classList = "arrivee-du-jour";
                // listStatut.options[1].setAttribute("selected", true);
              } else if (infoIntervention[key] == "demande inter") {
                span.classList = "demande-inter";
                // listStatut.options[2].setAttribute("selected", true);
              } else if (infoIntervention[key] == "résolu") {
                span.classList = "resolu";
                // listStatut.options[3].setAttribute("selected", true);
              } else if (infoIntervention[key] == "En Attente") {
                span.classList = "en-Attente";
                // listStatut.options[4].setAttribute("selected", true);
              } else if (infoIntervention[key] == "En Commande") {
                span.classList = "en-Commande";
                // listStatut.options[5].setAttribute("selected", true);
              } else if (infoIntervention[key] == "départ du client") {
                span.classList = "depart-du-client";
                // listStatut.options[6].setAttribute("selected", true);
              } else if (infoIntervention[key] == "VTA") {
                span.classList = "vta";
                // listStatut.options[7].setAttribute("selected", true);
              } else if (infoIntervention[key] == "bloqué tech") {
                span.classList = "bloque-tech";
                // listStatut.options[8].setAttribute("selected", true);
              }
              // listStatut.classList =
              //   "form-control form-control-lg " + listStatut.classList;
              // cell.classList = "status align-items-center";
              // cell.appendChild(listStatut);

              span.classList += " statut-InterSpan";
              cell.appendChild(span);
              trbody.appendChild(cell);
              let btn = document.createElement("button");
              btn.classList =
                "btn btn-primary btn-sm btn-test-Modal edit bi bi-pencil-square";
              btn.setAttribute("type", "button");
              btn.setAttribute("data-toggle", "modal");
              btn.setAttribute("data-target", "#exampleModal");
              let cellBtn = document.createElement("td");
              cellBtn.classList = "align-middle tdEdit";
              cellBtn.appendChild(btn);
              trbody.appendChild(cellBtn);
            } else if (key === "photo") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "photo";
              cell.style.display = "none";
              trbody.appendChild(cell);
            }
          }
          trbody.classList = "trIntevention";
          tBody.appendChild(trbody);
          table.append(tBody);
        });

        document.querySelectorAll(".edit").forEach((item) => {
          item.addEventListener("click", (event) => {
            setEditModal(event);
          });
        });
      })
      .then((reponses) => {
        handleDeviceChange(smallDevice);
      });
  });
};

function setNewModal() {
  document.getElementById("formNew").reset();
  let id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  let idmodalNew = document.getElementById("idNvModalIntTech");

  idmodalNew.value = id();
  $("#modalNouvelleIntTech").modal("handleUpdate");
  $("#modalNouvelleIntTech").modal("show");
}
function setEditModal(event) {
  let modalEdit = document.querySelector("#modalEditIntTech");
  let modalEditBody = document.querySelector("#bodyEditModalIntTech");

  let idModal = modalEditBody.querySelector("#idEditModalIntTech");
  let dateModal = modalEditBody.querySelector("#dateEditModalIntTech");
  let postModal = modalEditBody.querySelector("#postEditModalIntTech");
  let lieuModal = modalEditBody.querySelector("#lieuEditModalIntTech");

  let natureInteventionModal = modalEditBody.querySelector(
    "#natureEditInteventionNvModalIntTech"
  );
  let risqueModal = modalEditBody.querySelector("#risqueEditModalIntTech");
  let infoModal = modalEditBody.querySelector("#infoEditModalIntTech");
  let dateRalisation = modalEditBody.querySelector(
    "#dateRealiserEditModalIntTech"
  );
  let remarqueModal = modalEditBody.querySelector(
    "#remarqueInteventionEditModalIntTech"
  );
  let statutModal = modalEditBody.querySelector("#statutEditModalIntTech");

  let target = event.target;
  let rowevent = target.parentElement.parentElement;

  let id = rowevent.querySelector(".id");
  let date = rowevent.querySelector(".date");
  let post = rowevent.querySelector(".post");
  let appartement = rowevent.querySelector(".appartement");
  let natureInervention = rowevent.querySelector(".natureInervention");
  let risque = rowevent.querySelector(".risque");
  let information = rowevent.querySelector(".information");
  let dateIntevention = rowevent.querySelector(".dateIntevention");
  let remarque = rowevent.querySelector(".remarque");
  let status = rowevent.querySelector(".statut-InterSpan");

  // let photo = rowevent.querySelector(".photo ");

  idModal.value = id.innerHTML;
  dateModal.value = date.innerHTML;
  postModal.value = post.innerHTML;
  lieuModal.value = appartement.innerHTML;
  natureInteventionModal.value = natureInervention.innerHTML;
  risqueModal.value = risque.innerHTML;
  infoModal.value = information.innerHTML;
  dateRalisation.value = dateIntevention.innerHTML;
  remarqueModal.value = remarque.innerHTML;
  statutModal.value = status.innerHTML;
  $("#modalEditIntTech").modal("handleUpdate");
  $("#modalEditIntTech").modal("show");
}
const sendNewInteventionTech = () => {
  document.getElementById("btnNewInterSave").disabled = true;

  let bodyModalnvIntentionTech = document.querySelector("#bodyNvModalIntTech");
  let id = bodyModalnvIntentionTech.querySelector("#idNvModalIntTech");
  let date = bodyModalnvIntentionTech.querySelector("#dateNvModalIntTech");
  let post = bodyModalnvIntentionTech.querySelector("#postNvModalIntTech");
  let lieu = bodyModalnvIntentionTech.querySelector("#lieuNvModalIntTech");

  let natureIntevention = bodyModalnvIntentionTech.querySelector(
    "#natureInteventionNvModalIntTech"
  );
  let risque = bodyModalnvIntentionTech.querySelector("#risqueNvModalIntTech");
  let info = bodyModalnvIntentionTech.querySelector("#infoNvModalIntTech");
  let dateRalisation = bodyModalnvIntentionTech.querySelector(
    "#dateRealiserNvModalIntTech"
  );
  let remarque = bodyModalnvIntentionTech.querySelector(
    "#remarqueInteventionNvModalIntTech"
  );
  let statut = bodyModalnvIntentionTech.querySelector("#statutNvModalIntTech");
  console.log(natureIntevention.value);
  if (date.value === "") {
    bodyModalnvIntentionTech
      .querySelector(".date-validation-modal")
      .classList.remove("d-None-modal");
    document.getElementById("btnNewInterSave").disabled = false;
    return;
  }
  if (lieu.value === "") {
    bodyModalnvIntentionTech
      .querySelector(".validation-modal-lieu")
      .classList.remove("d-None-modal");
    document.getElementById("btnNewInterSave").disabled = false;
    return;
  }
  if (natureIntevention.value === "") {
    bodyModalnvIntentionTech
      .querySelector(".validation-modal-intervention")
      .classList.remove("d-None-modal");
    document.getElementById("btnNewInterSave").disabled = false;

    return;
  }
  if (natureIntevention.value != "" && date.value != "" && lieu.value != "") {
    const valueToSend = {
      requet: "newInter",
      id: id.value,
      date: date.value,
      post: post.value,
      lieu: lieu.value,
      natureIntevention: natureIntevention.value,
      risque: risque.value,
      info: info.value,
      dateRalisation: dateRalisation.value,
      remarque: remarque.value,
      statut: statut.value,
    };
    return SenDataNewIntention(valueToSend);
  }
};
const sendEditInteventioTech = () => {
  document.getElementById("btnEditSave").disabled = true;
  let modalEdit = document.querySelector("#modalEditIntTech");
  let modalEditBody = document.querySelector("#bodyEditModalIntTech");

  let idModal = modalEditBody.querySelector("#idEditModalIntTech");
  let dateModal = modalEditBody.querySelector("#dateEditModalIntTech");
  let postModal = modalEditBody.querySelector("#postEditModalIntTech");
  let lieuModal = modalEditBody.querySelector("#lieuEditModalIntTech");

  let natureInteventionModal = modalEditBody.querySelector(
    "#natureEditInteventionNvModalIntTech"
  );
  let risqueModal = modalEditBody.querySelector("#risqueEditModalIntTech");
  let infoModal = modalEditBody.querySelector("#infoEditModalIntTech");
  let dateRalisation = modalEditBody.querySelector(
    "#dateRealiserEditModalIntTech"
  );
  let remarqueModal = modalEditBody.querySelector(
    "#remarqueInteventionEditModalIntTech"
  );
  let statutModal = modalEditBody.querySelector("#statutEditModalIntTech");
  if (dateModal.value === "") {
    modalEditBody
      .querySelector(".date-validation-modal")
      .classList.remove("d-None-modal");
    document.getElementById("btnEditSave").disabled = false;
    return;
  }
  if (lieuModal.value === "") {
    modalEditBody
      .querySelector(".validation-modal-lieu")
      .classList.remove("d-None-modal");
    document.getElementById("btnEditSave").disabled = false;
    return;
  }
  if (natureInteventionModal.value === "") {
    modalEditBody
      .querySelector(".validation-modal-intervention")
      .classList.remove("d-None-modal");

    document.getElementById("btnEditSave").disabled = false;
    return;
  } else if (
    natureInteventionModal.value != "" &&
    dateModal.value != "" &&
    lieuModal.value != ""
  ) {
    const valueToSend = {
      requet: "editIntevention",
      id: idModal.value,
      date: dateModal.value,
      post: postModal.value,
      lieu: lieuModal.value,
      natureIntevention: natureInteventionModal.value,
      risque: risqueModal.value,
      info: infoModal.value,
      dateRalisation: dateRalisation.value,
      remarque: remarqueModal.value,
      statut: statutModal.value,
    };

    return SenDataNewIntention(valueToSend);
  }
};
function SenDataNewIntention(valueToSend) {
  // let spiner = document.getElementById("spinerHeader");
  // spiner.classList = "spinner-border";
  const url =
    "https://script.google.com/macros/s/AKfycbzNtaNcX8zovKIEx0mZetSageepeBjYRzeqOvXWozThYJwXA4R2hFm6N1fEdgTJuOW6/exec";

  // let reponsefetch = await
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
    .then((response) => {
      return response;
    })
    .then(
      (response) => {
        console.log(response);
        if (!response.ok) {
          // spiner.classList = "spinner-border d-none";
          // if()
          // if (
          //   document.getElementById("exampleModal").classList.contains("show")
          // ) {
          location.reload();
          //   // $("#exampleModal").modal("hide");
          // }
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

function setEditModalMobil(event) {
  let modalEdit = document.querySelector("#modalEditIntTech");
  let modalEditBody = document.querySelector("#bodyEditModalIntTech");

  let idModal = modalEditBody.querySelector("#idEditModalIntTech");
  let dateModal = modalEditBody.querySelector("#dateEditModalIntTech");
  let postModal = modalEditBody.querySelector("#postEditModalIntTech");
  let lieuModal = modalEditBody.querySelector("#lieuEditModalIntTech");

  let natureInteventionModal = modalEditBody.querySelector(
    "#natureEditInteventionNvModalIntTech"
  );
  let risqueModal = modalEditBody.querySelector("#risqueEditModalIntTech");
  let infoModal = modalEditBody.querySelector("#infoEditModalIntTech");
  let dateRalisation = modalEditBody.querySelector(
    "#dateRealiserEditModalIntTech"
  );
  let remarqueModal = modalEditBody.querySelector(
    "#remarqueInteventionEditModalIntTech"
  );
  let statutModal = modalEditBody.querySelector("#statutEditModalIntTech");

  let target = event.target;
  let rowevent = target.parentElement;
  let id = rowevent.querySelector(".id");
  let date = rowevent.querySelector(".date");
  let post = rowevent.querySelector(".post");
  let appartement = rowevent.querySelector(".appartement");
  let natureInervention = rowevent.querySelector(".natureInervention");
  let risque = rowevent.querySelector(".risque");
  let information = rowevent.querySelector(".information");
  let dateIntevention = rowevent.querySelector(".dateIntevention");
  let remarque = rowevent.querySelector(".remarque");
  let status = rowevent.querySelector(".statut-InterSpan");

  // let photo = rowevent.querySelector(".photo ");

  idModal.value = id.innerHTML;
  dateModal.value = date.innerHTML;
  postModal.value = post.innerHTML;
  lieuModal.value = appartement.innerHTML;
  natureInteventionModal.value = natureInervention.innerHTML;
  risqueModal.value = risque.innerHTML;
  infoModal.value = information.innerHTML;
  dateRalisation.value = dateIntevention.innerHTML;
  remarqueModal.value = remarque.innerHTML;
  statutModal.value = status.innerHTML;
  $("#modalEditIntTech").modal("handleUpdate");
  $("#modalEditIntTech").modal("show");
}

let btnModal = document.getElementsByClassName("Btn-test-Modal");
let modalBtnSave = document.getElementsByClassName("btn-modal-save");
let btnTest = document.querySelector("#btnNewIntevention");
let btnEditTable = document.querySelectorAll(".btn-test-Modal");
window.addEventListener("load", GetDataTech);
btnTest.addEventListener("click", setNewModal);
// btnEditTable.addEventListener("click", setEditModal);
// col eta SELECT(Import rangew[information], ([Appartement] = [_THISROW].[Appartement])) pour ajout si bug

// Run it initially
// handleDeviceChange(smallDevice);
smallDevice.addListener(handleDeviceChange);
