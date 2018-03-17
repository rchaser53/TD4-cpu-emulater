let MemoryA = 0b00100000
let MemoryB = 0b01110000
let MemoryC = 0b11000000

const Memories = [
  MemoryA,
  MemoryB,
  MemoryC
]

// for order 'IN A' and 'IN B'
let Input = 0b0000

let RegisterA = 0b00000
let RegisterB = 0b00000

// for JNC order, true => ignore and false => jump to imidiate data
let carryFlag = 0

// pointer
let programCounter = 0

const add = (a, b) => {
    while (b !== 0b0) {
        let c = (a & b) << 0b1;
        a ^= b;
        b = c;
    }
    return a;
}

const run = (input, memories) => {
  for (let i = 0; i < memories.length; i++) {
    const command = memories[i] >>> 0b100
    
    if ((command ^ 0b0010) === 0b0) {
      console.log('nya-n')
    }
  }
}

run(Input, Memories)