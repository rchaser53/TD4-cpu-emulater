let CarryFlag = false

const Memories = {}

let MemoryA = [ 
 true, true, true, true,
 false, false, false, false
]

let RegisterA = [
  true, true, true, true
]
let RegisterB = [
  true, true, true, true
]

// for JNC order, true => ignore and false => jump to imidiate data
let carryFlag = false

// pointer
let programCounter = 0

// for order 'IN A' and 'IN B'
let input = [true, true, true, true]

// console.log(0b11 ^ 0b00)
function add(a, b)
{
    while (b != 0)
    {
        let c = (a & b) << 1;
        console.log(a, b, c)
        a ^= b;
        b = c;
    }
    return a;
}