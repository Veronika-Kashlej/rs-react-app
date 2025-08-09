import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import selectedPokemonsSlice from './slices/selectedPokemonsSlice';
import { pokemonApi } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
