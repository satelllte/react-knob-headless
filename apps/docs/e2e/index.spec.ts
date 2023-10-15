import {test, expect, type Locator, type Page} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('has correct page title', async ({page}) => {
  await expect(page).toHaveTitle('React Knob Headless');
});

test('has correct GitHub repository link', async ({page}) => {
  const link = page.getByRole('link', {
    name: 'GitHub repository satelllte/react-knob-headless',
  });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute(
    'href',
    'https://github.com/satelllte/react-knob-headless',
  );
  await link.click();

  const githubPage = await page.waitForEvent('popup');
  await expect(githubPage).toHaveTitle(
    'GitHub - satelllte/react-knob-headless: 🎛️ Unstyled & accessible knob primitive for React.',
  );
});

test('has decorative knobs behaving correctly', async ({page}) => {
  const knobStone = page.getByRole('slider', {
    name: "Decorative knob with 'stone' theme",
  });
  const knobPink = page.getByRole('slider', {
    name: "Decorative knob with 'pink' theme",
  });
  const knobGreen = page.getByRole('slider', {
    name: "Decorative knob with 'green' theme",
  });
  const knobSky = page.getByRole('slider', {
    name: "Decorative knob with 'sky' theme",
  });

  await expectKnobValueEqual(knobStone, {valueNow: 0});
  await expectKnobValueText(knobStone, {valueText: '0 units'});
  await expectKnobDraggingUp(knobStone, {valueNow: 0, page});

  await expectKnobValueEqual(knobPink, {valueNow: 40});
  await expectKnobValueText(knobPink, {valueText: '40 units'});
  await expectKnobDraggingDown(knobPink, {valueNow: 40, page});

  await expectKnobValueEqual(knobGreen, {valueNow: 80});
  await expectKnobValueText(knobGreen, {valueText: '80 units'});
  await expectKnobDraggingUp(knobGreen, {valueNow: 80, page});

  await expectKnobValueEqual(knobSky, {valueNow: 100});
  await expectKnobValueText(knobSky, {valueText: '100 units'});
  await expectKnobDraggingDown(knobSky, {valueNow: 100, page});
});

test.describe('"Simple linear knob" example', () => {
  let heading: Locator;
  let container: Locator;

  test.beforeEach(async ({page}) => {
    heading = page.getByRole('heading', {name: 'Simple linear knob'});
    container = heading.locator('..');
  });

  test('has correct title', async () => {
    await expect(heading).toBeVisible();
  });

  test('has "View source" link leading to "KnobPercentage.tsx" source code file', async ({
    page,
  }) => {
    const link = container.getByRole('link', {name: 'View source'});
    await expect(link).toHaveAttribute(
      'href',
      'https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobPercentage.tsx',
    );
    await link.click();

    const githubPage = await page.waitForEvent('popup');
    const githubHeading = githubPage.getByRole('heading', {
      name: 'KnobPercentage.tsx',
    });
    await expect(githubHeading).toBeVisible();
  });

  test('has "Dry/Wet" knob behaving correctly', async ({page}) => {
    const knob = container.getByRole('slider', {name: 'Dry/Wet'});
    const knobOutput = container.getByRole('status');
    await expectKnobValueEqual(knob, {valueNow: 50});
    await expectKnobValueText(knob, {knobOutput, valueText: '50%'});
    await expectKnobDraggingDown(knob, {valueNow: 50, page});
    await expectKnobDraggingUp(knob, {valueNow: 50, page, multiplier: 2});
  });
});

test.describe('"Interpolated knob" example', () => {
  let heading: Locator;
  let container: Locator;

  test.beforeEach(async ({page}) => {
    heading = page.getByRole('heading', {name: 'Interpolated knob'});
    container = heading.locator('..');
  });

  test('has correct title', async () => {
    await expect(heading).toBeVisible();
  });

  test('has "View source" link leading to "KnobFrequency.tsx" source code file', async ({
    page,
  }) => {
    const link = container.getByRole('link', {name: 'View source'});
    await expect(link).toHaveAttribute(
      'href',
      'https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobFrequency.tsx',
    );
    await link.click();

    const githubPage = await page.waitForEvent('popup');
    const githubHeading = githubPage.getByRole('heading', {
      name: 'KnobFrequency.tsx',
    });
    await expect(githubHeading).toBeVisible();
  });

  test('has "Frequency" knob behaving correctly', async ({page}) => {
    const knob = container.getByRole('slider', {name: 'Frequency'});
    const knobOutput = container.getByRole('status');
    await expectKnobValueEqual(knob, {valueNow: 440});
    await expectKnobValueText(knob, {knobOutput, valueText: '440 Hz'});
    await expectKnobDraggingDown(knob, {valueNow: 440, page});
    await expectKnobDraggingUp(knob, {valueNow: 440, page, multiplier: 2});
  });
});

/**
 * ----------------
 * ASSERTIONS
 * ----------------
 */
const expectKnobValueText = async (
  knob: Locator,
  {knobOutput, valueText}: {knobOutput?: Locator; valueText: string},
) => {
  expect(await knob.getAttribute('aria-valuetext')).toBe(valueText);
  if (knobOutput) {
    await expect(knobOutput).toHaveText(valueText);
  }
};

const expectKnobValueEqual = async (
  knob: Locator,
  {valueNow}: {valueNow: number},
) => {
  expect(await knob.getAttribute('aria-valuenow')).toBe(`${valueNow}`);
};

const expectKnobValueLessThan = async (
  knob: Locator,
  {value}: {value: number},
) => {
  expect(Number(await knob.getAttribute('aria-valuenow'))).toBeLessThan(value);
};

const expectKnobValueMoreThan = async (
  knob: Locator,
  {value}: {value: number},
) => {
  expect(Number(await knob.getAttribute('aria-valuenow'))).toBeGreaterThan(
    value,
  );
};

const dragSteps = 10;
const dragAmplitude = 100;

const expectKnobDraggingUp = async (
  knob: Locator,
  {
    valueNow,
    page,
    multiplier = 1,
  }: {
    valueNow: number;
    page: Page;
    multiplier?: number;
  },
) => {
  const {x, y} = await knob.evaluate((element) =>
    element.getBoundingClientRect(),
  );
  await page.mouse.move(x, y);
  await knob.hover();
  await page.mouse.down();
  await page.mouse.move(x, y - dragAmplitude * multiplier, {steps: dragSteps});
  await page.mouse.up();
  await expectKnobValueMoreThan(knob, {value: valueNow});
};

const expectKnobDraggingDown = async (
  knob: Locator,
  {
    valueNow,
    page,
    multiplier = 1,
  }: {
    valueNow: number;
    page: Page;
    multiplier?: number;
  },
) => {
  const {x, y} = await knob.evaluate((element) =>
    element.getBoundingClientRect(),
  );
  await page.mouse.move(x, y);
  await knob.hover();
  await page.mouse.down();
  await page.mouse.move(x, y + dragAmplitude * multiplier, {steps: dragSteps});
  await page.mouse.up();
  await expectKnobValueLessThan(knob, {value: valueNow});
};
