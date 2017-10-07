require 'colorize'
class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq

  def initialize
    reset_game
  end


  def play
    system "clear"
    puts "Welcome to SIMON. Press any Key to continue"
    gets
    until @game_over
      take_turn
    end
    game_over_message
    reset_game
  end

  def take_turn
    show_sequence
    require_sequence
    unless @game_over
      round_success_message
      @sequence_length += 1
    end
  end

  def show_sequence
    system "clear"
    add_random_color
    (1..3).each do |i|
      print "#{i}: "
      seq.each { |c| print "#{c.colorize(c.to_sym)} "  }
      print "\n"
      sleep(1)
      system "clear"
    end
  end

  def require_sequence
    input = gets.chomp
    user_seq = input.split(' ').to_a
    @game_over = (0...sequence_length).any? { |i| user_seq[i] != seq[i] }
  end

  def add_random_color
    @seq << COLORS.sample
  end

  def round_success_message
    puts "Well done. Next round:"
  end

  def game_over_message
    puts "GAME OVER"
  end

  def reset_game
    @seq = []
    @game_over = false
    @sequence_length = 1
  end
end

if __FILE__ == $PROGRAM_NAME
  simon = Simon.new()
  simon.play
end
