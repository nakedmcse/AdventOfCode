# Advent of Code Day 1 - strip first and last numbers from input lines and then sum all the numbers
# Second part convert words to numbers, watching out for a sneaky dick move of overlapping digit names

# Extract numbers from line (chracter crawl to deal with overlapping digit names)
def extract_numbers(instring):
    retval = ''
    for cpos in range(len(instring)):
        if instring[cpos].isdigit():
            retval += instring[cpos]
        else:
            for word_index in range(len(word_numbers)):
                if instring[cpos:cpos+len(word_numbers[word_index])] == word_numbers[word_index]:
                    retval += str(word_index+1)
    return retval

# Read input file
with open('2023/Day1/day1input.txt','r') as file:
    input_data = file.read()

# Init vars
sum = 0
word_numbers = ["one","two","three","four","five","six","seven","eight","nine"]

# Loop the lines
for line in input_data.splitlines():
    clean_line = extract_numbers(line)
    coord = clean_line[0]+clean_line[-1]
    sum += int(coord)

# Answer    
print(sum)