import { WeaponTypes } from './weapon-types.enum';

export interface IWeapon {
  name: string;
  type: WeaponTypes;
  damage: number;
  fireRate: number;
  ammoCap: number;
  reloadTime: number;
  origin: Phaser.Math.Vector2;
  bullet: {
    speed: number;
    origin: Phaser.Math.Vector2;
  };
  gfx: {
    key: string;
    path: string;
    size: {
      width: number;
      height: number;
    };
  };
}
