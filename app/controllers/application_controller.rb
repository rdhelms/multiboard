#
class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  # need to figure out

  def render_error
    result = {
      ok: false,
      error: desc
    }
    render json: result, status: 422
  end
end
