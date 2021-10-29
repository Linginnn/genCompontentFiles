import React from "react";

export interface IBplProps {
  /**
   * @required
   * @description.zh-CN
   * @description.en-US
   * @type
   */
  type?: string;
}

/**
 * @desc 接口输出为React组件 MD文件才能渲染api表格
 */
const BplAPI: React.FC<IBplProps> = () => <></>;
export default BplAPI;
