class AddReferredUsersToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referred_by_id, :integer
  end
end
