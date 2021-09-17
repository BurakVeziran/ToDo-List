$(document).ready(function () {
    sortableMenu()
    notSortable()
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
    } else {
        alert("Todo must be at least 3 letter.")
    }
    saveLocalStorage()
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
})

function saveLocalStorage() {
    // var labels = document.querySelectorAll("label");
    // for (var i = 0; i <= inputElems.length; i++) {
    //     for (var j = 1; j <= (labels.length); j++) {
    //         if (inputElems[i].type === "checkbox" && inputElems[i].checked === false) {
    //             console.log(labels[j].innerHTML + '' + inputElems[i].checked)
    //         } else if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
    //             console.log(labels[j].innerHTML + '' + inputElems[i].checked)
    //          }
    //         }
    //     }
    // }
    // var labels = document.querySelectorAll("label")
    //
    // for (var i = 0; i <= inputElems.length; i++) {
    //     if (inputElems[i].type === "checkbox" && inputElems[i].checked === false) {
    //         for (var j = 1; j <= (labels.length); j++) {
    //             console.log(labels[j] + '' + inputElems[i].checked)
    //         }
    //     } else if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
    //         for (var k = 1; k <= (labels.length); k++) {
    //             console.log(labels[k] + '' + inputElems[i].checked)
    //         }
    //     }
    // }
}

function updateLocalStorage() {
    window.addEventListener("change", saveLocalStorage)
}


