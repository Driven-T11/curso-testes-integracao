import calculator from "calculator";

describe("Calculator tests", () => {
  it("should sum two numbers", () => {
    expect(calculator.sum(2, 2)).toBe(4);
  });
  it("should subtract two numbers", () => {
    expect(calculator.sub(2, 2)).toBe(0);
  });
  it("should multiply two numbers", () => {
    expect(calculator.mul(2, 2)).toBe(4);
  });
  it("should divide two numbers", () => {
    expect(calculator.div(2, 2)).toBe(1);
    expect(calculator.div(5,5)).toBe(1)
  });
});