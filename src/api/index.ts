import { ArtworkI } from 'src/types';
export const api = {
  sendUpdatedArtwork: (artwork: ArtworkI) => {
    console.log('api, sending updatedArtwork', artwork);
    return new Promise((resolve, reject) => {
      resolve(true);
      setTimeout(() => reject(false), 10000);
    });
  },

  uploadImage: (data: FormData) => {
    console.log('api, uploading file', data.get('userId'), data.get('file'));
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 2000);
      setTimeout(() => reject(false), 3000);
    });
  },
};

export default api;
