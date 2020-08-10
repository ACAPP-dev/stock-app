class CompaniesController < ApplicationController
    def index
        @company = Company.all 
        render json: @company
    end

    def create
        
        @company = Company.find_by(ticker: company_params[:ticker])
        
        if (@company)
            @company.update(company_params)
        else
            @company = Company.new(company_params)
        end
        if (@company.save)
            # byebug
            if (params[:chartData])
                current_chart = @company.charts.find_by(chart_type: 'Candle')
                if current_chart
                    # @company.charts.first.destroy
                    current_chart.destroy
                end
                
                new_chart = @company.charts.build(chart_type: 'Candle', start_date: params[:chartStartDate], end_date: params[:chartEndDate])
                new_chart.save
                params[:chartData].each do |line|
                    
                    new_chart.chart_lines.build(
                        date: line[:date],
                        open: line[:open],
                        high: line[:high],
                        low: line[:low],
                        close: line[:close]
                    )
                    new_chart.save
                    
                end
            end
            
            render json: @company
        else
            render json: {response: "Error"}, status: 502 
        end
    end

    def add_daily_data
        

        user = User.find_by(id: params[:userId])
        
        if user
            @watchlist = Watchlist.find_by(id: params[:watchlistId])
            
            if @watchlist && @watchlist.user_id == user.id
                
                # map through the watchlist data and update database

                params[:data].each do |ticker, object|
                    # byebug
                    company = @watchlist.companies.find(ifnone=nil) {|company| company.ticker == ticker}
                    if company
                        # company = Company.find_by(ticker: ticker)
                        # need to update with params data
                        company.update(daily_params(object))
                        company.save
                    else
                        @watchlist.companies.build(daily_params(object))
                    end
                    @watchlist.save
                    # byebug
                    chart = company.charts.find_by(chart_type: 'daily')
                    if chart
                        chart.destroy
                    end
                    
                    new_chart = company.charts.build(chart_type: 'daily', start_date: object[:chartData][:chartStartDate], end_date: object[:chartData][:chartEndDate])
                    new_chart.save
                    object[:chartData][:chartData].each do |line|
                        
                        new_chart.chart_lines.build(
                            date: line[:date],
                            open: line[:open],
                            high: line[:high],
                            low: line[:low],
                            close: line[:close]
                        )
                        new_chart.save
                        company.save
                        @watchlist.save
                        
                    end
                    
                end 
            else
                render json: {response: "Watchlist not found!"}, status: 404
            end
        else
            render json: {response: "User not found!"}, status: 404
        end 
        # byebug
        # Need to render new watchlist with the companies and charts
        render json: @watchlist, serializer: WatchlistSerializer

    end

    private

    def company_params
        params.require(:data).permit(
            :ticker,
            :name,
            :country,
            :exchange,
            :market_cap,
            :outstanding_shares,
            :web_url,
            :logo,
            :industry,
            :current_price,
            :previous_close_price,
            :three_month_trading_volume,
            :fifty_two_week_high,
            :fifty_two_week_high_date,
            :fifty_two_week_low,
            :fifty_two_week_low_date
        )
    end

    def chart_params
        params.permit(:chartData => [:date, :open, :high, :low, :close])
    end

    def daily_params(object)
        object.require(:companyData).permit(
            :ticker,
            :name,
            :country,
            :exchange,
            :market_cap,
            :outstanding_shares,
            :web_url,
            :logo,
            :industry
        )
    end

    def daily_chart_params(object)
        params.permit(:chartData => [:date, :open, :high, :low, :close])
    end
end
