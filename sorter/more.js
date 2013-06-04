var dragsort = ToolMan.dragsort();
var junkdrawer = ToolMan.junkdrawer();

function verticalOnly(item) {
    item.toolManDragGroup.verticalOnly()
}

function book_saveOrder(item) {
    var group = item.toolManDragGroup;
    var list = group.element.parentNode;
    var id = list.getAttribute("id");
    if (id == null) return;
    group.register("dragend", function () {
        ToolMan.cookies().set("list-" + id, junkdrawer.serializeList(list), 365)
    })
}

function book_saveSelection(item) {
    ToolMan.cookies().set("list-" + item, junkdrawer.serializeList(jQuery("#" + item)[0]), 365)
}

function book_sorter() {
    junkdrawer.restoreListOrder("pagelist");
    dragsort.makeListSortable(jQuery("#pagelist")[0], verticalOnly, book_saveOrder);
    book_saveSelection("pagelist")
}

//old: addEvent(window, 'load', book_sorter);
jQuery(window).load(function () {
    book_sorter();
});
