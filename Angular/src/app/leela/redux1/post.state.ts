export interface Post {
    id?: string,
    title: string,
    description: string
}

export interface PostState {
    posts: Post[]
}

export const initialState1: PostState = {
    posts: [
        {
            id: '0',
            title: 'initial state post ',
            description: 'initial state description'
        },
    ]
}