import type { ComponentType } from "react";
import HowWebworks from "./m1/HowWebWorks";
import FirstPage from "./m1/FirstPage";
import HtmlText from "./m1/HtmlText";
import LinksMedia from "./m1/LinksMedia";
import CssBasics from "./m1/CssBasics";
import BoxModel from "./m1/BoxModel";
import Flexbox from "./m1/Flexbox";
import Responsive from "./m1/Responsive";
import CapstoneM1 from "./m1/Capstone";

// m2 · JavaScript 编程思维
import Variables from "./m2/Variables";
import Functions from "./m2/Functions";
import ConditionalsLoops from "./m2/ConditionalsLoops";
import ArraysObjects from "./m2/ArraysObjects";
import Dom from "./m2/Dom";
import Events from "./m2/Events";
import CapstoneM2 from "./m2/Capstone";

// m3 · 前端框架 React
import Components from "./m3/Components";
import JsxProps from "./m3/JsxProps";
import UseState from "./m3/UseState";
import UseEffect from "./m3/UseEffect";
import ListsForms from "./m3/ListsForms";
import CapstoneM3 from "./m3/Capstone";

// m4 · 后端开发 Node.js 与 API
import NodeRuntime from "./m4/NodeRuntime";
import HttpDeep from "./m4/HttpDeep";
import ApiRoutes from "./m4/ApiRoutes";
import RestDesign from "./m4/RestDesign";
import AuthSessions from "./m4/AuthSessions";
import CapstoneM4 from "./m4/Capstone";

// m5 · 数据库基础
import SqlIntro from "./m5/SqlIntro";
import SchemaRelations from "./m5/SchemaRelations";
import NosqlGlimpse from "./m5/NosqlGlimpse";
import OrmIntro from "./m5/OrmIntro";
import WiringDb from "./m5/WiringDb";
import CapstoneM5 from "./m5/Capstone";

// m6 · 全栈实战
import Requirements from "./m6/Requirements";
import WiringFullstack from "./m6/WiringFullstack";
import Testing from "./m6/Testing";
import Deployment from "./m6/Deployment";
import Portfolio from "./m6/Portfolio";
import CapstoneM6 from "./m6/Capstone";

/** 课程正文组件注册表：moduleId/slug → 内容组件 */
export const REGISTRY: Record<string, ComponentType> = {
  "m1/how-web-works": HowWebworks,
  "m1/first-page": FirstPage,
  "m1/html-text": HtmlText,
  "m1/links-media": LinksMedia,
  "m1/css-basics": CssBasics,
  "m1/box-model": BoxModel,
  "m1/flexbox": Flexbox,
  "m1/responsive": Responsive,
  "m1/capstone": CapstoneM1,

  "m2/js-variables": Variables,
  "m2/js-functions": Functions,
  "m2/js-conditionals-loops": ConditionalsLoops,
  "m2/js-arrays-objects": ArraysObjects,
  "m2/js-dom": Dom,
  "m2/js-events": Events,
  "m2/capstone": CapstoneM2,

  "m3/react-components": Components,
  "m3/react-jsx-props": JsxProps,
  "m3/react-use-state": UseState,
  "m3/react-use-effect": UseEffect,
  "m3/react-lists-forms": ListsForms,
  "m3/capstone": CapstoneM3,

  "m4/node-runtime": NodeRuntime,
  "m4/http-deep": HttpDeep,
  "m4/api-routes": ApiRoutes,
  "m4/rest-design": RestDesign,
  "m4/auth-sessions": AuthSessions,
  "m4/capstone": CapstoneM4,

  "m5/sql-intro": SqlIntro,
  "m5/schema-relations": SchemaRelations,
  "m5/nosql-glimpse": NosqlGlimpse,
  "m5/orm-intro": OrmIntro,
  "m5/wiring-db": WiringDb,
  "m5/capstone": CapstoneM5,

  "m6/requirements": Requirements,
  "m6/wiring-fullstack": WiringFullstack,
  "m6/testing": Testing,
  "m6/deployment": Deployment,
  "m6/portfolio": Portfolio,
  "m6/capstone": CapstoneM6,
};
