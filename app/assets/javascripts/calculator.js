var Calculator = function (templateId) {

    this.calculatorWrapperElement = $(templateId).clone().appendTo(".calculatorsWrapper");
    this.commandHistoryElement = this.calculatorWrapperElement.find(".history");
    this.submitElement = this.calculatorWrapperElement.find(".submit");
    this.commandElement = this.calculatorWrapperElement.find(".command");
    this.observers = $({});

    this.initialize();
};

Calculator.prototype = {
    initialize: function () {
        this.observeSubmitElement();
        this.ajaxCreate();
    },

    registerObserver: function (observer) {
        var self = this;
        this.observers.on("calculator:updated", _.bind(observer.handleAppendHistoryElement, observer));
    },

    handleAppendHistoryElement: function (event, command, state) {
        this.appendHistoryElement(event, command, state);
    },

    ajaxCreate: function () {
        var self = this;
        $.ajax({
            url: "/api/calculator_create",
            method: "POST"
        }).success(_.bind(self.ajaxCreateSuccess, self));
    },

    ajaxCreateSuccess: function (data, statusText, xhr) {
        this.appendElem(xhr.status);
    },

    ajaxUpdate: function (command) {
        var self = this;
        $.ajax({
            url: "/api/calculator_update",
            method: "PUT",
            data: {command: command},
            success: _.bind(self.ajaxUpdateSuccess, self)
        });
    },

    ajaxUpdateSuccess: function (data) {
        this.appendHistoryElement(null, this.commandElement.val(), data.state);
        this.notifyObservers(this.commandElement.val(), data.state);
    },

    notifyObservers: function (command, state) {
        this.observers.trigger("calculator:updated", [command, state]);
    },

    observeSubmitElement: function () {
        this.submitElement.click(_.bind(this.submitElementClick, this));
    },

    submitElementClick: function () {
        var self = this;
        return self.performCalculation(self.commandElement.val());
    },

    performCalculation: function (command) {
        var self = this;
        self.ajaxUpdate(command);
    },

    appendHistoryElement: function (event, command, state) {
        var self = this;
        var elem = "<h4>Operation: " + command + " Value: " +
            (arguments[2] === null ? "Undefined Operation" : arguments[2]) + "</h4>";
        self.commandHistoryElement.append(elem);
    },

    appendElem: function (status) {
        var self = this;
        self.commandHistoryElement.append("<h4>Calculator " +
            (status == 201 ? "Created" : "Found") + "</h4>");
    }
};


$(document).ready(function () {
    var calculators = [];
    $("#addCalculator").click(function () {
        var calc = new Calculator("#template .calculator");

        $.each(calculators, function (index, value) {
            value.registerObserver(calc);
            calc.registerObserver(value);
        });

        calculators.push(calc);
    });
});