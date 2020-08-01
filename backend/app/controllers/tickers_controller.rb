class TickersController < ApplicationController
    def index
        tickers = Ticker.all 
        if (tickers)
            render json: tickers, only: [:id, :ticker, :ticker_name, :exchange]
        end
    end
end
