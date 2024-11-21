import { ReactElement } from "react";

export default interface Page {
    label: string;
  link: string;
  icon: ReactElement;
    subPages?: Page[]; 
}