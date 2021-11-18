import { warn } from "vue";
import { isObject } from "@vue/shared";
import fromPairs from "lodash/fromPairs";
import type { ExtractPropTypes, PropType } from "@vue/runtime-core";

// eslint-disable-next-line
const wrapperKey = Symbol();
export type PropWrapper<T> = { [wrapperKey]: T };

// eslint-disable-next-line
export const propKey = Symbol();

type ResolveProp<T> = ExtractPropTypes<{
  key: { type: T; required: true };
}>["key"];
type ResolvePropType<T> = ResolveProp<T> extends { type: infer V }
  ? V
  : ResolveProp<T>;
type ResolvePropTypeWithReadonly<T> = Readonly<T> extends Readonly<
  Array<infer A>
>
  ? ResolvePropType<A[]>
  : ResolvePropType<T>;

type IfUnknown<T, V> = [unknown] extends [T] ? V : T;

type _BuildPropType<T, V, C> =
  | (T extends PropWrapper<unknown>
      ? T[typeof wrapperKey]
      : [V] extends [never]
      ? ResolvePropTypeWithReadonly<T>
      : never)
  | V
  | C;
export type BuildPropType<T, V, C> = _BuildPropType<
  IfUnknown<T, never>,
  IfUnknown<V, never>,
  IfUnknown<C, never>
>;

export type BuildPropOption<T, R, V, C, D extends BuildPropType<T, V, C>> = {
  type?: T;
  values?: readonly V[];
  required?: R;
  default?: R extends true
    ? never
    : D extends Record<string, unknown> | Array<any>
    ? () => D
    : (() => D) | D;
  validator?: ((val: any) => val is C) | ((val: any) => boolean);
};

type _BuildPropDefault<T, D> = [T] extends [
  // eslint-disable-next-line @typescript-eslint/ban-types
  Record<string, unknown> | Array<any> | Function
]
  ? D
  : D extends () => T
  ? ReturnType<D>
  : D;

export type BuildPropDefault<T, D, R> = R extends true
  ? { readonly default?: undefined }
  : {
      readonly default: Exclude<D, undefined> extends never
        ? undefined
        : Exclude<_BuildPropDefault<T, D>, undefined>;
    };
export type BuildPropReturn<T, R, V, C, D> = {
  readonly type: PropType<BuildPropType<T, V, C>>;
  readonly required: IfUnknown<R, false>;
  readonly validator: ((val: unknown) => boolean) | undefined;
  [propKey]: true;
} & BuildPropDefault<
  BuildPropType<T, V, C>,
  IfUnknown<D, never>,
  IfUnknown<R, false>
>;

/**
 * @description Build prop. It can better optimize prop types
 * @description 生成 prop，能更好地优化类型
 * @example
  // limited options
  // the type will be PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // limited options and other types
  // the type will be PropType<'small' | 'medium' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'medium'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
  @link see more: https://github.com/element-plus/element-plus/pull/3341
 */
export function buildProp<
  T = never,
  R extends boolean = false,
  V = never,
  C = never,
  D extends BuildPropType<T, V, C> = never
>(
  option: BuildPropOption<T, R, V, C, D>,
  key?: string
): BuildPropReturn<T, R, V, C, D> {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(option) || !!(option as any)[propKey]) return option as any;

  const { values, required, default: defaultValue, type, validator } = option;

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false;
          let allowedValues: unknown[] = [];

          if (values) {
            allowedValues = [...values, defaultValue];
            valid ||= allowedValues.includes(val);
          }
          if (validator) valid ||= validator(val);

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(", ");
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ""
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            );
          }
          return valid;
        }
      : undefined;

  return {
    type:
      typeof type === "object" &&
      Object.getOwnPropertySymbols(type).includes(wrapperKey)
        ? (type as any)[wrapperKey]
        : type,
    required: !!required,
    default: defaultValue,
    validator: _validator,
    [propKey]: true,
  } as unknown as BuildPropReturn<T, R, V, C, D>;
}

type NativePropType = [
  ((...args: any) => any) | { new (...args: any): any } | undefined | null
];

export const buildProps = <
  O extends {
    [K in keyof O]: O[K] extends BuildPropReturn<any, any, any, any, any>
      ? O[K]
      : [O[K]] extends NativePropType
      ? O[K]
      : O[K] extends BuildPropOption<
          infer T,
          infer R,
          infer V,
          infer C,
          infer D
        >
      ? D extends BuildPropType<T, V, C>
        ? BuildPropOption<T, R, V, C, D>
        : never
      : never;
  }
>(
  props: O
) =>
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as unknown as {
    [K in keyof O]: O[K] extends { [propKey]: boolean }
      ? O[K]
      : [O[K]] extends NativePropType
      ? O[K]
      : O[K] extends BuildPropOption<
          infer T,
          infer R,
          infer V,
          infer C,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          infer _D
        >
      ? BuildPropReturn<T, R, V, C, O[K]["default"]>
      : never;
  };
