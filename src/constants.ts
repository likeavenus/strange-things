export enum COLLISION_CATEGORIES {
  Disabled = 0,
  Ground = 1,
  Player = 2,
  Projectile = 4,
  EnergySphere = 8,
  Enemy = 16,
  Platforms = 32,
  Torch = 64,
  EnemySphere = 128,
  DeathCollider = 256,
  Mimic = 512,
  Treasure = 1024,
  MimicAttack = 2048,
  Portal = 4096,
}

export const papersCoords = [
  {
    x: 600,
    y: 1500,
    text: "Я падал в пустоте долгое время, уже и не помню сколько времени прошло...",
  },
  {
    x: 900,
    y: 1500,
    // text: "Я проснулся от странного шума наверху моей башни",
    text: "Что это за место? Напоминает мой замок, но здесь так пусто... я не был дома много лет",
  },
  {
    x: 2000,
    y: 800,
    text: "Похоже на портал, но что он тут делает?",
  },
];

export const papersDungeon = [
  {
    x: 300,
    y: 3010,
    // text: "Я проснулся от странного шума наверху моей башни",
    text: "1",
  },
  {
    x: 600,
    y: 3010,
    // text: "Я проснулся от странного шума наверху моей башни",
    text: "2",
  },
  {
    x: 900,
    y: 3010,
    // text: "Я проснулся от странного шума наверху моей башни",
    text: "3",
  },
  {
    x: 2000,
    y: 3010,
    text: "4",
  },
];
