# Day 10 Part 1
import re

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum, x, y, start_x, start_y = 0, 0, 0, 0, 0
map = []
cells = []

# cell class
class cell:
    def __init__(self,x,y):
        self.x = x
        self.y = y
        self.dist = 0
        self.steps = 0
        self.exitUp = False
        self.exitDown = False
        self.exitLeft = False
        self.exitRight = False

    def distance(self, sx, sy):
        self.dist = abs(sx - self.x) + abs(sy - self.y)

    def isVertice(self):
        if self.exitUp and (self.exitLeft or self.exitRight):
            return True
        if self.exitDown and (self.exitLeft or self.exitRight):
            return True
        return False

    def setExits(self, exit_char):
        match exit_char:
            case '|':
                self.exitUp, self.exitDown = True, True
            case '-':
                self.exitLeft, self.exitRight = True, True
            case 'L':
                self.exitUp, self.exitRight = True, True
            case 'J':
                self.exitUp, self.exitLeft = True, True
            case '7':
                self.exitDown, self.exitLeft = True, True
            case 'F':
                self.exitDown, self.exitRight = True, True

    def chooseDirection(self,entryDir):
        if entryDir == 'U':
            if self.exitUp:
                return 'U'
            if self.exitRight:
                return 'R'
            if self.exitLeft:
                return 'L'
            
        if entryDir == 'D':
            if self.exitDown:
                return 'D'
            if self.exitRight:
                return 'R'
            if self.exitLeft:
                return 'L'
        
        if entryDir == 'L':
            if self.exitLeft:
                return 'L'
            if self.exitUp:
                return 'U'
            if self.exitDown:
                return 'D'
        
        if entryDir == 'R':
            if self.exitRight:
                return 'R'
            if self.exitUp:
                return 'U'
            if self.exitDown:
                return 'D'
        
        if self.exitUp:
            return 'U'
        if self.exitDown:
            return 'D'
        if self.exitRight:
            return 'R'
        if self.exitLeft:
            return 'L'
        
        return ''
            
# Extract digits
def extract_digits(target):
    retval = []
    matches = pattern_digit.findall(target)
    if matches:
        retval = [int(match) for match in matches]
    return retval

# Shoelace Formula
def shoelace_area(polygon):
    n = len(polygon)
    area = 0

    for i in range(n):
        j = (i + 1) % n  # last point links back to the first
        area += (polygon[i].x * polygon[j].y)
        area -= (polygon[j].x * polygon[i].y)

    return abs(area) // 2

# Set start exits
def start_exits(sx, sy):
    if sx-1>=0:
        if map[sy][sx-1] == '-' or map[sy][sx-1] == 'L' or map[sy][sx-1] == 'F':
            cells[sy][sx].exitLeft = True
    if sx+1<=len(map[sy]):
        if map[sy][sx+1] == '-' or map[sy][sx+1] == 'J' or map[sy][sx-1] == '7':
            cells[sy][sx].exitRight = True
    if sy-1>=0:
        if map[sy-1][sx] == '|' or map[sy-1][sx] == 'F' or map[sy-1][sx] == '7':
            cells[sy][sx].exitUp = True
    if sy+1<=len(map):
        if map[sy+1][sx] == '|' or map[sy+1][sx] == 'J' or map[sy+1][sx] == 'L':
            cells[sy][sx].exitDown = True

# Read input file
with open('sample3.txt','r') as file:
    input_data = file.read()

# Loop the lines to build the map and find the start
for line in input_data.splitlines():
    map.append([c for c in line])
    x = line.find('S')
    if x!=-1:
        start_x, start_y = x, y
    y += 1

# Build object map
y = 0
verticies = []
for line in map:
    cell_line=[]
    x = 0
    for char in line:
        new_cell = cell(x,y)
        new_cell.distance(start_x,start_y)
        new_cell.setExits(char)
        cell_line.append(new_cell)
    cells.append(cell_line)
    y += 1

# Set start exits
start_exits(start_x,start_y)

# Walk the route to get verticies
direction = cells[start_y][start_x].chooseDirection('')
total_steps = 0
cur_x, cur_y = start_x, start_y
done = False
print(f'Starts at {start_x},{start_y}')
while not done:
    if cells[cur_y][cur_x].isVertice():
        print(f'vertice at location {cur_x},{cur_y}')
        verticies.append(cell(cur_x,cur_y))

    match direction:
        case 'U':
            cur_y -= 1
        case 'D':
            cur_y += 1
        case 'L':
            cur_x -= 1
        case 'R':
            cur_x += 1

    if cur_x == start_x and cur_y == start_y:
        total_steps += 1
        done = True
    else:
        total_steps += 1
        cells[cur_y][cur_x].steps = total_steps
        direction = cells[cur_y][cur_x].chooseDirection(direction)

cells[start_y][start_x].steps = 1
sum = 0
for line in cells:
    inside = False
    for loc in range(0,len(line)):
        if line[loc].steps>0:
            continue
        ray = line[loc:]
        crossings = [i for i in ray if i.steps>0]
        if len(crossings) % 2 != 0:
            sum += 1 

# Get area
#sum = shoelace_area(verticies)

# Answer
print("PART 1")    
print(f"Sum: {sum}")