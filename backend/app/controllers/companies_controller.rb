class CompaniesController < ApplicationController
    def create
        
        company = Company.find_by(ticker: params[:ticker])
        byebug
        if (company)
            company.update(company_params)
        else
            company = Company.new(company_params)
            if (company.save)
                render json: company
            else
                render json: {response: "Error"}, status: 402 
            end
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
end
