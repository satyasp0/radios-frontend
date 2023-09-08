"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create a scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.1 );

        // Create a camera
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create a particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.004,
            vertexColors: true,
        });

        // Set up arrays to hold particle data
        const positions: number[] = [];
        const colors: number[] = [];

        const particleCount = 10000;

        for (let i = 0; i < particleCount; i++) {
            // Random positions
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;

            positions.push(x, y, z);

            const r = Math.random();
            const g = Math.random();
            const b = Math.random();

            colors.push(r, g, b);
        }

        // Add positions and colors to the particle geometry
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Add the particle system to the scene
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the particle system (optional)
            particles.rotation.x += 0.002;
            particles.rotation.y += 0.007;

            // Render the scene
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // Clean up event listeners
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={containerRef} />;
};

export default ParticleScene;