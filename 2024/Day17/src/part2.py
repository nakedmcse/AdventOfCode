regs = [0,0,0]
program = [2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0]

def runSim(regs):
    ptr = 0
    output = []
    while ptr < len(program):
        inst,op = program[ptr:ptr+2]
        if  0<=op<=3:
            combo = op
        elif op == 4:
            combo = regs[0]
        elif op == 5:
            combo = regs[1]
        elif op == 6:
            combo = regs[2]

        if   inst == 0:
            regs[0] = regs[0]//2**combo
        elif inst == 1:
            regs[1] = regs[1]^op
        elif inst == 2:
            regs[1] = combo%8
        elif inst == 3:
            ptr = ptr+2 if regs[0] == 0 else op-2
        elif inst == 4:
            regs[1] = regs[1]^regs[2]
        elif inst == 5:
            output.append(combo%8)
        elif inst == 6:
            regs[1] = regs[0]//2**combo
        elif inst == 7:
            regs[2] = regs[0]//2**combo
        ptr += 2
    return output

def reverseCode(n,digit):
    res = [1E50]
    if digit == -1:
        return n
    for i in range(8):
        nn = n+i*8**digit
        regs = [nn,0,0]
        output = runSim(regs)
        if len(output) != len(program):
            continue
        if output[digit] == program[digit]: res.append(reverseCode(nn,digit-1))
    print(res)
    return min(res)

print(reverseCode(0,15))
