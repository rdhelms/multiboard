Rails.application.routes.draw do
  get 'board/pick'

  get 'board/get'

  get 'board/set'

  root to: 'angular#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
