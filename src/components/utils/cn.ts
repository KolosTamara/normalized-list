import {withNaming} from '@bem-react/classname';

export type CnMods = Record<string, string | boolean | undefined>;

/** Package CSS/BEM namespace. Keep in sync with `$ns` in `variables.scss`. */
export const NAMESPACE = 'g-ts-';

export const cn = withNaming({e: '__', m: '_'});
export const block = withNaming({n: NAMESPACE, e: '__', m: '_'});

export type CnBlock = ReturnType<typeof cn>;

/**
 * Extracts modifiers part from className
 */
export function modsClassName(className: string) {
    return className.split(/\s(.*)/)[1];
}
