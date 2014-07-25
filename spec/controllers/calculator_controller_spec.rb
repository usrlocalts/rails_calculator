require 'rails_helper'

describe CalculatorController, :type => :controller do

  describe "PUT update" do
    it "returns http success" do
      put :update, :command => "add 5"
      expect(response.status).to eq(200)
      expect(response.body).to eq("5.0")
    end
  end
end
