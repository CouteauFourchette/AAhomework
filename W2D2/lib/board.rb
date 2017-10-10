class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @cups = Array.new(14) { Array.new }
    @player_stores = { name1 => 6, name2 => 13 }
    place_stones
  end

  def place_stones
    @cups = @cups.map.with_index do |cup, i|
      @player_stores.values.include?(i) ? cup : [:stone]*4
    end
  end

  def valid_move?(start_pos)
    raise 'Invalid starting cup' unless (0..@cups.length).cover?(start_pos)
  end

  def make_move(start_pos, current_player_name)
    pos = start_pos
    stones = @cups[pos]
    @cups[pos] = []
    ennemy_cup = @player_stores.reject { |k,v| k == current_player_name }.values[0]
    # puts ennemy_cup
    while stones.length > 0
      pos += 1
      pos += 1 if pos == ennemy_cup
      pos %= @cups.length if pos > @cups.length - 1
      @cups[pos] << stones.shift
    end
    render
    next_turn(pos, current_player_name)
  end

  def next_turn(ending_cup_idx, current_player_name)
    player_cup = @player_stores[current_player_name]
    if @cups[ending_cup_idx].count == 1
      if player_cup == ending_cup_idx
        return :prompt
      else
        return :switch
      end
    else
      ending_cup_idx
    end
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    @cups[7..12].all? { |cup| cup.count == 0  } || @cups.take(6).all? { |cup| cup.count == 0  }
  end

  def winner
    case @cups[6] <=> @cups[13]
    when -1
      return @player_stores.key(13)
    when 1
      return @player_stores.key(6)
    when 0
      return :draw
    end
  end
end
