'use client';

import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Resource } from '@/interfaces/resources';
import { useEffect, useState } from 'react';
import ResourceItem from '@/components/ResourceItem';
import { Topic } from '@/interfaces/topics';
import Image from 'next/image';

const supabase = createClientComponentClient();

function TopicDetail() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const getTopic = async () => {
      try {
        const { data: topics } = (await supabase.from('topics').select().eq('id', topicId)) as {
          data: Topic[];
        };
        setTopic(topics[0]);
      } catch (error) {
        setTopic(null);
      }
    };
    getTopic();
  }, [topicId]);

  useEffect(() => {
    const getResources = async () => {
      try {
        const { data: resources } = (await supabase
          .from('resources')
          .select('*')
          .eq('topic_id', topicId)) as { data: Resource[] };
        setResources(resources);
      } catch (error) {
        setResources([]);
      }
    };

    getResources();
  }, [topicId]);

  return (
    <div className='space-y-4'>
      {topic && (
        <header className='flex gap-3 items-center'>
          <Image src={topic.image ? topic.image : ''} alt={topic.name} width={50} height={50} />
          <h3 className='text-2xl font-bold'>{topic.name}</h3>
        </header>
      )}

      <p>
        <span className='font-semibold'>Recursos:</span> {resources.length}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default TopicDetail;
