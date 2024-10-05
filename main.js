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

    function showPlanetInfo(planetId) {
        const planetInfo = document.getElementById('planet-info');
        const messages = document.querySelectorAll('.planet-message');
        messages.forEach(message => {
            message.style.display = 'none';
        });
        const planetMessage = document.getElementById(planetImagesPath[planetId]);
        if (planetMessage) {
            planetMessage.style.display = 'block';
            planetInfo.classList.remove('hidden');
            setTimeout(() => {
                planetInfo.classList.add('visible');
            }, 10);
        }
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
