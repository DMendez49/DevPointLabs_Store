class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :price
      t.text :desc
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
