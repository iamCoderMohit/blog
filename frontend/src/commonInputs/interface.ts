export interface Inputs {
  author: {
    username: string
  };
  title: string;
  content: string;
  createdAt: string;
  bgColor: string;
  id: string
}

export interface MyInfo {
  id: string,
  username: string
  email: string
  createdAt: string
  blogs: []
}