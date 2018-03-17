const {
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
} = require('./src/index')

// you can change this order as you like
const Memories = [
  createMemoryData(InA, 0b0000),
  createMemoryData(MoveBA, 0b0000),
  createMemoryData(AddAFromIm, 0b0011),
  createMemoryData(OutBFromIm, 0b1001),
  createMemoryData(JncIm, 0b0010),
  createMemoryData(OutB, 0b0000)
]

const input = 0b0111

execute(input, Memories)