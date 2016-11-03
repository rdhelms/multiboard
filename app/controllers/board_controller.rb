require 'pry'
#
class BoardController < ApplicationController
  def pick
  end

  def get
    background = Background.where('name' => params[:name]) # params[:name]

    render json: background.first.code
  end

  def create
    @scene = Scene.new(name: params[:name], data: params[:data]) # scene_params
    if @scene.save
      render json: @scene
    else
      render_error @scene.errors.full_messages
    end
  end

  def update
    @scene = Scene.find(params[:id])
    if @scene.update(params[:data])
      render json: @scene
    else
      render_error @scene.errors.full_messages
    end
  end

  private

  def scene_params
    params.require(:name).permit(:data) # permit is optional and assumes nesting
    # thing[:things], thing[:morethings]
  end
end

# first_or_create!
# belongs_to in model explicitly says you MUST have it in your object.
# render :show
# this goes in app/views/board/show.json.jbuilder


# auth system
# set up header as token: some number/char combo and set it to the current
  #user's token and only the user knows
# request.env['HTTP_TOKEN'] in current_user method in the application controller
# user.where(email:email).first_or_create!
# generate a token model - generates random tokens for users...
