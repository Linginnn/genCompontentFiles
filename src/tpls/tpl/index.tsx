import React from "react";
import { Bpl as AntBpl } from "antd";
import { IBplProps } from "./interface";
import classNames from "classnames";
import getPrefixCls from "../../utils/getPrefixCls";
import "./index.less";

const Bpl: React.FC<IBplProps> = (props) => {
  const { ...restProps } = props;
  /**state**/

  /**effect**/

  /**methods**/

  /**render**/

  const prefixCls = getPrefixCls("tpl");
  const cls = classNames(prefixCls);
  return (
    <div className={cls}>
      <AntBpl {...restProps} />
    </div>
  );
};
export default Bpl;
