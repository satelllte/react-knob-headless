import {expect, type Page, type Locator} from '@playwright/test';

const _dragSteps = 10;
const _dragAmplitude = 20.0;

const _calculateElementCenter = async (element: Locator) => {
  const bounds = await element.evaluate((el) => el.getBoundingClientRect());
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  return {x, y};
};

export const knobValueTextIs = async (
  knob: Locator,
  {knobOutput, valueText}: {knobOutput?: Locator; valueText: string},
) => {
  expect(await knob.getAttribute('aria-valuetext')).toBe(valueText);
  if (knobOutput) {
    await expect(knobOutput).toHaveText(valueText);
  }
};

export const knobValueIsEqualTo = async (
  knob: Locator,
  {valueNow}: {valueNow: number},
) => {
  expect(await knob.getAttribute('aria-valuenow')).toBe(`${valueNow}`);
};

export const knobValueIsLessThan = async (
  knob: Locator,
  {value}: {value: number},
) => {
  expect(Number(await knob.getAttribute('aria-valuenow'))).toBeLessThan(value);
};

export const knobValueIsMoreThan = async (
  knob: Locator,
  {value}: {value: number},
) => {
  expect(Number(await knob.getAttribute('aria-valuenow'))).toBeGreaterThan(
    value,
  );
};

export const knobDragsUpCorrectly = async (
  knob: Locator,
  {
    valueNow,
    page,
  }: {
    valueNow: number;
    page: Page;
  },
) => {
  // It's necessary to hover over the knob and scroll it into view,
  // so then we can calculate its bounds in the viewport properly
  await knob.hover();

  const {x, y} = await _calculateElementCenter(knob);

  await page.mouse.down();
  await page.mouse.move(x, y - _dragAmplitude, {steps: _dragSteps});
  await page.mouse.up();
  await knobValueIsMoreThan(knob, {value: valueNow});
};

export const knobDragsDownCorrectly = async (
  knob: Locator,
  {
    valueNow,
    page,
  }: {
    valueNow: number;
    page: Page;
  },
) => {
  // It's necessary to hover over the knob and scroll it into view,
  // so then we can calculate its bounds in the viewport properly
  await knob.hover();

  const {x, y} = await _calculateElementCenter(knob);

  await page.mouse.down();
  await page.mouse.move(x, y + _dragAmplitude, {steps: _dragSteps});
  await page.mouse.up();
  await knobValueIsLessThan(knob, {value: valueNow});
};

export const expects = {
  knobValueTextIs,
  knobValueIsEqualTo,
  knobValueIsLessThan,
  knobValueIsMoreThan,
  knobDragsUpCorrectly,
  knobDragsDownCorrectly,
} as const;
