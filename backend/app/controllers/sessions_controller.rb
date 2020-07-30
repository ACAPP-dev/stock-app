class SessionsController < ApplicationController
    def create()
        # byebug
        user = User.find_by(email: params[:email])

        if (user && user.authenticate(params[:password]))
            render json: user, only: [:email, :name]
        end
    end
end