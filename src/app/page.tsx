import TopicItem from '@/components/TopicItem';
import { Topic } from '@/interfaces/topics';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: topics } = (await supabase.from('topics').select()) as { data: Topic[] };

  return (
    <div>
      {!topics || topics.length === 0 ? (
        <div className='w-full h-full flex items-center justify-center'>
          <h2 className='text-3xl font-bold'>No hay recursos disponibles 🥲</h2>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
          {topics?.map((topic) => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
