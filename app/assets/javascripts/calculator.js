var Calculator = function (templateId, wrapperId) {

    this.calculatorWrapperElement = $(templateId).clone().appendTo(wrapperId);
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

CalculatorGenerator = function (calculatorGeneratorId, templateId) {
    this.calculatorGeneratorWrapper = $(calculatorGeneratorId);
    this.addCalculatorButton = this.calculatorGeneratorWrapper.find("#addCalculator");
    this.calculatorsWrapper = this.calculatorGeneratorWrapper.find(".calculatorsWrapper");
    this.templateCalculator = $(templateId +" .calculator");
    this.calculators = [];

    this.initialize();
};

CalculatorGenerator.prototype = {
    initialize: function () {
        this.addCalculator();
    },

    addCalculator: function () {
        var self = this;
        self.addCalculatorButton.click(_.bind(self.handleAddCalculatorClick, self));
    },

    handleAddCalculatorClick: function () {
        var self = this;
        var newCalculator = new Calculator(self.templateCalculator, self.calculatorsWrapper);

        $.each(self.calculators, function (index, calculator) {
            calculator.registerObserver(newCalculator);
            newCalculator.registerObserver(calculator);
        });

        self.calculators.push(newCalculator);
    }
};

$(document).ready(function () {
    var calculatorGenerator = new CalculatorGenerator("#calculatorGenerator", "#template");
});