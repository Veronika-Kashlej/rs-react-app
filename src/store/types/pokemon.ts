export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  sprites?: {
    front_default: string;
  };
}
export interface PokemonDetails {
  id: string;
  name: string;
  image: string;
  types?: string[];
  abilities?: string[];
  height?: number;
  weight?: number;
}
export interface PokemonApiResponse {
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
}
