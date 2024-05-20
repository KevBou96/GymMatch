
export interface IPostResponseData {
    posts: IPost[]
}

export interface IPost {
    post_id?: number,
    post_title: string,
    post_content: string,
    image: File,
    imgurl?: string,
    created_data?: Date,
    user_id?: number,
    likes?: number,
    dislikes?: number,
    first_name: string,
    last_name: string,
    liked?: boolean,
    disliked?: boolean
}