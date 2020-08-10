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
                current_chart = @company.charts.first
                if current_chart
                    @company.charts.first.destroy
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
            watchlist = Watchlist.find_by(id: params[:watchlistId])
            
            if watchlist && watchlist.user_id == user.id
                
                # map through the watchlist data and update database


                byebug

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





        # @company = Company.find_by(ticker: company_params[:ticker])
        
        # if (@company)
        #     @company.update(company_params)
        # else
        #     @company = Company.new(company_params)
        # end
        # if (@company.save)
        #     # byebug
        #     if (params[:chartData])
        #         current_chart = @company.charts.first
        #         if current_chart
        #             @company.charts.first.destroy
        #         end
                
        #         new_chart = @company.charts.build(chart_type: 'Candle', start_date: params[:chartStartDate], end_date: params[:chartEndDate])
        #         new_chart.save
        #         params[:chartData].each do |line|
                    
        #             new_chart.chart_lines.build(
        #                 date: line[:date],
        #                 open: line[:open],
        #                 high: line[:high],
        #                 low: line[:low],
        #                 close: line[:close]
        #             )
        #             new_chart.save
                    
        #         end
        #     end
            
        #     render json: @company
        # else
        #     render json: {response: "Error"}, status: 502 
        # end




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

    def daily_params
        params.require(:data).permit(
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

end
