class Toy < ApplicationRecord
  validates :name, :toyable_id, :toyable_type, presence: true
  validates :name, uniqueness: true

  belongs_to :toyable, polymorphic: true
end
