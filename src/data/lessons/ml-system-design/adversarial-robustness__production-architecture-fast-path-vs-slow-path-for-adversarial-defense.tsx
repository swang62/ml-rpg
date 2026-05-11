import type { Component } from "solid-js";

const LessonAdversarialRobustnessProductionArchitectureFastPathVsSlowPathForAdversarialDefense: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Fast Path vs Slow Path for Adversarial
            Defense
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two-Path Architecture
            </p>
            <p>
              Production fraud systems use parallel detection paths. The fast
              path runs lightweight rules and models under strict latency
              constraints (10-50ms)—it must make a decision for every
              transaction in real-time. The slow path runs more sophisticated
              adversarial-robust models asynchronously, analyzing transactions
              after the fact and feeding signals back into the fast path.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Architecture Pattern:</strong> Fast path: rules +
              lightweight ML (immediate decision). Slow path: adversarial-robust
              models, graph analysis, behavioral clustering (delayed
              enrichment). Slow path findings update fast path thresholds and
              blocklists.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Two Paths
            </p>
            <p>
              Adversarial-robust models are computationally expensive—ensemble
              methods, multiple feature representations, deeper networks.
              Running these on every transaction in real-time is
              cost-prohibitive. The slow path processes transactions in batch,
              using expensive analysis only where the fast path flagged
              uncertainty or after suspicious patterns emerge.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fast Path Design
            </p>
            <p>
              Optimize for latency and false negative rate. Use velocity checks,
              blocklists, and lightweight models. Accept some false
              positives—the slow path can correct them. Design fallback
              behavior: if fast path times out, default to allow (with slow path
              review) or block (conservative) depending on risk tolerance.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Feedback Loop:</strong> Slow path identifies new attack
              patterns. These become new fast path rules or model features.
              Continuous deployment updates fast path defenses within hours of
              attack detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Slow Path Capabilities
            </p>
            <p>
              Graph analysis across transactions (detecting coordinated
              attacks), behavioral anomaly detection over longer time windows,
              ensemble voting across multiple model architectures, human review
              queue for edge cases. Latency budget: minutes to hours.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Two Tier Defense Architecture
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Fast Path (97-99% traffic)</strong>
                  <div style="font-size: 13px; margin-top: 6px; line-height: 1.5">
                    Features (1-5ms) → Robust Model (5-20ms) → Lightweight
                    Checks (1-5ms)
                    <br />
                    <strong>Total: 20-40ms</strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ High uncertainty / High value
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Slow Path (1-3% traffic)</strong>
                  <div style="font-size: 13px; margin-top: 6px; line-height: 1.5">
                    Second Model Vote + Heavy Transforms + Rules Engine
                    <br />
                    <strong>Additional: 20-80ms</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 4px">
                  <div style="font-size: 12px; line-height: 1.4">
                    <strong>Rate Limiting:</strong> 10-60 queries/min per
                    identity to prevent probing
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fast path (10-50ms): lightweight rules and models for
                  immediate decisions on every transaction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slow path (minutes-hours): adversarial-robust models, graph
                  analysis, ensemble voting for delayed enrichment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slow path findings update fast path—new attack patterns become
                  rules or features within hours
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fast path timeout fallback: default to allow with slow path
                  review (permissive) or block (conservative) based on risk
                  tolerance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slow path runs graph analysis, behavioral clustering, human
                  review queue—expensive analysis only where needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAdversarialRobustnessProductionArchitectureFastPathVsSlowPathForAdversarialDefense;
