planets.forEach(planet => {
    planet.addEventListener('click', function() {
        const planetId = this.id;
        switch (planetId) {
            case 'mercury':
                alert('Меркурий');
                break;
            case 'venus':
                alert('Венера');
                break;
            case 'earth':
                alert('Земля');
                break;
            case 'mars':
                alert('Марс');
                break;
            case 'jupiter':
                alert('Юпитер');
                break;
            case 'saturn':
                alert('Сатурн');
                break;
            case 'uranus':
                alert('Уран');
                break;
            case 'neptune':
                alert('Нептун');
                break;
            default:
                alert('Неизвестная планета');
        }
    });
});
