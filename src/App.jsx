/** @format */

import { create, all } from "mathjs";
import { useState } from "react";
import "./App.css";

function App() {
	const math = create(all, {});
	const [expression, setExpression] = useState("");
	const [decimalCtr, setDecimalCtr] = useState(0);
	const [result, setResult] = useState("");

	// A function that displays the input on the screen
	const display = (input) => {
		switch (input) {
			case ".": {
				if (result !== "") {
					setExpression(result);
					setResult("");
				}

				if (expression.length === 0) {
					setExpression((previous) => previous + "0" + input);
					setDecimalCtr((previous) => previous + 1);
				} else if (decimalCtr === 0) {
					setDecimalCtr((previous) => previous + 1);
					setExpression((previous) => previous + input);
				}

				break;
			}
			case "+": {
				if (decimalCtr !== 0) {
					setDecimalCtr(0);
				}

				if (result !== "") {
					setExpression(result);
					setResult("");
				}

				if (
					/[\-\/\*]/.test(expression[expression.length - 2]) &&
					/[\-\/\*]/.test(expression[expression.length - 1])
				) {
					const newExpression = expression.slice(
						0,
						expression.length - 2
					);
					setExpression(newExpression + input);
				} else if (/[\-\/\*]/.test(expression[expression.length - 1])) {
					const newExpression = expression.slice(
						0,
						expression.length - 1
					);
					setExpression(newExpression + input);
				} else if (expression[expression.length - 1] === "+") {
					return;
				} else if (expression[expression.length - 1] === "-") {
					return;
				} else {
					setExpression((previous) => previous + input);
				}
				break;
			}
			case "-": {
				if (decimalCtr !== 0) {
					setDecimalCtr(0);
				}

				if (result !== "") {
					setExpression(result);
					setResult("");
				}

				if (/[\-\+]/.test(expression[expression.length - 1])) {
					const newExpression = expression.slice(
						0,
						expression.length - 1
					);
					setExpression(newExpression + input);
				} else if (expression[expression.length - 1] === "-") {
					return;
				} else {
					setExpression((previous) => previous + input);
				}
				break;
			}
			case "*": {
				if (decimalCtr !== 0) {
					setDecimalCtr(0);
				}

				if (result !== "") {
					setExpression(result);
					setResult("");
				}

				if (
					/[\-\+\/]/.test(expression[expression.length - 1]) &&
					/[^\*]/.test(expression[expression.length - 2])
				) {
					const newExpression = expression.slice(
						0,
						expression.length - 1
					);
					setExpression(newExpression + input);
				} else if (expression[expression.length - 1] === "-") {
					return;
				} else if (expression[expression.length - 1] === "*") {
					return;
				} else {
					setExpression((previous) => previous + input);
				}

				break;
			}
			case "/": {
				if (decimalCtr !== 0) {
					setDecimalCtr(0);
				}

				if (result !== "") {
					setExpression(result);
					setResult("");
				}

				if (/[\+\*]/.test(expression[expression.length - 1])) {
					const newExpression = expression.slice(
						0,
						expression.length - 1
					);
					setExpression(newExpression + input);
				} else if (expression[expression.length - 1] === "/") {
					return;
				} else if (expression[expression.length - 1] === "-") {
					return;
				} else {
					setExpression((previous) => previous + input);
				}
				break;
			}
			case "0": {
				if (input === "0" && expression.length < 1) {
					return;
				} else if (
					/[\+\*\-\/]/.test(expression[expression.length - 2])
				) {
					return;
				} else {
					setExpression((previous) => previous + input);
				}
				break;
			}
			default: {
				setExpression((previous) => previous + input);
			}
		}
	};

	const allClear = () => {
		setExpression("");
		setResult("");
		setDecimalCtr(0);
	};

	const evaluate = () => {
		setExpression(math.evaluate(expression));
		setResult(math.evaluate(expression));
	};

	return (
		<div className="App flex align-middle h-screen font-mono bg-[url('./assets/vaporwave.jpg')] bg-cover bg-center">
			<div className="my-auto mx-auto border-4 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc] bg-[#dcd5d5] shadow-[5px_5px_5px_black] w-96 p-1">
				<div className="bg-gradient-to-r from-[#66a1d2] to-[#b252a1] p-1 font-mono text-lg font-bold text-gray-50">
					freeCodeCamp: JavaScript Calculator
				</div>
				<div
					id="display"
					className="col-span-4 text-right text-3xl font-semibold  h-9 pr-1"
				>
					{expression ? expression : result ? result : "0"}
				</div>
				<div className="grid grid-cols-4 h-80">
					<button
						id="clear"
						className="rounded-none border border-stone-400 col-span-2 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={allClear}
					>
						AC
					</button>
					<button
						id="divide"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("/")}
					>
						/
					</button>
					<button
						id="multiply"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("*")}
					>
						X
					</button>
					<button
						id="seven"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("7")}
					>
						7
					</button>
					<button
						id="eight"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("8")}
					>
						8
					</button>
					<button
						id="nine"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("9")}
					>
						9
					</button>
					<button
						id="subtract"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("-")}
					>
						-
					</button>
					<button
						id="four"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("4")}
					>
						4
					</button>
					<button
						id="five"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("5")}
					>
						5
					</button>
					<button
						id="six"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("6")}
					>
						6
					</button>
					<button
						id="add"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("+")}
					>
						+
					</button>
					<button
						id="one"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("1")}
					>
						1
					</button>
					<button
						id="two"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("2")}
					>
						2
					</button>
					<button
						id="three"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("3")}
					>
						3
					</button>
					<button
						id="equals"
						className="rounded-none border border-stone-400 row-span-2 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => evaluate()}
					>
						=
					</button>
					<button
						id="zero"
						className="rounded-none border border-stone-400 col-span-2 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display("0")}
					>
						0
					</button>
					<button
						id="decimal"
						className="rounded-none border border-stone-400 text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400"
						onClick={() => display(".")}
					>
						.
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
