'use client';

import { Badge, Card, Sidebar } from 'flowbite-react';
import { HiColorSwatch, HiChartPie, HiCog, HiPuzzle } from 'react-icons/hi';
import { AssistantComponentProps } from '@/app/assistants/[id]/AssistantComponentProps';
import { Assistant } from '@/app/types/assistant';
import Image from 'next/image';
import { getImageHash } from '@/app/utils/hash';
import React from 'react';

export default function SideNavigation(props: AssistantComponentProps) {
  const getAssistantComponentUrl = (
    assistant: Assistant,
    component: string
  ) => {
    if (!assistant) return '';
    return `/assistants/${assistant.id}/${component}`;
  };

  return (
    <div className='flex flex-wrap items-center justify-center self-center'>
      <Sidebar aria-label='Sidebar' className='flex flex-auto'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Card key={props.assistant.id}>
              <div className='flex flex-col items-center pb-10'>
                <Image
                  width={296}
                  height={296}
                  src={
                    '/images/people/' +
                    getImageHash(props.assistant.id) +
                    '.jpg'
                  }
                  alt='Assistant'
                  className='mb-3 rounded-e-lg rounded-s-xl shadow-lg'
                  style={{ width: '100%', height: 'auto' }}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                  {props.assistant.name}
                </h5>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  <div className='flex self-center'>
                    <Badge color='info'>{props.assistant.model}</Badge>
                  </div>
                </span>
                <span className='pt-4 text-sm text-gray-500 dark:text-gray-400'>
                  {props.assistant.description}
                </span>
              </div>
            </Card>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href={getAssistantComponentUrl(props.assistant, 'dashboard')}
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href={getAssistantComponentUrl(props.assistant, 'customize')}
              icon={HiColorSwatch}
            >
              Customize
            </Sidebar.Item>
            <Sidebar.Item
              href={getAssistantComponentUrl(props.assistant, 'integrate')}
              icon={HiPuzzle}
            >
              Integrate
            </Sidebar.Item>
            <Sidebar.Item
              href={getAssistantComponentUrl(props.assistant, 'configure')}
              icon={HiCog}
            >
              Configure
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
