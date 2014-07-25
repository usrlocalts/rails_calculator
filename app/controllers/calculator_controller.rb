class CalculatorController < ApplicationController
  def update
    command = params[:command]   #like $_REQUEST
    calculator = Calculator.first || Calculator.create({:state => 0})
    parser = Parser.new(calculator)
    operation = parser.parse(command)
    @text = operation.perform_operation(calculator)
    render 'create'
  end

  def create
    @text = Calculator.first.state
  end
end
