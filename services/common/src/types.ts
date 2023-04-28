export type ReplaceWith<T, P extends keyof RemoveIndex<T>, R> = {
  [K in keyof T]: K extends P ? R : T[K];
};

export type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

export type SubstituteType<T, A, B> = T extends A ? B : T extends object ? {[K in keyof T]: SubstituteType<T[K], A, B>} : T;

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};
