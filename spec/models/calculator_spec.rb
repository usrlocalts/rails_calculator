require 'rails_helper'

describe Calculator do
  it 'should add 2' do
    calculator = Calculator.new({:state => 0})
    expect(calculator + 2).to eq(2)
  end

  it 'should subtract 2 from 4 to return 2' do
    calculator = Calculator.new({:state => 4})
    expect(calculator - 2).to eq(2)
  end

  it 'should multiply 2 to 4 to return' do
    calculator = Calculator.new({:state => 4})
    expect(calculator * 2).to eq(8)
  end

  it 'should divide 8 by 2 to give 4' do
    calculator = Calculator.new({:state => 8})
    expect(calculator / 2).to eq(4)
  end

  it 'should reset the value to 0' do
    calculator = Calculator.new({:state => 5})
    expect(calculator.cancel).to eq(0)
  end

  context "save check" do
    it 'should save the values correctly for add operation' do
      calculator = Calculator.new({:state => 0})
      calculator + 3
      expect(calculator.reload.state).to eq(3)
    end
    it 'should save the values correctly for subtract operation' do
      calculator = Calculator.new({:state => 3})
      calculator - 2
      expect(calculator.reload.state).to eq(1)
    end
    it 'should save the values correctly for multiply operation' do
      calculator = Calculator.new({:state => 1})
      calculator * 8
      expect(calculator.reload.state).to eq(8)
    end
    it 'should save the values correctly for divide operation' do
      calculator = Calculator.new({:state => 8})
      calculator / 4
      expect(calculator.reload.state).to eq(2)
    end
  end

end