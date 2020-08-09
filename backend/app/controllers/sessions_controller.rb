class SessionsController < ApplicationController
    def create()
        # byebug
        user = User.find_by(email: params[:email])
        watchlist_detail = []

        if (user && user.authenticate(params[:password]))
           
                
            render json: user
        end
    end
end