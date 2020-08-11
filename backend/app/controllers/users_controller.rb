class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users, include: :watchlists
    end

    def create()
        # byebug
        user = User.find_by(email: params[:email])
        if !user
            user = User.new(user_params)
        # watchlist_detail = []

            if (user.save)
                render json: user
            else
                render json: {response: "Error - user not created!"}, status: 502
            end
        else
            render json: user
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password)
    end
end
