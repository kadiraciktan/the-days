import { IPlayer } from './player.interface';

export const PLAYER_LIST = {
  vip: {
    name: 'VIP',
    gfx: {
      key: 'vip',
      path: './assets/gfx/vip.png',
    },
  } as IPlayer,
  elite: {
    name: 'Elite',
    gfx: {
      key: 'elite',
      path: './assets/gfx/elite.png',
    },
  } as IPlayer,
};
