class CreateBackgrounds < ActiveRecord::Migration[5.0]
  def change
    create_table :backgrounds do |t|
      t.string :name
      t.json :img

      t.timestamps
    end
  end
end
