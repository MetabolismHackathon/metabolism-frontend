export const persistLocation = (location: string) => {
  // console.log('persit run', location);
  const currentPersistedState = window.localStorage.getItem('slapsketch');
  if (!!currentPersistedState) {
    const parsedState = JSON.parse(currentPersistedState);
    window.localStorage.setItem('slapsketch', JSON.stringify({ ...parsedState, location }));

    return;
  }
  window.localStorage.setItem('slapsketch', JSON.stringify({ location }));
};

export const getRandomInteger: (min: number, max: number) => number = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const ipfsURLConverter = (ipfsUrl: string) => {
  // const x = ipfsUrl.split('//');

  return `${'https://ipfs.io/ipfs/'}${ipfsUrl.split('//')[1]}`;
};
