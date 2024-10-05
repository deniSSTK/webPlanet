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
        }
    }

    document.body.addEventListener('click', function (event) {
        const planetInfo = document.getElementById('planet-info');
        if (!event.target.closest('.planet')) {
            planetInfo.classList.add('hidden');
            const messages = document.querySelectorAll('.planet-message');
            messages.forEach(message => {
                message.style.display = 'none';
            });
        }
    });

    window.addEventListener('scroll', function() {
        const planetInfo = document.getElementById('planet-info');
        planetInfo.classList.add('hidden');
        const messages = document.querySelectorAll('.planet-message');
        messages.forEach(message => {
            message.style.display = 'none';
        });
    });

} catch (e) {
    console.error(e);
}
