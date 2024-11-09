document.getElementById('weatherForm').addEventListener('submit', e => {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    if (city !== '') {
        getWeather(city);
    } else {
        alert('Будь ласка, введіть назву міста.');
    }
});

const getWeather = async city => {
    const apiKey = ''; // API ключ
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=uk`;

    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = '<p>Завантаження...</p>';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Місто не знайдено.');
        }

        const data = await response.json();

        // Форматуємо результат
        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <p><strong>Опис:</strong> ${data.weather[0].description}</p>
            <p><strong>Температура:</strong> ${data.main.temp}°C</p>
            <p><strong>Відчувається як:</strong> ${data.main.feels_like}°C</p>
            <p><strong>Вологість:</strong> ${data.main.humidity}%</p>
            <p><strong>Швидкість вітру:</strong> ${data.wind.speed} м/с</p>
        `;

        resultDiv.innerHTML = weatherHTML;
    } catch (error) {
        resultDiv.innerHTML = `<p>Сталася помилка: ${error.message}</p>`;
    }
};
