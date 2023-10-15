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

  await expectKnobValue(knobStone, {valueNow: '0', valueText: '0 units'});
  await expectKnobValue(knobPink, {valueNow: '40', valueText: '40 units'});
  await expectKnobValue(knobGreen, {valueNow: '80', valueText: '80 units'});
  await expectKnobValue(knobSky, {valueNow: '100', valueText: '100 units'});

  await expectKnobDragging(knobStone, {
    valueNowMax: '100',
    valueTextMax: '100 units',
    valueNowMin: '0',
    valueTextMin: '0 units',
    page,
  });
  await expectKnobDragging(knobPink, {
    valueNowMax: '100',
    valueTextMax: '100 units',
    valueNowMin: '0',
    valueTextMin: '0 units',
    page,
  });
  await expectKnobDragging(knobGreen, {
    valueNowMax: '100',
    valueTextMax: '100 units',
    valueNowMin: '0',
    valueTextMin: '0 units',
    page,
  });
  await expectKnobDragging(knobSky, {
    valueNowMax: '100',
    valueTextMax: '100 units',
    valueNowMin: '0',
    valueTextMin: '0 units',
    page,
  });
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
    await expectKnobValue(knob, {knobOutput, valueNow: '50', valueText: '50%'});
    await expectKnobDragging(knob, {
      knobOutput,
      valueNowMax: '100',
      valueTextMax: '100%',
      valueNowMin: '0',
      valueTextMin: '0%',
      page,
    });
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
    await expectKnobValue(knob, {
      knobOutput,
      valueNow: '440',
      valueText: '440 Hz',
    });
    await expectKnobDragging(knob, {
      knobOutput,
      valueNowMax: '20000',
      valueTextMax: '20.0 kHz',
      valueNowMin: '20',
      valueTextMin: '20.0 Hz',
      page,
    });
  });
});

/**
 * ----------------
 * ASSERTIONS
 * ----------------
 */
const expectKnobValue = async (
  knob: Locator,
  {
    knobOutput,
    valueNow,
    valueText,
  }: {knobOutput?: Locator; valueNow: string; valueText: string},
) => {
  expect(await knob.getAttribute('aria-valuenow')).toBe(valueNow);
  expect(await knob.getAttribute('aria-valuetext')).toBe(valueText);
  if (knobOutput) {
    await expect(knobOutput).toHaveText(valueText);
  }
};

const expectKnobDragging = async (
  knob: Locator,
  {
    knobOutput,
    valueNowMin,
    valueNowMax,
    valueTextMin,
    valueTextMax,
    page,
  }: {
    knobOutput?: Locator;
    valueNowMin: string;
    valueNowMax: string;
    valueTextMin: string;
    valueTextMax: string;
    page: Page;
  },
) => {
  const steps = 50;
  const amplitude = 1000;

  const {x, y} = await knob.evaluate((element) =>
    element.getBoundingClientRect(),
  );

  // Dragging down
  await knob.hover();
  await page.mouse.down();
  await page.mouse.move(x, y + amplitude, {steps});
  await page.mouse.up();
  await expectKnobValue(knob, {
    knobOutput,
    valueNow: valueNowMin,
    valueText: valueTextMin,
  });

  // Dragging up
  await knob.hover();
  await page.mouse.down();
  await page.mouse.move(x, y - amplitude * 2, {steps});
  await page.mouse.up();
  await expectKnobValue(knob, {
    knobOutput,
    valueNow: valueNowMax,
    valueText: valueTextMax,
  });
};
