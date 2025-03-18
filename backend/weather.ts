export interface WeatherForecast {
    date: string;
    temperatureC: number;
    summary: string;
}

export class Weather{
    private forecasts: WeatherForecast[] = [
        { date: '2021-09-01', temperatureC: 20, summary: 'Cloudy' },
        { date: '2021-09-02', temperatureC: 25, summary: 'Sunny' },
        { date: '2021-09-03', temperatureC: 30, summary: 'Rainy' },
        { date: '2021-09-04', temperatureC: 35, summary: 'Sunny' },
        { date: '2021-09-05', temperatureC: 40, summary: 'Cloudy' },
        { date: '2021-09-06', temperatureC: 45, summary: 'Rainy' },
        { date: '2021-09-07', temperatureC: 50, summary: 'Sunny' },
        { date: '2021-09-08', temperatureC: 55, summary: 'Cloudy' },
        { date: '2021-09-09', temperatureC: 60, summary: 'Rainy' },
        { date: '2021-09-10', temperatureC: 65, summary: 'Sunny' },
    ];

    getForecasts(): WeatherForecast[] {
        return this.forecasts;
    }
}