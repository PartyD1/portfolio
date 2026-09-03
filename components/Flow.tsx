import type { Flow as FlowData } from "@/data/projects";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icon";

/**
 * The system, drawn: a chain of glass nodes with connectors, an optional fan
 * of parallel branches under a node, and an optional bus underneath the whole
 * chain for the thing every step sits on (the runtime, the queue, the rule).
 *
 * HTML and CSS rather than SVG, deliberately. The nodes carry real text that
 * has to wrap, reflow to one column on a phone, and stay selectable and
 * readable to a screen reader, none of which an SVG diagram does well. The
 * connectors are pseudo-elements so the DOM stays a plain ordered list.
 *
 * Every node's copy comes from the same supplied prose the bullets do. The
 * diagram claims nothing the prose did not.
 */
export default function Flow({ flow }: { flow: FlowData }) {
  const { steps, bus } = flow;
  if (!steps.length) return null;

  return (
    <Reveal className="flow" data-steps={steps.length}>
      <h2 className="flow__heading" id="flow-t">
        How it works
      </h2>
      <ol className="flow__steps" aria-labelledby="flow-t">
        {steps.map((s, i) => (
          <li
            className="flow__step"
            key={s.title}
            style={{ ["--i" as string]: i }}
          >
            <div className="flow__node">
              <span className="flow__index" aria-hidden="true">
                {i + 1}
              </span>
              <p className="flow__title">{s.title}</p>
              {s.detail && <p className="flow__detail">{s.detail}</p>}
              {s.branches && (
                <ul className="flow__branches">
                  {s.branches.map((b) => (
                    <li className="flow__branch" key={b}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {i < steps.length - 1 && (
              <span className="flow__link" aria-hidden="true">
                <ArrowRight className="flow__arrow" />
              </span>
            )}
          </li>
        ))}
      </ol>
      {bus && (
        <div className="flow__bus">
          <p className="flow__bus-title">{bus.title}</p>
          {bus.detail && <p className="flow__bus-detail">{bus.detail}</p>}
        </div>
      )}
    </Reveal>
  );
}
