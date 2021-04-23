import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';
import Link from 'next/link';

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

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode: ep }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="voltar" />
          </button>
        </Link>

        <Image width={700} height={160} src={ep.thumbnail} objectFit="cover" />
        <button type="button">
          <img src="/play.svg" alt="tocar episode" />
        </button>
      </div>

      <header>
        <h1>{ep.title}</h1>
        <span>{ep.members}</span>
        <span>{ep.publishedAt}</span>
        <span>{ep.durationAsString}</span>
      </header>

      {/* Isso dangerouslySetInnerHTML eh para vc colocar sua descricao que vem com as tags de html p ja no formato correto. */}
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: ep.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const paths = data.map((episode) => ({ params: { slug: episode.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    ...data,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    url: data.file.url,
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
  };

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, //24hours
  };
};
