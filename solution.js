class TestCase {
  constructor(b, s) {
    this.b = b;
    this.s = s;
  }
}

const m = new Map();

m.set(1, new TestCase(true, [1, 3, 2]));
m.set(2, new TestCase(false, [1, 3, 2, 1]));
m.set(3, new TestCase(false, [1, 2, 1, 2]));
m.set(4, new TestCase(true, [10, 1, 4, 5]));
m.set(5, new TestCase(false, [10, 1, 5, 4]));
m.set(6, new TestCase(true, [100, -5, 1, 4]));
m.set(7, new TestCase(false, [100, -5, 1, 5, 4]));
m.set(8, new TestCase(false, [2, 2, 3, 4, 5, 5]));
m.set(9, new TestCase(true, [-100, -5, 1, 4]));
m.set(10, new TestCase(true, [-100, -5, 1, 5, 4]));

for (const [k, v] of m.entries()) {
  console.log(`\nTesting ${k} [${v.s.join(", ")}]`);
  const b = almostIncreasingSequence(v.s);
  console.log(
    `**Results ${b !== v.b ? "FAILED" : "success"} (Actual: ${b}, Expected ${
      v.b
    }), [${v.s.join(", ")}]**\n`
  );
}

function almostIncreasingSequence(s) {
  let inSequence = false;
  let shifted = 0;

  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] >= s[i + 1]) {
      console.log(`Shifting ${s[i]} <-> ${s[i + 1]}]`);
      const tmp = s[i];
      s[i] = s[i + 1];
      s[i + 1] = tmp;
      if (inSequence === false) {
        shifted++;
        inSequence = true;
      }
      // Due to the recent shift above, we need to make sure the next number isn't larger than our previous.
      if (i !== 0 && s[i - 1] >= s[i]) {
        shifted++;
      }
    } else {
      console.log(`Resetting sequence at position ${i}`);
      inSequence = false;
    }
    console.log(`After ${i} - [${s.join(", ")}]`);
  }

  // We had to shift more than two numbers
  return shifted < 2;
}
