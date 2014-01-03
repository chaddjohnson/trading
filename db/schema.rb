# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140103211044) do

  create_table "accounts", force: true do |t|
    t.decimal  "balance",                       precision: 10, scale: 2,                        null: false
    t.string   "account_api",                                            default: "simulation", null: false
    t.string   "account_streamer",                                       default: "generated",  null: false
    t.string   "token",            limit: 32,                                                   null: false
    t.string   "account_data",     limit: 2048,                                                 null: false
    t.datetime "created_at",                                                                    null: false
    t.datetime "updated_at",                                                                    null: false
  end

  create_table "positions", force: true do |t|
    t.integer  "account_id",  limit: 2,                          null: false
    t.integer  "security_id", limit: 2,                          null: false
    t.decimal  "cost_basis",            precision: 10, scale: 2, null: false
    t.integer  "shares",      limit: 2,                          null: false
    t.datetime "bought_at",                                      null: false
    t.decimal  "buy_price",             precision: 6,  scale: 2, null: false
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
  end

  create_table "securities", force: true do |t|
    t.string "symbol",   limit: 10, null: false
    t.string "exchange", limit: 6,  null: false
    t.string "name",     limit: 75, null: false
  end

  add_index "securities", ["symbol"], name: "index_securities_on_security", unique: true, using: :btree

end
