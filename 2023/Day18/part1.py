# Day 18 Part 1
import queue
import threading

# Init vars
sum, x, y = 0,201,357
#sum, x, y = 0,0,0
board = [['.' for x in range(1000)] for x in range(1000)]
threads = []

# Check if inside shape
def inside(x,y):
    return board[y][x:].count('#') % 2 == 1

# Dump a snapshot of the array to file
def snapshot(filename):
    with open(filename,'w') as file:
        for row in board:
            for ch in row:
                file.write(ch)
            file.write('\n')

# Recursive flood fill
def recurse_fill(x,y):
    if board[x][y] == '#':
        return
    board[x][y] = '#'
    th1 = threading.Thread(target=recurse_fill, args=(x+1,y)).start()
    threads.append(th1)
    th2 = threading.Thread(target=recurse_fill, args=(x-1,y)).start()
    threads.append(th2)
    th3 = threading.Thread(target=recurse_fill, args=(x,y+1)).start()
    threads.append(th3)
    th4 = threading.Thread(target=recurse_fill, args=(x,y-1)).start()
    threads.append(th4)

# Flood fill - 4 way stack
def four_stack_fill(x,y):
    stack = queue.Queue();
    stack.put((x,y))
    while stack.qsize() > 0:
        n = stack.get()
        if board[n[1]][n[0]] == '#':
            continue;
        board[n[1]][n[0]] = '#'
        stack.put((n[0]+1,n[1]))
        stack.put((n[0]-1,n[1]))
        stack.put((n[0],n[1]+1))
        stack.put((n[0],n[1]-1))

# Flood fill
def fill(xo,yo):
    if not inside(xo,yo):
        return
    stack = queue.Queue()
    stack.put((xo,xo,yo,1))
    stack.put((xo,xo,yo-1,-1))

    while stack.qsize() > 0:
        entry = stack.get()
        x1 = entry[0]
        x2 = entry[1]
        y = entry[2]
        dy = entry[3]
        x = x1
        if inside(x,y):
            while inside(x-1,y):
                board[y][x-1] = '#'
                x -= 1
            if x < x1:
                stack.put((x, x1-1, y-dy, 0-dy))
        while x1 <= x2:
            while inside(x1,y):
                board[y][x1] = '#'
                x1 += 1
            if x1>x:
                stack.put((x,x1-1,y+dy,dy))
            if x1-1>x2:
                stack.put((x2+1,x1-1,y-dy,0-dy))
            x1 += 1
            while x1<x2 and not inside(x1,y):
                x1 += 1
            x = x1

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop lines
for line in input_data.splitlines():
    move_data = line.split(' ')
    dist = int(move_data[1])
    match move_data[0]:
        case 'R':
            x += 1
            for i in range(dist):
                board[y][x+i] = '#'
            x += dist - 1
        case 'L':
            x -= 1
            for i in range(dist):
                board[y][x-i] = '#'
            x -= dist - 1
        case 'U':
            y -= 1
            for i in range(dist):
                board[y-i][x] = '#'
            y -= dist - 1
        case 'D':
            y += 1
            for i in range(dist):
                board[y+i][x] = '#'
            y += dist - 1

# Fill polygon
#fill(3,84)
snapshot('prefill.txt')
four_stack_fill(3,84)
snapshot('postfill.txt')
#recurse_fill(3,84)

#print("Waiting for fill threads to complete")
#for thread in threads:
#    thread.join()

for line in board:
    sum += line.count('#')

# Answer
print("PART 1")    
print(f"Area {sum}")