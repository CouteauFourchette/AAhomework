require_relative 'heap'

def k_largest_elements(array, k)
  i = 0
  biggest = []
  heap = BinaryMinHeap.new(){ |a, b| b <=> a}
  array.each { |el| heap.push(el) }
  while (array.count - heap.count) < k
    biggest << heap.extract
  end
  biggest
end
