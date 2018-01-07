class QuickSort
  # Quick sort has average case time complexity O(nlogn), but worst
  # case O(n**2).

  # Not in-place. Uses O(n) memory.
  def self.sort1(array)
    
  end

  # In-place.
  def self.sort2!(array, start = 0, length = array.length, &prc)
    if (length > 0)
      pivot = self.partition(array, start, length, &prc)
      self.sort2!(array, pivot, length - pivot, &prc)
      self.sort2!(array, start, pivot - start, & prc)
    end
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
