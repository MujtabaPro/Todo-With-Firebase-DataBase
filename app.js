var database = firebase.database().ref('/');
var input = document.getElementById('demo');
var list = document.getElementById('list');

// add() : This function is for Database

function add() {
    var user = {
        name: input.value,
        // age: 21,
        // num: 33423423423
    }
    database.child("user").push(user);
    input.value = '';
    input.focus();
}

// "child_added" Its Bultin In Firebase , Jb Bhi Koi New Chez Add Hogi To Ye Chly Ga.

// This is for UI When Data Entered
// This is called Event Listener
database.child('user').on('child_added', function (snapshot) {

    var obj = snapshot.val();
    obj.id = snapshot.key;

    render(obj);
});

// This is for UI When Data Removed

database.child("user").on("child_removed", function (data) {
    var liToRemove = document.getElementById(data.key);
    // ye remove() javascript ka function hy
    liToRemove.remove();

});

// This is for UI
function render(user) {
    var li = document.createElement('LI');
    var text = document.createTextNode(user.name);
    li.setAttribute('class', 'list-group-item');
    li.appendChild(text);

    li.setAttribute("id", user.id);

// remove button
    var removeBtn = document.createElement("BUTTON");
    var btnTxt = document.createTextNode('Remove');
    removeBtn.setAttribute("class", "btn btn-danger float-right");
    removeBtn.appendChild(btnTxt);
    li.appendChild(removeBtn);

    removeBtn.onclick = function () { remove(user.id) }

// edit button
    var editBtn = document.createElement("BUTTON"); 
    var editBtnText = document.createTextNode("Edit");
    editBtn.setAttribute('class','btn btn-secondary float-right edit-float-set');
    editBtn.appendChild(editBtnText);
    editBtn.onclick = function () {
        edit(user.id, user.name);
    }
    li.appendChild(editBtn);

    list.appendChild(li);
}

// This Function is for Database
function remove(key) {

    // ye remove() Firebase ka function hy
    database.child("user/" + key).remove();

}




function edit(key, text) {
    var newText = prompt("New Text", text); // taking new value from user
    var newData = {
        name: newText
    }
    database.child("user/" + key).update(newData); // updating data at database
}
 // event Listner

database.child("user").on("child_changed", function (data) {    // updating at ui
    var deletedLi = document.getElementById(data.key);
    var textSpan = deletedLi.firstChild;
    textSpan.innerText = data.val().name;
})
