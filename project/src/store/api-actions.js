import {
  adaptCommentToClient,
  adaptToClient,
  adaptUserDataToClient, finishSending, getUserData,
  loadComments,
  loadOffer,
  loadOffers, redirectToRoute, requireAuthorization, setFavorite, logoutAction
} from './action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => dispatch(loadOffers(data)))
);

export const fetchOfferData = (id) => (dispatch, _getState, api) => (
  Promise.all([
    fetchOffer(id, api),
    fetchComments(id, api),
    fetchNeighbours(id, api),
  ])
    .then(([offer, comments, neighbours]) => dispatch(loadOffer({offer, comments, neighbours})))
    .catch(() => {})
);

export const fetchOffer = (id, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => adaptToClient(data))
);

export const fetchComments = (id, api) => (
  api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => data.map(adaptCommentToClient))
);

export const sendComment = (id, comment) => (dispatch, _getState, api) => {
  const url = APIRoute.COMMENT.replace(/:hotelId/, id);
  return api.post(url, comment)
    .then(({data}) => data.map(adaptCommentToClient))
    .then((data) => dispatch(loadComments(data)))
    .then(() => dispatch(finishSending('')))
    .catch(() => dispatch(finishSending('There was an error of some sort.')));
};

export const fetchNeighbours = (id, api) => (
  api.get(APIRoute.NEARBY.replace(/:hotelId/, id))
    .then(({data}) => data.map(adaptToClient))
);

export const fetchFavorite = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITES)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => dispatch(loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => adaptUserDataToClient(data))
    .then((data) => dispatch(getUserData(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => adaptUserDataToClient(data))
    .then((data) => {
      localStorage.setItem('token', data.token);
      api.defaults.headers['x-token'] = data.token;
      return data;
    })
    .then((data) => dispatch(getUserData(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(logoutAction()))
);

export const sendFavorite = (id, status) => (dispatch, _getState, api) => {
  let url = APIRoute.FAVORITE.replace(/:hotelId/, id);
  url = url.replace(/:status/, status);
  return api.post(url)
    .then(({data}) => adaptToClient(data))
    .then((data) => {
      const state = _getState();
      let {offers, offer, neighbours} = state.DATA;
      const offerIndex = offers.findIndex((offerItem) => offerItem.id === data.id);
      const neighbourIndex = neighbours.findIndex((neighbour) => neighbour.id === data.id);

      if (offer.id === data.id) {
        offer = data;
      }
      if (offerIndex !== -1) {
        offers = offers.slice();
        offers[offerIndex] = data;
      }
      if (neighbourIndex !== -1) {
        neighbours = neighbours.slice();
        neighbours[neighbourIndex] = data;
      }

      return dispatch(setFavorite({offer, offers, neighbours}));
    });
};
