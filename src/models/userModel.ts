export interface User {
    id: number;
    name: string;
    email: string;
    posts?: Post[];
  }
  
  interface Post {
    id: number;
    title: string;
    body: string;
    comments?: Comment[];
  }
  
  interface Comment {
    id: number;
    body: string;
    email: string;
  }
  

  
  