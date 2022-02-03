const GetData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbzJDVPoFJlGrtbGO_fbequfLBIxDg00A4clTYSHwdw0-TxZd54Uf--v89utV2BbDnpN5Q/exec";
  fetch(url).then((reponses) =>
    reponses.json().then((responses) => {
      const divTableauApp = document.getElementById("tableauNumeroapp");
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

document.getElementById("btn").addEventListener("click", GetData);

const postData = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbzJDVPoFJlGrtbGO_fbequfLBIxDg00A4clTYSHwdw0-TxZd54Uf--v89utV2BbDnpN5Q/exec";
  fetch(url, {
    method: "POST",
    node: "no-cors",
    cache: "no-cache",
    headers: {
      "content-type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({nom: "jhone"}),
  });
};
document.getElementById("btn").addEventListener("click", postData);
