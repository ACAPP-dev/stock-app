class CreateCharts < ActiveRecord::Migration[6.0]
  def change
    create_table :chart_lines do |t|
      t.integer :chart_id
      t.string :date
      t.string :open
      t.string :high
      t.string :low
      t.string :close

      t.timestamps
    end
  end
end
