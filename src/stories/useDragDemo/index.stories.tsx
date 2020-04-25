import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { Demo } from ".";
import ShowDocs from "../../util/ShowDocs";

const components = storiesOf("Components", module);

components
  .addDecorator(withKnobs)
  .add("Docs", () => <ShowDocs md={require("../docs/useDrag.md")} />)
  .add("Demo", () => <Demo disabled={boolean("disabled", false)} />);
