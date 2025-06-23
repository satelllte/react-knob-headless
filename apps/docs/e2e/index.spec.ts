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
    const repositoryLink = locators.repositoryLink({page});
    await expect(repositoryLink).toBeVisible();
    await expect(repositoryLink).toHaveAttribute(
      'href',
      'https://github.com/satelllte/react-knob-headless',
    );
  });

  test('opens GitHub repository page', async ({page}) => {
    const repositoryLink = locators.repositoryLink({page});
    await repositoryLink.click();

    const repositoryPage = await page.waitForEvent('popup');
    await expect(repositoryPage).toHaveTitle(
      'GitHub - satelllte/react-knob-headless: 🎛️ Unstyled & accessible knob primitive for React.',
    );
  });
});

test.describe('Decorative knobs', () => {
  test('have correct default values and drag behaviour', async ({page}) => {
    const knobStone = locators.decorativeKnobStone({page});
    const knobPink = locators.decorativeKnobPink({page});
    const knobGreen = locators.decorativeKnobGreen({page});
    const knobSky = locators.decorativeKnobSky({page});

    await expects.knobValueIsEqualTo({knob: knobStone, valueNow: 0});
    await expects.knobValueTextIs({knob: knobStone, valueText: '0 units'});
    await expects.knobDragsUpCorrectly({knob: knobStone, valueNow: 0, page});

    await expects.knobValueIsEqualTo({knob: knobPink, valueNow: 40});
    await expects.knobValueTextIs({knob: knobPink, valueText: '40 units'});
    await expects.knobDragsDownCorrectly({knob: knobPink, valueNow: 40, page});

    await expects.knobValueIsEqualTo({knob: knobGreen, valueNow: 80});
    await expects.knobValueTextIs({knob: knobGreen, valueText: '80 units'});
    await expects.knobDragsUpCorrectly({knob: knobGreen, valueNow: 80, page});

    await expects.knobValueIsEqualTo({knob: knobSky, valueNow: 100});
    await expects.knobValueTextIs({knob: knobSky, valueText: '100 units'});
    await expects.knobDragsDownCorrectly({knob: knobSky, valueNow: 100, page});
  });
});

test.describe('"Simple linear knob" example', () => {
  let container: Locator;

  test.beforeEach(({page}) => {
    container = locators.exampleContainer({page, name: 'Simple linear knob'});
  });

  test('has "View source" link leading to "KnobPercentage.tsx" source code file', async ({
    page,
  }) => {
    const viewSourceLink = locators.exampleViewSourceLink({container});
    await expects.sourceCodeLinkIsValid({
      link: viewSourceLink,
      page,
      filePath: 'apps/docs/src/components/knobs/KnobPercentage.tsx',
    });
  });

  test.describe('"Dry/Wet" knob', () => {
    let knob: Locator;
    let knobOutput: Locator;

    test.beforeEach(() => {
      knob = locators.exampleKnob({container, name: 'Dry/Wet'});
      knobOutput = locators.exampleKnobOutput({container});
    });

    test('has correct default value', async () => {
      await expects.knobValueIsEqualTo({knob, valueNow: 50});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '50%'});
    });

    test('has correct drag down behaviour', async ({page}) => {
      await expects.knobDragsDownCorrectly({knob, valueNow: 50, page});
    });

    test('has correct drag up behaviour', async ({page}) => {
      await expects.knobDragsUpCorrectly({knob, valueNow: 50, page});
    });

    test('has correct keyboard controls behaviour', async ({page}) => {
      await knob.click();

      await page.keyboard.press('ArrowDown');
      await expects.knobValueIsEqualTo({knob, valueNow: 49});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '49%'});

      await page.keyboard.press('ArrowLeft');
      await expects.knobValueIsEqualTo({knob, valueNow: 48});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '48%'});

      await page.keyboard.press('ArrowUp');
      await expects.knobValueIsEqualTo({knob, valueNow: 49});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '49%'});

      await page.keyboard.press('ArrowRight');
      await expects.knobValueIsEqualTo({knob, valueNow: 50});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '50%'});

      await page.keyboard.press('PageUp');
      await expects.knobValueIsEqualTo({knob, valueNow: 60});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '60%'});

      await page.keyboard.press('PageDown');
      await expects.knobValueIsEqualTo({knob, valueNow: 50});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '50%'});

      await page.keyboard.press('Home');
      await expects.knobValueIsEqualTo({knob, valueNow: 0});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '0%'});

      await page.keyboard.press('End');
      await expects.knobValueIsEqualTo({knob, valueNow: 100});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '100%'});
    });
  });
});

