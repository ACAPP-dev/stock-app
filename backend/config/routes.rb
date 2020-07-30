Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  
  resources :charts
  resources :companies
  resources :watchlists
  resources :tickers
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
