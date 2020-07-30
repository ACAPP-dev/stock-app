class WatchlistsController < ApplicationController

    def index
        user = User.find_by(id: params[:id])
        byebug
        if user
            render json: user.watchlists, only: [:name, description]
        else
            render json: {response: "User not found!"}, status: 404
        end
    end
end
