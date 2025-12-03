//  가장 왼쪽 x: 0, 가장 위 y: 0, 가장 오른쪽 x: 1200, 가장 아래 y: 600

export const LEVEL_MAPS = {
  1: {
    walls: [
      { x: 600, y: 600, width: 800, height: 50 },
      // { x: 600, y: 370, width: 50, height: 400 },
      // { x: 600, y: 140, width: 800, height: 50 },
      // { x: 860, y: 370, width: 460, height: 50 },
    ],
  },
  2: {
    walls: [
      { x: 400, y: 550, width: 1400, height: 60 },
      { x: 150, y: 400, width: 60, height: 300 },
      { x: 650, y: 400, width: 60, height: 300 },
      { x: 400, y: 250, width: 500, height: 60 },
      { x: 400, y: 100, width: 60, height: 200 },
    ],
    obstacles: [
      { x: 700, y: 400 },
    ],
  },
  3: {
    walls: [
      { x: 400, y: 500, width: 600, height: 20 },
      { x: 200, y: 350, width: 20, height: 300 },
      { x: 600, y: 300, width: 400, height: 20 },
      { x: 400, y: 150, width: 20, height: 200 },
    ],
    obstacles: [{ x: 200, y: 400 }],
  },
  4: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 100, y: 450, width: 200, height: 60 },
      { x: 700, y: 450, width: 200, height: 60 },
      { x: 400, y: 300, width: 600, height: 60 },
      { x: 400, y: 150, width: 60, height: 300 },
    ],
    obstacles: [
      { x: 200, y: 400 },
      { x: 600, y: 400 },
    ],
  },
  5: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 400, y: 10, width: 800, height: 20 },
      { x: 10, y: 300, width: 20, height: 600 },
      { x: 790, y: 300, width: 20, height: 600 },
      
      { x: 400, y: 300, width: 600, height: 20 },
      { x: 400, y: 150, width: 20, height: 300 },
      { x: 480, y: 500, width: 600, height: 20 },
    ],
    obstacles: [
      { x: 200, y: 200 },
      { x: 600, y: 200 },
    ],
  },
  6: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 400, y: 10, width: 800, height: 20 },
      { x: 10, y: 300, width: 20, height: 600 },
      { x: 790, y: 300, width: 20, height: 600 },

      { x: 400, y: 400, width: 600, height: 20 },
      { x: 400, y: 200, width: 600, height: 20 },
    ],
    obstacles: [
      { x: 200, y: 300 },
      { x: 600, y: 300 },
      { x: 400, y: 300 },
    ],
  },
  7: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 400, y: 10, width: 800, height: 20 },
      { x: 10, y: 300, width: 20, height: 600 },
      { x: 790, y: 300, width: 20, height: 600 },

      { x: 400, y: 300, width: 600, height: 20 },
      { x: 200, y: 150, width: 400, height: 20 },
      { x: 600, y: 450, width: 400, height: 20 },
    ],
    obstacles: [
      { x: 400, y: 200 },
      { x: 400, y: 400 },
      { x: 200, y: 300 },
      { x: 600, y: 300 },
    ],
  },
  8: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 400, y: 10, width: 800, height: 20 },
      { x: 10, y: 300, width: 20, height: 600 },
      { x: 790, y: 300, width: 20, height: 600 },

      { x: 400, y: 300, width: 600, height: 20 },
      { x: 200, y: 150, width: 400, height: 20 },
      { x: 600, y: 450, width: 400, height: 20 },
      { x: 400, y: 450, width: 20, height: 300 },
    ],
    obstacles: [
      { x: 400, y: 200 },
      { x: 400, y: 400 },
      { x: 200, y: 300 },
      { x: 600, y: 300 },
    ],
  },
  9: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 400, y: 10, width: 800, height: 20 },
      { x: 10, y: 300, width: 20, height: 600 },
      { x: 790, y: 300, width: 20, height: 600 },

      { x: 200, y: 500, width: 300, height: 20 },
      { x: 600, y: 400, width: 300, height: 20 },
      { x: 200, y: 300, width: 300, height: 20 },
      { x: 600, y: 200, width: 300, height: 20 },
      { x: 60, y: 400, width: 20, height: 200 },
      { x: 450, y: 200, width: 20, height: 200 },
      { x: 650, y: 300, width: 20, height: 200 },
    ],
    obstacles: [
      { x: 300, y: 500 },
      { x: 700, y: 400 },
      { x: 300, y: 300 },
      { x: 700, y: 200 },
      { x: 400, y: 350 },
    ],
  },
  10: {
    walls: [
      { x: 400, y: 590, width: 800, height: 20 },
      { x: 400, y: 10, width: 800, height: 20 },
      { x: 10, y: 300, width: 20, height: 600 },
      { x: 790, y: 300, width: 20, height: 600 },

      { x: 200, y: 500, width: 350, height: 20 },
      { x: 600, y: 450, width: 350, height: 20 },
      { x: 200, y: 350, width: 350, height: 20 },
      { x: 600, y: 300, width: 350, height: 20 },
      { x: 400, y: 150, width: 600, height: 20 },
      { x: 350, y: 400, width: 20, height: 200 },
      { x: 450, y: 250, width: 20, height: 200 },
      { x: 650, y: 350, width: 20, height: 200 },
      { x: 250, y: 200, width: 20, height: 200 },
    ],
    obstacles: [
      { x: 300, y: 500 },
      { x: 700, y: 450 },
      { x: 300, y: 350 },
      { x: 700, y: 300 },
      { x: 400, y: 150 },
      { x: 250, y: 200 },
    ],
  },
};