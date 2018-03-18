let MemoryA = 0b00000000
let MemoryB = 0b00100111
let MemoryC = 0b11000000

// registers
let RegisterA = 0b00000
let RegisterB = 0b00000

// for JNC order, true => ignore and false => jump to imidiate data
let CarryFlag = 0b0

// pointer
let programCounter = 0

const createMemoryData = (order, imidiateData) => {
  const shiftOrder = order << 0b100
  return shiftOrder | imidiateData
}

// definition
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
const OutBFromIm = 0b1000

const execute = (input, memories) => {
  if (memories.length < programCounter) return
  const command = getOrder(memories[programCounter])
  const imidiateData = getImidateData(memories[programCounter])

  doMoveAB(command, imidiateData, input, memories)
  doMoveBA(command, imidiateData, input, memories)
  doInA(command, imidiateData, input, memories)
  doInB(command, imidiateData, input, memories)
  doOutB(command, imidiateData, input, memories)
  doOutBFromIm(command, imidiateData, input, memories)
  
  doAddAFromIm(command, imidiateData, input, memories)
  doAddBFromIm(command, imidiateData, input, memories)
  doMoveAFromIm(command, imidiateData, input, memories)
  doMoveBFromIm(command, imidiateData, input, memories)
  
  if ((command ^ JmpIm) === 0b0) {
    programCounter = parseInt(imidiateData.toString(2), 2) - 1
    return execute(input, memories)
  }

  if ((command ^ JncIm) === 0b0) {
    if (CarryFlag === 0b1) {
      CarryFlag = 0b0
      programCounter = add(programCounter, 0b1)
      return execute(input, memories)
    }
    programCounter = parseInt(imidiateData.toString(2), 2) - 1
    return execute(input, memories)
  }

  programCounter = add(programCounter, 0b1)
  execute(input, memories)
}

const doAddAFromIm = (command, imidiateData, input, memories) => {
  if ((command ^ AddAFromIm) === 0b0) {
    RegisterA = add(RegisterA, imidiateData)

    if (RegisterA >>> 0b100 === 0b1) {
      CarryFlag = 0b1
    }
  }
}

const doAddBFromIm = (command, imidiateData, input, memories) => {
  if ((command ^ AddBFromIm) === 0b0) {
    RegisterB = add(RegisterB, imidiateData)
  }
}

const doMoveAFromIm = (command, imidiateData, input, memories) => {
  if ((command ^ MoveAFromIm) === 0b0) {
    RegisterA = imidiateData
  }
}

const doMoveBFromIm = (command, imidiateData, input, memories) => {
  if ((command ^ MoveBFromIm) === 0b0) {
    RegisterB = imidiateData
  }
}

const doMoveAB = (command, imidiateData, input, memories) => {
  if ((command ^ MoveAB) === 0b0) {
    RegisterA = RegisterB
  }
}

const doMoveBA = (command, imidiateData, input, memories) => {
  if ((command ^ MoveBA) === 0b0) {
    RegisterB = RegisterA
  }
}

const doInA = (command, imidiateData, input, memories) => {
  if ((command ^ InA) === 0b0) {
    RegisterA = input
  }
}

const doInB = (command, imidiateData, input, memories) => {
  if ((command ^ InB) === 0b0) {
    RegisterB = input
  }
}

const doOutB = (command, imidiateData, input, memories) => {
  if ((command ^ OutB) === 0b0) {
    outputLog(RegisterB)
  }
}

const doOutBFromIm = (command, imidiateData, input, memories) => {
  if ((command ^ OutBFromIm) === 0b0) {
    outputLog(imidiateData)
  }
}


// utility
const getOrder = (memory) => memory >>> 0b100
const getImidateData = (memory) => memory & 0b00001111
const add = (a, b) => {
  while (b !== 0b0) {
      let c = (a & b) << 0b1;
      a ^= b;
      b = c;
  }
  return a;
}

const outputLog = (data) => {
  console.log(data.toString(2))
}

module.exports = {
  execute,
  createMemoryData,
  // order
  AddAFromIm,
  AddBFromIm,
  MoveAFromIm,
  MoveBFromIm,
  JmpIm,
  JncIm,
  MoveAB,
  MoveBA,
  InA,
  InB,
  OutB,
  OutBFromIm
}