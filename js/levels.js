// 타일 넓이 50, 높이 50
// 화면 크기 1280 x 720
// 플레이어 시작 위치 (80, 550)
// 골 위치 (1100, 80)
// 가장 왼쪽 좌표 (0, 0)
// 가장 오른쪽 좌표 (1280, 720)
// 벽과 장애물의 좌표는 중앙 기준 좌표계로 작성
// 가장 왼쪽 위 모서리 (x: 25, y: 25), 가장 오른쪽 아래 모서리 (x: 1255, y: 695)
/*
  { x: 640, y: 700, width: 1280, height: 50 }, // 바닥
  { x: 640, y: 25, width: 1280, height: 50 }, // 천장
  { x: 25, y: 360, width: 50, height: 720 }, // 왼쪽 벽
  { x: 1255, y: 360, width: 50, height: 720 }, // 오른쪽 벽
*/

export const LEVEL_MAPS = {
  1: {
    walls: [
      { x: 250, y: 580, width: 200, height: 50 },
      { x: 450, y: 480, width: 200, height: 50 },
      { x: 650, y: 380, width: 200, height: 50 },
      { x: 850, y: 280, width: 200, height: 50 },
      { x: 1050, y: 180, width: 200, height: 50 },
    ],
    obstacles: []
  },
  2: {
    walls: [
      { x: 450, y: 580, width: 600, height: 50 },
      { x: 200, y: 400, width: 300, height: 50 },
      { x: 700, y: 400, width: 300, height: 50 },
      { x: 1200, y: 400, width: 300, height: 50 },
      { x: 640, y: 220, width: 600, height: 50 },

    ],
    obstacles: [
      { x: 200, y: 450 }
    ]
  },
  3: {
    walls: [
      { x: 320, y: 580, width: 400, height: 50 },
      { x: 960, y: 580, width: 400, height: 50 },
      { x: 640, y: 400, width: 800, height: 50 },
      { x: 320, y: 220, width: 400, height: 50 },
      { x: 960, y: 220, width: 400, height: 50 },
    ],
    obstacles: [
      { x: 320, y: 100 },
      { x: 320, y: 300 },
    ]
  },
  4: {
    walls: [
      // 가로벽
      { x: 500, y: 550, width: 700, height: 50 },
      { x: 900, y: 350, width: 600, height: 50 },
      // 세로벽
      { x: 675, y: 450, width: 50, height: 150 },
      { x: 200, y: 250, width: 50, height: 200 },
      { x: 500, y: 100, width: 50, height: 200 },
    
    ],
    obstacles: [
      { x: 320, y: 300 },
      { x: 700, y: 400 },
      { x: 1000, y: 100 }
    ]
  },
  5: {
    walls: [
      { x: 200, y: 600, width: 50, height: 200 },
      { x: 360, y: 550, width: 50, height: 200 },
      { x: 520, y: 600, width: 50, height: 200 },
      { x: 680, y: 550, width: 50, height: 200 },
      { x: 840, y: 600, width: 50, height: 200 },
      { x: 1000, y: 550, width: 50, height: 200 },
      { x: 1160, y: 600, width: 50, height: 200 },
      
      { x: 160, y: 150, width: 50, height: 200 },
      { x: 320, y: 100, width: 50, height: 200 },
      { x: 480, y: 150, width: 50, height: 200 },
      { x: 640, y: 100, width: 50, height: 200 },
      { x: 800, y: 150, width: 50, height: 200 },
      { x: 960, y: 100, width: 50, height: 200 },
    ],
    obstacles: [
      { x: 250, y: 500 },
      { x: 410, y: 450 },
      { x: 570, y: 500 },
      { x: 730, y: 450 },
      { x: 890, y: 500 },
      { x: 1050, y: 450 }
    ]
  },
  6: {
    walls: [
      // 가로
      { x: 450, y: 575, width: 600, height: 50 },
      { x: 925, y: 525, width: 450, height: 50 },

      { x: 450, y: 375, width: 600, height: 50 },
      { x: 925, y: 325, width: 450, height: 50 },
      
      // { x: 640, y: 200, width: 900, height: 50 },

      // 세로
      // { x: 725, y: 550, width: 50, height: 50 },
      // { x: 200, y: 500, width: 50, height: 200 },
      // { x: 1080, y: 350, width: 50, height: 200 },
      // { x: 400, y: 350, width: 50, height: 200 },
      // { x: 900, y: 150, width: 50, height: 200 }
    ],
    obstacles: [
      { x: 640, y: 650, radius: 15 },
      { x: 900, y: 350, radius: 15 },
      { x: 400, y: 250, radius: 12 }
    ]
  },
  7: {
    walls: [
      { x: 400, y: 600, width: 600, height: 50 },
      { x: 900, y: 500, width: 600, height: 50 },
      { x: 400, y: 400, width: 600, height: 50 },
      { x: 900, y: 300, width: 600, height: 50 },
      { x: 640, y: 200, width: 900, height: 50 },
      { x: 700, y: 650, width: 50, height: 200 },
      { x: 200, y: 500, width: 50, height: 200 },
      { x: 1080, y: 350, width: 50, height: 200 },
      { x: 400, y: 350, width: 50, height: 200 },
      { x: 900, y: 150, width: 50, height: 200 },
      { x: 640, y: 425, width: 50, height: 200 }
    ],
    obstacles: [
      { x: 640, y: 650, radius: 13 },
      { x: 900, y: 350, radius: 13 },
      { x: 400, y: 250, radius: 10 },
      { x: 700, y: 500, radius: 10 }
    ]
  },
  8: {
    walls: [
    
    ],
    obstacles: [
      { x: 640, y: 650 },
      { x: 400, y: 350 },
      { x: 900, y: 250 },
      { x: 640, y: 200 },
      { x: 800, y: 100 },
      { x: 500, y: 500 }
    ]
  },
  9: {
    walls: [
      { x: 640, y: 700, width: 1280, height: 50 },
      { x: 640, y: 25, width: 1280, height: 50 },
      { x: 25, y: 360, width: 50, height: 720 },
      { x: 1255, y: 360, width: 50, height: 720 },
      // 미로 더 복잡
      { x: 320, y: 600, width: 80, height: 8 },
      { x: 960, y: 600, width: 80, height: 8 },
      { x: 640, y: 500, width: 300, height: 8 },
      { x: 320, y: 400, width: 80, height: 8 },
      { x: 960, y: 400, width: 80, height: 8 },
      { x: 640, y: 300, width: 300, height: 8 },
      // 세로 벽
      { x: 540, y: 550, width: 8, height: 100 },
      { x: 740, y: 350, width: 8, height: 100 },
      { x: 320, y: 250, width: 8, height: 100 },
      { x: 960, y: 250, width: 8, height: 100 },
      { x: 640, y: 150, width: 8, height: 100 },
      { x: 800, y: 200, width: 8, height: 100 },
      { x: 500, y: 100, width: 8, height: 100 },
    ],
    obstacles: [
      { x: 640, y: 650 },
      { x: 400, y: 350 },
      { x: 900, y: 250 },
      { x: 640, y: 200 },
      { x: 800, y: 100 },
      { x: 500, y: 500 },
      { x: 700, y: 300 }
    ]
  },
  10: {
    walls: [
      { x: 640, y: 700, width: 1280, height: 50 },
      { x: 640, y: 25, width: 1280, height: 50 },
      { x: 25, y: 360, width: 50, height: 720 },
      { x: 1255, y: 360, width: 50, height: 720 },
      // 미로 최종 난이도
      { x: 320, y: 600, width: 60, height: 6 },
      { x: 960, y: 600, width: 60, height: 6 },
      { x: 640, y: 500, width: 200, height: 6 },
      { x: 320, y: 400, width: 60, height: 6 },
      { x: 960, y: 400, width: 60, height: 6 },
      { x: 640, y: 300, width: 200, height: 6 },
      // 세로 벽
      { x: 540, y: 550, width: 6, height: 100 },
      { x: 740, y: 350, width: 6, height: 100 },
      { x: 320, y: 250, width: 6, height: 100 },
      { x: 960, y: 250, width: 6, height: 100 },
      { x: 640, y: 150, width: 6, height: 100 },
      { x: 800, y: 200, width: 6, height: 100 },
      { x: 500, y: 100, width: 6, height: 100 },
      { x: 1100, y: 200, width: 6, height: 100 },
    ],
    obstacles: [
      { x: 640, y: 650 },
      { x: 400, y: 350 },
      { x: 900, y: 250 },
      { x: 640, y: 200 },
      { x: 800, y: 100 },
      { x: 500, y: 500 },
      { x: 700, y: 300 },
      { x: 1100, y: 150 }
    ]
  }
};