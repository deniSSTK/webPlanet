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
