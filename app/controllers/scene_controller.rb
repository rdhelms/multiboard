#
class SceneController < ApplicationController
  def index
    @scene = Scene.all

    render json: @scenes
  end

  def get
    @scene = Scene.where(id: params[:id])

    render json: @scene.first
  end

  def create
    @scene = Scene.new(name: params[:name], data: params[:data])
    if @scene.save
      render json: @scene
    else
      render_error @scene.errors.full_messages
    end
  end

  def update
    @scene = Scene.find(params[:id])
    if @scene.update(data: params[:data])
      render json: @scene
    else
      render_error @scene.errors.full_messages
    end
  end
end
