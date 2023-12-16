# Day 16 Part 2
import re
import threading

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum = 0
max_x, max_y = 0, 0
tiles = []
orig_tiles = []

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

# Count Energized Tiles, and de-energize for next run and reset split_counts
def count_energized():
    retval = 0
    for energized_line in tiles:
        for energized_tile in energized_line:
            if energized_tile.energized:
                retval += 1
                energized_tile.energized = False
                energized_tile.split_count = 0
    return retval

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
with open('inputfile.txt','r') as file:
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
max_sum = 0
orig_tiles = tiles

for i in range(max_y+1):
    # Walk right on rows
    walk_beam(0,i,'R')
    sum = count_energized()
    if sum>max_sum:
        max_sum = sum
    # Walk left on rows
    walk_beam(max_x,i,'L')
    sum = count_energized()
    if sum>max_sum:
        max_sum = sum

for i in range(max_x+1):
    # Walk down on cols
    walk_beam(i,0,'D')
    sum = count_energized()
    if sum>max_sum:
        max_sum = sum
    # Walk up on cols
    walk_beam(i,max_y,'U')
    sum = count_energized()
    if sum>max_sum:
        max_sum = sum

# Answer
print("PART 2")    
print(f"Sum: {max_sum}")