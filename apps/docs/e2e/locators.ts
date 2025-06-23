import {type Locator, type Page} from '@playwright/test';

const repositoryLink = ({page}: {page: Page}) =>
  page.getByRole('link', {
    name: 'GitHub repository satelllte/react-knob-headless',
  });

const decorativeKnobStone = ({page}: {page: Page}) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'stone' theme",
  });

const decorativeKnobPink = ({page}: {page: Page}) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'pink' theme",
  });

const decorativeKnobGreen = ({page}: {page: Page}) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'green' theme",
  });

const decorativeKnobSky = ({page}: {page: Page}) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'sky' theme",
  });

const exampleContainer = ({page, name}: {page: Page; name: string}) =>
  page.getByRole('heading', {name, exact: true}).locator('..');

const exampleViewSourceLink = ({container}: {container: Locator}) =>
  container.getByRole('link', {name: 'View source'});

const exampleKnob = ({container, name}: {container: Locator; name: string}) =>
  container.getByRole('slider', {name, exact: true});

const exampleKnobOutput = ({container}: {container: Locator}) =>
  container.getByRole('status');

export const locators = {
  repositoryLink,
  decorativeKnobStone,
  decorativeKnobPink,
  decorativeKnobGreen,
  decorativeKnobSky,
  exampleContainer,
  exampleViewSourceLink,
  exampleKnob,
  exampleKnobOutput,
} as const;
