// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var Calculator = function (commandHistoryElement) {
    this.commandHistoryElementId = commandHistoryElement;
    var calc = this;
    $.ajax({
        url: "/api/calculator_create",
        method: "POST"
    }).done(function (data, statusText, xhr) {
        $("#" + calc.commandHistoryElementId).append("<h4>Calculator " + (xhr.status == 201 ? "Created" : "Found") + "</h4>");
    })
}

Calculator.prototype = {
    perform_calculation: function (command) {
        var calc = this;
        $.ajax({
            url: "/api/calculator_update",
            method: "PUT",
            data: {command: command},
            success: function (data) {
                calc.append_history_element(data.state);
            }
        })
        return false;
    },
    append_history_element: function (state) {
        var elem = "<h4>Operation: " + $("#command").val() + " Value: " + (state == null ? "Undefined Operation" : state) + "</h4>";
        $("#" + this.commandHistoryElementId).append(elem);
    }
}


$(document).ready(function () {
    var calculator = new Calculator("calculator_history");
    $("#calculator_form").submit(function () {
        return calculator.perform_calculation($("#command").val());
    });
});