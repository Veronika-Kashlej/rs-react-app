import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../types/pokemon';
import { getPokemonId } from '@/api/getPokemon';

interface SelectedPokemonsState {
  selected: Pokemon[];
}

const initialState: SelectedPokemonsState = {
  selected: [],
};

export const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    togglePokemonSelection: (state, action: PayloadAction<Pokemon>) => {
      const existingIndex = state.selected.findIndex(
        (p) => getPokemonId(p) === getPokemonId(action.payload)
      );

      if (existingIndex >= 0) {
        state.selected.splice(existingIndex, 1);
      } else {
        state.selected.push(action.payload);
      }
    },
    clearSelectedPokemons: (state) => {
      state.selected = [];
    },
  },
});

export const { togglePokemonSelection, clearSelectedPokemons } =
  selectedPokemonsSlice.actions;
export default selectedPokemonsSlice.reducer;
