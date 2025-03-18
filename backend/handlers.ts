
// import { http } from 'msw';
// import { Cities } from './cities';
// import { Weather } from './weather';
// // import { Task } from '../src/types/task';

// const citiesInstance = new Cities();
// const weatherInstance = new Weather();

// export const handlers = [
//   // GET /cities endpoint
//   http.get('/cities', (req: any, res: any, ctx: any) => {
//     return res(ctx.json(citiesInstance.getCities()));
//   }),

//   // POST /cities endpoint
//   http.post('/cities', async (req, res, ctx) => {
//     // Use await req.json() to get the parsed JSON body.
//     const { city } = await req.json() as { city: string };

//     try {
//       citiesInstance.addCity(city);
//       return res(ctx.status(201), ctx.json({ status: 201 }));
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return res(ctx.status(400), ctx.json({ status: 400, message: error.message }));
//       }
//       return res(ctx.status(400), ctx.json({ status: 400, message: 'Unknown error' }));
//     }
//   }),

//   // GET /weather endpoint
//   http.get('/weather', (req, res, ctx) => {
//     return res(ctx.json(weatherInstance.getForecasts()));
//   }),
// ];


import { http, HttpResponse } from 'msw'; // Ensure you import from msw/browser in v2.0+
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


