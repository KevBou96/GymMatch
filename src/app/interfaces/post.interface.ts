
export interface IPostResponseData {
    posts: IPost[]
}

export interface IPost {
    post_id?: number,
    post_title: string,
    post_content: string,
    image: File,
    imgurl?: string,
    created_data?: Date
}