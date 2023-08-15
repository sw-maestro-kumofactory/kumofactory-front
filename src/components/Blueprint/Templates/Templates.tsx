'use client';
import { useEffect, useState } from 'react';

import NewBlueprint from '@/src/components/Blueprint/Templates/NewBlueprint';
import { getAllTemplates } from '@/src/api/template';
import Card from '@/src/components/common/Card';
import { BlueprintInfo } from '@/src/types/Blueprint';
import { deleteBlueprint } from '@/src/api/blueprint';

const Templates = () => {
  const [templates, setTemplates] = useState<BlueprintInfo[]>([]);

  const loadTemplates = async () => {
    try {
      const data = await getAllTemplates();
      setTemplates(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className='w-3/4 h-5/6 bg-white rounded-2xl p-8'>
      <div className='text-2xl'>Templates</div>
      <div className='flex flex-wrap w-full h-[95%] overflow-y-scroll mt-4 '>
        <div className='w-1/3 h-2/5 p-4'>
          <NewBlueprint />
        </div>
        <>
          {templates.map((template) => {
            return <Card key={template.uuid} data={template} isTemplate={true} />;
          })}
        </>
      </div>
    </div>
  );
};

export default Templates;
