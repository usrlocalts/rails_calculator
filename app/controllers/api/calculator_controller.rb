class Api::CalculatorController < ApplicationController
  def calculator_create
    if Calculator.first
      render :status => 200
    else
      Calculator.create({:state => 0})
      render :status => 201
    end
  end

  def calculator_update
    calculator = Calculator.first
    if calculator
      command = params[:command]
      parser = Parser.new(calculator)
      operation = parser.parse(command)
      result = operation.perform_operation(calculator)
      json_obj = {:state => result}
      render :json => json_obj
    else
      head 404
    end
  end
end
