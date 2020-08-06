class WatchlistsController < ApplicationController

    def index
        if params[:user_id]
            user = User.find_by(id: params[:user_id])
            if user
                
                watchlists = user.watchlists
                render json: watchlists
            else
                render json: {response: "User not found!"}, status: 404
            end
        else
            watchlists = Watchlist.all 
            render json: watchlists
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
        if params[:user_id]
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
        else
            watchlist = Watchlist.find_by(id: params[:id])
            render json: watchlist
        end
    end

    def destroy
        user = User.find_by(id: params[:user_id])
        # byebug
        if user
            watchlist = Watchlist.find_by(id: params[:id])
            if watchlist && watchlist.user_id == user.id
                watchlist.destroy
            else
                render json: {response: "Watchlist not found!"}, status: 404
            end
        else
            render json: {response: "User not found!"}, status: 404
        end 
        
        render json: user.watchlists
    end

    def add_company
        user = User.find_by(id: params[:userId])
        
        if user
            watchlist = Watchlist.find_by(id: params[:watchlistId])
            
            if watchlist && watchlist.user_id == user.id
                
                # byebug
                if !watchlist.companies.find(ifnone=nil) {|company| company.ticker == params[:ticker]}
                    company = Company.find_by(ticker: params[:ticker])
                    if company
                        watchlist.companies.push(company)
                    else
                        watchlist.companies.build(ticker: params[:ticker])
                    end
                    watchlist.save
                end
            else
                render json: {response: "Watchlist not found!"}, status: 404
            end
        else
            render json: {response: "User not found!"}, status: 404
        end 
        # byebug
        render json: watchlist

    end

    def remove_company
        user = User.find_by(id: params[:userId])
        
        if user
            watchlist = Watchlist.find_by(id: params[:watchlistId])
            company = Company.find_by(id: params[:companyId])
            if watchlist && watchlist.user_id == user.id
                watchlist.companies.delete(company)
            else
                render json: {response: "Watchlist not found!"}, status: 404
            end
        else
            render json: {response: "User not found!"}, status: 404
        end 
        
        render json: watchlist

    end

    private

    def watchlist_params
        params.require(:watchlist).permit(:name, :description)
    end
end
