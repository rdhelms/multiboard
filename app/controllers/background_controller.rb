#
class BackgroundController < ApplicationController
  def index
    @backgrounds = Background.all

    render json: @backgrounds
  end

  def get
    @background = Background.where(id: params[:id])

    render json: @background.first
  end

  def create
    @background = Background.new(name: params[:name], data: params[:data])
    if @background.save
      render json: @background
    else
      render_error @background.errors.full_messages
    end
  end

  def update
    @background = Background.find(params[:id])
    if @background.update(data: params[:data])
      render json: @background
    else
      render_error @background.errors.full_messages
    end
  end
end
