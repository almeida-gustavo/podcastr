// Tipagem da funcao
import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  // As duas formas abaixo sao validas
  // episodes: Array<Episode>;
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  console.log(props.episodes);

  return (
    <div>
      <h1>Hey</h1>
      <span>{JSON.stringify(props.episodes)}</span>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((ep) => {
    return {
      ...ep,
      publishedAt: format(parseISO(ep.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(ep.file.duration),
      url: ep.file.url,
      durationAsString: convertDurationToTimeString(Number(ep.file.duration)),
    };
  });

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
