let tBody = document.createElement("tbody");
let table = document.getElementById("tableauIterventionTech");

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
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "AVR",
    "MAI",
    "JUN",
    "JUL",
    "AOUT",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const formatDate = (date) => {
    let formatted_date = date.getDate() + "-" + months[date.getMonth()];
    // + "-" + date.getFullYear();
    return formatted_date;
  };
  return formatDate(date);
}

const GetDataTech = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbzBIkWiWkyohhx5ErmZQfFFaiw0L9ECyr2gDjeBga-rZKqLlHPpOcYwRhRsOJLYiZ26/exec";
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
            console.log("test");
            let th = document.createElement("th");
            th.innerText = element;
            th.style.display = "none";
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
          } else if (element === "photo") {
            let th = document.createElement("th");
            th.style.display = "none";
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          } else {
            let th = document.createElement("th");
            th.append(element);
            theadRow.append(th);
            return theadRow.append(th);
          }
        });

        theadInter.append(theadRow);
        tableauInter.append(theadInter);
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
              let listStatut = DropDownListStatus();
              let cell = document.createElement("td");
              // liste des statu possible
              // Action prioritaire,Arrivée du jour,demande inter,résolu,En Attente,En Commande,départ du client,
              //VTA, bloqué tech
              if (infoIntervention[key] === "Action prioritaire") {
                listStatut.classList = "action-prioritaire ";
                listStatut.options[0].setAttribute("selected", true);
              } else if (infoIntervention[key] == "Arrivée du jour") {
                listStatut.classList = "arrivee-du-jour";
                listStatut.options[1].setAttribute("selected", true);
              } else if (infoIntervention[key] == "demande inter") {
                listStatut.classList = "demande-inter";
                listStatut.options[2].setAttribute("selected", true);
              } else if (infoIntervention[key] == "résolu") {
                listStatut.classList = "resolu";
                listStatut.options[3].setAttribute("selected", true);
              } else if (infoIntervention[key] == "En Attente") {
                listStatut.classList = "en-Attente";
                listStatut.options[4].setAttribute("selected", true);
              } else if (infoIntervention[key] == "En Commande") {
                listStatut.classList = "en-Commande";
                listStatut.options[5].setAttribute("selected", true);
              } else if (infoIntervention[key] == "départ du client") {
                listStatut.classList = "depart-du-client";
                listStatut.options[6].setAttribute("selected", true);
              } else if (infoIntervention[key] == "VTA") {
                listStatut.classList = "vta";
                listStatut.options[7].setAttribute("selected", true);
              } else if (infoIntervention[key] == "bloqué tech") {
                listStatut.classList = "bloque-tech";
                listStatut.options[8].setAttribute("selected", true);
              }
              listStatut.classList =
                "form-control form-control-lg " + listStatut.classList;
              cell.classList = "status align-items-center";
              cell.appendChild(listStatut);
              trbody.appendChild(cell);
              let btn = document.createElement("button");
              btn.classList =
                "btn btn-primary btn-sm btn-test-Modal edit bi bi-pencil-square";
              btn.setAttribute("type", "button");
              btn.setAttribute("data-toggle", "modal");
              btn.setAttribute("data-target", "#exampleModal");
              let cellBtn = document.createElement("td");
              cellBtn.classList = "align-middle";
              cellBtn.appendChild(btn);
              trbody.appendChild(cellBtn);
              //  }
            } else if (key === "photo") {
              let cell = document.createElement("td");
              cell.innerHTML = infoIntervention[key];
              cell.classList = "photo";
              cell.style.display = "none";
              trbody.appendChild(cell);
            }
          }
          tBody.appendChild(trbody);
          table.append(tBody);
        });
        document.querySelectorAll(".edit").forEach((item) => {
          item.addEventListener("click", (event) => {
            setModal(event);
          });
        });
      });
  });
};

// { id: 1, date: "2022-03-05T08:00:00.000Z",
// post: "Gouvernante",
//   appartement: "116",
//   natureInervention: "Ampoule hs lape droite au dessus du canapé",
//   risque: "",
//   information: "",
//   dateIntevention: "2022-03-05T08:00:00.000Z",
//   remarque: "Arrivée du jour",
//     statut: "résolu", … }

function newInterventionModal() {
  $("#modalNouvelleIntTech").modal("handleUpdate");
  $("#modalNouvelleIntTech").modal("show");
}
const sendNewInteventionTech = () => {
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
};

function SenDataNewIntention(valueToSend) {
  // let spiner = document.getElementById("spinerHeader");
  // spiner.classList = "spinner-border";
  const url =
    "https://script.google.com/macros/s/AKfycbxl_tge5WmTmIVQmIYcUNM17kysKEuLc1lLTWz1LGfBZzL2wT_niz4zDbsOBnLD_koN/exec";

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
      console.log(response.ok);
      return response;
    })
    .then(
      (response) => {
        console.log(response);
        if (!response.ok) {
          // spiner.classList = "spinner-border d-none";
          // if()
          console.log("gg");

          // if (
          //   document.getElementById("exampleModal").classList.contains("show")
          // ) {
          //   location.reload();
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

let btnModal = document.getElementsByClassName("Btn-test-Modal");
let modalBtnSave = document.getElementsByClassName("btn-modal-save");
let btnTest = document.querySelector("#btnTest");
window.addEventListener("load", GetDataTech);
btnTest.addEventListener("click", newInterventionModal);
