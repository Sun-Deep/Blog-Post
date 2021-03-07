export const COMMENT_LOADING = "COMMENT_LOADING";
export const COMMENT_FAIL = "COMMENT_FAIL";
export const COMMENT_ADD = "COMMENT_ADD";
export const REPLY_ADD = "REPLY_ADD";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";

export interface ReplyType {
  _user: string;
  content: string;
  createdAt: string;
}

export type CommentType = {
  _id: string;
  content: string;
  _user: {
    _id: string;
    name: string;
  };
  _blog: {
    _id: string;
    content: string;
  };
  replies: ReplyType[];
  createdAt?: string;
};

export interface CommentLoading {
  type: typeof COMMENT_LOADING;
}

export interface CommentFail {
  type: typeof COMMENT_FAIL;
}

export interface CommentAdd {
  type: typeof COMMENT_ADD;
  payload: CommentType;
}

export interface ReplyAdd {
  type: typeof REPLY_ADD;
  payload: CommentType;
}

export interface FetchCommentsSuccess {
  type: typeof FETCH_COMMENTS_SUCCESS;
  payload: CommentType[];
}

export type CommentDispatchTypes =
  | CommentLoading
  | CommentFail
  | CommentAdd
  | ReplyAdd
  | FetchCommentsSuccess;
