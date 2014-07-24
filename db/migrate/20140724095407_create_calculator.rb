class CreateCalculator < ActiveRecord::Migration
  def change
    create_table :calculators do |t|
      t.float :state
    end
  end
end
