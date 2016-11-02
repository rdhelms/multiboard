require 'rails_helper'

RSpec.describe BoardController, type: :controller do

  describe "GET #pick" do
    it "returns http success" do
      get :pick
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #get" do
    it "returns http success" do
      get :get
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #set" do
    it "returns http success" do
      get :set
      expect(response).to have_http_status(:success)
    end
  end

end
