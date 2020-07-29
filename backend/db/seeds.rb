# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create user(s)

user1 = User.create(name: 'Andrew Capp', email: 'acapp909@gmail.com', password: '1234')

user2 = User.create(name: 'Dad', email: 'dad@gmail.com', password: '1111')

# Build database of tickers