test.describe('"Interpolated knob" example', () => {
  let container: Locator;

  test.beforeEach(({page}) => {
    container = locators.exampleContainer({page, name: 'Interpolated knob'});
  });

  test('has "View source" link leading to "KnobFrequency.tsx" source code file', async ({
    page,
  }) => {
    const viewSourceLink = locators.exampleViewSourceLink({container});
    await expects.sourceCodeLinkIsValid({
      link: viewSourceLink,
      page,
      filePath: 'apps/docs/src/components/knobs/KnobFrequency.tsx',
    });
  });

  test.describe('"Frequency" knob', () => {
    let knob: Locator;
    let knobOutput: Locator;

    test.beforeEach(() => {
      knob = locators.exampleKnob({container, name: 'Frequency'});
      knobOutput = locators.exampleKnobOutput({container});
    });

    test('has correct default value', async () => {
      await expects.knobValueIsEqualTo({knob, valueNow: 440});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '440 Hz'});
    });

    test('has correct drag down behaviour', async ({page}) => {
      await expects.knobDragsDownCorrectly({knob, valueNow: 440, page});
    });

    test('has correct drag up behaviour', async ({page}) => {
      await expects.knobDragsUpCorrectly({knob, valueNow: 440, page});
    });

    test('has correct keyboard controls behaviour', async ({page}) => {
      await knob.click();

      // NOTE: we don't check `knobValueIsEqualTo` because there's no rounding in the frequency knob

      await page.keyboard.press('ArrowDown');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '430 Hz'});

      await page.keyboard.press('ArrowLeft');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '420 Hz'});

      await page.keyboard.press('ArrowUp');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '430 Hz'});

      await page.keyboard.press('ArrowRight');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '440 Hz'});

      await page.keyboard.press('PageUp');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '540 Hz'});

      await page.keyboard.press('PageDown');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '440 Hz'});

      await page.keyboard.press('Home');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '20.0 Hz'});

      await page.keyboard.press('End');
      await expects.knobValueTextIs({knob, knobOutput, valueText: '20.0 kHz'});
    });
  });
});

test.describe('"Horizontal orientation" example', () => {
  let container: Locator;

  test.beforeEach(({page}) => {
    container = locators.exampleContainer({
      page,
      name: 'Horizontal orientation',
    });
  });

  test('has "View source" link leading to "KnobPercentageHorizontal.tsx" source code file', async ({
    page,
  }) => {
    const viewSourceLink = locators.exampleViewSourceLink({container});
    await expects.sourceCodeLinkIsValid({
      link: viewSourceLink,
      page,
      filePath: 'apps/docs/src/components/knobs/KnobPercentageHorizontal.tsx',
    });
  });

  test.describe('"X" knob', () => {
    let knob: Locator;
    let knobOutput: Locator;

    test.beforeEach(() => {
      knob = locators.exampleKnob({container, name: 'X'});
      knobOutput = locators.exampleKnobOutput({container});
    });

    test('has correct default value', async () => {
      await expects.knobValueIsEqualTo({knob, valueNow: 50});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '50%'});
    });

    test('has correct drag left behaviour', async ({page}) => {
      await expects.knobDragsLeftCorrectly({knob, valueNow: 50, page});
    });

    test('has correct drag right behaviour', async ({page}) => {
      await expects.knobDragsRightCorrectly({knob, valueNow: 50, page});
    });
  });
});

test.describe('"Vertical and horizontal orientation" example', () => {
  let container: Locator;

  test.beforeEach(({page}) => {
    container = locators.exampleContainer({
      page,
      name: 'Vertical and horizontal orientation',
    });
  });

  test('has "View source" link leading to "KnobPercentageVerticalHorizontal.tsx" source code file', async ({
    page,
  }) => {
    const viewSourceLink = locators.exampleViewSourceLink({container});
    await expects.sourceCodeLinkIsValid({
      link: viewSourceLink,
      page,
      filePath:
        'apps/docs/src/components/knobs/KnobPercentageVerticalHorizontal.tsx',
    });
  });

  test.describe('"XY" knob', () => {
    let knob: Locator;
    let knobOutput: Locator;

    test.beforeEach(() => {
      knob = locators.exampleKnob({container, name: 'Y+X'});
      knobOutput = locators.exampleKnobOutput({container});
    });

    test('has correct default value', async () => {
      await expects.knobValueIsEqualTo({knob, valueNow: 50});
      await expects.knobValueTextIs({knob, knobOutput, valueText: '50%'});
    });

    test('has correct drag up behaviour', async ({page}) => {
      await expects.knobDragsUpCorrectly({knob, valueNow: 50, page});
    });

    test('has correct drag down behaviour', async ({page}) => {
      await expects.knobDragsDownCorrectly({knob, valueNow: 50, page});
    });

    test('has correct drag left behaviour', async ({page}) => {
      await expects.knobDragsLeftCorrectly({knob, valueNow: 50, page});
    });

    test('has correct drag right behaviour', async ({page}) => {
      await expects.knobDragsRightCorrectly({knob, valueNow: 50, page});
    });
  });
});
