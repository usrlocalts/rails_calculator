require 'rails_helper'

describe Parser do

  it 'should parse add 5 and return operation object' do
    parser = Parser.new(Calculator.new({:state => 0}))
    operation = parser.parse("add 5")
    expect(operation).to eq(Operation.new("add", "5"))
  end
end