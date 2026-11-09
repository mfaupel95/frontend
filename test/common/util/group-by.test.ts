import { assert, describe, it } from "vitest";

import { groupBy } from "../../../src/common/util/group-by";

describe("groupBy", () => {
  it("groups items while preserving their order", () => {
    const result = groupBy([1, 2, 3, 4], (item) => String(item % 2));

    assert.deepEqual(result["0"], [2, 4]);
    assert.deepEqual(result["1"], [1, 3]);
  });

  it("returns no groups for an empty list", () => {
    assert.deepEqual(Object.keys(groupBy([], String)), []);
  });

  it.each(["constructor", "toString", "__proto__", "hasOwnProperty"])(
    "treats %s as an own enumerable group key",
    (key) => {
      const first = { key, value: 1 };
      const second = { key, value: 2 };
      const result = groupBy([first, second], (item) => item.key);

      assert.deepEqual(result[key], [first, second]);
      assert.deepEqual(Object.keys(result), [key]);
      assert.isNull(Object.getPrototypeOf(result));
    }
  );
});
