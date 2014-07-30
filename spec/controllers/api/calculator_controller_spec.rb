require 'rails_helper'

RSpec.describe Api::CalculatorController do

  context 'logged in user' do
    let(:valid_user) { User.create({:email => "abhinav.koppula@gmail.com", :password => "abhinav123"}) }
    before(:each) do
      sign_in :user, valid_user
    end

    it 'returns status 201 for calculator created' do
      post :calculator_create
      expect(response.status).to eq(201)
      expect(valid_user.reload.calculator).to_not eq(nil)
    end

    it 'returns status 200 for calculator already existing' do
      Calculator.create(:state => 5, :user => valid_user)
      post :calculator_create
      expect(response.status).to eq(200)
      expect(Calculator.count).to eq(1)
    end

    it 'returns a json of the result for "add 5" command' do
      calculator = Calculator.create({:state => 0, :user => valid_user})
      put :calculator_update, :command => "add 5"
      expect(response.status).to eq(200)
      expect(response.body).to eq({:state => 5.0}.to_json)
    end
  end

  context 'logged out user' do
    let(:valid_user) { User.create({:email => "abhinav.koppula@gmail.com", :password => "abhinav123"}) }
    it 'returns status 401 for calculator created if there is no logged in user' do
      original_count = Calculator.count

      post :calculator_create, {:format => :json}
      expect(response.status).to eq(401)
      expect(Calculator.count).to eq(original_count)
    end
  end


  context "user logged in but corresponding calculator not found" do
    let(:valid_user) { User.create({:email => "abhinav.koppula@gmail.com", :password => "abhinav123"}) }
    it 'returns 404 if we directly call the update' do
      sign_in :user, valid_user
      put :calculator_update, :command => "add 5"
      expect(response.status).to eq(404)
    end
  end
end
