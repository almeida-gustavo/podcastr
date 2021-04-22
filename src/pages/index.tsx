// Tipagem da funcao
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';

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
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((ep) => (
            <li key={ep.id}>
              <Image
                width={192}
                height={192}
                objectFit="cover"
                src={ep.thumbnail}
                alt={ep.title}
              />

              <div className={styles.episodeDetails}>
                <Link href={`episodes/${ep.id}`}>
                  <a>{ep.title}</a>
                </Link>

                <p>{ep.members}</p>
                <span>{ep.publishedAt}</span>
                <span>{ep.durationAsString}</span>
              </div>

              <button type="button">
                <img src="/play-green.svg" alt="tocar episodio" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((ep) => (
              <tr key={ep.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    objectFit="cover"
                    src={ep.thumbnail}
                    alt={ep.title}
                  />
                </td>
                <td>
                  <Link href={`episodes/${ep.id}`}>
                    <a>{ep.title}</a>
                  </Link>
                </td>
                <td>{ep.members}</td>
                <td style={{ width: 100 }}>{ep.publishedAt}</td>
                <td>{ep.durationAsString}</td>
                <td>
                  <button>
                    <img src="/play-green.svg" alt="tocar episodio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
