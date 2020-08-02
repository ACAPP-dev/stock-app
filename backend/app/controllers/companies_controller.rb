class CompaniesController < ApplicationController
    def index
        company = Company.all 
        render json: company
    end

    def create
        
        company = Company.find_by(ticker: params[:ticker])
        
        if (company)
            company.update(company_params)
        else
            company = Company.new(company_params)
        end
        if (company.save)
            # byebug
            if (params[:chartData])
                new_chart = company.charts.build(chart_type: 'Candle')
                new_chart.save
                chart_params.each do |line|
                    byebug
                    new_chart.chart_lines.build(
                        date: line.date,
                        open: line.open,
                        high: line.high,
                        low: line.low,
                        close: line.close
                    )
                    new_chart.save
                end
            end
            render json: company, new_chart
        else
            render json: {response: "Error"}, status: 502 
        end
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
end
