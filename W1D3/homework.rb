require 'byebug'

def sum_to(n)
  return nil if n < 0
  return 0 if n == 0
  n + sum_to(n-1)
end

puts "sum_to tests:"
puts sum_to(5)  == 15
puts sum_to(1)  == 1
puts sum_to(9)  == 45
puts sum_to(-8)  == nil
puts "-----------------"

def add_numbers(numbers)
  return nil if numbers.length == 0
  return numbers[0] if numbers.length == 1
  numbers[0] += numbers.pop
  add_numbers(numbers)
end

puts "add_numbers tests:"
puts add_numbers([1,2,3,4]) == 10
puts add_numbers([3]) == 3
puts add_numbers([-80,34,7]) == -39
puts add_numbers([]) == nil

def gamma_fnc(n)
  return nil if n <= 0
  n = n-1
  return n * gamma_fnc(n) if n > 1
  1
end


puts "gamma_fnc tests:"
puts gamma_fnc(0) == nil
puts gamma_fnc(1) == 1
puts gamma_fnc(4) == 6
puts gamma_fnc(8) == 5040

def ice_cream_shop(flavors, favorite)
  f = flavors.shift
  return true if f == favorite
  return ice_cream_shop(flavors, favorite) if flavors.length > 1
  false
end

puts "ice_cream_shop tests:"
puts ice_cream_shop(['vanilla', 'strawberry'], 'blue moon')  == false
puts ice_cream_shop(['pistachio', 'green tea', 'chocolate', 'mint chip'], 'green tea')  == true
puts ice_cream_shop(['cookies n cream', 'blue moon', 'superman', 'honey lavender', 'sea salt caramel'], 'pistachio')  == false
puts ice_cream_shop(['moose tracks'], 'moose tracks')  == true
puts ice_cream_shop([], 'honey lavender')  == false

def reverse(string)
  return '' if string == ''
  string_arr = string.chars
  return string_arr[0] if string_arr.length == 1
  string_arr.pop + reverse(string_arr.join)
end

puts "reverse tests:"
puts reverse("house") == "esuoh"
puts reverse("dog") == "god"
puts reverse("atom") == "mota"
puts reverse("q") == "q"
puts reverse("id") == "di"
puts reverse("") == ""
