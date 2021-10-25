const tpl = (type: string | undefined) => `
  /**
   * @required 
   * @description.zh-CN
   * @description.en-US
   * @type
   */
  ${type}:`;

export { tpl };
