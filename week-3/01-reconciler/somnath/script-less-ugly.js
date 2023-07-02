const parentElement = document.getElementById("mainArea");

function createDomElements(data) {
  const currentChildren = Array.from(parentElement.children);
  data.forEach((todo) => {
    let existingChild = currentChildren.find((child) => {
      return child.dataset.id === String(todo.id);
    });
    if (existingChild) {
      existingChild.children[1] = todo.todoNumber;
      currentChildren = currentChildren.filter((child) => {
        return child !== existingChild;
      });
    } else {
      const divElement = document.createElement("div");
      divElement.dataset.id = todo.todoNumber;
      divElement.innerHTML = `<div><h3>Todo Number: <span>${todo.todoNumber}</span></h3></div>`;
      parentElement.append(divElement);
    }
  });

  currentChildren.forEach((child) => {
    parentElement.removeChild(child);
  });
}

setInterval(() => {
  const todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    todos.push({
      todo: "Todo Number: ",
      todoNumber: i,
    });
  }
  createDomElements(todos);
}, 3000);
