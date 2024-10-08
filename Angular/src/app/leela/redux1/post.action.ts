import { createAction, props } from "@ngrx/store";
import { Post } from "./post.state";


export const Add_Post_Action = '[post page] add post'
export const Update_post_Action = 'UpdatePostAction'
export const Delete_post_Action = 'DeletePostAction'
// export const addPost = createAction(Add_Post_Action )

export const addPost = createAction(Add_Post_Action, props<{ post: Post }>());

export const updatePost = createAction(Update_post_Action, props<{ post: Post }>());

export const deletePost = createAction(Delete_post_Action, props<{ id: string | undefined }>())