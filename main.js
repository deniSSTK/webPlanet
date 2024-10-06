
try {
    const planetImagesPath = {
        mercury: "mercury-message",
        venus: "venus-message",
        earth: "earth-message",
        mars: "mars-message",
        jupiter: "jupiter-message",
        saturn: "saturn-message",
        uranus: "uranus-message",
        neptune: "neptune-message"
    };

    const satelliteIds = {
        mercury: "mercury-satellites",
        venus: "venus-satellites",
        earth: "earth-satellites",
        mars: "mars-satellites",
        jupiter: "jupiter-satellites",
        saturn: "saturn-satellites",
        uranus: "uranus-satellites",
        neptune: "neptune-satellites"
    };

    function showPlanetInfo(planetId) {
        const planetInfo = document.getElementById('planet-info');
        const messages = document.querySelectorAll('.planet-message');
        const satellites = document.querySelectorAll('.satellites');

        planetInfo.classList.remove('visible');

        setTimeout(() => {
            messages.forEach(message => {
                message.style.display = 'none';
            });
            satellites.forEach(satellite => {
                satellite.style.display = 'none';
            });

            const planetMessage = document.getElementById(planetImagesPath[planetId]);
            const planetSatellites = document.getElementById(satelliteIds[planetId]);

            if (planetMessage) {
                planetMessage.style.display = 'block';
                planetInfo.classList.remove('hidden');
                setTimeout(() => {
                    planetInfo.classList.add('visible');
                }, 10);
            }

            if (planetSatellites) {
                planetSatellites.style.display = 'flex';
            }
        }, 200);
    }

    window.addEventListener('scroll', function() {
        const planetInfo = document.getElementById('planet-info');
        planetInfo.classList.remove('visible');
        setTimeout(() => {
            planetInfo.classList.add('hidden');
        }, 500);
    });

} catch (e) {
    console.error(e);
}

// Initialize the scene
let scene = new THREE.Scene();

// Create a camera and move it closer
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 12, 129);  // Move the camera closer to the center

// Create the renderer and attach it to the DOM
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Set the renderer background color to #201f30
renderer.setClearColor(0x201f30, 1);  // 0x201f30 is the hex value for #201f30

document.getElementById('container').appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add ambient lighting
let ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add directional light (sunlight)
let sunLight = new THREE.PointLight(0xffffff, 1.5, 1000);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Create texture loader
let textureLoader = new THREE.TextureLoader();

// Load planet textures
let mercuryTexture = textureLoader.load('textures/mercury_texture.jpg');
let venusTexture = textureLoader.load('textures/venus_texture.jpg');
let earthTexture = textureLoader.load('textures/earth_texture.jpg');
let marsTexture = textureLoader.load('textures/mars_texture.jpg');
let jupiterTexture = textureLoader.load('textures/jupiter_texture.jpg');
let saturnTexture = textureLoader.load('textures/saturn_texture.jpg');
let uranusTexture = textureLoader.load('textures/uranus_texture.jpg');
let neptuneTexture = textureLoader.load('textures/neptune_texture.jpg');
let asteroidTexture = textureLoader.load('textures/asteroid_texture.jpg');
let sunTexture = textureLoader.load('textures/sun_texture.jpg');

// Create the sun with increased size
let sunGeometry = new THREE.SphereGeometry(12, 32, 32); // Increased size
let sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
let sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Global slowdown factor
let slowdownFactor = 0.01; // Reduce all speeds to 20% of their original values

