/**
 * Allows autocompletion on a string based Unions
 * while still allowing unknown or wildcard strings.
 * Can be adapted to work on number types.
 */
export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & { zz_IGNORE_ME?: never });

/** Common Tag Names */
export type CommonTags = LiteralUnion<
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "strong"
  | "span"
  | "div"
>;

/** Common Tag Attributes  */
export type CommonAttributes = LiteralUnion<"class" | "href" | "src">;

/**
 * Tuple type for pairing tag attributes to certain values
 */
export type AttributePair = [attribute: CommonAttributes, value: any];

export type HTML = string;
