let MemoryA = 0b00000000
let MemoryB = 0b00100111
let MemoryC = 0b11000000

const Memories = [
  MemoryA,
  MemoryB,
  MemoryC
]

let RegisterA = 0b00000
let RegisterB = 0b00000

// for JNC order, true => ignore and false => jump to imidiate data
let carryFlag = 0b0

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

const AddAFromIm = 0b0000
const AddBFromIm = 0b0101
const MoveAFromIm = 0b0011
const MoveBFromIm = 0b0111

const JmpIm = 0b1111
const JncIm = 0b1110

const MoveAB = 0b0001
const MoveBA = 0b0100
const InA = 0b0010
const InB = 0b0110
const OutB = 0b1001

const execute = (input, memories) => {
  for (programCounter = 0; programCounter < memories.length; programCounter++) {
    const command = getOrder(memories[i])
    const imidiateData = getImidateData(memories[i])

    if (doMoveAB(command, imidiateData, input)) continue
    if (doMoveBA(command, imidiateData, input)) continue
    if (doInA(command, imidiateData, input)) continue
    if (doInB(command, imidiateData, input)) continue
    if (doOutB(command, imidiateData, input)) continue
    
    if (doAddAFromIm(command, imidiateData, input)) continue
    if (doAddBFromIm(command, imidiateData, input)) continue
    if (doMoveAFromIm(command, imidiateData, input)) continue
    if (doMoveBFromIm(command, imidiateData, input)) continue
    
    if ((command ^ JmpIm) === 0b0) {
      programCounter = parseInt(imidiateData.toString(2), 2) - 1;
      continue
    }

    if ((command ^ JncIm) === 0b0) {
      if (carryFlag === 0b1) {
        carryFlag = 0b0
        continue
      }
      programCounter = parseInt(imidiateData.toString(2), 2) - 1;
    }
  }
}

const doAddAFromIm = (command, imidiateData, input) => {
  if ((command ^ AddAFromIm) === 0b0) {
    RegisterA += imidiateData 

    if (RegisterA >>> 0b100 === 0b1) {
      carryFlag = 0b1
    }

    return true
  }
  return false
}

const doAddBFromIm = (command, imidiateData, input) => {
  if ((command ^ AddBFromIm) === 0b0) {
    RegisterB += imidiateData
    return true
  }
  return false
}

const doMoveAFromIm = (command, imidiateData, input) => {
  if ((command ^ MoveAFromIm) === 0b0) {
    RegisterA = imidiateData
    return true
  }
  return false
}

const doMoveBFromIm = (command, imidiateData, input) => {
  if ((command ^ MoveBFromIm) === 0b0) {
    RegisterB = imidiateData
    return true
  }
  return false
}

const doMoveAB = (command, imidiateData, input) => {
  if ((command ^ MoveAB) === 0b0) {
    RegisterB = RegisterA
    return true
  }
  return false
}

const doMoveAB = (command, imidiateData, input) => {
  if ((command ^ MoveAB) === 0b0) {
    RegisterB = RegisterA
    return true
  }
  return false
}

const doMoveBA = (command, imidiateData, input) => {
  if ((command ^ MoveBA) === 0b0) {
    RegisterA = RegisterB
    return true
  }
  return false
}

const doInA = (command, imidiateData, input) => {
  if ((command ^ InA) === 0b0) {
    RegisterA = input
    return true
  }
  return false
}

const doInB = (command, imidiateData, input) => {
  if ((command ^ InB) === 0b0) {
    RegisterB = input
  }
  return false
}

const doOutB = (command, imidiateData, input) => {
  if ((command ^ OutB) === 0b0) {
    console.log(RegisterB)
    return true
  }
  return false
}

// utility
const getOrder = (memory) => memory >>> 0b100
const getImidateData = (memory) => memory & 0b00001111

const outputLog = (data) => {
  console.log(data.toString(2))
}

execute(0b0111, Memories)