import type { Component } from "solid-js";

const LessonVideoProcessingFailureModesInProductionVideoMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes in Production Video ML Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stream Failure
            </p>
            <p style="margin-top: 0">
              Camera feeds drop unexpectedly. Network congestion, hardware
              failure, power outages. A system processing 1000 streams will see
              multiple failures per hour. The pipeline must handle missing
              frames gracefully without crashing or corrupting state.
            </p>
            <p>
              <strong>Detection:</strong> Monitor frame arrival timestamps.
              Alert when frames stop arriving or timestamps show gaps.
            </p>
            <p>
              <strong>Recovery:</strong> Reset tracking state for affected
              cameras. Resume processing when stream returns. Log gaps for
              offline analysis.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Spikes
            </p>
            <p style="margin-top: 0">
              GPU inference time varies with scene complexity. A frame with 50
              people takes longer than an empty room. Occasional frames exceed
              the latency budget, causing downstream delays.
            </p>
            <p>
              <strong>Mitigation:</strong> Implement frame dropping when queue
              depth exceeds threshold. Process most recent frames, skip stale
              ones. Better to analyze current reality than catch up on history.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Accuracy Drift
            </p>
            <p style="margin-top: 0">
              Video analytics accuracy degrades silently. Lighting changes,
              camera angles shift, new object types appear. A model trained for
              daytime struggles at night. Seasonal changes introduce new failure
              modes.
            </p>
            <p>
              <strong>Detection:</strong> Monitor prediction confidence
              distributions. Sample frames for human review. Compare current
              accuracy against held-out validation sets.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resource Exhaustion
            </p>
            <p style="margin-top: 0">
              <strong>GPU memory:</strong> Memory leaks accumulate over hours.
              Restart workers periodically or implement explicit memory
              management.
            </p>
            <p>
              <strong>CPU saturation:</strong> Decode stage falls behind, queues
              grow. Monitor decode latency separately from inference latency.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stream failures happen constantly at scale - 1000 streams =
                  multiple failures per hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency spikes from complex scenes require frame dropping to
                  stay current rather than catching up
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model accuracy drifts silently with lighting, season, and
                  camera angle changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory leaks and CPU saturation require periodic restarts and
                  per-stage latency monitoring
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
                  Interview Tip: Mention frame dropping as a deliberate strategy
                  - current analysis beats stale catch-up
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe confidence monitoring as early warning
                  for accuracy drift
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonVideoProcessingFailureModesInProductionVideoMlSystems;
