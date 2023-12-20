# Day 20 Part 1
import re
import queue

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum, high_pulses_sent, low_pulses_sent = 0,0,0
input_packets = queue.Queue()
output_packets = queue.Queue()
network = []

# packet class
class packet:
    def __init__(self,type,source,dest):
        self.type = type
        self.source = source
        self.dest = dest

# mod class
class mod:
    def __init__(self,name,func,dests):
        self.name = name
        self.func = func
        self.memory = {}
        self.flipstate = False
        self.dests = dests

    def flipflop(self,input_packet):
        global low_pulses_sent
        global high_pulses_sent
        if input_packet.type=="H":
            return;
        self.flipstate = not self.flipstate
        if self.flipstate:
            # Dispatch high pulse to dests
            if len(self.dests) == 0:
                highPulse = packet("H",self.name,d)
                output_packets.put(highPulse)
                return
            for d in self.dests:
                highPulse = packet("H",self.name,d)
                input_packets.put(highPulse)
                high_pulses_sent += 1
        else:
            # Dispatch low pulse to dests
            if len(self.dests) == 0:
                lowPulse = packet("L",self.name,d)
                output_packets.put(lowPulse)
                return
            for d in self.dests:
                lowPulse = packet("L",self.name,d)
                input_packets.put(lowPulse)
                low_pulses_sent += 1

    def conjunction(self,input_packet):
        global low_pulses_sent
        global high_pulses_sent
        # Record packet to memory
        if input_packet.source in self.memory:
            self.memory.pop(input_packet.source)
        self.memory[input_packet.source] = input_packet.type

        # Find all inputs to this node
        input_count = len(find_inputs(self))

        # If we have that number of high in memory send a low pulse, otherwise high
        memory_count = 0
        output_type = "H"
        for i in self.memory.values():
            if i=="H":
                memory_count += 1
        if memory_count == input_count:
            output_type = "L"

        # Dispatch pulse
        if len(self.dests) == 0:
                conPulse = packet(output_type,self.name,d)
                output_packets.put(conPulse)
                return
        for d in self.dests:
            input_packets.put(packet(output_type, self.name, d))
            if output_type == "L":
                low_pulses_sent += 1
            else:
                high_pulses_sent += 1

    def broadcast(self,input_packet):
        global low_pulses_sent
        global high_pulses_sent
        if len(self.dests) == 0:
                bPulse = packet(input_packet.type,self.name,d)
                output_packets.put(bPulse)
                return
        for d in self.dests:
            input_packets.put(packet(input_packet.type, self.name, d))
            if input_packet.type == "L":
                low_pulses_sent += 1
            else:
                high_pulses_sent += 1
            
    def output(self,input_packet):
        output_packets.put(input_packet)
        return

# Find Inputs to a node
def find_inputs(node):
    input_nodes = []
    for n in network:
        if node.name in n.dests:
            input_nodes.append(n)
    return input_nodes

# Extract digits
def extract_digits(target):
    retval = []
    matches = pattern_digit.findall(target)
    if matches:
        for match in matches:
            retval.append(int(match))
    return retval

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop lines
for line in input_data.splitlines():
    # Parse network map
    split_line = line.split("->")
    node_type = split_line[0][0]
    if node_type == "b":
        node_type = "broadcast"
    node_name = split_line[0].strip()[1:]
    node_dests = split_line[1].strip().replace(" ","").split(",") if split_line[1].strip()!="" else []
    new_node = mod(node_name,node_type,node_dests)
    network.append(new_node)

# Add output node
output_node = mod("output","output",[])
network.append(output_node)

# Add missing destination nodes as outputs
all_destinations = []
all_node_names = []
for n in network:
    if n.name not in all_node_names:
        all_node_names.append(n.name)
    for d in n.dests:
        if d not in all_destinations:
            all_destinations.append(d)

for d in all_destinations:
    if d not in all_node_names:
        missing_node = mod(d,"output",[])
        network.append(missing_node)

# Send low pulse to b module
broadcast = None
for n in network:
    if n.func == "broadcast":
        broadcast = n

# Loop send
for i in range(1000):
    send_pulse = packet("L","Input",broadcast.name)
    input_packets.put(send_pulse);
    low_pulses_sent += 1

    # Process queue
    while input_packets.qsize() > 0:
        current_packet = input_packets.get()
        target_node = None
        for n in network:
            if n.name == current_packet.dest:
                target_node = n
        match(target_node.func):
            case "broadcast":
                target_node.broadcast(current_packet)
            case "%":
                target_node.flipflop(current_packet)
            case "&":
                target_node.conjunction(current_packet)
            case "output":
                target_node.output(current_packet)

# Sum 
sum = low_pulses_sent * high_pulses_sent

# Answer
print("PART 1")    
print(f"Sum {sum} High Pulses {high_pulses_sent} Low Pulses {low_pulses_sent}")