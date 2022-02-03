const testGetData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbxUlweMnG9cC3OcVx3P34kiJkh-Zw0I9fQfd7ZltJoLDD_QEwc/exec";
  fetch(url).then((reponses) =>
    reponses.json().then((responses) => {
      const divTableauApp = document.getElementById("tableauNuméroapp");
      let table = document.createElement("table");
      let headerrow = document.createElement("tr");
      let headers = Object.keys(responses[0]);

      console.log(Object.keys(responses[0]));
      headers.forEach((headertext) => {
        let textNodeHeader = document.createTextNode(headertext);
        let header = document.createElement("th");
        header.appendChild(textNodeHeader);
        headerrow.appendChild(header);
      });
      table.appendChild(headerrow);
      responses.forEach((response) => {
        let row = document.createElement("tr");
        Object.values(response).forEach((text) => {
          let cell = document.createElement("td");
          let textnode = document.createTextNode(text);
          cell.appendChild(textnode);
          row.appendChild(cell);
        });
        table.appendChild(row);
      });

      divTableauApp.appendChild(table);
    })
  );
};

document.getElementById("btn").addEventListener("click", testGetData);
