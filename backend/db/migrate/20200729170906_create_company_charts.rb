class CreateCompanyCharts < ActiveRecord::Migration[6.0]
  def change
    create_table :company_charts do |t|
      t.integer :company_id
      t.integer :chart_id
      t.string :chart_type

      t.timestamps
    end
  end
end
