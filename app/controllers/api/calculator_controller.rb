class Api::CalculatorController < ApiController
  def calculator_create
    if current_user
      if current_user.calculator
        render :status => 200
      else
        Calculator.create({:state => 0, :user_id => current_user.id})
        render :status => 201
      end
    else
      head 401
    end
  end


  def calculator_update
    if current_user
      calculator = current_user.calculator
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
    else
      head 401
    end
  end
end
