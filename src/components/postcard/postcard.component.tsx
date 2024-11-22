import useAuth from "@/hooks/useauth/useauth.hook";
import Post from "@/types/post/post.type";
import Image from "next/image";
import Link from "next/link";
import AlterDeleteTooltip from "../alterdeletetooltip/alterdeletetooltip.component";

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const { usuario } = useAuth()
    
    return (
        <div className="w-full bg-background text-foreground rounded-md border border-foregroundopacity20 p-8 shadow-md flex flex-col gap-4">
            <article className="flex flex-col lg:flex-row justify-between">
                <figure className="w-full flex gap-4">
                    <Image
                        className="w-[80px] object-contain rounded-md "
                        width={400}
                        height={400}
                        src={post.imagem ? post.imagem : 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
                        alt={post.titulo}
                    />
                    <figcaption className="w-full">
                        <h1 className="text-xl font-black line-clamp-2 w-3/4">{post.titulo}</h1>
                        <p className="line-clamp-2 w-5/6">{post.descricao}</p>
                    </figcaption>
                </figure>
                <div className="w-full flex justify-end sm:justify-start items-center gap-4">
                <p>{post.usuario.nomeUsuario}</p>
                    <Image
                        className="w-[40px] h-[40px] rounded-full object-cover"
                        width={400}
                        height={400}
                        src={post.usuario.imagemFoto ? post.usuario.imagemFoto : 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
                        alt={'Foto do usuário que postou'}
                    />
                {usuario?.idUsuario === post.usuario.idUsuario && <AlterDeleteTooltip postId={post.idPost} path={"/posts"}/>}
                </div>
            </article>
            <p>
                {post.dataCadastro ? post.dataCadastro.toString() : 'Sem data de cadastro'}
            </p>
            <Link href={`/posts/${post.idPost}`} className="underline">Ver post completo</Link>
        </div>
    )
}

export default PostCard