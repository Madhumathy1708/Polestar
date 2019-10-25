$(document).ready(function() {

    // on any click on the element
  $(document).click(function() {
    //always hide the popup on any click
    showHidePopUp(false);
  });

  // always hide the popup
  showHidePopUp(false);

  // default disable the button
  $(".cancel").attr("disabled", true);

  // add event handlers to the elements
  addHandlersToElements();

  // show hide based on table rows
  showHideTableBasedOnRows();
});

// add handlers to elements
function addHandlersToElements() {
  // add button handler
  var addButton = $(".list_add");
  if (addButton) {
    addButton.click(addRowClick);
  }
  // delete button handler
  var deleteButton = $(".list_cancel");
  if (deleteButton) {
    deleteButton.click(function() {
      deleteRowClick($(this));
    });
  }

  // save button handler
  var saveButton = $(".submit");
  if(saveButton){
      saveButton.click(function(event){
        saveButtonClick(event);
      });
  }

  // select change handler
  var select = $(".label");
  if(select){
      select.change(function() {
        onStatusSelectChange($(this));
      });
  }
}

// on status change
function onStatusSelectChange(selectElement){
    var selectedVal = selectElement.children("option:selected").val();
    console.log(selectedVal);
    $("#" + selectElement.closest("tr").attr("id")).css('background-color', selectedVal);
}

// function for save button click
function saveButtonClick(event){
    showHidePopUp(true);

    // Stop this propagating further
    // as this will make sure the popup
    // is displayed
    // else this will be propagated
    // further and the popup will be hidden
    event.stopPropagation();
}

// Show or hide the popup
function showHidePopUp(show){
    var popUpElement = $(".popup");
    if(show){
        popUpElement.show();
    }else{
        popUpElement.hide();
    }
}

// delete a row on click
function deleteRowClick(clickedDelButton) {
  $("#" + clickedDelButton.closest("tr").attr("id")).remove();
  showHideTableBasedOnRows();
}

// function that adds a new row on each click
function addRowClick() {
  var tableBody = getTableBody();
  if (tableBody) {
    // get the template to clone
    var templateToClone = getTemplateRowOfTableBody(tableBody).clone(true);
    // remove the className template_row
    templateToClone.removeClass(getTemplateRowClassName());
    templateToClone.show();
    templateToClone.attr("id", generateRandomId());
    templateToClone.addClass("row");
    // clone it to tablebody before no entries
    templateToClone.insertBefore(getNoEntriesRowOfTableBody(tableBody));
    //templateToClone.appendTo(tableBody);
    showHideTableBasedOnRows();
  }
}

// Generate a random ID
function generateRandomId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
}

// This function shows/hides the table rows based on
// the number of rows
function showHideTableBasedOnRows() {
  var rowsCount = 0;

  // get the table by class
  var tableBody = getTableBody();
  if (tableBody) {
    //
    // template row should always be hidden
    //
    getTemplateRowOfTableBody(tableBody).hide();

    // get the non template and non no entries rows count
    rowsCount = tableBody.find("tr:not(.template_row,.no_entries_row)").length;

    if (rowsCount > 0) {
      getNoEntriesRowOfTableBody(tableBody).hide();
    } else {
      getNoEntriesRowOfTableBody(tableBody).show();
    }
  }
  // default disable the button
  $(".submit").attr("disabled", rowsCount < 1);
}

// gets the common table body
function getTableBody() {
  return $(".common_table tbody");
}

// get no entries row of passed table body
function getNoEntriesRowOfTableBody(tableBody) {
  if (tableBody) {
    return tableBody.find("tr.no_entries_row");
  }
}

// get template row class name
function getTemplateRowClassName() {
  return "template_row";
}

// get template row of the passed table
function getTemplateRowOfTableBody(tableBody) {
  if (tableBody) {
    return tableBody.find("tr." + getTemplateRowClassName());
  }
}
