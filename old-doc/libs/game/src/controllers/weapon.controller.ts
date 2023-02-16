import { PlayerController } from './player.controller';
import { BehaviorSubject, delay, interval, throttle, throttleTime } from 'rxjs';
import { IWeapon, WeaponTypes, WEAPON_LIST } from '../constants';
import { BULLET_LIST } from '../constants/bullet-list';

export class WeaponController {
  weaponContainer: Phaser.GameObjects.Container;
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  isFire: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isReload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  weaponInformationText: Phaser.GameObjects.Text;
  currentWeapon: IWeapon;
  currentAmmo: number;

  constructor(public player: PlayerController) {
    this.currentWeapon = WEAPON_LIST.m4a1;
    this.currentAmmo = this.currentWeapon.ammoCap ?? 0;
  }

  preload() {
    Object.values(WEAPON_LIST).forEach((weapon) => {
      this.player.scene.load.image(weapon.gfx.key, weapon.gfx.path);
    });

    this.player.scene.load.image(
      BULLET_LIST.default.gfx.key,
      BULLET_LIST.default.gfx.path
    );
  }

  create() {
    this.body = this.player.scene.physics.add.sprite(
      this.currentWeapon.origin.x,
      this.currentWeapon.origin.y,
      this.currentWeapon.gfx.key
    );
    this.weaponInformationText = this.player.scene.add.text(
      10,
      10,
      '' + this.currentAmmo ?? '',
      {
        color: 'white',
        fontSize: '12px',
      }
    );
    this.weaponContainer = this.player.scene.add.container(32, 32);
    this.weaponContainer.add([this.body, this.weaponInformationText]);
    this.currentAmmo = this.currentWeapon.ammoCap;


    

    this.isFire
      .pipe(
        throttle((value) => {
          return interval(this.currentWeapon.fireRate);
        })

       // throttleTime(this.currentWeapon.fireRate)
      )
      .subscribe((isFire) => {
        // Weapon Type Factory Pattern
        if (this.currentWeapon.type === WeaponTypes.MELEE) {
          // this.player.scene.physics.add.overlap(this.player.scene.player, this.player.scene.enemies, (player, enemy) => {
          //   console.log('hit');
          //   enemy.damage(10);
          // });

          if (this.currentWeapon === WEAPON_LIST.thorAxe) {
            const axe = this.player.scene.physics.add.sprite(
              this.player.body.x,
              this.player.body.y,
              this.currentWeapon.gfx.key
            );

            axe.setData('isBack', false);

            this.player.scene.physics.moveTo(
              axe,
              this.player.scene.input.activePointer.worldX,
              this.player.scene.input.activePointer.worldY,
              this.currentWeapon.bullet.speed
            );
            axe.setCollideWorldBounds(false);
            axe.body.onWorldBounds = false;
            // axe Tween Angle From Range 0 To 360
            this.player.scene.tweens.add({
              targets: axe,
              angle: 360,
              duration: 200,
              ease: 'Linear',
              repeat: 3,
              yoyo: false,
              onComplete: () => {
                axe.setVelocity(0, 0);

                axe.setData('isBack', true);

                // come back to player
                this.player.scene.physics.moveTo(
                  axe,
                  this.player.body.x,
                  this.player.body.y,
                  this.currentWeapon.bullet.speed
                );

                const isBack = axe.getData('isBack');

                console.log('isBack', isBack);

                // collide with player
                this.player.scene.physics.add.collider(
                  axe,
                  this.player.body,
                  (axe, player) => {
                    console.log('hit');
                    axe.destroy();
                  }
                );
              },
            });

            return;
          }
        }

        console.log('isFire', this.currentWeapon.fireRate);
        if (this.isReload.value) return;

        if (this.currentAmmo <= 0 || this.isReload.value) {
          this.currentAmmo = 0;
          this.weaponInformationText.setText('Reloading...');
          this.isReload.next(true);
        }
        if (isFire && this.currentAmmo > 0) {
          this.currentAmmo--;
          this.createBullet();
          this.weaponInformationText.setText(`${this.currentAmmo}`);
        }
      });

    this.isReload
      .pipe(delay(this.currentWeapon.reloadTime))
      .subscribe((isReloading) => {
        if (isReloading) {
          this.currentAmmo = this.currentWeapon.ammoCap;
          this.weaponInformationText.setText(`${this.currentAmmo}`);
          this.isReload.next(false);
        }
      });
  }

  update() {}

  fire() {
    this.isFire.next(true);
  }

  createBullet() {
    const bullet = this.player.scene.physics.add.sprite(
      this.player.body.x,
      this.player.body.y,
      BULLET_LIST.default.gfx.key
    );

    bullet.setOrigin(
      this.currentWeapon.bullet.origin.x,
      this.currentWeapon.bullet.origin.y
    );
    bullet.setRotation(this.player.currentAngle);
    bullet.setCollideWorldBounds(true);
    bullet.body.onWorldBounds = true;

    bullet.body.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      if (body.gameObject === bullet) {
        bullet.destroy();
      }
    });

    this.player.scene.physics.moveTo(
      bullet,
      this.player.scene.input.activePointer.worldX,
      this.player.scene.input.activePointer.worldY,
      this.currentWeapon.bullet.speed
    );
  }

  secondFire() {}

  setWeapon(weapon: IWeapon) {
    this.currentWeapon = weapon;
    this.currentAmmo = this.currentWeapon.ammoCap;
    this.weaponInformationText.setText(`${this.currentAmmo}`);
    this.body.setTexture(this.currentWeapon.gfx.key);
  }
}
