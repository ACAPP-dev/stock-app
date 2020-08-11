class SessionsController < ApplicationController
    def create()
        user = User.find_by(email: params[:email])
        
        if (user && user.authenticate(params[:password]))
            render json: user
        else
            render json: {response: "User not found or bad password!"}, status: 404
        end
    end
end