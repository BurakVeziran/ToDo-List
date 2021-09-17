$(document).ready(function () {
    sortableMenu()
    notSortable()
    loadFromLocalStorage()
    updateItemLeft()
    updateLocalStorage()
});

var fixed = '.notSortable';
var items = 'li';
var todoList;
var inputElems = document.getElementsByTagName("input");

function sortableMenu (){
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
}

function notSortable() {
    $('ul').sortable({
        cancel: fixed,
        items: items,
        start: function () {
            $(fixed, this).each(function () {
                var $this = $(this);
                $this.data('pos', $this.index());
            });
        },
        change: function () {
            var $sortable = $(this);
            var $statics = $(fixed, this).detach();
            var tagName = $statics.prop('tagName');
            var $helper = $('<'+tagName+'/>').prependTo(this);
            $statics.each(function () {
                var $this = $(this);
                var target = $this.data('pos');
                $this.insertAfter($(items, $sortable).eq(target));
            });
            $helper.remove();
        }
    });
}

$( "#addButton" ).click(function() {
    var table = $( "#sortable" );
    var todoInput = $("#todo").val();
    todoList = '<li class="ui-sortable-handle">' +
                        '<input className="checkbox" type="checkbox" name="checkbox">' +
                        '<label name="checkboxLabel" for="checkbox">' + todoInput + '</label>' +
               '</li>';
    if (todoInput.length >= 3) {
        table.prepend(todoList);
        $("#notSortable").show("blind");
        itemLeft()
        $("#all").css(bold);
        document.getElementById('todo').value = '';
        saveLocalStorage()
    } else {
        alert("Todo must be at least 3 letter.")
    }
});

function itemLeft() {
        count = 0;
    for (var i=0; i<inputElems.length; i++) {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === false){
            count++;
            $("#itemLeft").html(count + ' ' + 'items left')
        } else if (count === 0)
            $("#itemLeft").html(0 + ' ' + 'items left')
    }
}

function updateItemLeft() {
    window.addEventListener("change", itemLeft)
}

var bold = {"color": " #000000", "font-weight": "bolder"}
var normal = {"color": "hsl(234, 39%, 85%)", "font-weight": "normal"}

function active(){
    $("#active").css(bold);
    $("#complated").css(normal);
    $("#all").css(normal);
    for (var i=0; i<inputElems.length; i++) {

        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            inputElems[i].parentNode.style.display = "none" ;
        }else if (inputElems[i].type === "checkbox" && inputElems[i].checked === false) {
            inputElems[i].parentNode.style.display = "list-item" ;
        }
    }
}

$( "#active" ).click(function() {
    active()
    itemLeft()
})

function complated(){
    $("#complated").css(bold);
    $("#active").css(normal);
    $("#all").css(normal);
    for (var i=0; i<inputElems.length; i++) {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === false) {
            inputElems[i].parentNode.style.display = "none" ;
        } else if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            inputElems[i].parentNode.style.display = "list-item" ;
        }
    }
}

$( "#complated" ).click(function() {
    complated()
    itemLeft()
})

function all(){
    $("#all").css(bold);
    $("#complated").css(normal);
    $("#active").css(normal);
    for (var i=0; i<inputElems.length; i++) {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === false || inputElems[i].checked === true) {
            inputElems[i].parentNode.style.display = "list-item" ;
        }
    }
}

$( "#all" ).click(function() {
    all()
    itemLeft()
})

function clearComplated(){
    $("#all").css(bold);
    $("#complated").css(normal);
    $("#active").css(normal);
    for (var i=0; i<inputElems.length; i++) {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === false) {
            inputElems[i].parentNode.style.display = "list-item" ;
        } else if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            var deleted = inputElems[i].parentNode
            deleted.remove();
            clearComplated()
        }
    }
}

$( "#clearComplated" ).click(function() {
    clearComplated()
    itemLeft()
    if(inputElems.length === 1){
        $("#notSortable").hide()
    }
    saveLocalStorage()
})

function saveLocalStorage() {
    var labels = document.getElementsByName("checkboxLabel");
    var store = [];
    var checkStatus = [];
    for (var j = 0; j < (labels.length); j++) {
        store.push(labels[j].innerHTML);
        localStorage.setItem("label", JSON.stringify(store));
    }
    for (var i = 0; i < inputElems.length; i++) {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === false) {
            checkStatus.push("false");
            localStorage.setItem("checkStatus", JSON.stringify(checkStatus));
            console.log(JSON.parse(localStorage.getItem("checkStatus")))
        } else if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            checkStatus.push("true");
            localStorage.setItem("checkStatus", JSON.stringify(checkStatus));
            console.log(JSON.parse(localStorage.getItem("checkStatus")));
        }
    }
}

function updateLocalStorage() {
    window.addEventListener("change", saveLocalStorage)
}

function loadFromLocalStorage() {
    var table = $( "#sortable" );
    var todoInput = JSON.parse(localStorage.getItem("label"));
    var checkStatus = JSON.parse(localStorage.getItem("checkStatus"))
    if (todoInput.length > 0){
        $("#notSortable").show("blind");
        itemLeft()
        $("#all").css(bold);
    }
    for (i =0; i < todoInput.length; i++) {
        todoList = '<li class="ui-sortable-handle">' +
            '<input className="checkbox" type="checkbox" name="checkbox">' +
            '<label name="checkboxLabel" for="checkbox">' + todoInput[i] + '</label>' +
            '</li>';
        table.prepend(todoList)
        if (checkStatus === true){
            console.log("basılacak")
        }
    }
}