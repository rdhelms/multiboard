class BoardController < ApplicationController
  def pick
  end

  def get
    background = Background.where('name' => params[:name]) # params[:name]
    return background
  end

  def set
  end
end
