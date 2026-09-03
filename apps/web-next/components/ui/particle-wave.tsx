import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleWaveProps {
  className?: string;
}

const ParticleWave: React.FC<ParticleWaveProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    particleMaterial: THREE.ShaderMaterial;
    animationId: number | null;
    mouse: THREE.Vector2;
  } | null>(null);

  // Function to detect current theme (defaults to dark since Mimir Nest runs dark charcoal as default theme)
  const getCurrentTheme = () => {
    if (typeof document === 'undefined') return 'dark';
    if (document.documentElement.classList.contains('light')) {
      return 'light';
    }
    return 'dark'; // Mimir Nest uses dark theme variables by default
  };

  // Function to get particle color based on theme
  const getParticleColor = (theme: string) => {
    return theme === 'light' 
      ? new THREE.Vector3(0.08, 0.09, 0.09) // #151616 (dark) for light background
      : new THREE.Vector3(1.0, 0.42, 0.12); // Vibrant glowing orange
  };

  const particleVertex = `
    attribute float scale;
    uniform float uTime;
    void main() {
      vec3 p = position;
      float s = scale;
      p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      p.x += (sin(p.y + uTime) * 0.5);
      s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = s * 18.0 * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFragment = `
    uniform vec3 uColor;
    void main() {
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      float alpha = smoothstep(0.5, 0.05, r) * 0.95;
      vec3 brightColor = uColor * (1.3 - r * 0.4);
      gl_FragColor = vec4(brightColor, alpha);
    }
  `;

  const initScene = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement || document.body;
    const winWidth = parent.clientWidth || window.innerWidth;
    const winHeight = parent.clientHeight || window.innerHeight;
    const aspectRatio = winWidth / winHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 1000);
    camera.position.set(0, 6, 5);

    // Scene
    const scene = new THREE.Scene();

    // Renderer with transparent background (alpha: true)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(winWidth, winHeight);
    renderer.setClearColor(0x000000, 0); // Completely transparent

    // Particles - Responsive Density for Core Web Vitals Optimization
    const gap = 0.35;
    let amountX = 150;
    let amountY = 150;

    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile - significantly reduced density
        amountX = 60;
        amountY = 60;
      } else if (width < 1024) {
        // Tablet - reduced density
        amountX = 100;
        amountY = 100;
      }
    }

    const particleNum = amountX * amountY;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);
    
    let i = 0;
    let j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - ((amountX * gap) / 2);
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - ((amountX * gap) / 2);
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: getParticleColor(getCurrentTheme()) }
      }
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const mouse = new THREE.Vector2(-10, -10);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      particleMaterial,
      animationId: null,
      mouse
    };
  };

  const animate = () => {
    if (!sceneRef.current) return;

    const { scene, camera, renderer, particleMaterial } = sceneRef.current;
    
    particleMaterial.uniforms.uTime.value += 0.05;
    
    // Update particle color based on current theme
    const currentTheme = getCurrentTheme();
    particleMaterial.uniforms.uColor.value = getParticleColor(currentTheme);
    renderer.setClearColor(0x000000, 0); // Keep transparent
    
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    
    sceneRef.current.animationId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (!sceneRef.current || !canvasRef.current) return;

    const { camera, renderer } = sceneRef.current;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement || document.body;
    const winWidth = parent.clientWidth || window.innerWidth;
    const winHeight = parent.clientHeight || window.innerHeight;

    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(winWidth, winHeight);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!sceneRef.current) return;

    sceneRef.current.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    sceneRef.current.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    initScene();
    animate();

    const handleResizeEvent = () => handleResize();
    const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e);

    window.addEventListener('resize', handleResizeEvent);
    window.addEventListener('mousemove', handleMouseMoveEvent);

    return () => {
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener('resize', handleResizeEvent);
      window.removeEventListener('mousemove', handleMouseMoveEvent);
      
      // Cleanup Three.js resources
      if (sceneRef.current) {
        const { scene, renderer, particles } = sceneRef.current;
        scene.remove(particles);
        if (particles.geometry) particles.geometry.dispose();
        if (particles.material) {
          if (Array.isArray(particles.material)) {
            particles.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            particles.material.dispose();
          }
        }
        renderer.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        overflow: 'hidden'
      }}
    />
  );
};

export { ParticleWave };
