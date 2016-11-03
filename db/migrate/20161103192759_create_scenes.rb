class CreateScenes < ActiveRecord::Migration[5.0]
  def change
    create_table :scenes do |t|
      t.string :name
      t.jsonb :data

      t.timestamps
    end
  end
end
