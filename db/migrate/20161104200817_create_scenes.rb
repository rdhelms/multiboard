class CreateScenes < ActiveRecord::Migration[5.0]
  def change
    create_table :scenes do |t|
      t.string :name
      t.json :img

      t.timestamps
    end
  end
end
