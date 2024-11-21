import Post from "@/types/post/post.type";
import PostCard from "../postcard/postcard.component";

interface ListaPostsProps {
    posts: Post[];
}

const ListaPosts = ({posts}: ListaPostsProps) => {
    return (
        <section className="w-full flex flex-col gap-4 p-4">
            {posts.map((post, index) => (
                <PostCard key={index} post={post}/>
            ))}
        </section>
    )
}

export default ListaPosts