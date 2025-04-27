interface DescriptionItemProps {
  img?: string;
  title: string;
  text: string;
}

export const DescriptionItem = ({ img, title, text }: DescriptionItemProps) => {
  return (
    <div className="flex max-w-[545px] gap-x-4 text-lg leading-tight lg:max-w-[400px] lg:text-2xl xl:max-w-[545px]">
      <div className="h-fit w-fit shrink-0 rounded-2xl bg-white p-3 shadow-md">
        <img src={img} alt="Icon" className="h-6 w-6" />
      </div>
      <div>
        <span className="font-extrabold">{title}</span>
        <p className="pt-2">{text}</p>
      </div>
    </div>
  );
};
