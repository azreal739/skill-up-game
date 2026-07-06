export class Cities {
    private cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    
    getCities(): string[] {
        return this.cities;
    }

    addCity(newCity: string): void {
        if(!newCity) {
            throw new Error('City name cannot be empty');
        }

        if(this.cities.includes(newCity)) {
            throw new Error('City already exists');
        } else {
            this.cities.push(newCity);

        }
    }
}