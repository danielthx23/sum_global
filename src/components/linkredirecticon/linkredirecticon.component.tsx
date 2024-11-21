import LinkRedirect from "../linkredirect/linkredirect.component"
import ToolTipItem from "@/types/tooltipitem/tooltipitem.type"

const LinkRedirectIcon = ({icon, label, link}: ToolTipItem) => {
    return (
        <li className="flex gap-3 text-sm items-center text-foregroundlight hover:text-foreground transition-all ease-in-out">
          {icon}
          <LinkRedirect title={label} link={link} />
        </li>
    )
}

export default LinkRedirectIcon;