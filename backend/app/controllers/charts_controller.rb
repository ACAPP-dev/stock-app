class ChartsController < ApplicationController
    def index
        charts = Chart.all 
        render json: charts
    end
end
