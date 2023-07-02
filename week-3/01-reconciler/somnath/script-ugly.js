const mainContainer = document.getElementById("mainArea");

function createDomElements(data) {
  mainContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const divElement = document.createElement("div");
    divElement.innerHTML = `<div><h3>${data[i].todo}<span>${data[i].todoNumber}</span></h3></div>`;
    mainContainer.append(divElement);
  }
}

setInterval(() => {
  const todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    todos.push({
      todo: "Todo Number: ",
      todoNumber: i,
    });
  }
  console.log(todos);
  createDomElements(todos);
}, 3000);
