#
class AddImgToBackgrounds < ActiveRecord::Migration[5.0]
  def change
    add_column :backgrounds, :img, :string
  end
end
