# Warmup 2 Part 1
def replace_logic(oper: str) -> str:
    oper = oper.replace("OR", "|").replace("AND", "&").replace("NOT", "~")
    oper = oper.replace("LSHIFT", "<<").replace("RSHIFT", ">>")
    oper = oper.replace("in", "inn").replace("as", "ass").replace("is", "iss").replace("if", "iff")
    return oper


# read file and convert to commands
with open('../input.txt') as file:
    gates = [[y[1], y[0]] for y in (x.split(' -> ') for x in file.read().splitlines())]
commands = [f'{replace_logic(x[0])} = {replace_logic(x[1])}' for x in gates]

# crank commands till A is defined
while 'a' not in globals():
    for command in commands:
        try:
            exec(command)
        except:
            continue

print(f'Value of a = {a}')
