class SessionsController < ApplicationController
    def create()
        # byebug
        user = User.find_by(email: params[:email])

        if (user && user.authenticate(params[:password]))
            render json: user, only: [:id, :email, :name], include: [:watchlists]
        end
    end
end