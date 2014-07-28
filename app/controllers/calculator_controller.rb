class CalculatorController < ApplicationController
  def update
    command = params[:command]   #like $_REQUEST
    calculator = create_or_find_calculator
    parser = Parser.new(calculator)
    operation = parser.parse(command)
    @text = operation.perform_operation(calculator)
    render 'create'
  end

  def create
    @text = create_or_find_calculator.state
  end

  def create_or_find_calculator
    Calculator.first || Calculator.create({:state => 0})
  end
end
