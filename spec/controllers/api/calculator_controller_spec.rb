require 'rails_helper'

RSpec.describe Api::CalculatorController do

  context 'create' do
    it 'returns status 201 for calculator created' do
      post :calculator_create
      expect(response.status).to eq(201)
      expect(Calculator.count).to eq(1)
    end

    it 'returns status 200 for calculator already existing' do
      Calculator.create(:state => 5)
      post :calculator_create
      expect(response.status).to eq(200)
      expect(Calculator.count).to eq(1)
    end

  end

  context 'calculate' do
    it 'returns a json of the result for "add 5" command' do
      calculator = Calculator.create({:state => 0})
      put :calculator_update, :command => "add 5"
      expect(response.status).to eq(200)
      expect(response.body).to eq({:state => 5.0}.to_json)
    end

    it 'returns 404 if we directly call the update' do
      put :calculator_update, :command => "add 5"
      expect(response.status).to eq(404)
    end
  end

end
