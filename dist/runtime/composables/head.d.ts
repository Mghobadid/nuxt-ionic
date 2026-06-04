import type { ActiveHeadEntry, UseHeadInput, UseHeadOptions } from '@unhead/vue/types';
export declare function useHead<T extends Record<string, any>>(obj: UseHeadInput<T>, _?: UseHeadOptions): Omit<ActiveHeadEntry<UseHeadInput<Deprecated>>, "_poll">;
