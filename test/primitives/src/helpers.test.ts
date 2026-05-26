import { describe, expect, it } from 'vitest';
import { cl, clx, cx, sx } from '@suis-ui/primitives';

describe('style helpers', () => {
  it('joins truthy class names', () => {
    expect(cx('base', false, undefined, 'active')).toBe('base active');
  });

  it('converts class maps to class names', () => {
    expect(cl({ base: true, active: false, selected: true })).toBe('base selected');
  });

  it('accepts strings and objects in clx', () => {
    expect(clx('base', { active: true, disabled: false }, null, 'selected')).toBe('base active  selected');
  });

  it('serializes style fragments', () => {
    expect(sx('display: flex', { color: 'red', width: '10px' })).toBe(
      'display: flex;\ncolor: red;\nwidth: 10px;'
    );
  });
});
