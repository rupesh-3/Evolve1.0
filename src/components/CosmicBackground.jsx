import { useEffect, useRef } from 'react';

class CosmicBackgroundFX {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.orbitals = [];
    this.satellites = [];
    this.nebulaClouds = [];
    this.floatingParticles = [];
    this.animId = null;
    this.mouse = { x: -1000, y: -1000 };
    this.time = 0;
    
    this.handleResize = this.resize.bind(this);
    this.handleMouseMove = (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    };
  }

  init() {
    this.resize();
    this.createElements();

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createElements() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.stars = [];
    for (let i = 0; i < 280; i++) {
      this.stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.2 + 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.85 ? (220 + Math.random() * 60) : 0,
      });
    }

    this.shootingStars = [];

    this.orbitals = [];
    for (let i = 0; i < 4; i++) {
      this.orbitals.push({
        cx: w * (0.15 + Math.random() * 0.7),
        cy: h * (0.15 + Math.random() * 0.7),
        rx: 100 + Math.random() * 200,
        ry: 35 + Math.random() * 70,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.003,
        opacity: 0.03 + Math.random() * 0.05,
      });
    }

    this.satellites = [];
    for (let i = 0; i < 8; i++) {
      this.satellites.push({
        cx: w * (0.1 + Math.random() * 0.8),
        cy: h * (0.1 + Math.random() * 0.8),
        radius: 50 + Math.random() * 180,
        angle: Math.random() * Math.PI * 2,
        speed: (0.002 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
        size: 1.2 + Math.random() * 2.5,
        color: ['#9b7ae8', '#c084fc', '#6e5cc4', '#e0d0ff', '#7dd3fc'][Math.floor(Math.random() * 5)],
        trail: [],
      });
    }

    this.nebulaClouds = [];
    for (let i = 0; i < 5; i++) {
      this.nebulaClouds.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 200 + Math.random() * 400,
        color: ['110,92,196', '155,122,232', '192,132,252', '100,80,180', '80,60,200'][i],
        opacity: 0.012 + Math.random() * 0.025,
        driftX: (Math.random() - 0.5) * 0.2,
        driftY: (Math.random() - 0.5) * 0.15,
      });
    }

    this.floatingParticles = [];
    for (let i = 0; i < 40; i++) {
      this.floatingParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -0.1 - Math.random() * 0.4,
        opacity: 0.2 + Math.random() * 0.5,
        hue: 250 + Math.random() * 40,
      });
    }
  }

  spawnShootingStar() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.shootingStars.push({
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.4,
      length: 100 + Math.random() * 150,
      speed: 8 + Math.random() * 10,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      opacity: 1,
      decay: 0.012 + Math.random() * 0.01,
    });
  }

  animate() {
    this.time++;
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    this.nebulaClouds.forEach(cloud => {
      cloud.x += cloud.driftX;
      cloud.y += cloud.driftY;
      if (cloud.x < -cloud.size) cloud.x = w + cloud.size;
      if (cloud.x > w + cloud.size) cloud.x = -cloud.size;
      if (cloud.y < -cloud.size) cloud.y = h + cloud.size;
      if (cloud.y > h + cloud.size) cloud.y = -cloud.size;

      const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.size);
      gradient.addColorStop(0, `rgba(${cloud.color}, ${cloud.opacity})`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(cloud.x - cloud.size, cloud.y - cloud.size, cloud.size * 2, cloud.size * 2);
    });

    this.orbitals.forEach(orb => {
      orb.rotation += orb.rotSpeed;
      ctx.save();
      ctx.translate(orb.cx, orb.cy);
      ctx.rotate(orb.rotation);
      ctx.strokeStyle = `rgba(155, 122, 232, ${orb.opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });

    this.stars.forEach(star => {
      const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinklePhase);
      const opacity = star.opacity * (0.5 + twinkle * 0.5);
      const size = star.size * (0.8 + twinkle * 0.2);

      const dx = (this.mouse.x - w / 2) * 0.006 * star.size;
      const dy = (this.mouse.y - h / 2) * 0.006 * star.size;

      ctx.beginPath();
      ctx.arc(star.x + dx, star.y + dy, size, 0, Math.PI * 2);
      if (star.hue > 0) {
        ctx.fillStyle = `hsla(${star.hue}, 60%, 80%, ${opacity})`;
      } else {
        ctx.fillStyle = `rgba(220, 210, 255, ${opacity})`;
      }
      ctx.fill();

      if (star.size > 1.6) {
        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 122, 232, ${opacity * 0.1})`;
        ctx.fill();
      }
    });

    this.floatingParticles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const waveX = Math.sin(this.time * 0.01 + p.y * 0.01) * 0.5;
      ctx.beginPath();
      ctx.arc(p.x + waveX, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 60%, 75%, ${p.opacity * (0.5 + Math.sin(this.time * 0.02 + p.x) * 0.5)})`;
      ctx.fill();
    });

    this.satellites.forEach(sat => {
      sat.angle += sat.speed;
      const x = sat.cx + Math.cos(sat.angle) * sat.radius;
      const y = sat.cy + Math.sin(sat.angle) * sat.radius * 0.4;

      sat.trail.push({ x, y, opacity: 0.6 });
      if (sat.trail.length > 18) sat.trail.shift();

      sat.trail.forEach((pt, i) => {
        pt.opacity *= 0.87;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, sat.size * 0.5 * (i / sat.trail.length), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 122, 232, ${pt.opacity * 0.3})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(x, y, sat.size, 0, Math.PI * 2);
      ctx.fillStyle = sat.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, sat.size * 4, 0, Math.PI * 2);
      const glow = ctx.createRadialGradient(x, y, 0, x, y, sat.size * 4);
      glow.addColorStop(0, `rgba(155, 122, 232, 0.15)`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fill();
    });

    if (Math.random() < 0.007) this.spawnShootingStar();
    this.shootingStars = this.shootingStars.filter(ss => {
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.opacity -= ss.decay;

      if (ss.opacity <= 0) return false;

      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(
        ss.x - Math.cos(ss.angle) * ss.length * ss.opacity,
        ss.y - Math.sin(ss.angle) * ss.length * ss.opacity
      );
      const gradient = ctx.createLinearGradient(
        ss.x, ss.y,
        ss.x - Math.cos(ss.angle) * ss.length,
        ss.y - Math.sin(ss.angle) * ss.length
      );
      gradient.addColorStop(0, `rgba(220, 210, 255, ${ss.opacity})`);
      gradient.addColorStop(1, 'rgba(220, 210, 255, 0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      return true;
    });

    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
}

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cosmic = new CosmicBackgroundFX(canvasRef.current);
    cosmic.init();

    return () => {
      cosmic.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} id="cosmicCanvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
}
