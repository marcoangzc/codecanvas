import type { ComponentType } from "react";
import HowWebWorks from "./m1/HowWebWorks";
import FirstPage from "./m1/FirstPage";
import HtmlText from "./m1/HtmlText";
import LinksMedia from "./m1/LinksMedia";
import CssBasics from "./m1/CssBasics";
import BoxModel from "./m1/BoxModel";
import Flexbox from "./m1/Flexbox";
import Responsive from "./m1/Responsive";
import Capstone from "./m1/Capstone";

/** 课程正文组件注册表：moduleId/slug → 内容组件 */
export const REGISTRY: Record<string, ComponentType> = {
  "m1/how-web-works": HowWebWorks,
  "m1/first-page": FirstPage,
  "m1/html-text": HtmlText,
  "m1/links-media": LinksMedia,
  "m1/css-basics": CssBasics,
  "m1/box-model": BoxModel,
  "m1/flexbox": Flexbox,
  "m1/responsive": Responsive,
  "m1/capstone": Capstone,
};
