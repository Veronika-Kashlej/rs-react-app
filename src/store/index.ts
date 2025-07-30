import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsSlice from './slices/selectedPokemonsSlice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
