class CalculatorController < ApplicationController
  def update
    command = params[:command]   #like $_REQUEST
    calculator = Calculator.new({:state => 0})
    parser = Parser.new(calculator)
    operation = parser.parse(command)
    render :text => operation.perform_operation(calculator), :status => :ok
  end

  def create

  end
end
