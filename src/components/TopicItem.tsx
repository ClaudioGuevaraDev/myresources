import { Topic } from '@/interfaces/topics';
import Image from 'next/image';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Resource } from '@/interfaces/resources';
import Link from 'next/link';

interface Props {
  topic: Topic;
}

async function TopicItem({ topic }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: resources } = (await supabase
    .from('resources')
    .select('*')
    .eq('topic_id', topic.id)) as { data: Resource[] };

  return (
    <Link href={`/topic/${topic.id}`}>
      <div className='bg-gray-800 rounded-lg shadow-md p-4 flex flex-row items-center justify-between gap-4 hover:scale-105 cursor-pointer duration-150'>
        <Image src={topic.image ? topic.image : ''} alt={topic.name} width={50} height={50} />

        <div className='flex flex-col items-center justify-start'>
          <h5 className='font-semibold text-lg'>{topic.name}</h5>
          <p className='text-base font-light'>{resources.length} recursos</p>
        </div>
      </div>
    </Link>
  );
}

export default TopicItem;
