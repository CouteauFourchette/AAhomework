

fishes = ['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']

#### find the longest fish with O(n^2) ####

def sluggish_octopus(fishes)
  fishes.each do |fish|
    biggest_fish = true
    fishes.each do |other_fish|
      biggest_fish = false if other_fish.length > fish.length
    end
    return fish if biggest_fish
  end
end

puts sluggish_octopus(fishes)

#### Find the longest fish in O(n log n) ####

class Array
  # Write a new `Array#merge_sort` method; it should not modify the
  # array it is called on, but create a new sorted array.
  def merge_sort(&prc)
    prc ||= proc { |a,b| a <=> b }

    return self if self.length <= 1

    middle = self.length / 2
    left = self[0...middle].merge_sort(&prc)
    right = self[middle...self.length].merge_sort(&prc)

    Array.merge(left, right, &prc)
  end

  private
  def self.merge(left, right, &prc)
    merged = []
    while left.length > 0 && right.length > 0
      if prc.call(left[0],right[0]) == -1
        merged << left.shift
      else
        merged << right.shift
      end
    end
    merged + left + right
  end
end

def dominant_octopus(fishes)
  fishes.merge_sort { |x, y| x.length <=> y.length }
  fishes.last
end

puts dominant_octopus(fishes)

#### Find the longest fish in O(n) time ####

def clever_octopus(fishes)
  longest_fish = ''
  fishes.each do |fish|
    longest_fish = fish if fish.length > longest_fish.length
  end
  longest_fish
end

puts clever_octopus(fishes)

tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", "left",  "left-up" ]

#### return the tentacle number in O(n) ####

def slow_dance(direction, tile_array)
  tile_array.length.times do |i|
    return i if tile_array[i] == direction
  end
end

puts slow_dance("right-down", tiles_array)

tiles_hash = tiles_array.map.with_index { |x, i| [x, i] }.to_h

def fast_dance(direction, tiles_hash)
  return tiles_hash[direction]
end

puts fast_dance("right-down", tiles_hash)
