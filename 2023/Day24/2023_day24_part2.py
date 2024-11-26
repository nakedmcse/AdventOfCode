# 2023 Day24 Part 2
import math
import re


class vector:
    def __init__(self, x: int, y: int, z: int):
        self.x = x
        self.y = y
        self.z = z

    def __repr__(self):
        return f'{self.x}, {self.y}, {self.z}'


class hail:
    def __init__(self, position: vector, velocity: vector):
        self.position = position
        self.velocity = velocity

    def __repr__(self):
        return f'{self.position.x}, {self.position.y}, {self.position.z} @ {self.velocity.x}, {self.velocity.y}, {self.velocity.z} ({self.speed()})'

    def speed(self) -> float:
        return math.sqrt(self.velocity.x**2 + self.velocity.y**2 + self.velocity.z**2)


def subtract_vectors(a: vector, b: vector) -> vector:
    return vector(a.x - b.x, a.y - b.y, a.z - b.z)


def dot_product(a: vector, b: vector) -> int:
    return (a.x * b.x) + (a.y * b.y) + (a.z * b.z)


def cross_product(a: vector, b: vector) -> vector:
    return vector((a.y*b.z) - (a.z*b.y), (a.z*b.x) - (a.x*b.z), (a.x*b.y) - (a.y*b.x))


def find_plane(p1: vector, v1: vector, p2: vector, v2: vector) -> (vector, int):
    p12 = subtract_vectors(p1, p2)
    v12 = subtract_vectors(v1, v2)
    vxv = cross_product(v1, v2)
    return cross_product(p12, v12), dot_product(p12, vxv)


def extend_lines(r: int, a: vector, s: int, b: vector, t: int, c: vector) -> vector:
    x = r*a.x + s*b.x + t*c.x
    y = r*a.y + s*b.y + t*c.y
    z = r*a.z + s*b.z + t*c.z
    return vector(x, y, z)


def on_same_line(a: vector, b: vector, c: vector) -> bool:
    vector_ab = subtract_vectors(b, a)
    vector_ac = subtract_vectors(c, a)
    cross = cross_product(vector_ab, vector_ac)
    return cross.x == 0 and cross.y == 0 and cross.z == 0


def find_rock_pos(h1: hail, h2: hail, h3: hail) -> (vector, int):
    a, A = find_plane(h1.position, h1.velocity, h2.position, h2.velocity)
    b, B = find_plane(h1.position, h1.velocity, h3.position, h3.velocity)
    c, C = find_plane(h2.position, h2.velocity, h3.position, h3.velocity)

    w = extend_lines(A, cross_product(b, c), B, cross_product(c, a), C, cross_product(a, b))
    t = dot_product(a, cross_product(b, c))
    wt = vector(w.x // t, w.y // t, w.z // t)
    w1 = subtract_vectors(h1.velocity, wt)
    w2 = subtract_vectors(h2.velocity, wt)
    wxw = cross_product(w1, w2)

    D = dot_product(wxw, cross_product(h2.position, w2))
    E = dot_product(wxw, cross_product(h1.position, w1))
    F = dot_product(h1.position, wxw)
    scaling = dot_product(wxw, wxw)
    rock_position = extend_lines(D, w1, -E, w2, F, wxw)
    return rock_position, scaling


with open('input.txt') as file:
    hail_list = [hail(vector(int(y[0]), int(y[1]), int(y[2])), vector(int(y[3]), int(y[4]), int(y[5])))
                 for y in (re.findall(r'-?\d+', x) for x in file.read().splitlines())]

rock_pos, scale = find_rock_pos(hail_list[0], hail_list[1], hail_list[2])
print(rock_pos.x // scale, rock_pos.y // scale, rock_pos.z // scale)
answer = (rock_pos.x + rock_pos.y + rock_pos.z) // scale
print(f'Part 2 answer is {answer}')
