'use server';

import { Pokemon } from '@/store/types/pokemon';

export async function generateCSV(selectedPokemons: Pokemon[]) {
  const headers = ['ID', 'Name', 'URL'];
  const csvRows = selectedPokemons.map((pokemon) => {
    const id = pokemon.url.split('/').slice(-2, -1)[0];
    return [id, `"${pokemon.name}"`, `"${pokemon.url}"`].join(',');
  });

  return [headers.join(','), ...csvRows].join('\n');
}
