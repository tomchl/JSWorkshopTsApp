class Person{
    name: string; 
    surname: string;
  
    constructor(name: string, surname: string) {
      this.name = name;
      this.surname = surname;
    }
}

let data: Person[];

let table = document.createElement('table');

fetch('/getData')
    .then(res => res.json())
    .then((jsonData : Person[]) => {
        data = jsonData;
        for (var i = 0; i < data.length; i++){
            addRowToTable(table, data[i].name, data[i].surname);
        }
    }).catch(err => console.error(err));


let inputName = document.createElement("input");
inputName.setAttribute("type", "text");
inputName.setAttribute("value", "");

let inputSurname = document.createElement("input");
inputSurname.setAttribute("type", "text");
inputSurname.setAttribute("value", "");

let addButton = document.createElement("button");
addButton.innerHTML = "Add row";

let saveButton = document.createElement("button");
saveButton.innerHTML = "Save";

function addRowToTable(table: HTMLTableElement, name: string, surname: string){
    let tr = document.createElement('tr');   
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

    let text1 = document.createTextNode(name);
    let text2 = document.createTextNode(surname);

    td1.appendChild(text1);
    td2.appendChild(text2);

    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}

addButton.addEventListener ("click", function() {
    let i :number = data.length;
    data.push(new Person(inputName.value, inputSurname.value));
    addRowToTable(table, data[i].name, data[i].surname);
});

saveButton.addEventListener ("click", function() {
    fetch("/saveData", {
        method: "POST", 
        body: JSON.stringify(data)
        }).then(res => {
        console.log("Request complete! response:", res);
        });
});

document.body.appendChild(inputName);
document.body.appendChild(inputSurname);
let h2 = document.createElement("h2");
document.body.appendChild(h2);
document.body.appendChild(addButton);
document.body.appendChild(saveButton);
let h3 = document.createElement("h3");
document.body.appendChild(h3);
document.body.appendChild(table);