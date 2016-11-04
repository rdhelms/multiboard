class RemoveCodeFromBackgrounds < ActiveRecord::Migration[5.0]
  def change
    remove_column :backgrounds, :code, :binary
  end
end
