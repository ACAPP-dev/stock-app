Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  post '/watchlists/addcompany', to: 'watchlists#add_company'
  delete '/watchlists/removecompany/:company_id', to: 'watchlists#remove_company'

  resources :charts
  resources :companies
  resources :watchlists
  resources :tickers
  resources :users do
    resources :watchlists
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
