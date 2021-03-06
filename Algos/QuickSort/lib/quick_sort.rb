class QuickSort
  # Quick sort has average case time complexity O(nlogn), but worst
  # case O(n**2).

  # Not in-place. Uses O(n) memory.
  def self.sort1(array)
    
  end

  # In-place.
  def self.sort2!(array, start = 0, length = array.length, &prc)
    prc ||= Proc.new { |a, b| a <=> b }
    return array if length < 2
    pivot = self.partition(array, start, length, &prc)
    left_length = pivot - start
    right_length = length - (left_length + 1)
    self.sort2!(array, start, left_length, &prc)
    self.sort2!(array, pivot + 1, right_length, &prc)
    array
  end

  def self.partition(array, start, length, &prc)
    prc ||= Proc.new { |a, b| a <=> b }
    i = start
    pivot = array[start]
    j = i + 1
    while j < start + length
      if (prc.call(array[j], pivot) == -1)
        i += 1
        array[j], array[i] = array[i], array[j]
      end
      j += 1
    end
    array[i], array[start] = array[start], array[i]
    return i
  end
end
