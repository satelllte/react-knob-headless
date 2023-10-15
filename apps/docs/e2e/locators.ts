import {type Locator, type Page} from '@playwright/test';

const repositoryLink = (page: Page) =>
  page.getByRole('link', {
    name: 'GitHub repository satelllte/react-knob-headless',
  });

const decorativeKnobStone = (page: Page) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'stone' theme",
  });

const decorativeKnobPink = (page: Page) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'pink' theme",
  });

const decorativeKnobGreen = (page: Page) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'green' theme",
  });

const decorativeKnobSky = (page: Page) =>
  page.getByRole('slider', {
    name: "Decorative knob with 'sky' theme",
  });

const exampleContainer = (page: Page, name: string) =>
  page.getByRole('heading', {name}).locator('..');

const exampleViewSourceLink = (container: Locator) =>
  container.getByRole('link', {name: 'View source'});

const exampleKnob = (container: Locator, name: string) =>
  container.getByRole('slider', {name});

const exampleKnobOutput = (container: Locator) => container.getByRole('status');

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
