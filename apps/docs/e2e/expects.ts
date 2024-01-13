import {expect, type Page, type Locator} from '@playwright/test';

const _calculateElementCenter = async (element: Locator) => {
  const bounds = await element.evaluate((el) => el.getBoundingClientRect());
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  return {x, y};
};

type KnobDragAssertionProps = {knob: Locator; valueNow: number; page: Page};
const _knobDragsCorrectly =
  (direction: 'up' | 'down' | 'left' | 'right') =>
  async ({knob, valueNow, page}: KnobDragAssertionProps) => {
    const dragSteps = 10;
    const dragAmplitude = 40.0;

    // It's necessary to hover over the knob and scroll it into view,
    // so then we can calculate its bounds in the viewport properly
    await knob.hover();

    let {x, y} = await _calculateElementCenter(knob);

    x =
      direction === 'right'
        ? x + dragAmplitude
        : direction === 'left'
          ? x - dragAmplitude
          : x;
    y =
      direction === 'down'
        ? y + dragAmplitude
        : direction === 'up'
          ? y - dragAmplitude
          : y;

    await page.mouse.down();
    await page.mouse.move(x, y, {steps: dragSteps});
    await page.mouse.up();

    if (direction === 'up' || direction === 'right') {
      await knobValueIsMoreThan({knob, value: valueNow});
    } else {
      await knobValueIsLessThan({knob, value: valueNow});
    }
  };

export const knobValueTextIs = async ({
  knob,
  knobOutput,
  valueText,
}: {
  knob: Locator;
  knobOutput?: Locator;
  valueText: string;
}) => {
  expect(await knob.getAttribute('aria-valuetext')).toBe(valueText);
  if (knobOutput) {
    await expect(knobOutput).toHaveText(valueText);
  }
};

export const knobValueIsEqualTo = async ({
  knob,
  valueNow,
}: {
  knob: Locator;
  valueNow: number;
}) => {
  expect(await knob.getAttribute('aria-valuenow')).toBe(`${valueNow}`);
};

export const knobValueIsLessThan = async ({
  knob,
  value,
}: {
  knob: Locator;
  value: number;
}) => {
  expect(Number(await knob.getAttribute('aria-valuenow'))).toBeLessThan(value);
};

export const knobValueIsMoreThan = async ({
  knob,
  value,
}: {
  knob: Locator;
  value: number;
}) => {
  expect(Number(await knob.getAttribute('aria-valuenow'))).toBeGreaterThan(
    value,
  );
};

export const knobDragsDownCorrectly = async (props: KnobDragAssertionProps) =>
  _knobDragsCorrectly('down')(props);

export const knobDragsUpCorrectly = async (props: KnobDragAssertionProps) =>
  _knobDragsCorrectly('up')(props);

export const knobDragsLeftCorrectly = async (props: KnobDragAssertionProps) =>
  _knobDragsCorrectly('left')(props);

export const knobDragsRightCorrectly = async (props: KnobDragAssertionProps) =>
  _knobDragsCorrectly('right')(props);

export const sourceCodeLinkIsValid = async ({
  link,
  page,
  filePath,
}: {
  link: Locator;
  page: Page;
  filePath: string;
}) => {
  const url = `https://github.com/satelllte/react-knob-headless/blob/main/${filePath}`;
  await expect(link).toHaveAttribute('href', url);
  await link.click();

  const githubPage = await page.waitForEvent('popup');
  await expect(githubPage).toHaveURL(url);
  await expect(githubPage).toHaveTitle(
    `react-knob-headless/${filePath} at main · satelllte/react-knob-headless · GitHub`,
  );
};

export const expects = {
  knobValueTextIs,
  knobValueIsEqualTo,
  knobValueIsLessThan,
  knobValueIsMoreThan,
  knobDragsDownCorrectly,
  knobDragsUpCorrectly,
  knobDragsLeftCorrectly,
  knobDragsRightCorrectly,
  sourceCodeLinkIsValid,
} as const;
