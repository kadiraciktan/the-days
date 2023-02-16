import { WeaponTypes } from './weapon-types.enum';
import { IWeapon } from './weapon.interface';

export const WEAPON_LIST = {
  ak47: {
    name: 'AK-47',
    type: WeaponTypes.ASSAULT_RIFLE,
    damage: 10,
    fireRate: 100,
    origin: new Phaser.Math.Vector2(1, -15),
    ammoCap: 30,
    reloadTime: 2000,
    bullet: {
      speed: 500,
      origin: new Phaser.Math.Vector2(0.5, 4),
    },
    gfx: {
      key: 'ak47',
      path: './assets/gfx/ak47.png',
      size: {
        width: 32,
        height: 32,
      },
    },
  } as IWeapon,
  m4a1: {
    name: 'M4A1',
    type: WeaponTypes.ASSAULT_RIFLE,
    damage: 10,
    fireRate: 100,
    origin: new Phaser.Math.Vector2(0, -15),
    ammoCap: 30,
    reloadTime: 2000,
    bullet: {
      speed: 500,
      origin: new Phaser.Math.Vector2(0.5, 4),
    },
    gfx: {
      key: 'm4a1',
      path: './assets/gfx/m4a1.png',
      size: {
        width: 32,
        height: 32,
      },
    },
  } as IWeapon,
  deagle: {
    name: 'Desert Eagle',
    type: WeaponTypes.PISTOL,
    damage: 10,
    fireRate: 800,
    origin: new Phaser.Math.Vector2(0, -15),
    ammoCap: 7,
    reloadTime: 2000,
    bullet: {
      speed: 500,
      origin: new Phaser.Math.Vector2(0.5, 4),
    },
    gfx: {
      key: 'deagle',
      path: './assets/gfx/deagle.png',
      size: {
        width: 32,
        height: 32,
      },
    },
  } as IWeapon,
  thorAxe: {
    name: 'Thor Axe',
    type: WeaponTypes.MELEE,
    damage: 10,
    origin: new Phaser.Math.Vector2(0, -15),
    reloadTime: 2000,
    fireRate: 1000,
    bullet: {
      speed: 500,
      origin: new Phaser.Math.Vector2(0.5, 4),
    },
    gfx: {
      key: 'thor-axe',
      path: './assets/gfx/thoraxe.png',
    },
  } as IWeapon,
};
