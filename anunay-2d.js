/**
 * ANUNAY 2D: Authentic Shimeji Desktop / Screen Mascot Engine
 * 
 * Shimeji Features:
 * 1. Interactive Drag & Fling Physics: Click and hold to pick up Anunay, swing him around, and throw him across the screen!
 * 2. Wall Climbing: Crawls vertically up the left and right screen borders with active climbing leg strides.
 * 3. Ceiling Crawling: Walks upside-down along the top of the browser window.
 * 4. Gravity & Parabolic Drops: Leaps off ceilings or walls, flails mid-air, and lands with bounce squash & dust puffs.
 * 5. Full 11-Frame Action Spritesheet: 6-stage running strides, takeoff ascent, apex hang time, landing crouch, combat slide, laser blast.
 * 6. Mouse Interaction & Hit Detection: Changes cursor to 'grab'/'grabbing', reacts to clicks, and follows cursor.
 * 7. Multi-Mascot Support: Can spawn and coordinate multiple Shimeji companions roaming simultaneously!
 */

class Anunay2D {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scale = options.scale || 0.42;
    this.isStandalone = !!options.isStandalone;
    this.isShimeji = options.isShimeji !== false; // Shimeji mode enabled by default

    // Dimensions
    this.baseWidth = 145 * (this.scale / 0.42);
    this.baseHeight = 150 * (this.scale / 0.42);

    // Position & Physics (Sub-pixel Precision)
    this.groundY = options.groundY || (canvas.height - 30);
    this.ceilingY = 60;
    this.wallLeftX = 86;
    this.wallRightX = canvas.width - 86;

    this.x = options.x !== undefined ? options.x : (canvas.width * (0.2 + Math.random() * 0.6));
    this.y = options.y !== undefined ? options.y : this.groundY;
    this.vx = 0;
    this.vy = 0;
    this.targetVx = 0;
    this.targetVy = 0;
    this.direction = 1;      // 1 = right/up, -1 = left/down
    this.facingProgress = 1; // Smooth 3D turn from -1 to 1
    this.isGrounded = (this.y >= this.groundY - 5);

    // Shimeji Surface & Orientation
    // Surface: 'ground', 'wall_left', 'wall_right', 'ceiling', 'air'
    this.surface = 'ground';
    this.surfaceAngle = 0;       // Target rotation angle (0=ground, -PI/2=left wall, PI/2=right wall, PI=ceiling)
    this.currentAngle = 0;       // Smoothly lerped rotation angle
    this.isGrabbed = false;      // True when mouse is dragging mascot
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.recentMouseVx = 0;
    this.recentMouseVy = 0;
    this.lastPointerX = 0;
    this.lastPointerY = 0;

    // Dynamic Landing Spring & Recoil Spring
    this.squashOffset = 0;
    this.squashVelocity = 0;
    this.recoilOffset = 0;
    this.recoilVelocity = 0;

    // Action Timers
    this.shootTimer = 0;
    this.slideTimer = 0;
    this.landTimer = 0;
    this.wallClimbTimer = 0;
    this.ceilingTimer = 0;
    this.sitTimer = 0;
    this.state = 'idle';
    this.animTime = 0;
    this.idleTime = 0;
    this.stateTimer = 0;
    this.autonomous = options.autonomous !== false;

    // Multi-Pose Stride Kinematics
    this.stridePhase = 0;
    this.smoothBobY = 0;
    this.smoothTorsoTilt = 0;
    this.smoothHipSway = 0;
    this.prevFootstepIndex = -1;

    // Normalized Main State Weights
    this.weights = {
      idle: 1.0,
      run: 0.0,
      shoot: 0.0,
      jump: 0.0,
      land: 0.0,
      slide: 0.0,
      climb: 0.0,
      hang: 0.0
    };

    // 6-Stage Run Cycle Sub-Weights
    this.runStageWeights = [0, 0, 0, 0, 0, 0];

    // Jump Sequence Sub-Weights
    this.jumpStageWeights = {
      rise: 0.0,
      apex: 0.0
    };

    // Motion Trails
    this.ghostTrails = [];
    this.ghostTimer = 0;

    // 11 Distinct Movement Sprites
    this.sprites = {
      idle: null,
      run1: null,
      run2: null,
      run3: null,
      run4: null,
      run5: null,
      shoot: null,
      jump_rise: null,
      jump: null,
      land: null,
      slide: null
    };
    this.spritesLoaded = false;
    this.loadAllSprites();

    // Particle Systems
    this.lasers = [];
    this.sparks = [];
    this.dustPuffs = [];

    // Sound
    this.audioCtx = null;
    this.soundEnabled = options.sound !== false;

    // Arena Targets
    this.targets = [];
    if (this.isStandalone) {
      this.initTargets();
    }

