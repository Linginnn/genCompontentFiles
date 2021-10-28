import React from "react";

export interface ItplProps {
  /**
   * @required
   * @description.zh-CN
   * @description.en-US
   * @type
   */
  children?: boolean; // 支持识别 TypeScript 可选类型为非必选属性
}

/**
 * @desc 接口输出为React组件 MD文件才能渲染api表格
 */
const tplAPI: React.FC<ItplProps> = () => <></>;
export default tplAPI;
