class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users, include: :watchlists
    end

end
