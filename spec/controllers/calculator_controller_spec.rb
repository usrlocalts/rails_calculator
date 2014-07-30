require 'rails_helper'

describe CalculatorController, :type => :controller do

  context "PUT update" do
    let(:valid_user) { User.create({:email => "abhinav.koppula@gmail.com", :password => "abhinav123"}) }
    before(:each) do
      sign_in :user, valid_user
    end
    it "returns http success" do
      put :update, :command => "add 5"
      expect(response.status).to eq(200)
      expect(assigns[:text]).to eq(5.0)
    end
  end
end
