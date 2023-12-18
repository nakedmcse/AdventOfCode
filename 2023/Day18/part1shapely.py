# Day 18 Part 1
import shapely

#Init vars
sum, x, y = 0,201,357
coords = []
board = [['.' for x in range(1000)] for x in range(1000)]

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop lines
coords.append(shapely.Point(0,0)) # Start
board[0][0] = '#'
for line in input_data.splitlines():
    move_data = line.split(' ')
    dist = int(move_data[1])
    match move_data[0]:
        case 'R':
            x += dist
        case 'L':
            x -= dist
        case 'U':
            y -= dist
        case 'D':
            y += dist
    coords.append(shapely.Point(x,y))

# Build polygon
poly = shapely.Polygon(coords)
sum = poly.area + (poly.length/2)

# Answer
print("PART 1")    
print(f"Area {sum}")