# Day 16 Part 1
import re
import threading

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum = 0
max_x, max_y = 0, 0
tiles = []

# Tile class
class tile:
    def __init__(self,x,y,tp):
        self.x = x
        self.y = y
        self.type = tp
        self.energized = False
        self.split_count = 0

    def exitDirection(self,entryDir):
        match self.type:
            case '.':
                return entryDir
            case '/':
                if(entryDir == 'U'):
                    return 'R'
                if(entryDir == 'D'):
                    return 'L'
                return 'D' if entryDir=='L' else 'U'
            case '\\':
                if(entryDir == 'U'):
                    return 'L'
                if(entryDir == 'D'):
                    return 'R'
                return 'U' if entryDir=='L' else 'D'
            case '|':
                if(entryDir == 'U' or entryDir == 'D'):
                    return entryDir
                if(entryDir == 'L' or entryDir == 'R'):
                    return 'UD'
            case '-':
                if(entryDir == 'U' or entryDir == 'D'):
                    return 'LR'
                if(entryDir == 'L' or entryDir == 'R'):
                    return entryDir

# Walk beam
def walk_beam(x,y,dir):
    if x<0 or x>max_x or y<0 or y>max_y:
        return
    cur_x, cur_y, cur_d = x, y, dir
    done = False
    while not done:
        tiles[cur_y][cur_x].energized = True
        cur_d = tiles[cur_y][cur_x].exitDirection(dir)
        match cur_d:
            case 'U':
                cur_y -= 1
                if cur_y < 0:
                    done = True
            case 'D':
                cur_y += 1
                if cur_y > max_y:
                    done = True
            case 'L':
                cur_x -= 1
                if cur_x < 0:
                    done = True
            case 'R':
                cur_x += 1
                if cur_x > max_x:
                    done = True
            case 'LR':
                if tiles[cur_y][cur_x].split_count < 3:
                    tiles[cur_y][cur_x].split_count += 1
                    walk_beam(cur_x+1,cur_y,'R')
                    walk_beam(cur_x-1,cur_y,'L')
                done = True
            case 'UD':
                if tiles[cur_y][cur_x].split_count < 3:
                    tiles[cur_y][cur_x].split_count += 1
                    walk_beam(cur_x,cur_y+1,'D')
                    walk_beam(cur_x,cur_y-1,'U')
                done = True
        dir = cur_d

# Read input file
with open('sample.txt','r') as file:
    input_data = file.read()

# Loop the lines building the map
y = 0
for line in input_data.splitlines():
    tile_line = []
    x = 0
    for char in line:
        new_tile = tile(x,y,char)
        tile_line.append(new_tile)
        x += 1
    tiles.append(tile_line)
    y += 1

# Walk the beam
max_x = x-1
max_y = y-1
walk_beam(0,0,'R')

# Count energized tiles
for energized_line in tiles:
    outline = ''
    for energized_tile in energized_line:
        if energized_tile.energized:
            outline += '#'
            sum += 1
        else:
            outline += '.'
    print(outline)

# Answer
print("PART 1")    
print(f"Sum: {sum}")