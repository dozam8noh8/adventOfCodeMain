import { day4 } from "./day4/day4part1";
import { day4pt2 } from "./day4/day4part2";
import { day5 } from "./day5/day5part1";
import { day5pt2 } from "./day5/day5part2";
import { day6part1 } from "./day6/day6part1";
import { day7part1 } from "./day7/day7part1";
import { day7part2 } from "./day7/day7part2";
import { day8part1 } from "./day8/day8part1";
import { day8part2 } from "./day8/day8part2";

/**
 * Some predefined delay values (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

// Below are examples of using ESLint errors suppression
// Here it is suppressing a missing return type definition for the greeter function.

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function greeter(name: string) {
  return await delayedHello(name, Delays.Long);
}

//day4();
//day4pt2();
//day5();
//day5pt2();
//day6part1();
//day7part1();
//day7part2();
//day8part1();
day8part2();