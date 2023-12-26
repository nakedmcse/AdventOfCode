import re
import numpy as np
import networkx as nx

# Read nodes in
nodes_list = [(nodes[0], node) for line in open('inputfile.txt').read().splitlines() for nodes in [re.findall('[a-z]+', line)] for node in nodes[1:]]

# Build graph
graph = nx.Graph() 
graph.add_edges_from(list(nodes_list)) 

# Do minimum cut
graph.remove_edges_from(nx.minimum_edge_cut(graph)) 

print("Part 1:")
print(np.product([len(gi) for gi in nx.connected_components(graph)]))