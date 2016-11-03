require 'pry'
class BoardController < ApplicationController
  def pick
  end

  def get
    background = Background.where('name' => params[:name]) # params[:name]
    render json: background.first.code
  end

  def set
  end
end
