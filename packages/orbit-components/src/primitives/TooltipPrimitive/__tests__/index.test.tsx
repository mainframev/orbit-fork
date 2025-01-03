import * as React from "react";
import userEvent from "@testing-library/user-event";

import { fireEvent, render, screen } from "../../../test-utils";
import Tooltip from "..";

describe("Tooltip", () => {
  const user = userEvent.setup();

  it("should render on hover", async () => {
    const content = "Write some message to the user";
    render(
      <Tooltip content={content}>
        <p>Some text</p>
      </Tooltip>,
    );

    expect(screen.queryByText(content)).not.toBeInTheDocument();
    await user.hover(screen.getByText("Some text"));
    expect(screen.queryByText(content)).toBeVisible();
  });

  it("should close on ESC click", async () => {
    const content = "Write some message to the user";
    render(
      <Tooltip content={content}>
        <p>Some text</p>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Some text"));
    expect(screen.queryByText(content)).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText(content)).not.toBeVisible();
  });

  it("should call onClick 1 time", async () => {
    const content = "Write some message to the user";
    const onClick = jest.fn();

    render(
      <div onClick={onClick} role="button" tabIndex={0} onKeyDown={() => {}}>
        <Tooltip
          stopPropagation
          content={
            <div onClick={onClick} role="button" tabIndex={0} onKeyDown={() => {}}>
              {content}
            </div>
          }
        >
          <div>kek</div>
        </Tooltip>
      </div>,
    );

    await user.hover(screen.getByText("kek"));
    await user.click(screen.getByText(content));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should call onClick 2 times", async () => {
    const content = "Write some message to the user";
    const onClick = jest.fn();

    render(
      <div onClick={onClick} role="button" tabIndex={0} onKeyDown={() => {}}>
        <Tooltip
          content={
            <div onClick={onClick} role="button" tabIndex={0} onKeyDown={() => {}}>
              {content}
            </div>
          }
        >
          <div>kek</div>
        </Tooltip>
      </div>,
    );

    await user.hover(screen.getByText("kek"));
    await user.click(screen.getByText(content));

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
