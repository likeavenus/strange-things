var i=Object.defineProperty,t=(t,e,s)=>((t,e,s)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s)(t,"symbol"!=typeof e?e+"":e,s);import{P as e,p as s}from"./phaser-Dp_CM4nq.js";!function(){const i=document.createElement("link").relList;if(!(i&&i.supports&&i.supports("modulepreload"))){for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver((i=>{for(const e of i)if("childList"===e.type)for(const i of e.addedNodes)"LINK"===i.tagName&&"modulepreload"===i.rel&&t(i)})).observe(document,{childList:!0,subtree:!0})}function t(i){if(i.ep)return;i.ep=!0;const t=function(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),"use-credentials"===i.crossOrigin?t.credentials="include":"anonymous"===i.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(i);fetch(i.href,t)}}();var a=(i=>(i[i.Disabled=0]="Disabled",i[i.Ground=1]="Ground",i[i.Player=2]="Player",i[i.Projectile=4]="Projectile",i[i.EnergySphere=8]="EnergySphere",i[i.Enemy=16]="Enemy",i[i.Platforms=32]="Platforms",i[i.Torch=64]="Torch",i[i.EnemySphere=128]="EnemySphere",i[i.DeathCollider=256]="DeathCollider",i[i.Mimic=512]="Mimic",i[i.Treasure=1024]="Treasure",i[i.MimicAttack=2048]="MimicAttack",i[i.Portal=4096]="Portal",i))(a||{});class r extends e.Physics.Matter.Sprite{constructor(i,e,s,r,o){super(i.matter.world,e,s,r),t(this,"direction"),t(this,"speed",0),t(this,"scene"),this.scene=i,this.direction=o,this.setCircle(this.width/4),this.setIgnoreGravity(!0),this.setFixedRotation(),this.setTint(61695),this.setCollisionCategory(a.EnergySphere),this.setCollidesWith([a.Enemy,a.Ground,a.Mimic]),i.add.existing(this),this.launch(),this.scene.matter.world.on("collisionstart",this.handleCollision,this)}launch(){const i=this.scene.lights.addLight(this.x,this.y,256,void 0,5);i.color.set(0,.5,1);const t=this.scene.lights;this.scene.tweens.add({targets:this,speed:40,duration:40/70*1e3,onUpdate:(t,e)=>{if(e&&e.active){const t=e.speed*e.direction;e.setVelocityX(t),i.setPosition(e.x,e.y)}},onComplete:()=>{t.removeLight(i)}})}handleCollision(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.EnergySphere&&e.collisionFilter.category===a.Ground||e.collisionFilter.category===a.EnergySphere&&t.collisionFilter.category===a.Ground||t.collisionFilter.category===a.EnergySphere&&e.collisionFilter.category===a.Enemy||t.collisionFilter.category===a.Enemy&&e.collisionFilter.category===a.EnergySphere||t.collisionFilter.category===a.EnergySphere&&e.collisionFilter.category===a.Mimic||t.collisionFilter.category===a.Mimic&&e.collisionFilter.category===a.EnergySphere)&&this.destroy(!0)}))}update(){}}class o extends e.Physics.Matter.Sprite{constructor(i,e,s,r,o){var n;super(i.matter.world,e,s,r,o,{label:"wizard",frictionAir:.05}),t(this,"isTouchingGround",!1),t(this,"isAttacking",!1),t(this,"isFalling",!1),t(this,"isStunned",!1),t(this,"isCutscene",!1),t(this,"isTeleported",!1),t(this,"jumpMaxCounter",2),t(this,"currentJumpCounter",0),t(this,"hp",5),t(this,"maxHP",10),t(this,"mana",2),t(this,"maxMana",5),t(this,"graphics"),t(this,"amuletOfLight"),t(this,"lightSphere"),t(this,"knockbackVelocity",15),t(this,"knockbackDuration",300),t(this,"knockbackTimer",0),t(this,"footstepTimer"),t(this,"footstepInterval",300),this.setName("wizard"),this.flipX=!1,(n=i.anims).create({key:"wizard_idle",frames:n.generateFrameNames("wizard_idle",{start:0,end:5,prefix:"Idle",suffix:".png"}),repeat:-1,frameRate:10}),n.create({key:"wizard_run",frames:n.generateFrameNames("wizard_run",{start:0,end:7,prefix:"Run",suffix:".png"}),repeat:-1,frameRate:14}),n.create({key:"wizard_jump",frames:n.generateFrameNames("wizard_jump",{start:0,end:1,prefix:"Jump",suffix:".png"}),repeat:-1,frameRate:10}),n.create({key:"wizard_fall",frames:n.generateFrameNames("wizard_fall",{start:0,end:1,prefix:"Fall",suffix:".png"}),repeat:-1,frameRate:10}),n.create({key:"wizard_attack1",frames:n.generateFrameNames("wizard_attack1",{start:10,end:17,prefix:"Attack",suffix:".png"}),frameRate:15}),n.create({key:"wizard_attack2",frames:n.generateFrameNames("wizard_attack2",{start:20,end:27,prefix:"Attack",suffix:".png"}),frameRate:15}),n.create({key:"wizard_death",frames:n.generateFrameNames("wizard_death",{start:0,end:6,prefix:"Death",suffix:".png"}),frameRate:11}),n.create({key:"wizard_hit",frames:n.generateFrameNames("wizard_hit",{start:0,end:3,prefix:"Hit",suffix:".png"}),frameRate:11}),this.anims.play("wizard_idle"),this.setScale(2),this.setFixedRotation(),i.input.keyboard.on("keydown-E",this.baseAttack,this),i.input.keyboard.on("keydown-F",this.rangeAttack,this),this.setCollisionCategory(a.Player),this.setCollidesWith([a.Ground,a.Enemy,a.EnemySphere,a.MimicAttack,a.Portal]),i.add.existing(this),this.setPipeline("Light2D"),i.matter.world.on("collisionstart",this.handleCollision,this),i.matter.world.on("collisionstart",this.handleCollisionStart,this),i.matter.world.on("collisionend",this.handleCollisionEnd,this),this.graphics=i.add.graphics(),this.graphics.setDepth(100),i.time.addEvent({loop:!0,delay:1e3,callback:()=>{this.mana<6&&(this.mana+=.5)}}),this.createMagicLight()}baseAttack(){this.isAttacking||!this.isTouchingGround||this.hp<=0||(this.setVelocity(0),this.isAttacking=!0,this.setOrigin(.5,.7),this.anims.play("wizard_attack1"),this.once("animationcomplete",(i=>{"wizard_attack1"===i.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("wizard_idle",!0))})))}increaseFallSpeed(){this.setVelocityY(this.body.velocity.y+.5)}rangeAttack(){!this.isAttacking&&this.isTouchingGround&&(this.hp<=0||0===this.mana||(this.isAttacking=!0,this.scene.sound.setDetune(-1e3),this.scene.sound.play("energy-attack"),this.mana-=1,this.setOrigin(.4,.6),this.setVelocity(0),this.anims.play("wizard_attack2",!0),this.once("animationcomplete",(i=>{"wizard_attack2"===i.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("wizard_idle",!0))})),this.createEnergySphere()))}createEnergySphere(){const i=this.flipX?-1:1,t=new r(this.scene,i>0?this.x+60:this.x-60,this.y-this.height/2+15,"red",i);this.scene.projectiles.add(t)}playFootstep(){var i;0!==(null==(i=this.body)?void 0:i.velocity)&&(this.footstepTimer=this.scene.time.addEvent({delay:this.footstepInterval,callback:this.playFootstep,callbackScope:this,loop:!1}))}preUpdate(i,t){super.preUpdate(i,t)}update(i,t){if(this.drawMana(),this.drawHP(),this.amuletOfLight&&this.updateMagicLight(t),this.isTeleported)return;if(this.hp<=0)return;if(this.isStunned)return;const{left:s,right:a,up:r,down:o,space:n}=i;this.body.velocity.y>.1?this.isFalling=!0:this.isFalling=!1,this.isFalling&&this.increaseFallSpeed(),this.isAttacking||(!this.isTouchingGround&&this.body.velocity.y<0?(this.anims.play("wizard_jump",!0),a.isDown?(this.setVelocityX(12),this.flipX=!1):s.isDown&&(this.setVelocityX(-12),this.flipX=!0)):!this.isTouchingGround&&this.body.velocity.y>0?(a.isDown?(this.setVelocityX(12),this.flipX=!1):s.isDown&&(this.setVelocityX(-12),this.flipX=!0),this.isFalling&&this.anims.play("wizard_fall",!0)):s.isDown?(this.setVelocityX(-12),this.flipX=!0,this.anims.play("wizard_run",!0)):a.isDown?(this.setVelocityX(12),this.flipX=!1,this.anims.play("wizard_run",!0)):(this.setVelocityX(0),this.anims.play("wizard_idle",!0)),e.Input.Keyboard.JustDown(n)&&(this.isTouchingGround||!this.isTouchingGround&&this.currentJumpCounter<this.jumpMaxCounter)&&(this.setVelocityY(-30),this.isTouchingGround=!1,this.currentJumpCounter++),this.currentJumpCounter===this.jumpMaxCounter&&this.isTouchingGround&&(this.currentJumpCounter=0))}createMagicLight(){this.amuletOfLight=this.scene.lights.addLight(this.x,this.y,256,16777215,2),this.lightSphere=this.scene.matter.add.image(this.x,this.y,"red",void 0,{isStatic:!0,isSensor:!0,collisionFilter:{category:a.Disabled}})}updateMagicLight(i){this.amuletOfLight&&(this.amuletOfLight.setPosition(this.lightSphere.x,this.lightSphere.y),this.lightSphere.setPosition(this.x+(this.flipX?-70:70),this.y-70))}slowDownTime(){this.scene.matter.world.engine.timing.timeScale=.1,this.scene.time.delayedCall(300,(()=>{this.scene.matter.world.engine.timing.timeScale=1}))}flashEffect(){const i=Math.floor(10);this.scene.add.timeline({});for(let t=0;t<i;t++)this.setTint(t%2==0?0:16777215)}getDamage(){this.isAttacking=!1,this.hp-=1,this.scene.sound.play("skull-crash"),this.applyKnockback(this.flipX?"left":"right"),this.isStunned=!0,this.on("animationcomplete",(i=>{"wizard_hit"===i.key&&(this.isStunned=!1)})),this.hp<=0?(this.anims.play("wizard_death",!0),this.setCollisionCategory(a.DeathCollider)):(this.anims.play("wizard_hit"),this.scene.children.each((i=>{(null==i?void 0:i.anims)&&(i.anims.timeScale=.4)})),this.scene.time.delayedCall(300,(()=>{this.scene.children.each((i=>{(null==i?void 0:i.anims)&&(i.anims.timeScale=1)}))})))}applyKnockback(i){if(this.isStunned)return;const t="left"===i?this.knockbackVelocity:-this.knockbackVelocity;this.knockbackVelocity,this.setVelocityX(t),this.knockbackTimer=this.knockbackDuration}handleCollisionStart(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.Ground&&e.collisionFilter.category===a.Player||e.collisionFilter.category===a.Ground&&t.collisionFilter.category===a.Player)&&(this.isTouchingGround||(this.isTouchingGround=!0,this.currentJumpCounter=0))}))}handleCollisionEnd(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.Ground&&e.collisionFilter.category===a.Player||e.collisionFilter.category===a.Ground&&t.collisionFilter.category===a.Player)&&(this.isTouchingGround=!1)}))}handleCollision(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.EnemySphere&&e.collisionFilter.category===a.Player||e.collisionFilter.category===a.EnemySphere&&t.collisionFilter.category===a.Player||t.collisionFilter.category===a.MimicAttack&&e.collisionFilter.category===a.Player||e.collisionFilter.category===a.MimicAttack&&t.collisionFilter.category===a.Player)&&(this.scene.cameras.main.shake(500,.009),this.slowDownTime(),this.getDamage())}))}drawMana(){this.graphics.clear(),this.graphics.setScrollFactor(0),this.graphics.setPosition(50,50);const i=10;for(let t=0;t<this.mana;t++){const e=10+30*t,s=50;this.graphics.beginPath(),this.graphics.moveTo(e,s-i),this.graphics.lineTo(e+i,s),this.graphics.lineTo(e,s+i),this.graphics.lineTo(e-i,s),this.graphics.closePath(),this.graphics.fillPath(),t<this.mana&&(this.graphics.fillStyle(1118719),this.graphics.beginPath(),this.graphics.moveTo(e,s-i),this.graphics.lineTo(e+i,s),this.graphics.lineTo(e,s+i),this.graphics.lineTo(e-i,s),this.graphics.closePath(),this.graphics.fillPath())}}drawHP(){this.graphics.setScrollFactor(0),this.graphics.setPosition(10,30);for(let i=0;i<this.maxHP;i++){const t=10+25*i*1.3,e=10;this.graphics.fillStyle(16777215),this.graphics.fillCircle(t,e,13),i<this.hp&&(this.graphics.fillStyle(16711680),this.graphics.fillCircle(t,e,12))}}}class n extends r{constructor(i,e,s,r,o){super(i,e,s,r,o),t(this,"direction",-1),this.direction=o,this.setTint(4915330),this.setCollisionCategory(a.EnemySphere),this.setCollidesWith([a.Player,a.Ground])}launch(){const i=this.scene.lights.addLight(this.x,this.y,256,void 0,5);i.color.set(.5,.1,0);const t=this.scene.lights;this.scene.tweens.add({targets:this,speed:40,duration:40/70*1e3,onUpdate:(t,e)=>{if(e&&e.active){const t=e.speed*e.direction;e.setVelocityX(t),i.setPosition(e.x,e.y)}},onComplete:()=>{t.removeLight(i)}})}handleCollision(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.EnemySphere&&e.collisionFilter.category===a.Player||e.collisionFilter.category===a.EnemySphere&&t.collisionFilter.category===a.Player||t.collisionFilter.category===a.EnemySphere&&e.collisionFilter.category===a.Ground||e.collisionFilter.category===a.EnemySphere&&t.collisionFilter.category===a.Ground)&&this.destroy(!0)}))}}class h extends e.Physics.Matter.Sprite{constructor(i,s,r,o,n){var h;super(i.matter.world,s,r,o,n,{label:"heretic",frictionAir:.05}),t(this,"isTouchingGround",!1),t(this,"isAttacking",!1),t(this,"isFalling",!1),t(this,"jumpMaxCounter",2),t(this,"currentJumpCounter",0),t(this,"direction",1),t(this,"isDead",!1),this.flipX=!1,(h=i.anims).create({key:"heretic_run",frames:h.generateFrameNames("heretic_run",{start:0,end:7,prefix:"Run",suffix:".png"}),repeat:-1,frameRate:10}),h.create({key:"heretic_attack2",frames:h.generateFrameNames("heretic_attack2",{start:20,end:27,prefix:"Attack",suffix:".png"}),frameRate:15}),this.anims.play("heretic_run"),this.setScale(3),this.setRectangle(2*this.width,3*this.height,{}),this.setFixedRotation(),this.setOnCollide((i=>{this.isTouchingGround=!0})),this.setCollisionCategory(a.Enemy),this.setCollidesWith([a.Ground,a.Player,a.EnergySphere]),i.add.existing(this),this.scene.matter.world.on("collisionstart",this.handleCollision,this),this.scene.time.addEvent({loop:!0,delay:1600,callback:()=>{this.isDead||(this.direction=-this.direction)}}),this.scene.time.addEvent({loop:!0,delay:2e3,callback:()=>{if(!this.isDead){const i=this.scene.children.getByName("wizard");e.Math.Distance.Between(i.x,i.y,this.x,this.y)<700&&this.rangeAttack()}}})}baseAttack(){!this.isAttacking&&this.isTouchingGround&&(this.setVelocity(0),this.isAttacking=!0,this.setOrigin(.5,.7),this.anims.play("wizard_attack1"),this.once("animationcomplete",(i=>{"wizard_attack1"===i.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("wizard_idle",!0))})))}increaseFallSpeed(){this.setVelocityY(this.body.velocity.y+.5)}rangeAttack(){!this.isAttacking&&this.isTouchingGround&&(this.isAttacking=!0,this.setOrigin(.4,.68),this.setVelocity(0),this.anims.play("heretic_attack2",!0),this.once("animationcomplete",(i=>{"heretic_attack2"===i.key&&(this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("heretic_run",!0))})),this.createEnergySphere())}createEnergySphere(){const i=this.flipX?-1:1,t=new n(this.scene,i>0?this.x+30:this.x-30,this.y-this.height/2+15,"red",i);this.scene.projectiles.add(t)}update(i){this.isAttacking||this.isDead||this&&(this.direction>0?(this.flipX=!1,this.setVelocityX(10)):(this.flipX=!0,this.setVelocityX(-10)))}handleCollision(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.EnergySphere&&e.collisionFilter.category===a.Enemy||e.collisionFilter.category===a.EnergySphere&&t.collisionFilter.category===a.Enemy)&&(this.isDead=!0,this.destroy(!0))}))}}class l extends e.Physics.Matter.Sprite{constructor(i,e,s,r,o){var n;super(i.matter.world,e,s,r,o,{label:"mimic",frictionAir:.05}),t(this,"isTouchingGround",!1),t(this,"isOpen",!1),t(this,"isAttacking",!1),this.setName("mimic"),this.flipX=!0,(n=i.anims).create({key:"mimic_hidden",frames:[{key:"mimic_hidden",frame:"Mimic_Idle_Hidden0.png",duration:1500},{key:"mimic_hidden",frame:"Mimic_Idle_Hidden1.png",duration:200},{key:"mimic_hidden",frame:"Mimic_Idle_Hidden2.png",duration:1500},{key:"mimic_hidden",frame:"Mimic_Idle_Hidden3.png",duration:200}],repeat:-1,frameRate:10,duration:3e3}),n.create({key:"mimic_open",frames:n.generateFrameNames("mimic_open",{start:0,end:3,prefix:"Chest",suffix:".png"}),frameRate:10,duration:1e3}),n.create({key:"mimic_attack1",frames:n.generateFrameNames("mimic_attack1",{start:10,end:13,prefix:"Mimic_Attack-",suffix:".png"}),frameRate:9,duration:1e3}),this.anims.play("mimic_hidden"),this.anims.pause(),this.setScale(4),this.setDepth(99),this.setFixedRotation(),this.setCollisionCategory(a.Mimic),this.setCollidesWith([a.Ground,a.Enemy,a.EnemySphere,a.EnergySphere]),i.add.existing(this),this.setPipeline("Light2D"),i.matter.world.on("collisionstart",this.handleCollision,this)}baseAttack(){if(this.isAttacking||this.isOpen)return;let i;this.isAttacking=!0,this.setOrigin(.5,.59),this.anims.play("mimic_attack1"),this.scene.time.delayedCall(250,(()=>{this.scene.sound.setDetune(2e3*Math.random()),this.scene.sound.stopByKey("mimic-attack1"),this.scene.sound.play("mimic-attack1"),i=this.scene.matter.add.rectangle(this.x-50,this.y,100,100,{isSensor:!0,isStatic:!0,collisionFilter:{category:a.MimicAttack,mask:a.Player}})})),this.once("animationcomplete",(t=>{"mimic_attack1"===t.key&&(i&&this.scene.matter.world.remove(i),this.isAttacking=!1,this.setOrigin(.5,.5),this.anims.play("mimic_hidden",!0))}))}update(i){if(this.isAttacking||this.isOpen)return;const t=this.scene.children.getByName("wizard");e.Math.Distance.Between(t.x,t.y,this.x,this.y)<500?this.anims.play("mimic_hidden",!0):(this.anims.play("mimic_hidden",!0),this.anims.pause()),e.Math.Distance.Between(t.x,t.y,this.x,this.y)<200&&t.hp>0&&this.baseAttack()}handleCollision(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;(t.collisionFilter.category===a.EnergySphere&&e.collisionFilter.category===a.Mimic||e.collisionFilter.category===a.EnergySphere&&t.collisionFilter.category===a.Mimic)&&(this.isOpen||(this.anims.play("mimic_open",!0),this.isOpen=!0))}))}}class c extends e.Renderer.WebGL.Pipelines.PostFXPipeline{constructor(i){super({game:i,name:"CRTShader",fragShader:"\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uMainSampler;\nuniform float time;\nuniform vec2 resolution;\n\nvoid main(void) {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    // Цветовые каналы с небольшими искажениями\n    float r = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0) * 0.001).r;\n    float g = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 2.0) * 0.001).g;\n    float b = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 4.0) * 0.001).b;\n\n    // Добавляем сканирующие линии\n    float scanline = sin(uv.y * resolution.y * 3.1415) * 0.02;\n    vec3 color = vec3(r, g, b) - scanline;\n\n    gl_FragColor = vec4(color, 1.0);\n}\n"})}onPreRender(){this.set1f("time",this.game.loop.time/2e3),this.set2f("resolution",this.renderer.width,this.renderer.height)}}class d extends s.Scene{constructor(){super("Game"),t(this,"camera"),t(this,"wizard"),t(this,"cursors"),t(this,"projectiles"),t(this,"light"),t(this,"heretic"),t(this,"hereticGroup"),t(this,"isCutscene",!1),t(this,"mimic"),t(this,"currentMusic"),t(this,"randomSound"),t(this,"topBlackBars"),t(this,"bottomBlackBars")}preload(){this.cursors=this.input.keyboard.createCursorKeys()}initMusic(){this.currentMusic=this.sound.add("mysterious-dungeons-ambiance",{volume:.5}),this.randomSound=this.sound.add("creepy-demon-heavy-breathing",{volume:.7}),this.time.addEvent({loop:!0,delay:2e4,callback:()=>{this.randomSound.play()}}),this.currentMusic.play()}createPlatform(i,t,e){const s=this.matter.add.image(i,t,"platform",void 0,{isStatic:!0,label:"platform"});s.setPipeline("Light2D"),e?this.tweens.add({targets:s,y:s.y-1e3,yoyo:!0,duration:4e3,repeat:-1,ease:"ease"}):this.tweens.add({targets:s,y:s.x-1e3,yoyo:!0,duration:4e3,repeat:-1,ease:"ease"})}createMap(){const i=this.make.tilemap({key:"map",tileHeight:64,tileWidth:64}),t=i.addTilesetImage("brick","tileset",64,64);[i.createLayer("ground",t,0,0),i.createLayer("platforms",t,0,0),i.createLayer("handle1",t,0,0)].forEach((i=>{const t=null==i?void 0:i.layer.name;null==i||i.setName(t),null==i||i.setCollisionByProperty({collides:!0}),"ground"===t&&(null==i||i.setCollisionCategory(a.Ground)),"platforms"===t&&(null==i||i.setCollisionCategory(a.Platforms)),null==i||i.setCollidesWith([a.Player,a.Projectile,a.Enemy]),null==i||i.setPipeline("Light2D"),this.matter.world.convertTilemapLayer(i)}))}createTorch(i,t){this.anims.create({key:"torch1",frames:this.anims.generateFrameNames("torch1",{start:10,end:12,prefix:"bigtorchlit",suffix:".png"}),repeat:-1,frameRate:9});const e=this.matter.add.sprite(i,t,"torch1",void 0,{isStatic:!0});e.setScale(1.5),e.setPipeline("Light2D"),e.anims.play("torch1"),this.lights.addLight(e.x,e.y-100,512,void 0,2),e.setCollisionCategory(a.Torch)}create(){this.initMusic(),this.camera=this.cameras.main,this.camera.setZoom(.9),this.camera.fadeIn(1e3),this.camera.setPostPipeline(new c(this.game)),this.lights.enable(),this.projectiles=this.add.group(),this.createPlatform(1290,2800,!0),this.createTorch(150,2975),this.createTorch(1050,2975),this.createTorch(2350,3100),this.createTorch(1e3,1060),this.createTorch(3700,2850),this.wizard=new o(this,90,2975,"wizard_idle"),this.createMap(),this.camera.setDeadzone(250,250),this.camera.startFollow(this.wizard,!0,1,1,-100,-30),this.light=this.lights.addLight(this.wizard.x,this.wizard.y,512,void 0,1),this.hereticGroup=this.add.group({classType:h,key:"heretic",runChildUpdate:!0}),this.hereticGroup.get(1200,2900),this.mimic=new l(this,3600,2900,"mimic_hidden")}createBlackBars(){const i=this.cameras.main.width;this.topBlackBars=this.add.rectangle(i/2,-50,i,100,0).setOrigin(.5,0).setDepth(1e3),this.bottomBlackBars=this.add.rectangle(i/2,this.cameras.main.height+50,i,100,0).setOrigin(.5,1).setDepth(1e3),this.tweens.add({targets:this.topBlackBars,y:0,duration:1e3,ease:"Power2"}),this.tweens.add({targets:this.bottomBlackBars,y:this.cameras.main.height,duration:1e3,ease:"Power2"})}update(i,t){this.wizard.update(this.cursors,i),this.mimic.update(this.cursors),this.projectiles.children.each((function(i){i.update()}),this)}}class m extends s.Scene{constructor(){super("Preloader")}init(){}loadHeretic(){this.load.atlas("heretic_run","heretic/run/Run.png","heretic/run/Run.json"),this.load.atlas("heretic_attack2","heretic/attack2/Attack2.png","heretic/attack2/Attack2.json")}preload(){this.load.setPath("assets"),this.load.image("logo","logo.png"),this.load.atlas("wizard_idle","wizard/idle/idle.png","wizard/idle/idle.json"),this.load.atlas("wizard_run","wizard/run/Run.png","wizard/run/Run.json"),this.load.atlas("wizard_jump","wizard/jump/Jump.png","wizard/jump/Jump.json"),this.load.atlas("wizard_fall","wizard/fall/Fall.png","wizard/fall/Fall.json"),this.load.atlas("wizard_attack1","wizard/attack1/Attack1.png","wizard/attack1/Attack1.json"),this.load.atlas("wizard_attack2","wizard/attack2/Attack2.png","wizard/attack2/Attack2.json"),this.load.atlas("wizard_death","wizard/death/Death.png","wizard/death/Death.json"),this.load.atlas("wizard_hit","wizard/hit/Hit.png","wizard/hit/Hit.json"),this.load.image("tileset","map/brick.png"),this.load.tilemapTiledJSON("map","map/map.json"),this.load.image("home-tileset","map/home.png"),this.load.tilemapTiledJSON("home","map/home.json"),this.load.image("home-bg-1","map/home/home-bg-1.png"),this.load.atlas("portal","environment/portal/portal.png","environment/portal/portal.json"),this.load.image("platform","map/platform.png"),this.load.image("red","wizard/magic/red.png"),this.load.atlas("torch1","torch/torch.png","torch/torch.json"),this.loadHeretic(),this.load.audio("footstep","wizard/footstep.mp3"),this.load.audio("creepy-demon-heavy-breathing","environment/sounds/creepy-demon-heavy-breathing.wav"),this.load.audio("mysterious-dungeons-ambiance","environment/sounds/mysterious-dungeons-ambiance.mp3"),this.load.audio("dungeon","environment/sounds/dungeon_.mp3"),this.load.audio("skull-crash","wizard/skull-crash.mp3"),this.load.audio("mimic-attack1","mimic/mimic-attack1.mp3"),this.load.audio("energy-attack","wizard/energy-attack.mp3"),this.load.atlas("mimic_hidden","mimic/Mimic_Idle_Hidden.png","mimic/Mimic_Idle_Hidden.json"),this.load.atlas("mimic_open","mimic/Mimic_Open.png","mimic/Mimic_Open.json"),this.load.atlas("mimic_attack1","mimic/Mimic_Attack-1.png","mimic/Mimic_Attack-1.json")}create(){this.scene.start("Home")}}class p extends e.Physics.Matter.Sprite{constructor(i,t,e,s,r){var o;super(i.matter.world,t,e,s,r,{label:"portal",isSensor:!0,isStatic:!0}),this.setName("portal"),(o=i.anims).create({key:"portal-animate",frames:o.generateFrameNames("portal",{start:0,end:104,prefix:"convert",suffix:".png"}),repeat:-1,frameRate:14}),this.anims.play("portal-animate"),this.setDepth(99),this.setFixedRotation(),this.setCollisionCategory(a.Portal),this.setCollidesWith([a.Player]),i.add.existing(this),i.matter.world.on("collisionstart",this.handleCollision,this)}update(i){}handleCollision(i){i.pairs.forEach((i=>{const{bodyA:t,bodyB:e}=i;if(t.collisionFilter.category===a.Portal&&e.collisionFilter.category===a.Player||e.collisionFilter.category===a.Player&&t.collisionFilter.category===a.Portal){const i=this.scene.children.getByName("wizard");i.isTeleported=!0,i.anims.play("wizard_idle"),this.scene.cameras.main.fadeOut(800,0,0,0),this.scene.time.delayedCall(1050,(()=>{this.scene.scene.start("Game")}))}}))}}class g extends e.Scene{constructor(){super("Home"),t(this,"wizard"),t(this,"portal"),t(this,"camera"),t(this,"cursors")}preload(){this.cursors=this.input.keyboard.createCursorKeys()}addBackground(){this.add.image(1240,1e3,"home-bg-1").setScale(5,4)}createTorch(i,t){this.anims.create({key:"torch1",frames:this.anims.generateFrameNames("torch1",{start:10,end:12,prefix:"bigtorchlit",suffix:".png"}),repeat:-1,frameRate:9});const e=this.matter.add.sprite(i,t,"torch1",void 0,{isStatic:!0});e.setScale(1),e.setPipeline("Light2D"),e.anims.play("torch1"),this.lights.addLight(e.x,e.y-50,512,void 0,2),e.setCollisionCategory(a.Torch)}create(){this.projectiles=this.add.group(),this.portal=new p(this,2450,700,"portal"),this.addBackground(),this.camera=this.cameras.main,this.createMap(),this.wizard=new o(this,90,1e3,"wizard_idle"),this.camera.setDeadzone(250,250),this.camera.startFollow(this.wizard,!0,1,1,-100,-30),this.lights.enable(),this.createTorch(120,1300),this.createTorch(650,1300),this.createTorch(1300,1300),this.createTorch(2e3,1300)}createMap(){const i=this.make.tilemap({key:"home",tileHeight:64,tileWidth:64}),t=i.addTilesetImage("home","home-tileset",64,64);[i.createLayer("ground",t,0,0)].forEach((i=>{const t=null==i?void 0:i.layer.name;null==i||i.setName(t),null==i||i.setCollisionByProperty({collides:!0}),"Слой тайлов 1"===t&&(null==i||i.setCollisionCategory(a.Ground)),"platforms"===t&&(null==i||i.setCollisionCategory(a.Platforms)),null==i||i.setCollidesWith([a.Player,a.Projectile,a.Enemy]),null==i||i.setPipeline("Light2D"),this.matter.world.convertTilemapLayer(i)}))}update(i,t){this.wizard.update(this.cursors,i)}}const y={type:Phaser.WEBGL,width:innerWidth,parent:"game-container",scale:{},physics:{default:"matter",matter:{gravity:{y:2}}},pipeline:{CRTShader:c},scene:[m,g,d]};new s.Game(y);