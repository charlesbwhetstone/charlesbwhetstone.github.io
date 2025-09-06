    
    // Touch Controls Setup
    console.log('About to call setupTouchControls...');
    this.setupTouchControls();
  }
  
  setupTouchControls() {
    console.log('=== setupTouchControls() CALLED ===');
    
    // Enhanced mobile detection
    const isMobile = ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0) || 
                    (navigator.msMaxTouchPoints > 0) ||
                    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('Touch detection:', {
      ontouchstart: 'ontouchstart' in window,
      maxTouchPoints: navigator.maxTouchPoints,
      userAgent: navigator.userAgent,
      isMobile: isMobile
    });
    
    if (isMobile) {
      const mobileControls = document.getElementById('mobileControls');
      console.log('mobileControls element found:', mobileControls);
      if (mobileControls) {
        mobileControls.style.display = 'block';
        console.log('Mobile controls shown');
        this.initSimpleTouch();
      } else {
        console.error('mobileControls element not found!');
      }
    } else {
      console.log('Desktop detected - mobile controls hidden');
    }
  }
  
  initSimpleTouch() {
    // Simple joystick variables
    this.joystickActive = false;
    this.joystickCenter = {x: 90, y: 90}; // Center of 120px joystick
    this.moveDirection = {x: 0, y: 0};
    this.autoFire = false;
    
    const joystick = document.getElementById('virtualJoystick');
    const joystickKnob = document.getElementById('joystickKnob');
    const fireButton = document.getElementById('fireButton');
    const autoFireButton = document.getElementById('autoFireButton');
    
    // Joystick touch events
    joystick.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.joystickActive = true;
      console.log('Joystick touch started');
    });
    
    joystick.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.joystickActive) return;
      
      const touch = e.touches[0];
      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      let deltaX = touch.clientX - centerX;
      let deltaY = touch.clientY - centerY;
      
      // Limit to circle
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 40; // Half of joystick size minus knob size
      
      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance;
        deltaY = (deltaY / distance) * maxDistance;
      }
      
      // Update knob position
      joystickKnob.style.left = `calc(50% + ${deltaX}px)`;
      joystickKnob.style.top = `calc(50% + ${deltaY}px)`;
      
      // Update movement direction (normalized)
      this.moveDirection.x = deltaX / maxDistance;
      this.moveDirection.y = deltaY / maxDistance;
      
      // Apply to game movement
      if (Math.abs(this.moveDirection.x) > 0.1) {
        this.keys = this.keys || {};
        this.keys['ArrowLeft'] = this.moveDirection.x < -0.1;
        this.keys['ArrowRight'] = this.moveDirection.x > 0.1;
      }
      if (Math.abs(this.moveDirection.y) > 0.1) {
        this.keys = this.keys || {};
        this.keys['ArrowUp'] = this.moveDirection.y < -0.1;
        this.keys['ArrowDown'] = this.moveDirection.y > 0.1;
      }
    });
    
    joystick.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.joystickActive = false;
      
      // Reset knob position
      joystickKnob.style.left = '50%';
      joystickKnob.style.top = '50%';
      
      // Reset movement
      this.moveDirection = {x: 0, y: 0};
      
      // Clear movement keys
      if (this.keys) {
        this.keys['ArrowLeft'] = false;
        this.keys['ArrowRight'] = false;
        this.keys['ArrowUp'] = false;
        this.keys['ArrowDown'] = false;
      }
      console.log('Joystick released');
    });
    
    // Fire button
    fireButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.keys) this.keys[' '] = true;
      fireButton.style.background = 'rgba(255,0,0,0.6)';
      console.log('Fire button pressed');
    });
    
    fireButton.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (this.keys) this.keys[' '] = false;
      fireButton.style.background = 'rgba(255,0,0,0.3)';
    });
    
    // Auto-fire button
    autoFireButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.autoFire = !this.autoFire;
      autoFireButton.style.background = this.autoFire ? 
        'rgba(255,255,0,0.6)' : 'rgba(255,255,0,0.3)';
      console.log('Auto-fire toggled:', this.autoFire);
      
      if (this.autoFire) {
        this.autoFireInterval = setInterval(() => {
          if (this.keys) this.keys[' '] = true;
          setTimeout(() => {if (this.keys) this.keys[' '] = false;}, 50);
        }, 200);
      } else {
        if (this.autoFireInterval) {
          clearInterval(this.autoFireInterval);
          this.autoFireInterval = null;
        }
      }
    });
    
    console.log('Touch controls initialized');
