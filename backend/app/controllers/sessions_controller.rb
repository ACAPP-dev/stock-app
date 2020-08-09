class SessionsController < ApplicationController
    def create()
        # byebug
        user = User.find_by(email: params[:email])
        watchlist_detail = []

        if (user && user.authenticate(params[:password]))
            if user.watchlists
                user.watchlists.map do |watchlist|
                    byebug
                    watchlist_detail.push(watchlist.companies)
                end
            end
                
            render json: user, only: [:id, :email, :name], include: [:watchlists]
        end
    end
end