#Parser class parses the input string to return an operation object
class Parser
  def initialize(calculator)
    @calculator = calculator
  end

  def parse(input)
    operation, operand = input.split
    Operation.new(operation, operand)
  end

end