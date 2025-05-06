import { useParams } from "react-router-dom";

export const Profile = () => {
  const { profile } = useParams();

  return <div>{profile}</div>;
};
