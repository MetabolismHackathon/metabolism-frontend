import { ArtworkI } from 'src/types';
export const api = {
  sendUpdatedArtwork: (artwork: ArtworkI) => {
    console.log('api, sending updatedArtwork', artwork);
    return new Promise((resolve, reject) => {
      resolve(true);
      setTimeout(() => reject(false), 10000);
    });
  },
};

export default api;
