import {NameSpace} from '../root-reducer';

export const getStateOffers = (state) => state[NameSpace.DATA].offers;
export const getStateOffer = (state) => state[NameSpace.DATA].offer;
export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;
export const getStateReviews = (state) => state[NameSpace.DATA].comments;
export const getStateNeighbours = (state) => state[NameSpace.DATA].neighbours;
export const getStateServerStatus = (state) => state[NameSpace.DATA].serverStatus;
