type TAG = {
  id: number;
  name: string;
};

export type POST = {
  id: number;
  title: string;
  content: string;
  username: string;
  tags: TAG[];
  created_at: string;
};

export type TASK = {
  id: number;
  title: string;
  content: string;
  username: string;
  tags: TAG[];
  created_at: string;
};
