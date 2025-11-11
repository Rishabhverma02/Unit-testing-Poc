import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/app/page";

// utility function for testing --- to run tests. Command is  "npm run test"

function sum(a: number, b: number) {
    return a + b;
}

/*
   These functions are used to set up and tear down tests.

   beforeAll: Runs once before all tests in a describe block.
   afterAll: Runs once after all tests in a describe block.
   beforeEach: Runs before each test in a describe block.
   afterEach: Runs after each test in a describe block.
*/

beforeAll(() => {
    console.log("This is before all tests");
});

afterAll(() => {
    console.log("This is after all tests");
});

beforeEach(() => {
    console.log("This is before each test");
}); 
afterEach(() => {
    console.log("This is after each test");
});

/* 
  So here first we see the structure of our test case.
  test() this is a function which takes two arguments.
  The first argument is a string which describes what we are testing.
  The second argument is a callback function where we write our actual test code.
 */

test("add 2+3 should be equal to 5", () => {
/* expect( ) returns an "expectation" object and .toBe() is a matcher that checks for exact equality. */
    expect(sum(2, 3)).toBe(5);
/* For negative test case we can use .not for opposite of matcher */
    expect(sum(7, 3)).not.toBe(5);
});

/*
  toBe uses Object.is to test exact equality. If you want to check the value of an object, use .toEqual() instead.
  toEqual recursively checks every field of an object or array.
*/

test("object assignment", () => { 
    const data: Record<string, number> = { one: 1 };
    data["two"] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
});

/*
  In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.

   toBeNull       matches only null
   toBeUndefined  matches only undefined
   toBeDefined    is the opposite of toBeUndefined
   toBeTruthy     matches anything that an if statement treats as true
   toBeFalsy      matches anything that an if statement treats as false
   
   String matchers:
   toMatch(regex)     matches a string against a regular expression
   toContain(string)  matches a string that contains the expected substring

   Number matchers:
   toBeGreaterThan(number)         matches anything greater than the provided number
   toBeLessThan(number)            matches anything less than the provided number
   toBeGreaterThanOrEqual(number)  matches anything greater than or equal to the provided number
   toBeLessThanOrEqual(number)     matches anything less than or equal to the provided number

*/

test("There is a 'anshu' in Sudhanshu", () => { 
    expect("Sudhanshu").toMatch(/anshu/);
});


const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});


// Example of testing a async function

async function getResponse() {
    return new Promise<{value: string}>((resolve) => {
        setTimeout(() => {
            resolve({value:"hello test"});
        }, 100);
    });
}

// To organize tests we can use describe() block

describe("Combine promise tests", () => {
    test("async function returns Hello test", async () => {
        const response = await getResponse();
        expect(response).toEqual({ value: "hello test" });
    });

    test("async function returns abcd", async () => {
        const response = await getResponse();
        expect(response).not.toEqual({ value: "abcd" });
    });

});

/* Along with this we have 4 more functions beforeAll, afterAll, beforeEach, afterEach.*/

describe("Testing Home component", () => {

    beforeEach(() => {
        render(<Home />);
    });

   it("renders a heading", () => {
        const text = screen.getByText(/Home/i);
       expect(text).toBeInTheDocument();
   });
    
   it("renders a heading inside h1", () => {
       const text = screen.getByRole("heading", { level: 1 });
       expect(text).toBeInTheDocument();
   });
   it("test the description", () => {
       const text = screen.getByTestId("desc");
       expect(text.textContent).toMatch(/description/);
   });
});