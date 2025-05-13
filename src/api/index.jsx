import Chance from 'chance';

const chance = new Chance(); 

export const fakeUserData = () => {
  return chance.name({ middle: true });
};

// console.log(fakeUserData()); 
