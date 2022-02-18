// ici nome toute les variables utiles (pour le scopes sinon des pb )
let tBody = document.createElement("tbody");
let table = document.getElementById("tableauNumeroapp");

{
  /* <button class='btn btn-primary' type='button' disabled>
  <span
    class='spinner-border spinner-border-sm'
    role='status'
    aria-hidden='true'></span>
  <span class='sr-only'>Loading...</span>
</button>; */
}

// création du bouton loading
// let btn = document.createElement("button");
// btn.classList = "btn btn-primary";
// let spanBtn1 = document.createElement("span");
// spanBtn1.setAttribute("aria-hidden", true);
// spanBtn1.classList = "spinner-border spinner-border-sm";
// let spanBtn2 = document.createElement("span");
// spanBtn2.classList = "sr-only";
// btn.appendChild(spanBtn1);
// btn.appendChild(spanBtn2);
// tdBtn.appendChild(btn);
let responseExt;
// Create dropt down list

// funtion Create a btn on oad finale didn't need it
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
    "https://script.google.com/macros/s/AKfycbyjAGhVaXeo9jH1lTFSRd54xjGpJSVAMRLGZhu2hbhoVV3eX4mBrf9A7Fn7eFwjW0B-WQ/exec";
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
          //// ici comment btn

          // createbtn();
        }

        tBody.appendChild(trbody);

        table.appendChild(tBody);
      });
    });
};

// const asyncSendDATA = async
function SenData(valueToSend) {
  let spiner = document.getElementById("spinerHeader");
  spiner.classList = "spinner-border";
  const url =
    "https://script.google.com/macros/s/AKfycbz98qslEO9THfiFyd7k2Nx5ZcGwcxtOHfvacsWBePjT-RbiIzNM7e0x6jAzqWp6LuGkBw/exec";
  // let reponsefetch = await
  fetch(url, {
    method: "POST",

    mode: "no-cors",

    // cache: "no-cache",
    // credentials: "include", // include, *same-origin, omit

    // headers: {
    //   "Content-Type": "application/json", // before ;charset=utf-8  text/plain
    // },

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
        }

      }

      // })

      // get the response in a array to be able to read
      //

      // // if response is okay reload page to set the color
      // if (data[0].status === 0) {
      //   // location.reload();
      //   // here to check if all is good in the response
      //   console.log([reponsefetch]);
      //
    );
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
  return SenData(valueToSend);
}

// funtion to change the colot of the column statut changed
const changeColorStatut = (e) => {
  let tdStatut = table.getElementsByClassName("status")[0];
  console.log(tdStatut);
  let listStatut = DropDownListStatus();
  let classtdStatut = tdStatut.classList;
  // console.log(e.target.parentElement);
  // console.log(tdStatut);
  let eventTarget = e.target;
  let eventTargetValue = eventTarget.value;
  console.log(eventTarget.classList.value);

  if (eventTargetValue === "occupé") {
    console.log("déja ici");
    // console.log(eventTargetValue);

    // console.log("event class : " + eventTarget.classList);
    eventTarget.classList = "occuper form-control form-control-lg";
    // eventTarget.options[0].setAttribute("selected", true);
    // console.log("event class : " + eventTarget.classList);
    // console.log("on est dans occ");
  } else if (eventTargetValue == "app en chauffe") {
    eventTarget.classList = "form-control form-control-lg app-en-chauffe";
    // eventTarget.options[1].setAttribute("selected", true);
  } else if (eventTargetValue == "prêt") {
    eventTarget.classList = "pret  form-control form-control-lg";
    //eventTarget.options[2].setAttribute("selected", true);
  } else if (eventTargetValue == "prêt BCS") {
    eventTarget.classList = "pret-bcs  form-control form-control-lg";
    //eventTarget.options[3].setAttribute("selected", true);
  } else if (eventTargetValue == "libre/sale") {
    eventTarget.classList = "libre-sale form-control form-control-lg";
  }
};
// console.log(eventTarget.classList);
const createbtn = () => {
  let tdBtn = document.createElement("td");
  let btn = document.createElement("button");
  btn.classList = "btn btn-primary";
  let spanBtn1 = document.createElement("span");
  spanBtn1.setAttribute("aria-hidden", false);
  // il faudrat ouer avec la classe sc-only je pense mais pas sur a regarder vitdeo pour plus
  spanBtn1.classList = "spinner-border spinner-border-sm ";
  let spanBtn2 = document.createElement("span");

  spanBtn2.classList = "sr-only";
  btn.appendChild(spanBtn1);
  btn.appendChild(spanBtn2);
  tdBtn.appendChild(btn);
  // /// ici termine btn

  trbody.appendChild(createbtn());
  return tdBtn;
};
let colStatut = document.getElementsByClassName("status");
window.addEventListener("load", getDataAppart());
table.addEventListener("change", getChangeStatus);
table.addEventListener("change", changeColorStatut);
table.addEventListener("change", getChangeStatus);