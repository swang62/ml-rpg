import type { Component } from "solid-js";

const LessonDataQualityDimensionsFailureModesAndEdgeCasesInDataQuality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Data Quality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When Quality Metrics Lie:
            </div>
            The most dangerous data quality failures are those that pass all
            your checks. Your accuracy validators show green, completeness is
            100 percent, consistency constraints hold, but the data is
            fundamentally wrong. Understanding these edge cases is critical for
            building resilient systems.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Semantic Accuracy Trap:
            </div>
            A mobile Software Development Kit (SDK) bug swaps latitude and
            longitude fields. All values are numeric and within valid ranges:
            latitudes between negative 90 and 90, longitudes between negative
            180 and 180. Your schema validation passes. Range checks pass. But
            every location is wrong by hundreds or thousands of kilometers.
            Users in New York appear in the Indian Ocean. Detecting this
            requires statistical monitoring, not just rule based validation. You
            need to track distribution shifts: median location per city,
            geographic heatmaps, or correlation between declared and inferred
            location. When median coordinates for "New York" users suddenly
            shift to the ocean, you alert. The lesson: accuracy is not just
            "valid values" but "semantically correct values."
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Unit mismatches are another semantic
              failure. A client sends cents, server expects dollars. All values
              pass as positive numbers, but aggregates like average fare drop by
              100x overnight. Static validation cannot catch this without domain
              knowledge.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Hidden Completeness Failure:
            </div>
            Global event volume looks normal: 2 million events per 5 minute
            window, right on baseline. But a single Kafka partition is stuck,
            losing 10,000 events per minute for 5 percent of users. Aggregate
            monitoring misses this completely. The failure is hidden in the
            distribution. Edge cases multiply with legitimate traffic spikes. A
            sports betting service sees 5x normal traffic during a championship
            game. A naive completeness alert tuned to "3x deviation from
            baseline" fires constantly, training operators to ignore alerts. You
            need contextual baselines: scheduled events, day of week patterns,
            seasonal trends. Without this, alert fatigue destroys your
            monitoring effectiveness.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Partition Failure Hidden in Aggregate Metrics
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2M</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TOTAL EVENTS (NORMAL)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    1 partition
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    STUCK (5% USERS IMPACTED)
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Consistency Across Schema Evolution:
            </div>
            An orders system adds a new status:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              partially_refunded
            </code>
            . The reporting system still expects binary refunded or not refunded
            states. Now a single order appears as "completed" in one dashboard
            and "refunded" in another that incorrectly maps{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              partially_refunded
            </code>{" "}
            to fully refunded. Both systems pass their internal consistency
            checks. The failure only appears when you compare cross system
            aggregates. This happens constantly when multiple teams evolve
            schemas independently. Prevention requires data contracts: explicit
            agreements on field meanings, valid values, and evolution rules.
            Breaking changes must go through review and coordinated deployment.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Clock Skew and Temporal Inconsistency:
            </div>
            Systems rely on client timestamps for ordering events. Users with
            skewed device clocks create impossible sequences: "delivered" before
            "shipped", purchase timestamp 10 minutes in the future. This breaks
            state machine invariants and downstream Service Level Objectives
            (SLOs). The fix is to use server side timestamps for ordering,
            treating client timestamps as metadata only. But this introduces its
            own edge case: if ingestion lags by 20 minutes during an outage, all
            events get recent server timestamps and appear "out of order"
            relative to actual occurrence time. You need both: client timestamp
            for business logic, server timestamp for technical ordering.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The False Precision Problem:
            </div>
            Data looks perfect: accuracy to the cent, 100 percent completeness,
            all consistency constraints hold. But a key business rule changed. A
            promo code is now applied differently, but the metric definition did
            not update. Revenue reports are precisely wrong. This is a
            governance failure, not a data quality failure in the traditional
            sense. It causes extremely hard to debug issues because all your
            quality dashboards show green. Prevention requires treating metric
            definitions as code: versioned, reviewed, and deployed with the same
            rigor as application logic. Changes to business rules must trigger
            metric definition updates in lockstep.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic accuracy failures pass validation but are
                  fundamentally wrong, like swapped coordinates or unit
                  mismatches causing 100x aggregate errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition level failures hide in aggregate metrics, losing
                  data for subset of users while total volume appears normal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution across independent teams creates consistency
                  violations when systems map new values differently without
                  coordinated contracts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Client timestamp reliance creates temporal inconsistencies
                  from clock skew, requiring dual timestamp strategy for
                  business logic versus technical ordering
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  False precision occurs when data is technically correct but
                  semantically wrong due to business rule changes not reflected
                  in metric definitions
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
                  Mobile SDK swaps latitude and longitude. All values pass range
                  validation but user locations shift thousands of kilometers,
                  detected only through statistical distribution monitoring.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single Kafka partition stuck loses 10,000 events per minute
                  affecting 5 percent of users while aggregate topic throughput
                  of 2 million events per 5 minutes looks completely normal.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Orders system adds partially refunded status but reporting
                  system maps it to fully refunded, causing revenue discrepancy
                  of $50,000 per day between dashboards despite both passing
                  consistency checks.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Client with clock 10 minutes fast creates purchase event in
                  future, breaking downstream fraud detection rules that assume
                  temporal ordering.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityDimensionsFailureModesAndEdgeCasesInDataQuality;
