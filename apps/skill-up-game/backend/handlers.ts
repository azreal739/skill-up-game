import { http, HttpResponse } from 'msw';
import { Cities } from './cities';
import { Weather } from './weather';

const citiesInstance = new Cities();
const weatherInstance = new Weather();

export const handlers = [
  // GET /cities endpoint
  http.get('/cities', () => {
    return HttpResponse.json(citiesInstance.getCities());
  }),

  // POST /cities endpoint
  http.post('/cities', async ({ request }) => {
    // Read the request body using the Fetch API methods.
    const { city } = await request.json() as { city: string };

    try {
      citiesInstance.addCity(city);
      return HttpResponse.json({ status: 201 }, { status: 201 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return HttpResponse.json({ status: 400, message: error.message }, { status: 400 });
      }
      return HttpResponse.json({ status: 400, message: 'Unknown error' }, { status: 400 });
    }
  }),

  // GET /weather endpoint
  http.get('/weather', () => {
    return HttpResponse.json(weatherInstance.getForecasts());
  }),
];

