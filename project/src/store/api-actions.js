import {ActionCreator, adaptCommentToClient, adaptToClient, adaptUserDataToClient} from './action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => dispatch(ActionCreator.loadOffers(data)))
);

export const fetchOfferData = (id) => (dispatch, _getState, api) => (
  Promise.all([
    fetchOffer(id, api),
    fetchComments(id, api),
    fetchNeighbours(id, api),
  ]).then(([offer, comments, neighbours]) => dispatch(ActionCreator.loadOffer({offer, comments, neighbours})))
);

export const fetchOffer = (id, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => adaptToClient(data))
    .catch(() => {})
);

export const fetchComments = (id, api) => (
  api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => data.map(adaptCommentToClient))
    .catch(() => [])
);

export const fetchNeighbours = (id, api) => (
  api.get(APIRoute.NEARBY.replace(/:hotelId/, id))
    .then(({data}) => data.map(adaptToClient))
    .catch(() => [])
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => adaptUserDataToClient(data))
    .then((data) => dispatch(ActionCreator.getUserData(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => adaptUserDataToClient(data))
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
    .then((data) => dispatch(ActionCreator.getUserData(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);
