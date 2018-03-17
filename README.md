# peke-cpu-emu

this is a simple TD4 cpu emulater

## how to play

```
$ node play_cpu_emu.js
```

you can change order in memory.

```
/** play_cpu_emu.js **/

// you can change this order as you like
const Memories = [
  createMemoryData(InB, 0b0000),
  createMemoryData(OutB, 0b0000)
]

const input = 0b1000

execute(input, Memories)
// '1000'

```