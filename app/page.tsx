import { AdvertismentCarousel } from '@/components/Layout/AdvertismentCarousel';
import { NewBooks } from '@/components/Layout/NewBooks';
import { UpdateFeed } from '@/components/Layout/UpdateFeed';
import { News } from '@/components/Layout/News';
import db from '@/lib/prisma';
import { Tops } from '@/components/Layout/Tops';

const getGenres = async () => {
  const genres = await db.genre.findMany({})

  return genres;
}

const Home: React.FC = async () => {
  const genres = await getGenres();

  return (
    <main className="text-black">
      <AdvertismentCarousel />
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className='w-[864px]'>
          <NewBooks />
          <UpdateFeed />
        </div>
        <div>
          <News />
          <Tops />
        </div>
      </div>
    </main>
  );
}

export default Home;
