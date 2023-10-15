import {test, expect, type Locator} from '@playwright/test';
import {locators} from './locators';
import {expects} from './expects';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test.describe('Page title', () => {
  test('is correct', async ({page}) => {
    await expect(page).toHaveTitle('React Knob Headless');
  });
});

test.describe('Repository link', () => {
  test('has correct reference', async ({page}) => {
    const repositoryLink = locators.repositoryLink(page);
    await expect(repositoryLink).toBeVisible();
    await expect(repositoryLink).toHaveAttribute(
      'href',
      'https://github.com/satelllte/react-knob-headless',
    );
  });

  test('opens GitHub repository page', async ({page}) => {
    const repositoryLink = locators.repositoryLink(page);
    await repositoryLink.click();

    const repositoryPage = await page.waitForEvent('popup');
    await expect(repositoryPage).toHaveTitle(
      'GitHub - satelllte/react-knob-headless: 🎛️ Unstyled & accessible knob primitive for React.',
    );
  });
});

test.describe('Decorative knobs', () => {
  test('have correct default values and drag behaviour', async ({page}) => {
    const knobStone = locators.decorativeKnobStone(page);
    const knobPink = locators.decorativeKnobPink(page);
    const knobGreen = locators.decorativeKnobGreen(page);
    const knobSky = locators.decorativeKnobSky(page);

    await expects.knobValueIsEqualTo(knobStone, {valueNow: 0});
    await expects.knobValueTextIs(knobStone, {valueText: '0 units'});
    await expects.knobDragsUpCorrectly(knobStone, {valueNow: 0, page});

    await expects.knobValueIsEqualTo(knobPink, {valueNow: 40});
    await expects.knobValueTextIs(knobPink, {valueText: '40 units'});
    await expects.knobDragsDownCorrectly(knobPink, {valueNow: 40, page});

    await expects.knobValueIsEqualTo(knobGreen, {valueNow: 80});
    await expects.knobValueTextIs(knobGreen, {valueText: '80 units'});
    await expects.knobDragsUpCorrectly(knobGreen, {valueNow: 80, page});

    await expects.knobValueIsEqualTo(knobSky, {valueNow: 100});
    await expects.knobValueTextIs(knobSky, {valueText: '100 units'});
    await expects.knobDragsDownCorrectly(knobSky, {valueNow: 100, page});
  });
});

test.describe('"Simple linear knob" example', () => {
  let container: Locator;

  test.beforeEach(({page}) => {
    container = locators.exampleContainer(page, 'Simple linear knob');
  });

  test('has "View source" link leading to "KnobPercentage.tsx" source code file', async ({
    page,
  }) => {
    const viewSourceLink = locators.exampleViewSourceLink(container);
    await expect(viewSourceLink).toHaveAttribute(
      'href',
      'https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobPercentage.tsx',
    );
    await viewSourceLink.click();

    const githubPage = await page.waitForEvent('popup');
    // eslint-disable-next-line no-warning-comments
    // TODO: Came up with a better way to assert that the correct file is opened
    const githubHeading = githubPage.getByRole('heading', {
      name: 'KnobPercentage.tsx',
    });
    await expect(githubHeading).toBeVisible();
  });

  test.describe('"Dry/Wet" knob', () => {
    let knob: Locator;

    test.beforeEach(() => {
      knob = locators.exampleKnob(container, 'Dry/Wet');
    });

    test('has correct default value', async () => {
      const knobOutput = locators.exampleKnobOutput(container);
      await expects.knobValueIsEqualTo(knob, {valueNow: 50});
      await expects.knobValueTextIs(knob, {knobOutput, valueText: '50%'});
    });

    test('has correct drag down behaviour', async ({page}) => {
      await expects.knobDragsDownCorrectly(knob, {valueNow: 50, page});
    });

    test('has correct drag up behaviour', async ({page}) => {
      await expects.knobDragsUpCorrectly(knob, {valueNow: 50, page});
    });
  });
});

test.describe('"Interpolated knob" example', () => {
  let container: Locator;

  test.beforeEach(({page}) => {
    container = locators.exampleContainer(page, 'Interpolated knob');
  });

  test('has "View source" link leading to "KnobFrequency.tsx" source code file', async ({
    page,
  }) => {
    const viewSourceLink = locators.exampleViewSourceLink(container);
    await expect(viewSourceLink).toHaveAttribute(
      'href',
      'https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobFrequency.tsx',
    );
    await viewSourceLink.click();

    const githubPage = await page.waitForEvent('popup');
    // eslint-disable-next-line no-warning-comments
    // TODO: Came up with a better way to assert that the correct file is opened
    const githubHeading = githubPage.getByRole('heading', {
      name: 'KnobFrequency.tsx',
    });
    await expect(githubHeading).toBeVisible();
  });

  test.describe('"Frequency" knob', () => {
    let knob: Locator;

    test.beforeEach(() => {
      knob = locators.exampleKnob(container, 'Frequency');
    });

    test('has correct default value', async () => {
      const knobOutput = locators.exampleKnobOutput(container);
      await expects.knobValueIsEqualTo(knob, {valueNow: 440});
      await expects.knobValueTextIs(knob, {knobOutput, valueText: '440 Hz'});
    });

    test('has correct drag down behaviour', async ({page}) => {
      await expects.knobDragsDownCorrectly(knob, {valueNow: 440, page});
    });

    test('has correct drag up behaviour', async ({page}) => {
      await expects.knobDragsUpCorrectly(knob, {valueNow: 440, page});
    });
  });
});
