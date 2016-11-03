require 'pry'
#
class BoardController < ApplicationController
  def pick
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
