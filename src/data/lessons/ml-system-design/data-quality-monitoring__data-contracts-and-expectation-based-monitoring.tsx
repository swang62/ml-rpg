import type { Component } from "solid-js";

const LessonDataQualityMonitoringDataContractsAndExpectationBasedMonitoring: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Contracts and Expectation Based Monitoring
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT ARE DATA CONTRACTS
            </p>
            <p>
              A data contract is a formal specification of what data should look
              like. It defines expected schema (column names, types), value
              constraints (ranges, allowed categories), freshness requirements,
              and statistical properties (expected distributions, correlations).
            </p>
            <p>
              Contracts make implicit assumptions explicit. Instead of hoping
              data is correct, you define what correct means and validate
              against it. When contracts are violated, you get alerts before bad
              data reaches the model.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXPECTATION-BASED MONITORING
            </p>
            <p>
              Expectations are specific testable conditions. Examples:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                user_age BETWEEN 0 AND 150
              </code>
              ,{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                null_rate(email) &lt; 0.01
              </code>
              ,{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                unique_count(user_id) &gt; 100000
              </code>
              .
            </p>
            <p>
              Tools like Great Expectations and dbt tests encode expectations as
              code. Each expectation runs against incoming data. Failures
              trigger alerts or block pipelines.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BUILDING EFFECTIVE CONTRACTS
            </p>
            <p>
              <strong>Start from training data:</strong> Profile your training
              data. What were the value ranges? Null rates? Cardinalities? Use
              these as baseline expectations.
            </p>
            <p>
              <strong>Add domain knowledge:</strong> Some constraints are not in
              training data but are logical. User ages cannot be negative.
              Prices cannot be more than $1M for most products.
            </p>
            <p>
              <strong>Allow for expected variation:</strong> Do not set
              constraints too tight. A 5% null rate that varies between 4-6%
              does not need alerts. Set thresholds with buffer for normal
              variation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTRACT EVOLUTION
            </p>
            <p>
              Contracts are not static. As products evolve, expectations change.
              New categories appear. Value ranges expand. Review and update
              contracts quarterly or when major changes ship.
            </p>
            <p>
              Version contracts alongside data schemas. When schema changes,
              update contracts. Maintain contract history for debugging (what
              were expectations when this bug occurred?).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Treat data contracts as code.
              Store in version control. Review in PRs. Test in CI. Make contract
              violations block deployments for critical pipelines.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Producer Contract</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    ✓ Hourly partition by :10
                    <br />✓ user_id non null, unique
                    <br />✓ Schema version 2.3
                    <br />✓ Referential integrity &gt; 99.9%
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Continuous Validation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Every load + lineage tracking
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Consumer Contract</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    ✓ PSI &lt; 0.1 on age, location
                    <br />✓ Missingness &lt; 1% on required
                    <br />✓ Late arrival &lt; 20 min tolerated
                    <br />✓ Join coverage &gt; 99%
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
                  Data contracts define expected schema, value constraints,
                  freshness, and statistical properties—making implicit
                  assumptions explicit
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Expectations are testable conditions: value ranges, null
                  rates, cardinalities; tools like Great Expectations automate
                  validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start from training data profile, add domain constraints,
                  allow buffer for normal variation; version contracts with
                  schemas
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
                  Interview Tip: Give specific expectation examples: age range,
                  null rate threshold, unique count minimum.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain contract evolution—expectations change
                  as products evolve; version alongside schemas.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityMonitoringDataContractsAndExpectationBasedMonitoring;
