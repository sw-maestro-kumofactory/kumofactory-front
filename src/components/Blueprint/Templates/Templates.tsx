import TemplateItems from '@/src/components/Blueprint/Templates/TemplateItems';
const Templates = () => {
  return (
    <div className='w-3/4 h-5/6 bg-white rounded-2xl p-8'>
      <div className='text-2xl'>Templates</div>
      <div className='flex flex-wrap w-full h-[95%] overflow-y-scroll mt-4 '>
        <TemplateItems />
        <TemplateItems />
        <TemplateItems />
        <TemplateItems />
        <TemplateItems />
        <TemplateItems />
      </div>
    </div>
  );
};

export default Templates;
