export const LoadingAnimation = () => {
  return (
    <div className="fixed left-0 top-0 flex min-h-screen w-screen items-center bg-white">
      <ul className="spinner">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
