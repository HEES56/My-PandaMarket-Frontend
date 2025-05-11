export interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileImg?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm extends LoginForm {
  nickname: string;
  passwordConfirmation: string;
}

export type SignupPayload = Omit<SignupForm, "passwordConfirmation">;

export type AuthFormValues = LoginForm | SignupForm;

export interface Product {
  id: string;
  userId?: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    nickname: string;
    image?: string;
  };
  favoriteCount?: number;
  isLiked?: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: File[];
}

export interface ProductFormSchema {
  name: string;
  description: string;
  price: number;
  image?: FileList;
  tagInput?: string;
}

export interface Article {
  id: string;
  userId?: string;
  title: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    nickname: string;
    image?: string;
  };
  isLiked: boolean;
  favoriteCount: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    nickname: string;
    image?: string;
  };
}

export interface Favorite {
  id: string;
  userId: string;
  articleId: string;
  createdAt: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  nickname: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
