export const persistLocation = (location: string) => {
  const currentPersistedState = window.localStorage.getItem('slapsketch');
  if (!!currentPersistedState) {
    const parsedState = JSON.parse(currentPersistedState);
    window.localStorage.setItem('slapsketch', JSON.stringify({ ...parsedState, location }));

    return;
  }
  window.localStorage.setItem('slapsketch', JSON.stringify({ location }));
};
