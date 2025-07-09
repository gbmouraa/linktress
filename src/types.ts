export type UserProfileType = {
  uid: string;
  username: string;
  email: string;
  linkColor: string;
  linkBg: string;
  pageBg: string;
  profileImageURL: string | null;
  name: string | null;
  bio: string | null;
  facebookURL: string | null;
  tiktokURL: string | null;
  youtubeURL: string | null;
};

export type UserType = {
  uid: string | null;
  username: string | null;
  name: string | null;
  profileImageURL: string | null;
  emailVerified: boolean;
};
