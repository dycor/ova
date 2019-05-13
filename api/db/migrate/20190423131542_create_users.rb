class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :firstname
      t.string :email
      t.string :password_digest
      t.text :description
      t.text :profileImage

      t.timestamps
    end
  end
end
