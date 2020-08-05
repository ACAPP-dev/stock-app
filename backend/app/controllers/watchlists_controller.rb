class WatchlistsController < ApplicationController

    def index
        user = User.find_by(id: params[:user_id])
        # byebug
        if user
            # render json: user.watchlists, only: [:id, :name, :description]
            render json: user.watchlists, only: [:user_id, :id, :name, :description]
        else
            render json: {response: "User not found!"}, status: 404
        end
    end

    def create
        user = User.find_by(id: params[:user_id])
        # byebug
        if user
            user.watchlists.build(watchlist_params)
            if user.save
                render json: user.watchlists, only: [:user_id, :id, :name, :description]
            else
                render json: {response: "Error!"}, status: 502
            end
        else
            render json: {response: "User not found!"}, status: 404
        end

    end

    def show
        user = User.find_by(id: params[:user_id])
        # byebug
        if user
            watchlist = Watchlist.find_by(id: params[:id])
            if watchlist && watchlist.user_id == user.id
                render json: watchlist
            else
                render json: {response: "Watchlist not found!"}, status: 404
            end
        else
            render json: {response: "User not found!"}, status: 404
        end 
    end

    private

    def watchlist_params
        params.require(:watchlist).permit(:name, :description)
    end
end
