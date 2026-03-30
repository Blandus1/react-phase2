import { useState } from "react";

// ─────────────────────────────────────────────────────────────────
//  BUTTON DEFINITIONS
//
//  Each button is described as an object with:
//    label   → what's displayed on the button
//    type    → used to decide what action to take + which color to apply
//    span    → optional, makes the button fill 2 columns (the "0" key)
//
//  Possible types:
//    "clear"     → AC button, resets everything
//    "negate"    → +/- button, flips positive/negative
//    "percent"   → % button, divides by 100
//    "operator"  → +, -, x, ÷, = (all go in the orange column)
//    "digit"     → 0–9
//    "decimal"   → the dot "." button
// ─────────────────────────────────────────────────────────────────
const BUTTONS = [
  { label: "AC",  type: "clear"    },
  { label: "+/-", type: "negate"   },
  { label: "%",   type: "percent"  },
  { label: "÷",   type: "operator" },

  { label: "7",   type: "digit"    },
  { label: "8",   type: "digit"    },
  { label: "9",   type: "digit"    },
  { label: "x",   type: "operator" },

  { label: "4",   type: "digit"    },
  { label: "5",   type: "digit"    },
  { label: "6",   type: "digit"    },
  { label: "-",   type: "operator" },

  { label: "1",   type: "digit"    },
  { label: "2",   type: "digit"    },
  { label: "3",   type: "digit"    },
  { label: "+",   type: "operator" },

  // "0" spans 2 columns — matches the video layout
  { label: "0",   type: "digit",   span: true },
  { label: ".",   type: "decimal"  },
  { label: "=",   type: "operator" },
];

// ─────────────────────────────────────────────────────────────────
//  HELPER: calculate(a, op, b)
//
//  Performs the arithmetic between two numeric strings.
//  Returns the numeric result, or "Error" for division by zero.
// ─────────────────────────────────────────────────────────────────
function calculate(a, op, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (op) {
    case "+": return numA + numB;
    case "-": return numA - numB;
    case "x": return numA * numB;
    case "÷": return numB === 0 ? "Error" : numA / numB;
    default:  return numB;
  }
}

