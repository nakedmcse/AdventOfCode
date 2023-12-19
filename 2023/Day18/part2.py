# Day 18 Part 2

# Init vars
sum, edge_len, poly_area, x, y = 0,0,0,0,0
vertex = []

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop lines
for line in input_data.splitlines():
    move_data = line.split('#')
    hex_string = move_data[1]
    dist = int(hex_string[:5],16)
    dir = ''
    match(hex_string[-2]):
        case '0':
            dir = 'R'
        case '1':
            dir = 'D'
        case '2':
            dir = 'L'
        case '3':
            dir = 'U'
    
    match dir:
        case 'R':
            x += dist
        case 'L':
            x -= dist
        case 'U':
            y -= dist
        case 'D':
            y += dist 

    edge_len += dist
    vertex.append((x,y))

# Get area from vertexes
for i in range(len(vertex)-1):
    vertex_a = vertex[i]
    vertex_b = vertex[i+1]
    poly_area += (vertex_a[1] + vertex_b[1]) * (vertex_a[0] - vertex_b[0])
poly_area /= 2
inside_area = poly_area - edge_len/2 + 1

sum = inside_area + edge_len

# Answer
print("PART 2")    
print(f"Area {sum}")