export const FETCH_BLOGS_LOADING = "FETCH_BLOGS_LOADING";
export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
export const FETCH_BLOGS_FAIL = "FETCH_BLOGS_FAIL";
export const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";
export const CREATE_BLOG_SUCCESS = "CREATE_BLOG_SUCCESS";
export const UPDATE_BLOG_SUCCESS = "UPDATE_BLOG_SUCCESS";
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";
export const BLOGS_BY_USER_SUCCESS = "BLOGS_BY_USER_SUCCESS";

export interface BlogType {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  _user: {
    name: string;
  };
}

export interface FetchBlogsLoading {
  type: typeof FETCH_BLOGS_LOADING;
}

export interface FetchBlogsSuccess {
  type: typeof FETCH_BLOGS_SUCCESS;
  payload: BlogType[];
}

export interface FetchBlogsFail {
  type: typeof FETCH_BLOGS_FAIL;
}

export interface FetchBlogSuccess {
  type: typeof FETCH_BLOG_SUCCESS;
  payload: BlogType;
}

export interface CreateBlogSuccess {
  type: typeof CREATE_BLOG_SUCCESS;
  payload: BlogType;
}

export interface UpdateBlogSuccess {
  type: typeof UPDATE_BLOG_SUCCESS;
  payload: BlogType;
}

export interface DeleteBlogSuccess {
  type: typeof DELETE_BLOG_SUCCESS;
  payload: BlogType;
}

export interface GetBlogsByUser {
  type: typeof BLOGS_BY_USER_SUCCESS;
  payload: BlogType[];
}

export type BlogDispatchTypes =
  | FetchBlogsLoading
  | FetchBlogsSuccess
  | FetchBlogsFail
  | FetchBlogSuccess
  | CreateBlogSuccess
  | UpdateBlogSuccess
  | GetBlogsByUser
  | DeleteBlogSuccess;
