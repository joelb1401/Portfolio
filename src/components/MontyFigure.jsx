import React, { useCallback, useEffect, useRef, useState } from "react";

const TRIALS = 1000;
const PER_FRAME = 24;

/** One honest round: the host always opens a door he knows hides a goat. */
const playRound = () => {
  const car = Math.floor(Math.random() * 3);
  const pick = Math.floor(Math.random() * 3);

  const goats = [0, 1, 2].filter((door) => door !== pick && door !== car);
  const shown = goats[Math.floor(Math.random() * goats.length)];
  const other = [0, 1, 2].find((door) => door !== pick && door !== shown);

  return { stick: pick === car, swap: other === car };
};

const share = (wins, trials) => (trials ? wins / trials : 0);

/**
 * Exactly one of the two strategies wins each round, so the shares are
 * complementary. Rounding them separately can total 101 (33.5 and 66.5
 * both round up), so the second is derived from the first instead.
 */
const percentages = ({ trials, swap }) => {
  if (!trials) return { swap: "—", stick: "—" };

  const swapPercent = Math.round((swap / trials) * 100);
  return { swap: `${swapPercent}%`, stick: `${100 - swapPercent}%` };
};

/**
 * The static screenshot of the gateway, replaced by the gateway's actual
 * argument: a thousand rounds played out in the margin. It runs itself
 * whenever it scrolls into view, so the bars converge on 1/3 and 2/3
 * while you read the entry beside them.
 */
const MontyFigure = () => {
  const [tally, setTally] = useState({ trials: 0, stick: 0, swap: 0 });
  const frame = useRef(0);
  const wrap = useRef(null);

  const run = useCallback(() => {
    cancelAnimationFrame(frame.current);

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let running = { trials: 0, stick: 0, swap: 0 };
    setTally(running);

    const step = () => {
      const batch = reduced ? TRIALS : Math.min(PER_FRAME, TRIALS - running.trials);

      for (let i = 0; i < batch; i += 1) {
        const round = playRound();
        running = {
          trials: running.trials + 1,
          stick: running.stick + (round.stick ? 1 : 0),
          swap: running.swap + (round.swap ? 1 : 0),
        };
      }

      setTally(running);
      if (running.trials < TRIALS) frame.current = requestAnimationFrame(step);
    };

    step();
  }, []);

  useEffect(() => {
    const node = wrap.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(frame.current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) run();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [run]);

  const shown = percentages(tally);

  return (
    <figure className="monty" ref={wrap}>
      <figcaption className="monty__caption">
        Wins in {tally.trials.toLocaleString()} rounds
      </figcaption>

      <div className="monty__row">
        <span>Switch</span>
        <span className="monty__value">{shown.swap}</span>
      </div>
      <div className="monty__track">
        <div
          className="monty__fill"
          style={{ transform: `scaleX(${share(tally.swap, tally.trials)})` }}
        />
      </div>

      <div className="monty__row">
        <span>Stick</span>
        <span className="monty__value">{shown.stick}</span>
      </div>
      <div className="monty__track">
        <div
          className="monty__fill"
          style={{ transform: `scaleX(${share(tally.stick, tally.trials)})` }}
        />
      </div>

      <button type="button" className="monty__run" onClick={run}>
        run again
      </button>
    </figure>
  );
};

export default MontyFigure;