// ─────────────────────────────────────────────────────────────────
//  HELPER: formatResult(value)
//
//  Cleans up a number so it doesn't overflow the display:
//  - Trims floating-point noise (e.g. 0.1 + 0.2 → 0.3, not 0.30000…)
//  - Limits to 10 significant digits
// ─────────────────────────────────────────────────────────────────
function formatResult(value) {
  if (value === "Error") return "Error";
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return parseFloat(num.toPrecision(10)).toString();
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: CalcButton
//
//  A single calculator button. Receives these props:
//    label   → text shown on the button
//    type    → determines background color
//    span    → if true, the button spans 2 grid columns
//    onClick → function(label, type) passed in from the parent
//
//  Color rules (matching the video exactly):
//    "operator" (÷ x - + =)       → orange
//    "clear" | "negate" | "percent" → light gray, black text
//    "digit" | "decimal"            → medium gray, white text
// ─────────────────────────────────────────────────────────────────
function CalcButton({ label, type, span, onClick }) {
  // Pick background + text color based on the button's type
  const colorClass =
    type === "operator"
      ? "bg-orange-500 text-white"
      : type === "clear" || type === "negate" || type === "percent"
      ? "bg-gray-300 text-black"
      : "bg-gray-400 text-white"; 

  return (
    <button
      onClick={() => onClick(label, type)}   // bubble up label + type to parent
      className={[
        "flex items-center justify-start pl-5", // left-align text like in video
        "text-2xl font-light",
        "h-20",                                 // fixed height for uniform rows
        "transition-colors duration-75",
        "active:brightness-75",                 // quick press feedback
        colorClass,
        span ? "col-span-2" : "",               // 0 fills 2 columns
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MAIN COMPONENT: Calculator
//
//  STATE OVERVIEW:
//    display        → the string currently shown in the gray display bar
//    storedValue    → the first operand, saved when an operator is pressed
//    operator       → the pending operator: "+" | "-" | "x" | "÷"
//    waitingForNext → true right after an operator is pressed;
//                     means the very next digit press will START a new
//                     number instead of appending to the current one
// ─────────────────────────────────────────────────────────────────
export default function Calculator() {
  const [display,        setDisplay]        = useState("0");
  const [storedValue,    setStoredValue]    = useState(null);
  const [operator,       setOperator]       = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  function handleDigit(digit) {
    if (waitingForNext) {
      // Operator was just pressed → start a brand-new number on screen
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      // Normal case: append the digit (guard against leading zero)
      // Also cap length at 12 to prevent display overflow
      setDisplay(prev =>
        prev === "0" ? digit : prev.length < 12 ? prev + digit : prev
      );
    }
  }

  // ── HANDLER: the decimal point "." was pressed ───────────────
  function handleDecimal() {
    if (waitingForNext) {
      // Start fresh decimal number after an operator press
      setDisplay("0.");
      setWaitingForNext(false);
      return;
    }
    // Only allow one decimal point per number
    if (!display.includes(".")) {
      setDisplay(prev => prev + ".");
    }
  }

  // ── HANDLER: an operator (+, -, x, ÷) was pressed ───────────
  function handleOperator(op) {
    if (operator && !waitingForNext) {
      // ── CHAINING BEHAVIOR ────────────────────────────────────
      // Example: user types  2  →  +  →  3  →  ×
      //   Instead of ignoring the pending "+", we compute 2+3=5 first,
      //   display "5", then store "5" as the new first operand for "×".
      // This is exactly the behavior shown in the video.
      const result    = calculate(storedValue, operator, display);
      const formatted = formatResult(result);
      setDisplay(formatted);
      setStoredValue(formatted); // result becomes new first operand
    } else {
      // No pending operation — save the current display as first operand
      setStoredValue(display);
    }

    setOperator(op);         // remember which operator was pressed
    setWaitingForNext(true); // next digit will start a fresh number
  }

  // ── HANDLER: the equals "=" key was pressed ──────────────────
  function handleEquals() {
    // Do nothing if there's no stored operation to complete
    if (!operator || storedValue === null) return;

    const result    = calculate(storedValue, operator, display);
    const formatted = formatResult(result);

    setDisplay(formatted);
    setStoredValue(null);    // reset — no pending operation after "="
    setOperator(null);
    setWaitingForNext(false);
  }

  // ── HANDLER: AC was pressed — reset everything ───────────────
  function handleClear() {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForNext(false);
  }

  // ── HANDLER: +/- was pressed — flip the sign ─────────────────
  function handleNegate() {
    setDisplay(prev =>
      prev.startsWith("-") ? prev.slice(1)         // remove "-"
      : prev === "0"       ? "0"                   // don't negate zero
      :                      "-" + prev            // add "-"
    );
  }

  // ── HANDLER: % was pressed — convert to percentage ───────────
  function handlePercent() {
    setDisplay(prev => formatResult(parseFloat(prev) / 100));
  }

  // ── UNIFIED ROUTER: all button presses arrive here ───────────
  // CalcButton calls onClick(label, type); we route to the right handler.
  function handlePress(label, type) {
    switch (type) {
      case "digit":    return handleDigit(label);
      case "decimal":  return handleDecimal();
      case "operator": return label === "=" ? handleEquals() : handleOperator(label);
      case "clear":    return handleClear();
      case "negate":   return handleNegate();
      case "percent":  return handlePercent();
    }
  }

  // ── RENDER ───────────────────────────────────────────────────
  return (
    // Full viewport, black background — centers the calculator
    <div className="min-h-screen bg-black flex items-center justify-center ">

      {/* Calculator shell — fixed width to match the video */}
      <div className="w-82  overflow-auto">

        {/* ── DISPLAY BAR ── */}
        {/* Dark gray, number is right-aligned, text shrinks for long numbers */}
        <div className="bg-gray-600 flex items-end justify-end px-5 py-4 min-h-22.5">
          <span
            className="text-white font-light text-right leading-none"
            style={{
              fontSize:
                display.length > 9 ? "2rem"  :
                display.length > 6 ? "3rem"  :
                                     "4rem",
            }}
          >
            {display}
          </span>
        </div>

        {/* ── BUTTON GRID ── */}
        {/* 4-column, no gaps — flat tiles exactly like the video */}
        <div className="grid grid-cols-4">
          {/*
            Map over BUTTONS array — each object becomes a CalcButton.
            We spread the object as props so label/type/span all flow in cleanly.
            onClick is the shared handlePress router defined above.
          */}
          {BUTTONS.map((btn) => (
            <CalcButton
              key={btn.label}
              {...btn}                  // spreads label, type, span as props
              onClick={handlePress}     // single handler for every button
            />
          ))}
        </div>

      </div>
    </div>
  );
}