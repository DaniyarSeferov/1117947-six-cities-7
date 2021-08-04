import {
  changeCity,
  loadOffers,
  ActionType
} from './action';
import {Cities} from '../const';


describe('Actions', () => {
  it('action creator for changing city returns correct action', () => {
    const expectedAction = {
      type: ActionType.CITY_CHANGE,
      payload: Cities.COLOGNE,
    };

    expect(changeCity(Cities.COLOGNE)).toEqual(expectedAction);
  });

  it('action creator for loading offers returns correct action', () => {
    const offers = [{
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10,
        },
        name: 'Amsterdam',
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    },
    {
      bedrooms: 1,
      city: {
        location: {
          latitude: 48.85661,
          longitude: 4.895168,
          zoom: 10,
        },
        name: 'Paris',
      },
      description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
      goods: ['Laptop friendly workspace'],
    }];

    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };

    expect(loadOffers(offers)).toEqual(expectedAction);
  });
});
