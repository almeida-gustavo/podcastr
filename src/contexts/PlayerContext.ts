import { createContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;

  // Tipando funcoes que vao alterar o estado la no outro componente
  play: (episode: Episode) => void;
  tooglePlay: () => void;
  setPlayingState: (state: boolean) => void;
};

// Esse valor aqui dentro do createContext ele nao vai servir de muita coisa...
// Ele eh usado mais para definirmos qual seria o formato daquele contexto
export const PlayerContext = createContext({} as PlayerContextData);
