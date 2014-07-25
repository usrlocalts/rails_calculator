#Operation is used to check equality of two operation objects and perform the operation
class Operation
  attr_reader :operand, :operation

  def initialize(operation, operand)
    @operation = operation
    @operand = operand
  end

  def ==(other)
    return true if self.equal?(other)
    return false if other.nil?
    return false if other.class != self.class
    @operand == other.operand && @operation == other.operation
  end

  def hash
    37*([@operand, @operation].hash)
  end

  def eql? other
    self == other
  end

  def perform_operation(calculator)
    case @operation
      when "add"
        calculator + (@operand.to_f)
      when "subtract"
        calculator - (@operand.to_f)
      when "multiply"
        calculator * (@operand.to_f)
      when "divide"
        calculator / (@operand.to_f)
      when "cancel"
        calculator.cancel
    end
  end
end