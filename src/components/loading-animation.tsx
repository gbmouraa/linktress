interface LodingAnimationProps {
  dark?: boolean;
}

export const LoadingAnimation = ({ dark }: LodingAnimationProps) => {
  return (
    <div
      className="fixed left-0 top-0 flex min-h-screen w-screen items-center"
      style={{ backgroundColor: dark ? "#000" : "#fff" }}
    >
      <ul className="spinner">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
