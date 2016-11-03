Rails.application.routes.draw do
  get 'scene/index'

  get 'scene/get'

  post 'scene/create'

  patch 'scene/update'

  get 'background/index'

  get 'background/get'

  post 'background/create'

  patch 'background/update'

  # post "/background" => "background#create"
  #
  # post "/board" => "board#create"
  #
  # patch "/board/:id" => "board#update"
  #path has to indicate what you are updating
  root to: 'angular#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
