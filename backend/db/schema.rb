# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_29_170935) do

  create_table "chart_lines", force: :cascade do |t|
    t.integer "chart_id"
    t.string "date"
    t.string "open"
    t.string "high"
    t.string "low"
    t.string "close"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "charts", force: :cascade do |t|
    t.integer "company_id"
    t.string "chart_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string "ticker"
    t.string "name"
    t.string "country"
    t.string "exchange"
    t.string "market_cap"
    t.string "outstanding_shares"
    t.string "web_url"
    t.string "logo"
    t.string "industry"
    t.string "three_month_trading_volume"
    t.string "fifty_two_week_high"
    t.string "fifty_two_week_high_date"
    t.string "fifty_two_week_low"
    t.string "fifty_two_week_low_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tickers", force: :cascade do |t|
    t.string "ticker"
    t.string "ticker_name"
    t.string "exchange"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "watchlist_companies", force: :cascade do |t|
    t.integer "watchlist_id"
    t.integer "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "watchlists", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
