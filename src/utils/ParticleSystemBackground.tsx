"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let useMouseInput = false;
        let mouseMoveTimeout: NodeJS.Timeout | null = null;
        let theta = 0;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.1 );

        let mouseX = 0;
        let mouseY = 0;

        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event: MouseEvent) => {
            onDocumentMouseMove(event);
        });

        function onDocumentMouseMove(event: MouseEvent): void {
            useMouseInput = true;
            mouseX = (event.clientX - windowHalfX) / 100;
            mouseY = (event.clientY - windowHalfY) / 100;

            if (mouseMoveTimeout) {
                clearTimeout(mouseMoveTimeout);
            }

            mouseMoveTimeout = setTimeout(() => {
                useMouseInput = false;
            }, 2000);
        }

        // Create a camera
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2;

        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create a particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.017,
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
            theta += 0.01;

            if (useMouseInput) {
                // Rotate the particle system using mouse input
                camera.position.x += (mouseX - camera.position.x) * 0.005;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
            } else {
                // Default animation when there is no mouse movement
                const defaultTheta = theta + 0.01;
                const radius = 5;

                // Smoothly interpolate between current and default positions
                const smoothingFactor = 0.001;
                camera.position.x += (radius * Math.sin(THREE.MathUtils.degToRad(defaultTheta)) - camera.position.x) * smoothingFactor;
                camera.position.y += (radius * Math.sin(THREE.MathUtils.degToRad(defaultTheta)) - camera.position.y) * smoothingFactor;
                camera.position.z += (radius * Math.cos(THREE.MathUtils.degToRad(defaultTheta)) - camera.position.z) * smoothingFactor;
            }

            camera.lookAt(scene.position);

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