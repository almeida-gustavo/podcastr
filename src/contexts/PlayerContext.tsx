import { createContext, useState, ReactNode } from 'react';

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

type PlayerContextProvierProps = {
  children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProvierProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        tooglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
