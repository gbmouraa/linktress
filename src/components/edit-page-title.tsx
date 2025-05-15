interface EditPageTitleProps {
  img: string;
  title: string;
}

export const EditPageTitle = ({ img, title }: EditPageTitleProps) => {
  return (
    <div className="flex items-center gap-x-5">
      <img src={img} alt="Icon" />
      <span className="text-base font-bold">{title}</span>
    </div>
  );
};
