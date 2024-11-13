import Link from "next/link";

interface LinkRedirectProps {
    title?: string
    link: string
}

const LinkRedirect = ({ title, link }: LinkRedirectProps) => {
    return (
        <Link href={link} className="text-foregroundopacity80 hover:text-foreground transition-all ease-in-out">
            {title}
        </Link>
    )
}

export default LinkRedirect;