    this.initInteraction();
  }

  static damp(current, target, lambda, dt) {
    return target + (current - target) * Math.exp(-lambda * dt);
  }

  loadSprite(src, key) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.sprites[key] = img;
      this.checkAllSpritesLoaded();
    };
  }

  loadAllSprites() {
    this.loadSprite('anunay_idle.png', 'idle');
    this.loadSprite('anunay_run.png', 'run1');
    this.loadSprite('anunay_run2.png', 'run2');
    this.loadSprite('anunay_run3.png', 'run3');
    this.loadSprite('anunay_run4.png', 'run4');
    this.loadSprite('anunay_run5.png', 'run5');
    this.loadSprite('anunay_shoot.png', 'shoot');
    this.loadSprite('anunay_jump_rise.png', 'jump_rise');
    this.loadSprite('anunay_jump.png', 'jump');
    this.loadSprite('anunay_land.png', 'land');
    this.loadSprite('anunay_slide.png', 'slide');
    this.loadSprite('anunay_climb1.png', 'climb1');
    this.loadSprite('anunay_climb2.png', 'climb2');
    this.loadSprite('anunay_hang.png', 'hang');
    this.loadSprite('anunay_hang_aim.png', 'hang_aim');
  }

  checkAllSpritesLoaded() {
    const keys = ['idle', 'run1', 'run2', 'run3', 'run4', 'run5', 'shoot', 'jump_rise', 'jump', 'land', 'slide', 'climb1', 'climb2', 'hang', 'hang_aim'];
    this.spritesLoaded = keys.every(k => !!this.sprites[k]);
  }

  initSound() {
    if (this.audioCtx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    } catch (e) {}
  }

  playLaserSound() {
    if (!this.soundEnabled) return;
    this.initSound();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(960, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.14);
      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  playClimbSound() {
    if (!this.soundEnabled) return;
    this.initSound();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  playJumpSound() {
    if (!this.soundEnabled) return;
    this.initSound();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.17);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  playSlideSound() {
    if (!this.soundEnabled) return;
    this.initSound();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch (e) {}
  }

  initTargets() {
    setInterval(() => {
      if (this.targets.length < 5) {
        this.targets.push({
          x: Math.random() > 0.5 ? this.canvas.width + 40 : -40,
          y: 70 + Math.random() * (this.groundY - 160),
          vx: (Math.random() * 1.6 + 1.2) * (Math.random() > 0.5 ? 1 : -1),
          vy: Math.sin(Math.random() * 6) * 0.8,
          radius: 20,
          hp: 1,
          hue: Math.random() * 360,
          t: Math.random() * 10
        });
      }
    }, 2000);
  }

  // Hitbox test for mouse grabbing (Shimeji interaction)
  isHit(px, py) {
    const halfW = this.baseWidth * 0.5;
    const h = this.baseHeight;
    // Character drawn from bottom pivot (x, y) extending upwards by h
    return (
      px >= this.x - halfW &&
      px <= this.x + halfW &&
      py >= this.y - h &&
      py <= this.y + 15
    );
  }

  // Grab Mascot with Mouse Pointer
  grab(px, py) {
    this.isGrabbed = true;
    this.surface = 'air';
    this.isGrounded = false;
    this.dragOffsetX = this.x - px;
    this.dragOffsetY = this.y - py;
    this.lastPointerX = px;
    this.lastPointerY = py;
    this.recentMouseVx = 0;
    this.recentMouseVy = 0;
    this.state = 'jump';
    this.playJumpSound();
  }

  // Drag Mascot with Pointer
  drag(px, py) {
    if (!this.isGrabbed) return;
    this.x = px + this.dragOffsetX;
    this.y = py + this.dragOffsetY;
    this.recentMouseVx = (px - this.lastPointerX) * 0.75;
    this.recentMouseVy = (py - this.lastPointerY) * 0.75;
    this.lastPointerX = px;
    this.lastPointerY = py;

    if (Math.abs(this.recentMouseVx) > 0.5) {
      this.direction = this.recentMouseVx > 0 ? 1 : -1;
    }
  }

  // Fling / Release Mascot into the Air
  release() {
    if (!this.isGrabbed) return;
    this.isGrabbed = false;
    this.vx = Math.max(-18, Math.min(18, this.recentMouseVx));
    this.vy = Math.max(-18, Math.min(18, this.recentMouseVy));
    this.surface = 'air';
    this.state = 'jump';
  }

  initInteraction() {
    // Pointerdown interaction on canvas
    this.canvas.addEventListener('pointerdown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isHit(mouseX, mouseY)) {
        this.grab(mouseX, mouseY);
        e.stopPropagation();
        return;
      }

      // If clicked elsewhere in arena: turn & shoot
      this.direction = mouseX > this.x ? 1 : -1;
      this.triggerShoot(mouseX, mouseY);
    });

    window.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isGrabbed) {
        this.drag(mouseX, mouseY);
      } else {
        // Change cursor to grab if hovering over Shimeji
        if (this.isHit(mouseX, mouseY)) {
          this.canvas.style.cursor = 'grab';
        } else if (this.canvas.style.cursor === 'grab') {
          this.canvas.style.cursor = 'crosshair';
        }
      }
    });

    window.addEventListener('pointerup', () => {
      if (this.isGrabbed) {
        this.release();
        this.canvas.style.cursor = 'grab';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.autonomous = false;
        this.direction = 1;
        this.state = 'run';
        this.targetVx = 5.2;
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.autonomous = false;
        this.direction = -1;
        this.state = 'run';
        this.targetVx = -5.2;
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        this.triggerSlide();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.triggerShoot();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.triggerJump();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowRight', 'ArrowLeft', 'a', 'A', 'd', 'D'].includes(e.key)) {
        this.targetVx = 0;
        this.state = 'idle';
        setTimeout(() => { this.autonomous = true; }, 3200);
      }
    });
  }

  triggerShoot(targetX, targetY) {
    this.state = 'shoot';
    this.shootTimer = 18;
    this.recoilVelocity = -14.0;
    this.playLaserSound();

    const muzzleX = this.x + this.direction * (54 * (this.scale / 0.42));
    const muzzleY = this.y - (78 * (this.scale / 0.42));

    let angle = this.direction === 1 ? 0 : Math.PI;
    if (targetX !== undefined && targetY !== undefined) {
      angle = Math.atan2(targetY - muzzleY, targetX - muzzleX);
    }

    const spd = 20;
    this.lasers.push({
      x: muzzleX,
      y: muzzleY,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      life: 60,
      color: '#3df0ff'
    });

    for (let k = 0; k < 12; k++) {
      const a = angle + (Math.random() - 0.5) * 0.85;
      const v = 3.5 + Math.random() * 6.0;
      this.sparks.push({
        x: muzzleX,
        y: muzzleY,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        life: 16 + Math.random() * 12,
        color: Math.random() > 0.35 ? '#3df0ff' : '#ffd23f'
      });
    }
  }

  triggerShootBurst(targetX, targetY) {
    let shots = 0;
    const burst = setInterval(() => {
      this.triggerShoot(targetX, targetY);
      shots++;
      if (shots >= 3) clearInterval(burst);
    }, 120);
  }

  triggerJump() {
    if (this.surface === 'wall_left') {
      // Wall jump rightward
      this.surface = 'air';
      this.vx = 8.5;
      this.vy = -12.0;
      this.direction = 1;
    } else if (this.surface === 'wall_right') {
      // Wall jump leftward
      this.surface = 'air';
      this.vx = -8.5;
      this.vy = -12.0;
      this.direction = -1;
    } else if (this.surface === 'ceiling') {
      // Drop from ceiling
      this.surface = 'air';
      this.vy = 2.0;
    } else {
      // Standard ground leap
      this.surface = 'air';
      this.vy = -14.5;
    }

    this.isGrounded = false;
    this.state = 'jump';
    this.squashVelocity = 0.28;
    this.playJumpSound();

    for (let k = 0; k < 10; k++) {
      this.dustPuffs.push({
        x: this.x + (Math.random() - 0.5) * 28,
        y: this.y,
        vx: (Math.random() - 0.5) * 4.8,
        vy: -Math.random() * 2.6,
        r: 4 + Math.random() * 5,
        alpha: 0.85
      });
    }
  }

  triggerSlide() {
    if (this.surface !== 'ground' || this.slideTimer > 0) return;
    this.state = 'slide';
    this.slideTimer = 0.55;
    this.playSlideSound();

    const boostSpeed = 7.0;
    this.vx = this.direction * boostSpeed;
    this.targetVx = this.direction * (boostSpeed * 0.4);

    for (let k = 0; k < 12; k++) {
      this.dustPuffs.push({
        x: this.x - this.direction * (18 * (this.scale / 0.42)),
        y: this.groundY - Math.random() * 6,
        vx: -this.direction * (2.0 + Math.random() * 4.0),
        vy: -Math.random() * 2.0,
        r: 3 + Math.random() * 5,
        alpha: 0.85
      });
    }
  }

  // Shimeji Autonomous Mascot AI (Wandering, Climbing, Resting, Sliding)
  updateAutonomousBehavior(dt) {
    if (!this.autonomous || this.isGrabbed) return;

    this.stateTimer += dt;
    if (this.stateTimer > 2.8 + Math.random() * 2.2) {
      this.stateTimer = 0;
      const r = Math.random();

      if (this.surface === 'ground') {
        if (r < 0.42) {
          // Walk / run across ground
          this.state = 'run';
          if (this.x > this.canvas.width - 180) this.direction = -1;
          else if (this.x < 180) this.direction = 1;
          else this.direction = Math.random() > 0.5 ? 1 : -1;
          this.targetVx = this.direction * (4.2 + Math.random() * 2.0);
        } else if (r < 0.58) {
          // Tactical combat slide
          this.triggerSlide();
        } else if (r < 0.72) {
          // Jump into air
          this.triggerJump();
          this.targetVx = this.direction * (3.8 + Math.random() * 1.5);
        } else if (r < 0.86) {
          // Blaster fireworks burst
          this.targetVx = 0;
          this.triggerShootBurst();
        } else {
          // Idle breather
          this.state = 'idle';
          this.targetVx = 0;
        }
      } else if (this.surface === 'wall_left' || this.surface === 'wall_right') {
        const isLeft = this.surface === 'wall_left';
        if (r < 0.65) {
          // Climb up towards ceiling
          this.direction = isLeft ? -1 : 1;
          this.facingProgress = this.direction;
          this.targetVy = -3.2 - Math.random() * 1.5;
        } else if (r < 0.85) {
          // Wall jump off into the room!
          this.triggerJump();
        } else {
          // Pause and look around
          this.targetVy = 0;
        }
      } else if (this.surface === 'ceiling') {
        if (r < 0.60) {
          // Walk across ceiling
          this.direction = Math.random() > 0.5 ? 1 : -1;
          this.targetVx = this.direction * 3.5;
        } else {
          // Drop down to floor
          this.triggerJump();
        }
      }
    }
  }

  update(dt = 0.016) {
    dt = Math.min(0.045, dt);
    this.animTime += dt;
    this.updateAutonomousBehavior(dt);

    if (this.slideTimer > 0) {
      this.slideTimer -= dt;
      if (this.slideTimer <= 0) {
        this.state = Math.abs(this.vx) > 0.8 ? 'run' : 'idle';
      }
    }

    if (this.landTimer > 0) {
      this.landTimer -= dt;
    }

    // Update boundaries
    this.groundY = this.canvas.height - 28;
    this.wallRightX = this.canvas.width - 86;
    this.wallLeftX = 86;

    // -------------------------------------------------------------
    // SHIMEJI SURFACE & KINEMATICS ENGINE
    // -------------------------------------------------------------
    if (this.isGrabbed) {
      // Held by mouse: legs dangle with air resistance
      this.surface = 'air';
      this.isGrounded = false;
      this.surfaceAngle = Math.max(-0.4, Math.min(0.4, this.recentMouseVx * 0.04));
    } else if (this.surface === 'ground') {
      this.surfaceAngle = 0;
      this.isGrounded = true;
      this.y = this.groundY;
      this.vy = 0;

      const accelRate = this.slideTimer > 0 ? 5.5 : (Math.abs(this.targetVx) > 0.1 ? 9.0 : 10.5);
      this.vx = Anunay2D.damp(this.vx, this.targetVx, accelRate, dt);
      this.x += this.vx;

      // Check left wall collision -> Transition to Wall Climbing!
      if (this.x <= this.wallLeftX + 5 && this.isShimeji && this.vx < -0.5) {
        this.surface = 'wall_left';
        this.surfaceAngle = -0.06;
        this.x = this.wallLeftX;
        this.direction = -1;
        this.facingProgress = -1;
        this.vx = 0;
        this.targetVy = -3.5;
        this.playClimbSound();
      }
      // Check right wall collision -> Transition to Wall Climbing!
      else if (this.x >= this.wallRightX - 5 && this.isShimeji && this.vx > 0.5) {
        this.surface = 'wall_right';
        this.surfaceAngle = 0.06;
        this.x = this.wallRightX;
        this.direction = 1;
        this.facingProgress = 1;
        this.vx = 0;
        this.targetVy = -3.5;
        this.playClimbSound();
      } else {
        // Normal ground rebound
        if (this.x < this.wallLeftX) {
          this.x = this.wallLeftX;
          this.direction = 1;
          this.targetVx = Math.abs(this.targetVx);
        } else if (this.x > this.wallRightX) {
          this.x = this.wallRightX;
          this.direction = -1;
          this.targetVx = -Math.abs(this.targetVx);
        }
      }
    } else if (this.surface === 'wall_left') {
      // Climbing up left edge - UPRIGHT with hands gripping wall
      this.surfaceAngle = -0.06;
      this.direction = -1;
      this.facingProgress = -1;
      this.x = this.wallLeftX;
      this.vx = 0;
      this.vy = Anunay2D.damp(this.vy, this.targetVy, 8.0, dt);
      this.y += this.vy;

      // Advance climbing leg strides
      const prevPhase = this.stridePhase;
      this.stridePhase += Math.abs(this.vy) * dt * 4.2;
      if (Math.sin(prevPhase * 2) <= 0 && Math.sin(this.stridePhase * 2) > 0) {
        this.playClimbSound();
      }

      // Dynamic wall friction / spark puffs while climbing
      this.wallClimbTimer += dt;
      if (this.wallClimbTimer > 0.16 && Math.abs(this.vy) > 0.4) {
        this.wallClimbTimer = 0;
        this.dustPuffs.push({
          x: this.wallLeftX - 10 + Math.random() * 8,
          y: this.y - 40 + Math.random() * 25,
          vx: 0.8 + Math.random() * 1.5,
          vy: 0.5 + Math.random() * 1.2,
          r: 2.5 + Math.random() * 3,
          alpha: 0.65
        });
      }

      // Reached top ceiling corner
      if (this.y <= this.ceilingY) {
        this.surface = 'ceiling';
        this.y = this.ceilingY;
        this.surfaceAngle = Math.PI;
        this.direction = 1;
        this.targetVx = 3.5;
      } else if (this.y >= this.groundY && this.vy > 0) {
        // Climbed down to floor
        this.surface = 'ground';
        this.y = this.groundY;
        this.surfaceAngle = 0;
        this.direction = 1;
        this.targetVx = 3.5;
      }
    } else if (this.surface === 'wall_right') {
      // Climbing up right edge - UPRIGHT with hands gripping wall
      this.surfaceAngle = 0.06;
      this.direction = 1;
      this.facingProgress = 1;
      this.x = this.wallRightX;
      this.vx = 0;
      this.vy = Anunay2D.damp(this.vy, this.targetVy, 8.0, dt);
      this.y += this.vy;

      const prevPhase = this.stridePhase;
      this.stridePhase += Math.abs(this.vy) * dt * 4.2;
      if (Math.sin(prevPhase * 2) <= 0 && Math.sin(this.stridePhase * 2) > 0) {
        this.playClimbSound();
      }

      this.wallClimbTimer += dt;
      if (this.wallClimbTimer > 0.16 && Math.abs(this.vy) > 0.4) {
        this.wallClimbTimer = 0;
        this.dustPuffs.push({
          x: this.wallRightX + 10 - Math.random() * 8,
          y: this.y - 40 + Math.random() * 25,
          vx: -(0.8 + Math.random() * 1.5),
          vy: 0.5 + Math.random() * 1.2,
          r: 2.5 + Math.random() * 3,
          alpha: 0.65
        });
      }

      if (this.y <= this.ceilingY) {
        this.surface = 'ceiling';
        this.y = this.ceilingY;
        this.surfaceAngle = Math.PI;
        this.direction = -1;
        this.targetVx = -3.5;
      } else if (this.y >= this.groundY && this.vy > 0) {
        this.surface = 'ground';
        this.y = this.groundY;
        this.surfaceAngle = 0;
        this.direction = -1;
        this.targetVx = -3.5;
      }
    } else if (this.surface === 'ceiling') {
      // Crawling upside down along ceiling
      this.surfaceAngle = Math.PI;
      this.y = this.ceilingY;
      this.vy = 0;
      this.vx = Anunay2D.damp(this.vx, this.targetVx, 8.0, dt);
      this.x += this.vx;

      this.stridePhase += Math.abs(this.vx) * dt * 3.2;

      if (this.x <= this.wallLeftX + 5) {
        this.direction = 1;
        this.targetVx = 3.5;
      } else if (this.x >= this.wallRightX - 5) {
        this.direction = -1;
        this.targetVx = -3.5;
      }
    } else {
      // In Air (Falling / Thrown)
      this.surfaceAngle = 0;
      this.vy += 0.74; // Gravity
      this.x += this.vx;
      this.y += this.vy;

      // Air resistance
      this.vx *= 0.985;

      // Wall bounce or grab in air
      if (this.x <= this.wallLeftX) {
        this.x = this.wallLeftX;
        if (Math.abs(this.vy) < 6.0 && this.isShimeji) {
          this.surface = 'wall_left';
          this.targetVy = -3.0;
        } else {
          this.vx = -this.vx * 0.5;
        }
      } else if (this.x >= this.wallRightX) {
        this.x = this.wallRightX;
        if (Math.abs(this.vy) < 6.0 && this.isShimeji) {
          this.surface = 'wall_right';
          this.targetVy = -3.0;
        } else {
          this.vx = -this.vx * 0.5;
        }
      }

      // Ceiling bounce
      if (this.y <= this.ceilingY) {
        this.y = this.ceilingY;
        this.vy = Math.abs(this.vy) * 0.5;
      }

      // Ground touchdown impact
      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.surface = 'ground';
        this.isGrounded = true;
        this.squashVelocity = -Math.min(18, Math.abs(this.vy)) * 0.038;
        this.vy = 0;
        this.landTimer = 0.22;
        this.state = Math.abs(this.vx) > 0.8 ? 'run' : 'idle';

        for (let k = 0; k < 8; k++) {
          this.dustPuffs.push({
            x: this.x + (Math.random() - 0.5) * 26,
            y: this.groundY,
            vx: (Math.random() - 0.5) * 3.6,
            vy: -Math.random() * 1.8,
            r: 3 + Math.random() * 4,
            alpha: 0.75
          });
        }
      }
    }

    // Smooth Shimeji orientation angle lerp
    this.currentAngle = Anunay2D.damp(this.currentAngle, this.surfaceAngle, 14.0, dt);

    // Smooth 3D turn
    this.facingProgress = Anunay2D.damp(this.facingProgress, this.direction, 16.0, dt);

    // Continuous Stride Cadence
    const moveSpeed = Math.hypot(this.vx, this.vy);
    if ((this.surface === 'ground' || this.surface.startsWith('wall') || this.surface === 'ceiling') && moveSpeed > 0.2 && this.slideTimer <= 0) {
      const strideFreq = (moveSpeed / 4.8) * 15.5;
      this.stridePhase += strideFreq * dt;
    } else {
      this.idleTime += dt;
    }

    // 6-Stage Stride Quadrature Calculation
    const u = ((this.stridePhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
    const numAnchors = 6;
    let sumW = 0;

    for (let k = 0; k < numAnchors; k++) {
      const anchorU = k / numAnchors;
      let dist = Math.abs(u - anchorU);
      if (dist > 0.5) dist = 1.0 - dist;

      const maxDist = 1.0 / numAnchors;
      if (dist < maxDist) {
        const w = Math.cos((dist / maxDist) * (Math.PI / 2)) ** 2;
        this.runStageWeights[k] = w;
        sumW += w;
      } else {
        this.runStageWeights[k] = 0;
      }
    }

    if (sumW > 0.001) {
      for (let k = 0; k < numAnchors; k++) {
        this.runStageWeights[k] /= sumW;
      }
    }

    // Jump Stages
    if (this.surface === 'air' || this.isGrabbed) {
      const isRising = this.vy < -2.0 || this.isGrabbed;
      this.jumpStageWeights.rise = Anunay2D.damp(this.jumpStageWeights.rise, isRising ? 1.0 : 0.0, 16.0, dt);
      this.jumpStageWeights.apex = 1.0 - this.jumpStageWeights.rise;
    } else {
      this.jumpStageWeights.rise = 0;
      this.jumpStageWeights.apex = 0;
    }

    // State Weights
    const isSliding = this.slideTimer > 0;
    const isLanding = this.landTimer > 0 && this.surface === 'ground';
    const isClimbing = this.surface.startsWith('wall') && !this.isGrabbed;
    const isHanging = this.surface === 'ceiling' && !this.isGrabbed;
    const isRunning = (moveSpeed > 0.4 && this.surface === 'ground') && !isSliding && !isLanding;
    const isShooting = this.state === 'shoot' && !isSliding && !isClimbing && !isHanging;
    const isJumping = this.surface === 'air' || this.isGrabbed;

    const targetSlide = isSliding ? 1.0 : 0.0;
    const targetLand = isLanding ? 1.0 : 0.0;
    const targetClimb = isClimbing ? 1.0 : 0.0;
    const targetHang = isHanging ? 1.0 : 0.0;
    const targetRun = isRunning ? 1.0 : 0.0;
    const targetShoot = isShooting ? 1.0 : 0.0;
    const targetJump = isJumping ? 1.0 : 0.0;
    const targetIdle = (!isSliding && !isLanding && !isClimbing && !isHanging && !isRunning && !isShooting && !isJumping) ? 1.0 : 0.0;

    this.weights.slide = Anunay2D.damp(this.weights.slide, targetSlide, 18.0, dt);
    this.weights.land = Anunay2D.damp(this.weights.land, targetLand, 20.0, dt);
    this.weights.climb = Anunay2D.damp(this.weights.climb, targetClimb, 18.0, dt);
    this.weights.hang = Anunay2D.damp(this.weights.hang, targetHang, 18.0, dt);
    this.weights.run = Anunay2D.damp(this.weights.run, targetRun, 14.0, dt);
    this.weights.shoot = Anunay2D.damp(this.weights.shoot, targetShoot, 18.0, dt);
    this.weights.jump = Anunay2D.damp(this.weights.jump, targetJump, 16.0, dt);
    this.weights.idle = Anunay2D.damp(this.weights.idle, targetIdle, 14.0, dt);

    // Harmonic Bobbing & Torso Lean
    const runBob = (0.5 - 0.5 * Math.cos(this.stridePhase * 2)) * 6.8 * this.weights.run;
    const idleBob = Math.sin(this.idleTime * 2.6) * 1.8 * this.weights.idle;
    const targetBob = runBob + idleBob;
    this.smoothBobY = Anunay2D.damp(this.smoothBobY, targetBob, 20.0, dt);

    const targetTilt = (this.vx / 6.0) * 0.12 + (this.recoilOffset * 0.01);
    this.smoothTorsoTilt = Anunay2D.damp(this.smoothTorsoTilt, targetTilt, 12.0, dt);

    const targetHipSway = Math.sin(this.stridePhase) * 0.045 * this.weights.run;
    this.smoothHipSway = Anunay2D.damp(this.smoothHipSway, targetHipSway, 18.0, dt);

    // Oscillators
    const springK = 230;
    const dampC = 19;
    const springForce = -springK * this.squashOffset - dampC * this.squashVelocity;
    this.squashVelocity += springForce * dt;
    this.squashOffset += this.squashVelocity * dt;

    const recoilK = 260;
    const recoilDamp = 22;
    const recoilForce = -recoilK * this.recoilOffset - recoilDamp * this.recoilVelocity;
    this.recoilVelocity += recoilForce * dt;
    this.recoilOffset += this.recoilVelocity * dt;

    if (this.shootTimer > 0) {
      this.shootTimer--;
      if (this.shootTimer <= 0 && this.state === 'shoot') {
        this.state = moveSpeed > 0.8 ? 'run' : 'idle';
      }
    }

    // Footstep Dust
    if (this.surface === 'ground' && this.weights.run > 0.5) {
      const currentStepIdx = (u < 0.25 || u > 0.75) ? 0 : 1;
      if (currentStepIdx !== this.prevFootstepIndex) {
        this.prevFootstepIndex = currentStepIdx;
        const footOffset = (currentStepIdx === 0 ? 14 : -14) * (this.scale / 0.42);
        this.dustPuffs.push({
          x: this.x - this.direction * (16 * (this.scale / 0.42)) + footOffset,
          y: this.groundY,
          vx: -this.direction * (0.8 + Math.random() * 1.8),
          vy: -Math.random() * 1.2,
          r: 3 + Math.random() * 4,
          alpha: 0.60
        });
      }
    }

    // Motion Trails
    this.ghostTimer += dt;
    if (this.ghostTimer > 0.045 && (moveSpeed > 2.8 || this.surface === 'air' || isSliding || this.isGrabbed)) {
      this.ghostTimer = 0;
      this.ghostTrails.push({
        x: this.x,
        y: this.y - this.smoothBobY,
        angle: this.currentAngle,
        facing: this.facingProgress,
        tilt: this.smoothTorsoTilt + this.smoothHipSway,
        scaleX: 1.0 + Math.sin(this.stridePhase * 2) * 0.03 * this.weights.run,
        scaleY: (1.0 - Math.sin(this.stridePhase * 2) * 0.03 * this.weights.run) + this.squashOffset,
        alpha: 0.32,
        life: 0.22,
        maxLife: 0.22
      });
    }

    for (let k = this.ghostTrails.length - 1; k >= 0; k--) {
      const g = this.ghostTrails[k];
      g.life -= dt;
      g.alpha = (g.life / g.maxLife) * 0.32;
      if (g.life <= 0) this.ghostTrails.splice(k, 1);
    }

    // Lasers & Targets
    for (let k = this.lasers.length - 1; k >= 0; k--) {
      const l = this.lasers[k];
      l.x += l.vx;
      l.y += l.vy;
      l.life--;

      for (let t = this.targets.length - 1; t >= 0; t--) {
        const tg = this.targets[t];
        if (Math.hypot(l.x - tg.x, l.y - tg.y) < tg.radius + 8) {
          this.createTargetExplosion(tg.x, tg.y, tg.hue);
          this.targets.splice(t, 1);
          l.life = 0;
          break;
        }
      }

      if (l.life <= 0 || l.x < -60 || l.x > this.canvas.width + 60 || l.y < -60 || l.y > this.canvas.height + 60) {
        this.lasers.splice(k, 1);
      }
    }

    for (let k = this.sparks.length - 1; k >= 0; k--) {
      const sp = this.sparks[k];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.16;
      sp.life--;
      if (sp.life <= 0) this.sparks.splice(k, 1);
    }

    for (let k = this.dustPuffs.length - 1; k >= 0; k--) {
      const d = this.dustPuffs[k];
      d.x += d.vx;
      d.y += d.vy;
      d.r += 0.25;
      d.alpha -= 0.030;
      if (d.alpha <= 0) this.dustPuffs.splice(k, 1);
    }

    for (let tg of this.targets) {
      tg.t += 0.045;
      tg.x += tg.vx;
      tg.y += Math.sin(tg.t) * 1.4;
      if (tg.x < -80) tg.x = this.canvas.width + 80;
      if (tg.x > this.canvas.width + 80) tg.x = -80;
    }
  }

  createTargetExplosion(x, y, hue) {
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 3.2 + Math.random() * 6.5;
      this.sparks.push({
        x, y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        life: 24 + Math.random() * 16,
        color: `hsl(${hue}, 100%, 65%)`
      });
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. TARGETS
    for (const tg of this.targets) {
      ctx.save();
      ctx.translate(tg.x, tg.y);
      ctx.fillStyle = `hsl(${tg.hue}, 90%, 55%)`;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, tg.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, tg.radius * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(Math.sin(tg.t * 2) * 3, 0, tg.radius * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3df0ff';
      ctx.fillRect(-tg.radius * 1.1, -2, 4, 4);
      ctx.fillRect(tg.radius * 0.9, -2, 4, 4);
      ctx.restore();
    }

    // 2. DUST PUFFS
    for (const d of this.dustPuffs) {
      ctx.save();
      ctx.fillStyle = `rgba(239, 234, 223, ${d.alpha})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. DYNAMIC CONTACT SHADOW
    if (this.surface === 'ground' || this.surface === 'air') {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
      ctx.beginPath();
      const altitude = Math.max(0, this.groundY - this.y);
      const altitudeScale = Math.max(0.25, 1.0 - altitude / 180);
      const shadowWidth = (38 * (this.scale / 0.42)) * altitudeScale * (1.0 - this.squashOffset * 0.8);
      const shadowHeight = (9 * (this.scale / 0.42)) * altitudeScale;
      ctx.ellipse(this.x, this.groundY + 2, shadowWidth, shadowHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 4. MOTION TRAILS
    const drawWidth = this.baseWidth;
    const drawHeight = this.baseHeight;
    const drawX = -drawWidth * 0.48;
    const drawY = -drawHeight;

    const activeSprite = (this.weights.slide > 0.4) ? this.sprites.slide :
                         (this.weights.jump > 0.4) ? (this.jumpStageWeights.rise > 0.5 ? this.sprites.jump_rise : this.sprites.jump) :
                         (this.weights.shoot > 0.4) ? this.sprites.shoot :
                         (this.weights.run > 0.4) ? this.sprites.run1 :
                         this.sprites.idle;

    if (this.spritesLoaded && activeSprite) {
      for (const g of this.ghostTrails) {
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.angle);
        ctx.scale(g.facing, 1);
        ctx.rotate(g.tilt);
        ctx.scale(g.scaleX, g.scaleY);
        ctx.globalAlpha = g.alpha;
        ctx.drawImage(activeSprite, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
      }
    }

    // 5. RENDER REAL-BODY ANUNAY WITH SHIMEJI SURFACE ORIENTATION
    ctx.save();
    const charRenderX = this.x + this.direction * this.recoilOffset;
    const charRenderY = this.y - (this.surface === 'ground' ? this.smoothBobY : 0);
    ctx.translate(charRenderX, charRenderY);

    // Apply Shimeji Surface Rotation (ground=0, left wall=-PI/2, right wall=PI/2, ceiling=PI)
    ctx.rotate(this.currentAngle);

    // 3D turnaround scale
    const turnThickness = 0.08 * (1.0 - Math.abs(this.facingProgress));
    const effectiveScaleX = this.facingProgress >= 0 ? 
      Math.max(turnThickness, this.facingProgress) : 
      Math.min(-turnThickness, this.facingProgress);
    ctx.scale(effectiveScaleX, 1);

    ctx.rotate(this.smoothTorsoTilt + this.smoothHipSway);

    const strideSquash = Math.sin(this.stridePhase * 2) * 0.038 * this.weights.run;
    const idleBreathingY = Math.sin(this.idleTime * 2.6) * 0.016 * this.weights.idle;
    const idleBreathingX = -idleBreathingY * 0.5;

    const totalScaleX = 1.0 + strideSquash + idleBreathingX - this.squashOffset * 0.6;
    const totalScaleY = 1.0 - strideSquash + idleBreathingY + this.squashOffset;
    ctx.scale(totalScaleX, totalScaleY);

    const totalWeight = Math.max(0.001,
      this.weights.idle +
      this.weights.run +
      this.weights.shoot +
      this.weights.jump +
      this.weights.land +
      this.weights.slide +
      this.weights.climb +
      this.weights.hang
    );

    const drawPose = (sprite, weight) => {
      if (!sprite || weight <= 0.005) return;
      const normalizedAlpha = Math.max(0, Math.min(1, weight / totalWeight));
      ctx.save();
      ctx.globalAlpha = normalizedAlpha;
      ctx.drawImage(sprite, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
    };

    if (this.spritesLoaded) {
      // 1. Idle Stance
      drawPose(this.sprites.idle, this.weights.idle);

      // 2. 6-Stage Running Stride Sequence
      if (this.weights.run > 0.01) {
        const rw = this.weights.run;
        drawPose(this.sprites.run1, rw * this.runStageWeights[0]);
        drawPose(this.sprites.run3, rw * this.runStageWeights[1]);
        drawPose(this.sprites.run5, rw * this.runStageWeights[2]);
        drawPose(this.sprites.run2, rw * this.runStageWeights[3]);
        drawPose(this.sprites.run4, rw * this.runStageWeights[4]);
        drawPose(this.sprites.run5, rw * this.runStageWeights[5]);
      }

      // 3. Jump Sequence (Takeoff Ascent -> Apex Hang Time)
      if (this.weights.jump > 0.01) {
        const jw = this.weights.jump;
        drawPose(this.sprites.jump_rise, jw * this.jumpStageWeights.rise);
        drawPose(this.sprites.jump, jw * this.jumpStageWeights.apex);
      }

      // 4. Landing Impact Crouch
      drawPose(this.sprites.land, this.weights.land);

      // 5. Tactical Ground Slide
      drawPose(this.sprites.slide, this.weights.slide);

      // 6. Blaster Discharge
      drawPose(this.sprites.shoot, this.weights.shoot);

      // 7. Vertical Wall Climbing (Dedicated High-Res Sprites with Hand-over-Hand Heave)
      if (this.weights.climb > 0.01) {
        const cw = this.weights.climb;
        const climbCycle = Math.sin(this.stridePhase * 2) > 0;
        const heaveY = Math.sin(this.stridePhase * 2) * 5.0 * (this.scale / 0.42);
        ctx.save();
        ctx.translate(0, -heaveY);
        drawPose(this.sprites.climb1, cw * (climbCycle ? 1 : 0));
        drawPose(this.sprites.climb2, cw * (climbCycle ? 0 : 1));
        ctx.restore();
      }

      // 8. Ceiling / Upper Area Hanging
      if (this.weights.hang > 0.01) {
        const hw = this.weights.hang;
        if (this.state === 'shoot') {
          drawPose(this.sprites.hang_aim, hw);
        } else {
          drawPose(this.sprites.hang, hw);
        }
      }
    } else {
      ctx.fillStyle = '#5b3cff';
      ctx.fillRect(-20, -120, 40, 120);
    }

    // Mascot Name Badge
    ctx.save();
    ctx.scale(effectiveScaleX >= 0 ? 1 : -1, 1);
    ctx.font = '700 8px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3df0ff';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fillText('ANUNAY 🐾', 0, -156 * (this.scale / 0.42));
    ctx.restore();

    ctx.restore();

    // 6. LASERS & SPARKS (World Space)
    for (const l of this.lasers) {
      ctx.save();
      ctx.strokeStyle = '#3df0ff';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#3df0ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x - l.vx * 1.8, l.y - l.vy * 1.8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x - l.vx * 1.8, l.y - l.vy * 1.8);
      ctx.stroke();
      ctx.restore();
    }

    for (const sp of this.sparks) {
      ctx.save();
      ctx.fillStyle = sp.color;
      ctx.shadowColor = sp.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

if (typeof window !== 'undefined') {
  window.Anunay2D = Anunay2D;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Anunay2D;
}
