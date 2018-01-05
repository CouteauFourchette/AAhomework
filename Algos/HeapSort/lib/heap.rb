class BinaryMinHeap
  attr_reader :store, :prc

  def initialize(&prc)
    @prc = prc || Proc.new { |a, b| a <=> b }
    @store = []
  end

  def count
    @store.count
  end

  def extract
    @store[0], @store[count - 1] = @store[count - 1], @store[0]
    val = @store.pop
    BinaryMinHeap.heapify_down(@store, 0, count, &@prc)
    val
  end

  def peek
  end

  def push(val)
    @store << val
    BinaryMinHeap.heapify_up(@store, count - 1, count, &@prc)
  end

  public
  def self.child_indices(len, parent_index)
    children = []
    left_child = parent_index * 2 + 1
    children << left_child if (left_child < len)
    right_child = parent_index * 2 + 2
    children << right_child if (right_child < len)
    children
  end

  def self.parent_index(child_index)
    raise 'root has no parent' if (child_index == 0)
    return (child_index - 1) / 2
  end

  def self.heapify_down(array, parent_idx, len = array.length, &prc)
    prc ||= Proc.new { |a, b| a <=> b }
    children = self.child_indices(len, parent_idx)
    smallest_child_idx = nil
    children.each do |child_idx|
      smallest_child_idx = child_idx if !smallest_child_idx || prc.call(array[child_idx], array[smallest_child_idx]) == -1
    end
    if smallest_child_idx && prc.call(array[smallest_child_idx], array[parent_idx]) == -1
      array[smallest_child_idx], array[parent_idx] = array[parent_idx], array[smallest_child_idx]
      self.heapify_down(array, smallest_child_idx, array.length, &prc)
    end
    return array
  end

  def self.heapify_up(array, child_idx, len = array.length, &prc)
    prc ||= Proc.new { |a, b| a <=> b }
    begin
      parent_idx = self.parent_index(child_idx)
      if prc.call(array[child_idx], array[parent_idx]) == -1
        array[child_idx], array[parent_idx] = array[parent_idx], array[child_idx]
      end
      self.heapify_up(array, parent_idx, array.length, &prc)
    ensure
      return array
    end
  end
end
