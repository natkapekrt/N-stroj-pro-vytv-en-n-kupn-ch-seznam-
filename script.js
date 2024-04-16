
function addItem() {
    var itemText = document.getElementById("itemInput").value.trim();
    if (itemText === "") return; 

    var item = {
        name: itemText,
        checked: false
    };

    
    var shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    shoppingList.push(item);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

   
    renderList();
}


function renderList() {
    var shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    var listsContainer = document.getElementById("listsContainer");
    listsContainer.innerHTML = "";

    shoppingList.forEach(function(item, index) {
        var listItem = document.createElement("div");
        listItem.classList.add("form-check");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input");
        checkbox.checked = item.checked;
        checkbox.addEventListener("change", function() {
            shoppingList[index].checked = checkbox.checked;
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
        });

        var label = document.createElement("label");
        label.classList.add("form-check-label");
        label.textContent = item.name;

        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "ml-2");
        deleteBtn.textContent = "Smazat";
        deleteBtn.addEventListener("click", function() {
            shoppingList.splice(index, 1);
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
            renderList();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(deleteBtn);
        listsContainer.appendChild(listItem);
    });
}

document.getElementById("addItemBtn").addEventListener("click", addItem);


renderList();
