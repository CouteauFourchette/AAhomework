class Map

  def initialize()
    @map = []
  end

  def assign(key, value)
    index = @map.index { |m| m[0] == key  }
    index ? @map[index][1] = value : @map << [key, value]
  end

  def lookup(key)
    @map.each { |m| return m[1] if m[0] == key }
  end

  def remove(key)
    @map.reject! { |m| m[0] == key }
  end

  def show
    deep_copy(@map)
  end

  private
  def deep_copy(arr)
    return arr.dup unless arr.is_a?(Array)
    arr.map { |el| deep_copy(el)   }
  end

end
