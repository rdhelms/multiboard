Rails.application.routes.draw do
  get 'board/pick'

  get 'board/get'

  post "/board" => "board#create"
  # post 'board/set'

  patch "/board/:id" => "board#update"
  #path has to indicate what you are updating
  root to: 'angular#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
