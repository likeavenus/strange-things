var t=Object.defineProperty,e=(e,i,s)=>((e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s)(e,"symbol"!=typeof i?i+"":i,s);import{p as i,P as s}from"./phaser-Dp_CM4nq.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();class a extends i.Scene{constructor(){super("Boot")}preload(){this.load.image("background","assets/bg.png")}create(){this.add.text(this.game.canvas.width/2,this.game.canvas.height/2,"Start"),this.input.once("pointerdown",(()=>{this.cameras.main.fadeOut(800),this.time.delayedCall(800,(()=>{this.scene.start("Home")}))}))}}var r=(t=>(t[t.Disabled=0]="Disabled",t[t.Ground=1]="Ground",t[t.Player=2]="Player",t[t.Projectile=4]="Projectile",t[t.EnergySphere=8]="EnergySphere",t[t.Enemy=16]="Enemy",t[t.Platforms=32]="Platforms",t[t.Torch=64]="Torch",t[t.EnemySphere=128]="EnemySphere",t[t.DeathCollider=256]="DeathCollider",t[t.Mimic=512]="Mimic",t[t.Treasure=1024]="Treasure",t[t.MimicAttack=2048]="MimicAttack",t[t.Portal=4096]="Portal",t))(r||{});const n=[{x:600,y:1500,text:"Я падал в пустоте долгое время, уже и не помню сколько времени прошло..."},{x:900,y:1500,text:"Что это за место? Напоминает мой замок, но здесь так пусто... я не был дома много лет"},{x:2e3,y:800,text:"Похоже на портал, но что он тут делает?"},{x:2400,y:1500,text:"Я слышал наверху какой-то шум когда очутился здесь"}],o=[{x:300,y:3010,text:"Провалившись в телепорт, я вдруг начал вспоминать..."},{x:600,y:3010,text:"Мое имя Илья, и кажется последнее что я помню - это демонические слова проклятья, но кто их произносил против меня? А мой замок? Он стал мрачным и таким неуютным. Раньше я приходил сюда и восстанавливал свои силы для дальнейших путешествий и исследований..."},{x:900,y:3010,text:"Ладно, пора собраться и понять куда вёл этот чертов портал и что меня ждет в этом подземелье."},{x:2e3,y:3100,text:"Записка с кривым подчерком, которую писали в торопях гласит: Тени сгущаются, и звезды сходятся в верном порядке. Мое время настало. Древние тайны, скрытые в писаниях безумного Альхазреда, указали мне путь к возрождению величайшего из некромантов — Джозефа Кервена. Его знания и сила превзойдут все, что этот мир видел прежде. Но для осуществления обряда мне нужна энергия, которую может дать лишь твой замок и ты сам. Стены твоего замка пропитаны древней магией, а твоя сущность полна жизненной силы, необходимой для открытия врат между мирами... запика обрывается"},{x:0,y:1050,text:"обрывок продолжения записки еретика: ...с их помощью я смогу вернуть Кервена из бездны и поделиться с ним властью над жизнью и смертью. Сопротивление бесполезно. Судьба уже предрешена, и ты станешь частью великого замысла. Готовься, ведь скоро весь мир содрогнется от возвращения того, кто управляет силами, неподвластными простым смертным. — Преданный служитель тьмы."},{x:0,y:500,text:"Продолжение следует..."}];class h extends s.Physics.Matter.Sprite{constructor(t,i,s,a,n){super(t.matter.world,i,s,a),e(this,"direction"),e(this,"speed",0),e(this,"scene"),this.scene=t,this.direction=n,this.setCircle(this.width/4),this.setIgnoreGravity(!0),this.setFixedRotation(),this.setTint(61695).setDepth(150),this.setCollisionCategory(r.EnergySphere),this.setCollidesWith([r.Enemy,r.Ground,r.Mimic]),t.add.existing(this),this.launch(),this.scene.matter.world.on("collisionstart",this.handleCollision,this)}launch(){const t=this.scene.lights.addLight(this.x,this.y,256,void 0,5);t.color.set(0,.5,1);const e=this.scene.lights;this.scene.tweens.add({targets:this,speed:40,duration:40/70*1e3,onUpdate:(e,i)=>{if(i&&i.active){const e=i.speed*i.direction;i.setVelocityX(e),t.setPosition(i.x,i.y)}},onComplete:()=>{e.removeLight(t)}})}handleCollision(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;(e.collisionFilter.category===r.EnergySphere&&i.collisionFilter.category===r.Ground||i.collisionFilter.category===r.EnergySphere&&e.collisionFilter.category===r.Ground||e.collisionFilter.category===r.EnergySphere&&i.collisionFilter.category===r.Enemy||e.collisionFilter.category===r.Enemy&&i.collisionFilter.category===r.EnergySphere||e.collisionFilter.category===r.EnergySphere&&i.collisionFilter.category===r.Mimic||e.collisionFilter.category===r.Mimic&&i.collisionFilter.category===r.EnergySphere)&&this.destroy(!0)}))}update(){}}class l extends s.Physics.Matter.Sprite{constructor(t,i,s,a,n){var o;super(t.matter.world,i,s,a,n,{label:"wizard",frictionAir:.05}),e(this,"isTouchingGround",!1),e(this,"isAttacking",!1),e(this,"isFalling",!1),e(this,"isStunned",!1),e(this,"isCutscene",!1),e(this,"isTeleported",!1),e(this,"isReading",!1),e(this,"eKeyText"),e(this,"isRunning",!1),e(this,"jumpMaxCounter",2),e(this,"currentJumpCounter",0),e(this,"hp",10),e(this,"maxHP",10),e(this,"mana",4),e(this,"maxMana",6),e(this,"graphics"),e(this,"amuletOfLight"),e(this,"lightSphere"),e(this,"knockbackVelocity",15),e(this,"knockbackDuration",300),e(this,"knockbackTimer",0),e(this,"footstepTimer"),e(this,"footstepInterval",300),this.setName("wizard"),this.flipX=!1,(o=t.anims).create({key:"wizard_idle",frames:o.generateFrameNames("wizard_idle",{start:0,end:5,prefix:"Idle",suffix:".png"}),repeat:-1,frameRate:10}),o.create({key:"wizard_run",frames:o.generateFrameNames("wizard_run",{start:0,end:7,prefix:"Run",suffix:".png"}),repeat:-1,frameRate:14}),o.create({key:"wizard_jump",frames:o.generateFrameNames("wizard_jump",{start:0,end:1,prefix:"Jump",suffix:".png"}),repeat:-1,frameRate:10}),o.create({key:"wizard_fall",frames:o.generateFrameNames("wizard_fall",{start:0,end:1,prefix:"Fall",suffix:".png"}),repeat:-1,frameRate:10}),o.create({key:"wizard_attack1",frames:o.generateFrameNames("wizard_attack1",{start:10,end:17,prefix:"Attack",suffix:".png"}),frameRate:15}),o.create({key:"wizard_attack2",frames:o.generateFrameNames("wizard_attack2",{start:20,end:27,prefix:"Attack",suffix:".png"}),frameRate:15}),o.create({key:"wizard_death",frames:o.generateFrameNames("wizard_death",{start:0,end:6,prefix:"Death",suffix:".png"}),frameRate:11}),o.create({key:"wizard_hit",frames:o.generateFrameNames("wizard_hit",{start:0,end:3,prefix:"Hit",suffix:".png"}),frameRate:11}),this.anims.play("wizard_idle"),this.setScale(2).setDepth(150),this.setFixedRotation(),t.input.keyboard.on("keydown-Q",this.baseAttack,this),t.input.keyboard.on("keydown-F",this.rangeAttack,this),t.input.keyboard.on("keydown",this.toggleScrollPaper,this),this.setCollisionCategory(r.Player),this.setCollidesWith([r.Ground,r.Enemy,r.EnemySphere,r.MimicAttack,r.Portal]),t.add.existing(this),this.setPipeline("Light2D"),t.matter.world.on("collisionstart",this.handleCollision,this),t.matter.world.on("collisionstart",this.handleCollisionStart,this),t.matter.world.on("collisionend",this.handleCollisionEnd,this),this.graphics=t.add.graphics(),this.graphics.setDepth(150),t.time.addEvent({loop:!0,delay:1e3,callback:()=>{this.mana<6&&(this.mana+=.5)}}),this.createMagicLight(),this.eKeyText=this.scene.add.text(this.x+20,this.y-70,"press E"),this.eKeyText.setVisible(!1).setDepth(160)}baseAttack(){this.isAttacking||!this.isTouchingGround||this.hp<=0||(this.setVelocity(0),this.isAttacking=!0,this.setOrigin(.5,.7),this.anims.play("wizard_attack1"),this.once("animationcomplete",(t=>{"wizard_attack1"===t.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("wizard_idle",!0))})))}increaseFallSpeed(){this.setVelocityY(this.body.velocity.y+.5)}rangeAttack(){!this.isAttacking&&this.isTouchingGround&&(this.hp<=0||0===this.mana||(this.isAttacking=!0,this.scene.sound.play("energy-attack"),this.mana-=1,this.setOrigin(.4,.6),this.setVelocity(0),this.anims.play("wizard_attack2",!0),this.once("animationcomplete",(t=>{"wizard_attack2"===t.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("wizard_idle",!0))})),this.createEnergySphere()))}createEnergySphere(){const t=this.flipX?-1:1,e=new h(this.scene,t>0?this.x+60:this.x-60,this.y-this.height/2+15,"red",t);this.scene.projectiles.add(e)}playFootstep(){this.isTeleported||this.scene.sound.play("footstep",{volume:1})}handleFootsteps(){this.isRunning&&!this.footstepTimer?this.footstepTimer=this.scene.time.addEvent({delay:this.footstepInterval,callback:this.playFootstep,callbackScope:this,loop:!0}):!this.isRunning&&this.footstepTimer&&(this.footstepTimer.remove(),this.footstepTimer=null)}preUpdate(t,e){super.preUpdate(t,e)}update(t,e){var i;if(this.drawMana(),this.drawHP(),this.handleFootsteps(),this.amuletOfLight&&this.updateMagicLight(e),this.isReading)return;if(this.isTeleported)return;if(this.hp<=0)return;if(this.isStunned)return;this.isTouchingGround&&(null==(i=this.body)?void 0:i.velocity.x)<=0&&(this.isRunning=!1);const{left:a,right:r,space:n}=t;this.body.velocity.y>.1?this.isFalling=!0:this.isFalling=!1,this.isFalling&&this.increaseFallSpeed(),this.isAttacking||(!this.isTouchingGround&&this.body.velocity.y<0?(this.anims.play("wizard_jump",!0),r.isDown?(this.isRunning=!1,this.setVelocityX(12),this.flipX=!1):a.isDown&&(this.isRunning=!1,this.setVelocityX(-12),this.flipX=!0)):!this.isTouchingGround&&this.body.velocity.y>0?(r.isDown?(this.setVelocityX(12),this.flipX=!1):a.isDown&&(this.setVelocityX(-12),this.flipX=!0),this.isFalling&&this.anims.play("wizard_fall",!0)):a.isDown?(this.isRunning=!0,this.setVelocityX(-12),this.flipX=!0,this.anims.play("wizard_run",!0)):r.isDown?(this.isRunning=!0,this.setVelocityX(12),this.flipX=!1,this.anims.play("wizard_run",!0)):(this.setVelocityX(0),this.anims.play("wizard_idle",!0)),s.Input.Keyboard.JustDown(n)&&(this.isTouchingGround||!this.isTouchingGround&&this.currentJumpCounter<this.jumpMaxCounter)&&(this.setVelocityY(-30),this.isTouchingGround=!1,this.currentJumpCounter++),this.currentJumpCounter===this.jumpMaxCounter&&this.isTouchingGround&&(this.currentJumpCounter=0))}createMagicLight(){this.amuletOfLight=this.scene.lights.addLight(this.x,this.y,256,16777215,2),this.lightSphere=this.scene.matter.add.image(this.x,this.y,"red",void 0,{isStatic:!0,isSensor:!0,collisionFilter:{category:r.Disabled}}).setDepth(150)}updateMagicLight(t){this.amuletOfLight&&(this.amuletOfLight.setPosition(this.lightSphere.x,this.lightSphere.y),this.lightSphere.setPosition(this.x+(this.flipX?-70:70),this.y-70))}toggleScrollPaper(t){if("Escape"===t.code||"KeyE"===t.code){const t=this.scene.children.getByName("scroll");t.visible?(t.hideScroll(),this.isReading=!1):this.eKeyText.visible&&(t.showScroll(),this.isReading=!0)}}slowDownTime(){this.scene.matter.world.engine.timing.timeScale=.1,this.scene.time.delayedCall(300,(()=>{this.scene.matter.world.engine.timing.timeScale=1}))}getDamage(){this.isAttacking=!1,this.hp-=1,this.scene.sound.play("skull-crash"),this.applyKnockback(this.flipX?"left":"right"),this.isStunned=!0,this.scene.time.delayedCall(500,(()=>{this.isStunned=!1})),this.on("animationcomplete",(t=>{"wizard_hit"===t.key&&(this.isStunned=!1)})),this.hp<=0?(this.anims.play("wizard_death",!0),this.setOrigin(.5,.6),this.setCollisionCategory(r.DeathCollider)):(this.anims.play("wizard_hit"),this.scene.children.each((t=>{(null==t?void 0:t.anims)&&(t.anims.timeScale=.4)})),this.scene.time.delayedCall(300,(()=>{this.scene.children.each((t=>{(null==t?void 0:t.anims)&&(t.anims.timeScale=1)}))})))}applyKnockback(t){if(this.isStunned)return;const e="left"===t?this.knockbackVelocity:-this.knockbackVelocity;this.knockbackVelocity,this.setVelocityX(e),this.knockbackTimer=this.knockbackDuration}handleCollisionStart(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;(e.collisionFilter.category===r.Player&&i.collisionFilter.category===r.Ground||i.collisionFilter.category===r.Player&&e.collisionFilter.category===r.Ground)&&(this.isTouchingGround||(this.isTouchingGround=!0,this.currentJumpCounter=0))}))}handleCollisionEnd(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;e.collisionFilter.category===r.Ground&&i.collisionFilter.category===r.Player||i.collisionFilter.category===r.Ground&&(e.collisionFilter.category,r.Player)}))}handleCollision(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;(e.collisionFilter.category===r.EnemySphere&&i.collisionFilter.category===r.Player||i.collisionFilter.category===r.EnemySphere&&e.collisionFilter.category===r.Player||e.collisionFilter.category===r.MimicAttack&&i.collisionFilter.category===r.Player||i.collisionFilter.category===r.MimicAttack&&e.collisionFilter.category===r.Player||e.collisionFilter.category===r.Enemy&&i.collisionFilter.category===r.Player||i.collisionFilter.category===r.Enemy&&e.collisionFilter.category===r.Player)&&(this.scene.cameras.main.shake(500,.009),this.slowDownTime(),this.getDamage())}))}drawMana(){this.graphics.clear(),this.graphics.setScrollFactor(0),this.graphics.setPosition(50,50);const t=10;for(let e=0;e<this.mana;e++){const i=10+30*e,s=50;this.graphics.beginPath(),this.graphics.moveTo(i,s-t),this.graphics.lineTo(i+t,s),this.graphics.lineTo(i,s+t),this.graphics.lineTo(i-t,s),this.graphics.closePath(),this.graphics.fillPath(),e<this.mana&&(this.graphics.fillStyle(1118719),this.graphics.beginPath(),this.graphics.moveTo(i,s-t),this.graphics.lineTo(i+t,s),this.graphics.lineTo(i,s+t),this.graphics.lineTo(i-t,s),this.graphics.closePath(),this.graphics.fillPath())}}drawHP(){this.graphics.setScrollFactor(0),this.graphics.setPosition(10,30);for(let t=0;t<this.maxHP;t++){const e=10+25*t*1.3,i=10;this.graphics.fillStyle(16777215),this.graphics.fillCircle(e,i,13),t<this.hp&&(this.graphics.fillStyle(16711680),this.graphics.fillCircle(e,i,12))}}}class c extends h{constructor(t,i,s,a,n){super(t,i,s,a,n),e(this,"direction",-1),this.direction=n,this.setTint(4915330).setDepth(150),this.setCollisionCategory(r.EnemySphere),this.setCollidesWith([r.Player,r.Ground])}launch(){const t=this.scene.lights.addLight(this.x,this.y,256,void 0,5);t.color.set(.5,.1,0);const e=this.scene.lights;this.scene.tweens.add({targets:this,speed:40,duration:40/70*1e3,onUpdate:(e,i)=>{if(i&&i.active){const e=i.speed*i.direction;i.setVelocityX(e),t.setPosition(i.x,i.y)}},onComplete:()=>{e.removeLight(t)}})}handleCollision(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;(e.collisionFilter.category===r.EnemySphere&&i.collisionFilter.category===r.Player||i.collisionFilter.category===r.EnemySphere&&e.collisionFilter.category===r.Player||e.collisionFilter.category===r.EnemySphere&&i.collisionFilter.category===r.Ground||i.collisionFilter.category===r.EnemySphere&&e.collisionFilter.category===r.Ground)&&this.destroy(!0)}))}}class d extends s.Physics.Matter.Sprite{constructor(t,i,a,n,o){var h;super(t.matter.world,i,a,n,o,{label:"heretic",frictionAir:.05}),e(this,"hp",100),e(this,"isTouchingGround",!1),e(this,"isAttacking",!1),e(this,"isStunned",!1),e(this,"isFalling",!1),e(this,"jumpMaxCounter",2),e(this,"currentJumpCounter",0),e(this,"direction",1),e(this,"isDead",!1),this.flipX=!1,(h=t.anims).create({key:"heretic_run",frames:h.generateFrameNames("heretic_run",{start:0,end:7,prefix:"Run",suffix:".png"}),repeat:-1,frameRate:10}),h.create({key:"heretic_death",frames:h.generateFrameNames("heretic_death",{start:0,end:6,prefix:"Death",suffix:".png"}),repeat:0,frameRate:10}),h.create({key:"heretic_idle",frames:h.generateFrameNames("heretic_idle",{start:0,end:7,prefix:"Idle",suffix:".png"}),repeat:0,frameRate:10}),h.create({key:"heretic_hit",frames:h.generateFrameNames("heretic_hit",{start:0,end:2,prefix:"hit",suffix:".png"}),repeat:0,frameRate:5}),h.create({key:"heretic_attack2",frames:h.generateFrameNames("heretic_attack2",{start:20,end:27,prefix:"Attack",suffix:".png"}),frameRate:15}),this.anims.play("heretic_run"),this.setScale(3),this.setRectangle(2*this.width,3*this.height,{}),this.setFixedRotation(),this.setOnCollide((t=>{this.isTouchingGround=!0})),this.setCollisionCategory(r.Enemy),this.setCollidesWith([r.Ground,r.Player,r.EnergySphere]),t.add.existing(this),this.scene.matter.world.on("collisionstart",this.handleCollision,this),this.scene.time.addEvent({loop:!0,delay:1600,callback:()=>{this.isDead||this.isStunned||this.isAttacking||this.scene.children.getByName("wizard").hp<=0||(this.direction=-this.direction)}}),this.scene.time.addEvent({loop:!0,delay:2e3,callback:()=>{if(this.isDead)return;if(this.isStunned)return;if(this.isAttacking)return;const t=this.scene.children.getByName("wizard");t.hp<=0||s.Math.Distance.Between(t.x,t.y,this.x,this.y)<600&&(t.x>this.x?this.direction=-1:this.direction=1,this.rangeAttack())}})}increaseFallSpeed(){this.setVelocityY(this.body.velocity.y+.5)}rangeAttack(){!this.isAttacking&&this.isTouchingGround&&(this.isAttacking=!0,this.setOrigin(.4,.68),this.setVelocity(0),this.anims.play("heretic_attack2",!0),this.once("animationcomplete",(t=>{"heretic_attack2"===t.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("heretic_run",!0))})),this.createEnergySphere())}createEnergySphere(){const t=this.flipX?-1:1,e=new c(this.scene,t>0?this.x+30:this.x-30,this.y-this.height/2+15,"red",t);this.scene.projectiles.add(e)}update(t){if(!this.isStunned&&!this.isAttacking&&!(this.isDead||this.hp<=0))return this.scene.children.getByName("wizard").hp<=0?(this.anims.play("heretic_idle",!0),void this.setOrigin(.5,.68)):void(this&&(this.direction>0?(this.flipX=!1,this.setVelocityX(10)):(this.flipX=!0,this.setVelocityX(-10))))}getDamage(){this.isAttacking=!1,this.hp-=10,this.scene.sound.play("skull-crash"),this.isStunned=!0,this.on("animationcomplete",(t=>{"heretic_hit"!==t.key||this.isDead||(this.isStunned=!1,this.anims.play("heretic_run"),this.setOrigin(.5,.8))})),this.hp<=0?(this.isDead=!0,this.anims.play("heretic_death",!0),this.setCollisionCategory(r.DeathCollider),this.setOrigin(.5,.725)):(this.anims.play("heretic_hit"),this.setOrigin(.5,.6)),this.isDead||this.scene.time.delayedCall(500,(()=>{this.anims.play("heretic_run"),this.setOrigin(.5,.5),this.isStunned=!1}))}handleCollision(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;(e.collisionFilter.category===r.EnergySphere&&i.collisionFilter.category===r.Enemy||i.collisionFilter.category===r.EnergySphere&&e.collisionFilter.category===r.Enemy)&&this.getDamage()}))}}class p extends s.Physics.Matter.Sprite{constructor(t,i,s,a,n){var o;super(t.matter.world,i,s,a,n,{label:"mimic",frictionAir:.05}),e(this,"isTouchingGround",!1),e(this,"isOpen",!1),e(this,"isAttacking",!1),this.setName("mimic"),this.flipX=!0,(o=t.anims).create({key:"mimic_hidden",frames:[{key:"mimic_hidden",frame:"Mimic_Idle_Hidden0.png",duration:1500},{key:"mimic_hidden",frame:"Mimic_Idle_Hidden1.png",duration:200},{key:"mimic_hidden",frame:"Mimic_Idle_Hidden2.png",duration:1500},{key:"mimic_hidden",frame:"Mimic_Idle_Hidden3.png",duration:200}],repeat:-1,frameRate:10,duration:3e3}),o.create({key:"mimic_open",frames:o.generateFrameNames("mimic_open",{start:0,end:3,prefix:"Chest",suffix:".png"}),frameRate:10,duration:1e3}),o.create({key:"mimic_attack1",frames:o.generateFrameNames("mimic_attack1",{start:10,end:13,prefix:"Mimic_Attack-",suffix:".png"}),frameRate:9,duration:1e3}),this.anims.play("mimic_hidden"),this.anims.pause(),this.setScale(4),this.setDepth(99),this.setFixedRotation(),this.setCollisionCategory(r.Mimic),this.setCollidesWith([r.Ground,r.Enemy,r.EnemySphere,r.EnergySphere]),t.add.existing(this),this.setPipeline("Light2D"),t.matter.world.on("collisionstart",this.handleCollision,this)}baseAttack(){if(this.isAttacking||this.isOpen)return;let t;this.isAttacking=!0,this.setOrigin(.5,.59),this.anims.play("mimic_attack1"),this.scene.time.delayedCall(250,(()=>{this.scene.sound.setDetune(2e3*Math.random()),this.scene.sound.stopByKey("mimic-attack1"),this.scene.sound.play("mimic-attack1");const e=this.flipX?this.x-50:this.x+50;t=this.scene.matter.add.rectangle(e,this.y,100,100,{isSensor:!0,isStatic:!0,collisionFilter:{category:r.MimicAttack,mask:r.Player}})})),this.once("animationcomplete",(e=>{"mimic_attack1"===e.key&&(t&&this.scene.matter.world.remove(t),this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("mimic_hidden",!0))}))}update(t){if(this.isAttacking||this.isOpen)return;const e=this.scene.children.getByName("wizard");s.Math.Distance.Between(e.x,e.y,this.x,this.y)<500?this.anims.play("mimic_hidden",!0):(this.anims.play("mimic_hidden",!0),this.anims.pause()),s.Math.Distance.Between(e.x,e.y,this.x,this.y)<200&&e.hp>0&&this.baseAttack()}handleCollision(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;(e.collisionFilter.category===r.EnergySphere&&i.collisionFilter.category===r.Mimic||i.collisionFilter.category===r.EnergySphere&&e.collisionFilter.category===r.Mimic)&&(this.isOpen||(this.anims.play("mimic_open",!0),this.isOpen=!0))}))}}class m extends s.Renderer.WebGL.Pipelines.PostFXPipeline{constructor(t){super({game:t,name:"CRTShader",fragShader:"\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uMainSampler;\nuniform float time;\nuniform vec2 resolution;\n\nvoid main(void) {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    // Цветовые каналы с небольшими искажениями\n    float r = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0) * 0.002).r;\n    float g = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 2.0) * 0.002).g;\n    float b = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 4.0) * 0.002).b;\n\n    // Добавляем сканирующие линии\n    float scanline = sin(uv.y * resolution.y * 3.1415) * 0.02;\n    vec3 color = vec3(r, g, b) - scanline;\n\n    gl_FragColor = vec4(color, 1.0);\n}\n"})}onPreRender(){this.set1f("time",this.game.loop.time/2e3),this.set2f("resolution",this.renderer.width,this.renderer.height)}}class g extends Phaser.GameObjects.NineSlice{constructor(t,e,i,s,a,r,n,o,h,l,c){super(t,e,i,s,a,r,n,o,h,l,c),this.setScrollFactor(0,0),this.setDepth(200),this.visible=!1,this.setName("scroll"),t.add.existing(this)}showScroll(){this.setVisible(!0),this.scene.sound.play("scroll-sound",{volume:1})}hideScroll(){this.setVisible(!1)}}class u extends s.Renderer.WebGL.Pipelines.PostFXPipeline{constructor(t,i=0){super({game:t,name:"VortexPostFX",fragShader:"\n        precision mediump float;\n        uniform float time;\n        uniform sampler2D uMainSampler;\n        varying vec2 outTexCoord;\n\n        void main(void) {\n          vec2 uv = outTexCoord;\n          vec2 tc = uv - 0.5;\n          float dist = length(tc);\n          float angle = atan(tc.y, tc.x);\n          float speed = -1.0;\n          angle += dist * speed * time;\n          tc = dist * vec2(cos(angle), sin(angle));\n          uv = tc + 0.5;\n          vec4 color = texture2D(uMainSampler, uv);\n          gl_FragColor = color;\n        }\n      "}),e(this,"_time",0),e(this,"_timeDirection",1),this._time=i}setTimeDirection(t){this._timeDirection=t}onPreRender(){const t=.01*this.game.loop.delta;this._timeDirection>0?this._time+=this._timeDirection*t:this._time-=this._timeDirection*t,this.set1f("time",this._time)}}class y extends i.Scene{constructor(){super("Game"),e(this,"camera"),e(this,"wizard"),e(this,"paper"),e(this,"currentText",""),e(this,"paperTextObject"),e(this,"papersGroup"),e(this,"cursors"),e(this,"projectiles"),e(this,"light"),e(this,"heretic"),e(this,"hereticGroup"),e(this,"isCutscene",!1),e(this,"mimic"),e(this,"currentMusic"),e(this,"randomSound"),e(this,"topBlackBars"),e(this,"bottomBlackBars")}preload(){this.cursors=this.input.keyboard.createCursorKeys()}initMusic(){this.currentMusic=this.sound.add("mysterious-dungeons-ambiance",{volume:.5}),this.randomSound=this.sound.add("creepy-demon-heavy-breathing",{volume:.7}),this.time.addEvent({loop:!0,delay:2e4,callback:()=>{this.randomSound.play()}}),this.currentMusic.play()}createPlatform(t,e,i){const s=this.matter.add.image(t,e,"platform",void 0,{isStatic:!0,label:"platform"});s.setPipeline("Light2D"),i?this.tweens.add({targets:s,y:s.y-1500,yoyo:!0,duration:4500,repeat:-1,ease:"ease"}):this.tweens.add({targets:s,x:s.x-1200,yoyo:!0,duration:4e3,repeat:-1,ease:"ease"})}createMap(){const t=this.make.tilemap({key:"map",tileHeight:64,tileWidth:64}),e=t.addTilesetImage("brick","tileset",64,64);[t.createLayer("ground",e,0,0),t.createLayer("platforms",e,0,0),t.createLayer("handle1",e,0,0)].forEach((t=>{const e=null==t?void 0:t.layer.name;null==t||t.setName(e),null==t||t.setCollisionByProperty({collides:!0}),"ground"===e&&(null==t||t.setCollisionCategory(r.Ground)),"platforms"===e&&(null==t||t.setCollisionCategory(r.Platforms)),null==t||t.setCollidesWith([r.Player,r.Projectile,r.Enemy]),null==t||t.setPipeline("Light2D"),this.matter.world.convertTilemapLayer(t)}))}createTorch(t,e){this.anims.create({key:"torch1",frames:this.anims.generateFrameNames("torch1",{start:10,end:12,prefix:"bigtorchlit",suffix:".png"}),repeat:-1,frameRate:9});const i=this.matter.add.sprite(t,e,"torch1",void 0,{isStatic:!0});i.setScale(1.5),i.setPipeline("Light2D"),i.anims.play("torch1"),this.lights.addLight(i.x,i.y-100,512,void 0,2),i.setCollisionCategory(r.Torch)}toggleTextInPaper(t){"Escape"!==t.code&&"KeyE"!==t.code||(this.paperTextObject.setText(this.currentText),this.paperTextObject.setVisible(!this.paperTextObject.visible))}initPortalEffect(){const t=new u(this.game,4);this.cameras.main.setPostPipeline(t),console.log("vortexPipeline: ",t),t.setTimeDirection(-1)}create(){var t;this.initMusic(),this.createPaperScroll(),this.createInfoPapers(),null==(t=this.input.keyboard)||t.on("keydown",this.toggleTextInPaper,this),this.camera=this.cameras.main,this.camera.setZoom(.8),this.camera.fadeIn(1e3),this.camera.setPostPipeline(new m(this.game)),this.lights.enable(),this.projectiles=this.add.group(),this.createPlatform(3700,2900,!0),this.createPlatform(2500,1500,!1),this.createTorch(150,2975),this.createTorch(1050,2975),this.createTorch(2350,3100),this.createTorch(900,1060),this.createTorch(3700,2850),this.createTorch(200,540),this.wizard=new l(this,90,2975,"wizard_idle"),this.createMap(),this.camera.setDeadzone(250,250),this.camera.startFollow(this.wizard,!0,1,1,-100,-30),this.light=this.lights.addLight(this.wizard.x,this.wizard.y,512,void 0,1),this.hereticGroup=this.add.group({classType:d,key:"heretic",runChildUpdate:!0,createCallback(t){t.setPosition(100,1e3)}}),this.mimic=new p(this,100,500,"mimic_hidden"),this.mimic.flipX=!1}createBlackBars(){const t=this.cameras.main.width;this.topBlackBars=this.add.rectangle(t/2,-50,t,100,0).setOrigin(.5,0).setDepth(1e3),this.bottomBlackBars=this.add.rectangle(t/2,this.cameras.main.height+50,t,100,0).setOrigin(.5,1).setDepth(1e3),this.tweens.add({targets:this.topBlackBars,y:0,duration:1e3,ease:"Power2"}),this.tweens.add({targets:this.bottomBlackBars,y:this.cameras.main.height,duration:1e3,ease:"Power2"})}createPaperScroll(){this.paper=new g(this,this.game.canvas.width/2,this.game.canvas.height/2,"paper",void 0,600,700,32,32,32,32),this.paperTextObject=this.add.text(this.scene.scene.game.canvas.width/2-180,this.scene.scene.game.canvas.height/3.2,this.currentText,{fontFamily:"Georgia",fontSize:"20px",color:"#000000",wordWrap:{width:this.paper.width-205,useAdvancedWrap:!0},align:"left"}),this.paperTextObject.setScrollFactor(0).setVisible(!1),this.paperTextObject.setDepth(300)}createSinglePaper(t,e,i){if(this.papersGroup){const s=this.matter.add.image(t,e,"info-paper",void 0,{isStatic:!0,isSensor:!0,label:"info-paper"});s.setData("paper-text",i),s.setName("info-paper").setScale(.03).setDepth(150),this.papersGroup.add(s)}}createInfoPapers(){this.papersGroup=this.add.group();for(let t=0;t<o.length;t++){const e=this.matter.add.image(o[t].x,o[t].y,"info-paper",void 0,{isStatic:!0,isSensor:!0,label:"info-paper"});e.setData("paper-text",o[t].text),e.setName("info-paper").setScale(.03).setDepth(150),this.papersGroup.add(e)}}update(t,e){this.wizard.update(this.cursors,t),this.mimic.update(this.cursors),this.projectiles.children.each((function(t){t.update()}),this);let i=!1;this.papersGroup.getChildren().forEach((t=>{const e=t;Phaser.Math.Distance.Between(this.wizard.x,this.wizard.y,e.x,e.y)<100&&(this.wizard.eKeyText.setPosition(e.x,e.y-120).setVisible(!0),this.currentText=t.getData("paper-text"),i=!0)})),i||(this.wizard.eKeyText.setVisible(!1),this.currentText="")}}class f extends i.Scene{constructor(){super("Preloader")}init(){const t=this.add.rectangle(this.game.canvas.width/2,this.game.canvas.height/2,468,32).setStrokeStyle(1,16777215),e=this.add.rectangle(4+t.x-t.width/2,t.y,4,28,16777215);this.load.on("progress",(t=>{e.width=4+460*t}))}loadHeretic(){this.load.atlas("heretic_run","heretic/run/Run.png","heretic/run/Run.json"),this.load.atlas("heretic_attack2","heretic/attack2/Attack2.png","heretic/attack2/Attack2.json"),this.load.atlas("heretic_death","heretic/death/Death.png","heretic/death/Death.json"),this.load.atlas("heretic_idle","heretic/idle/Idle.png","heretic/idle/Idle.json"),this.load.atlas("heretic_hit","heretic/hit/hit.png","heretic/hit/hit.json")}preload(){this.load.setPath("assets"),this.load.image("logo","logo.png"),this.load.atlas("wizard_idle","wizard/idle/idle.png","wizard/idle/idle.json"),this.load.atlas("wizard_run","wizard/run/Run.png","wizard/run/Run.json"),this.load.atlas("wizard_jump","wizard/jump/Jump.png","wizard/jump/Jump.json"),this.load.atlas("wizard_fall","wizard/fall/Fall.png","wizard/fall/Fall.json"),this.load.atlas("wizard_attack1","wizard/attack1/Attack1.png","wizard/attack1/Attack1.json"),this.load.atlas("wizard_attack2","wizard/attack2/Attack2.png","wizard/attack2/Attack2.json"),this.load.atlas("wizard_death","wizard/death/Death.png","wizard/death/Death.json"),this.load.atlas("wizard_hit","wizard/hit/Hit.png","wizard/hit/Hit.json"),this.load.image("tileset","map/brick.png"),this.load.tilemapTiledJSON("map","map/map.json"),this.load.image("home-tileset","map/home.png"),this.load.tilemapTiledJSON("home","map/home.json"),this.load.image("home-bg-1","map/home/home-bg-1.png"),this.load.atlas("portal","environment/portal/portal.png","environment/portal/portal.json"),this.load.image("platform","map/platform.png"),this.load.image("red","wizard/magic/red.png"),this.load.atlas("torch1","torch/torch.png","torch/torch.json"),this.loadHeretic(),this.load.audio("footstep","wizard/footstep.mp3"),this.load.audio("creepy-demon-heavy-breathing","environment/sounds/creepy-demon-heavy-breathing.wav"),this.load.audio("mysterious-dungeons-ambiance","environment/sounds/mysterious-dungeons-ambiance.mp3"),this.load.audio("dungeon","environment/sounds/dungeon_.mp3"),this.load.audio("skull-crash","wizard/skull-crash.mp3"),this.load.audio("mimic-attack1","mimic/mimic-attack1.mp3"),this.load.audio("energy-attack","wizard/energy-attack.mp3"),this.load.audio("scroll-sound","environment/sounds/scroll-sound.mp3"),this.load.audio("dark-ambient-bg","environment/sounds/dark-ambient-bg.mp3"),this.load.audio("monster-growl","environment/sounds/monster-growl.wav"),this.load.audio("teleport","environment/sounds/teleport.mp3"),this.load.atlas("mimic_hidden","mimic/Mimic_Idle_Hidden.png","mimic/Mimic_Idle_Hidden.json"),this.load.atlas("mimic_open","mimic/Mimic_Open.png","mimic/Mimic_Open.json"),this.load.atlas("mimic_attack1","mimic/Mimic_Attack-1.png","mimic/Mimic_Attack-1.json"),this.load.image("paper","environment/scroll/scroll.png"),this.load.image("info-paper","environment/scroll/info-paper.png")}create(){this.scene.start("Boot")}}class x extends s.Physics.Matter.Sprite{constructor(t,e,i,s,a){var n;super(t.matter.world,e,i,s,a,{label:"portal",isSensor:!0,isStatic:!0}),this.setName("portal"),(n=t.anims).create({key:"portal-animate",frames:n.generateFrameNames("portal",{start:0,end:104,prefix:"convert",suffix:".png"}),repeat:-1,frameRate:14}),this.anims.play("portal-animate"),this.setDepth(150),this.setFixedRotation(),this.setCollisionCategory(r.Portal),this.setCollidesWith([r.Player]),t.add.existing(this),this.setPipeline("Light2D"),this.scene.lights.addLight(this.x,this.y-20,256,255,2),t.matter.world.on("collisionstart",this.handleCollision,this)}update(t){}handleCollision(t){t.pairs.forEach((t=>{const{bodyA:e,bodyB:i}=t;if(e.collisionFilter.category===r.Portal&&i.collisionFilter.category===r.Player||i.collisionFilter.category===r.Portal&&e.collisionFilter.category===r.Player){const t=this.scene.children.getByName("wizard"),e=this.scene.cameras.main;e.setPostPipeline("VortexPostFX"),t.isTeleported=!0,t.anims.play("wizard_idle"),e.getPostPipeline("VortexPostFX").setTimeDirection(1),this.scene.sound.play("teleport"),this.scene.time.delayedCall(4e3,(()=>{e.fadeOut(800,0,0,0),this.scene.time.delayedCall(1050,(()=>{this.scene.sound.stopAll(),this.scene.scene.start("Game")}))}))}}))}}class k extends s.Scene{constructor(){super("Home"),e(this,"wizard"),e(this,"portal"),e(this,"camera"),e(this,"cursors"),e(this,"paper"),e(this,"currentText",""),e(this,"paperTextObject"),e(this,"papersGroup"),e(this,"startNoiseActive",!0)}init(){this.cameras.main.fadeOut(0)}preload(){this.cursors=this.input.keyboard.createCursorKeys()}addBgMusic(){this.sound.play("dark-ambient-bg",{volume:1})}addBackground(){this.add.image(1240,1e3,"home-bg-1").setScale(5,4).setDepth(0)}createTorch(t,e){this.anims.create({key:"torch1",frames:this.anims.generateFrameNames("torch1",{start:10,end:12,prefix:"bigtorchlit",suffix:".png"}),repeat:-1,frameRate:9});const i=this.matter.add.sprite(t,e,"torch1",void 0,{isStatic:!0});i.setScale(1).setDepth(150),i.setPipeline("Light2D"),i.anims.play("torch1"),this.lights.addLight(i.x,i.y-50,512,void 0,2),i.setCollisionCategory(r.Torch)}createPaperScroll(){this.paper=new g(this,this.game.canvas.width/2,this.game.canvas.height/2,"paper",void 0,600,700,32,32,32,32),this.paperTextObject=this.add.text(this.scene.scene.game.canvas.width/2-180,this.scene.scene.game.canvas.height/3.2,this.currentText,{fontFamily:"Georgia",fontSize:"20px",color:"#000000",wordWrap:{width:this.paper.width-205,useAdvancedWrap:!0},align:"left"}),this.paperTextObject.setScrollFactor(0).setVisible(!1),this.paperTextObject.setDepth(300)}createInfoPapers(){this.papersGroup=this.add.group();for(let t=0;t<n.length;t++){const e=this.matter.add.image(n[t].x,n[t].y,"info-paper",void 0,{isStatic:!0,isSensor:!0,label:"info-paper"});e.setData("paper-text",n[t].text),e.setName("info-paper").setScale(.03).setDepth(150),this.papersGroup.add(e),this.matter.world.on("collisionstart",(t=>{t.pairs.forEach((t=>{var e=t.bodyA,i=t.bodyB,s=e.gameObject,a=i.gameObject;if(s===this.wizard&&this.papersGroup.contains(a)||a===this.wizard&&this.papersGroup.contains(s)){var r=this.papersGroup.contains(s)?s:a;r&&r.active}}))}),this)}}addStartNoise(){this.startNoiseActive&&(this.sound.play("monster-growl"),this.startNoiseActive=!1)}setupCamera(){this.camera=this.cameras.main,this.camera.fadeIn(1e3)}create(){var t;this.setupCamera(),this.wizard=new l(this,90,1400,"wizard_idle"),this.addStartNoise(),null==(t=this.input.keyboard)||t.on("keydown",this.toggleTextInPaper,this),this.createPaperScroll(),this.createMap(),this.addBgMusic(),this.createInfoPapers(),this.projectiles=this.add.group(),this.portal=new x(this,2400,700,"portal"),this.camera.setDeadzone(250,250),this.camera.startFollow(this.wizard,!0,1,1,-50,0),this.lights.enable(),this.createTorch(120,1300),this.createTorch(650,1300),this.createTorch(1300,1300),this.createTorch(2e3,1300)}toggleTextInPaper(t){"Escape"!==t.code&&"KeyE"!==t.code||(this.paperTextObject.setText(this.currentText),this.paperTextObject.setVisible(!this.paperTextObject.visible))}createMap(){const t=this.make.tilemap({key:"home",tileHeight:64,tileWidth:64}),e=t.addTilesetImage("home","home-tileset",64,64);[t.createLayer("ground",e,0,0),t.createLayer("objects",e,0,0)].forEach((t=>{const e=null==t?void 0:t.layer.name;null==t||t.setName(e),null==t||t.setDepth(100),null==t||t.setCollisionByProperty({collides:!0}),null==t||t.setCollidesWith([r.Player,r.Projectile,r.Enemy]),null==t||t.setPipeline("Light2D"),this.matter.world.convertTilemapLayer(t)}))}update(t,e){this.wizard.update(this.cursors,t);let i=!1;this.papersGroup.getChildren().forEach((t=>{const e=t;s.Math.Distance.Between(this.wizard.x,this.wizard.y,e.x,e.y)<100&&(this.wizard.eKeyText.setPosition(e.x,e.y-120).setVisible(!0),this.currentText=t.getData("paper-text"),i=!0)})),i||(this.wizard.eKeyText.setVisible(!1),this.currentText="")}}const w={type:Phaser.WEBGL,width:innerWidth,parent:"game-container",scale:{},physics:{default:"matter",matter:{gravity:{y:2}}},pipeline:{CRTShader:m,VortexPostFX:u},scene:[f,a,k,y]};new i.Game(w);
