import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import tpl from "..";

describe("tpl", () => {
  /**套件执行之前 */
  beforeEach(() => {});
  /**套件执行之后 */
  afterEach(() => {});
  test("tpl should render correctly", () => {
    const wrapper = render(<tpl></tpl>);
    expect(wrapper).toMatchSnapshot();
  });
});
