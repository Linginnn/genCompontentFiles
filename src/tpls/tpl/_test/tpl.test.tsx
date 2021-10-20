import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import tpl from "..";

describe("tpl", () => {
  test("tpl should render correctly", () => {
    const wrapper = render(<tpl></tpl>);
    screen.debug();
    expect(wrapper).toMatchSnapshot();
  });
});
