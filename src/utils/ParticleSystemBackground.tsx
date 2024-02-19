"use client"
import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

const ParticleScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const getRandomPlanetColor = () => {
        // Generate random values for RGB components
        let r, g, b;

        // Avoid pink tones
        do {
            r = Math.floor(Math.random() * 100) + 100;
            g = Math.floor(Math.random() * 100) + 100;
            b = Math.floor(Math.random() * 100) + 100;
        } while (r > 220 && g < 100 && b > 220);

        // Convert RGB to hexadecimal color
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    };


    useEffect(() => {
        if (!containerRef.current) return;

        let useMouseInput = false;
        let mouseMoveTimeout: NodeJS.Timeout | null = null;
        let theta = 0;
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

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.001, 500);
        camera.position.z = 5;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.1 );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);


        const particlesCount = 3000

        // Create 100 meshes and scatter them randomly
        for (let i = 0; i < particlesCount; i++) {

            if(i%150==0){
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                directionalLight.position.x = Math.random()
                directionalLight.position.y = Math.random()
                directionalLight.position.z = Math.random()
                scene.add(directionalLight);
            }

            const material = new THREE.MeshStandardMaterial({ color: getRandomPlanetColor(), roughness:10});
            material.roughness = 0.4

            const geometry = new THREE.CapsuleGeometry(0.005 + Math.random() * 0.0000001, 0.0005, 5, 15);
            const mesh = new THREE.Mesh(geometry, material);

            // Set random positions for each mesh
            mesh.position.x = Math.random() * 10 - 5;
            mesh.position.y = Math.random() * 10 - 5;
            mesh.position.z = Math.random() * 10 - 5;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            scene.add(mesh);
        }

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
                const radius = 2;

                // Smoothly interpolate between current and default positions
                const smoothingFactor = 0.001;
                camera.position.x += (radius * Math.sin(THREE.MathUtils.degToRad(defaultTheta)) - camera.position.x) * smoothingFactor;
                camera.position.y += (radius * Math.sin(THREE.MathUtils.degToRad(defaultTheta)) - camera.position.y) * smoothingFactor;
                camera.position.z += (radius * Math.cos(THREE.MathUtils.degToRad(defaultTheta)) - camera.position.z) * smoothingFactor;
            }

            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

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