class WatchlistsController < ApplicationController

    def index
        user = User.find_by(id: params[:user_id])
        # byebug
        if user
            render json: user.watchlists, only: [:id, :name, :description]
        else
            render json: {response: "User not found!"}, status: 404
        end
    end

    def create
        user = User.find_by(id: params[:user_id])
        # byebug
        if user
            watchlist = Watchlist.new(watchlist_params)
            if watchlist.save
                render json: watchlist, only: [:id, :name, description]
            else
                render json: {response: "Error!"}, status: 502
            end
        else
            render json: {response: "User not found!"}, status: 404
        end

    end

    private

    def watchlist_params
        params.require(:watchList).permit(:name, :description)
    end
end
