class CreateCompanyCharts < ActiveRecord::Migration[6.0]
  def change
    create_table :charts do |t|
      t.integer :company_id
      t.string :chart_type

      t.timestamps
    end
  end
end