// Planet data with textures and increased sizes and distances
let planets = [
    { name: "Mercury", distance: 20, size: 3, texture: mercuryTexture, speed: 0.02 * slowdownFactor, infoId: 'mercury' },
    { name: "Venus", distance: 37, size: 4, texture: venusTexture, speed: 0.015 * slowdownFactor, infoId: 'venus' },
    { name: "Earth", distance: 50, size: 4.5, texture: earthTexture, speed: 0.01 * slowdownFactor, infoId: 'earth' },
    { name: "Mars", distance: 63, size: 4, texture: marsTexture, speed: 0.008 * slowdownFactor, infoId: 'mars' },
    { name: "Jupiter", distance: 80, size: 8, texture: jupiterTexture, speed: 0.006 * slowdownFactor, infoId: 'jupiter' },
    { name: "Saturn", distance: 95, size: 7, texture: saturnTexture, speed: 0.005 * slowdownFactor, infoId: 'saturn' },
    { name: "Uranus", distance: 105, size: 4, texture: uranusTexture, speed: 0.012 * slowdownFactor, infoId: 'uranus' },
    { name: "Neptune", distance: 118, size: 5, texture: neptuneTexture, speed: 0.01 * slowdownFactor, infoId: 'neptune' }
];

// Create planets and apply textures
planets.forEach((planet) => {
    // Create planet mesh
    let geometry = new THREE.SphereGeometry(planet.size, 32, 32);
    let material = new THREE.MeshStandardMaterial({ map: planet.texture });
    let planetMesh = new THREE.Mesh(geometry, material);

    // Orbit around the sun
    planetMesh.position.x = planet.distance;
    planet.planetMesh = planetMesh;
    scene.add(planetMesh);
});

// Create rings for Saturn
let saturnRingsGeometry = new THREE.RingGeometry(10, 12, 32); // Adjusted ring sizes
let saturnRingsMaterial = new THREE.MeshBasicMaterial({ color: 0xD2B48C, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
let saturnRingsMesh = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
saturnRingsMesh.rotation.x = Math.PI / 2; // Rotate the rings to be horizontal
planets[5].planetMesh.add(saturnRingsMesh); // Attach rings to Saturn

// Add Near-Earth Asteroids (NEAs), Near-Earth Comets (NECs), and Potentially Hazardous Asteroids (PHAs)
/* let asteroids = [
    { name: "NEA 1", distance: 44, size: 1.5, texture: asteroidTexture, speed: 0.009 * slowdownFactor },
    { name: "NEA 2", distance: 53, size: 2, texture: asteroidTexture, speed: 0.007 * slowdownFactor },
    { name: "PHA", distance: 62, size: 2.5, texture: asteroidTexture, speed: 0.006 * slowdownFactor },
    { name: "Comet", distance: 71, size: 1.2, texture: asteroidTexture, speed: 0.004 * slowdownFactor, tail: true }
]; */

// Create asteroids, comets, and PHAs with textures
/* asteroids.forEach((asteroid) => {
    // Create the asteroid or comet mesh
    let geometry = new THREE.SphereGeometry(asteroid.size, 16, 16);
    let material = new THREE.MeshStandardMaterial({ map: asteroid.texture });
    let asteroidMesh = new THREE.Mesh(geometry, material);

    // Orbit around the sun
    asteroidMesh.position.x = asteroid.distance;
    asteroid.asteroidMesh = asteroidMesh;
    scene.add(asteroidMesh);
}); */

// Raycaster to detect mouse clicks on planets
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// Add event listener to detect clicks
document.addEventListener('click', (event) => {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster based on camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Get the list of objects that intersect with the ray
    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        let selectedObject = intersects[0].object;
        
        // Check which planet was clicked and scroll to its info section
        planets.forEach((planet) => {
            if (planet.planetMesh === selectedObject) {
                // Scroll to the corresponding info section
                document.getElementById(planet.infoId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Animation function to rotate planets and asteroids around the sun
function animate() {
    requestAnimationFrame(animate);

    planets.forEach((planet) => {
        planet.planetMesh.position.x = Math.cos(Date.now() * planet.speed) * planet.distance;
        planet.planetMesh.position.z = Math.sin(Date.now() * planet.speed) * planet.distance;
    });

   /*  asteroids.forEach((asteroid) => {
        asteroid.asteroidMesh.position.x = Math.cos(Date.now() * asteroid.speed) * asteroid.distance;
        asteroid.asteroidMesh.position.z = Math.sin(Date.now() * asteroid.speed) * asteroid.distance;
    }); */

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Start the animation
animate();
