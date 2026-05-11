import type { Component } from "solid-js";

const LessonSchemaValidationSchemaValidationTradeOffsFlexibilityVsSafety: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Schema Validation Trade-offs: Flexibility vs Safety
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Tension:
            </div>
            Every schema validation strategy trades flexibility for safety.
            Strict enforcement improves data quality and simplifies downstream
            systems, but reduces agility and can cause pipeline outages. Loose
            validation supports rapid iteration, but leads to hidden quality
            problems that surface as broken analytics or ML models.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Schema on Write
                </div>
                <div style="font-size: 12px">
                  Strong quality, predictable downstream, but blocks rapid
                  changes
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Schema on Read
                </div>
                <div style="font-size: 12px">
                  Fast iteration, flexible ingest, but inconsistent
                  interpretation
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Strict Schema on Write Benefits:
            </div>
            With strict validation, BI tools, ML pipelines, and batch jobs can
            assume stable schemas. Joins work predictably because field types
            match. Aggregations do not break from unexpected nulls. Teams
            building features know exactly what data structure to expect. This
            matters for financial data, compliance reports, or any system where
            correctness beats availability.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              But Strict Validation Costs You:
            </div>
            During a traffic spike, if a source team needs to add a field for
            urgent debugging, strict validation rules might block deployment. A
            misconfigured schema rule can cause complete pipeline outage,
            breaking dashboards and missing Service Level Agreements (SLAs).
            Recovery requires coordination across teams and potentially
            emergency schema changes.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema on Read Flexibility:
            </div>
            Ingesting raw JSON logs into S3 or Google Cloud Storage (GCS) with
            minimal assumptions lets teams iterate fast. Each consumer defines
            its own schema when reading. New fields appear immediately without
            coordination. This pattern is common in early data lake
            architectures and supports exploratory analytics. The hidden cost:
            different teams infer different schemas for the same dataset. When
            source data changes, some consumers adapt correctly, others silently
            misinterpret data, and debugging becomes expensive. Quality problems
            appear weeks later in production dashboards or trained models.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not which approach is better. It is: what is
                your read/write ratio and how critical is correctness versus
                availability?"
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Fail Fast vs Degrade Gracefully:
            </div>
            Hard enforcement that rejects incompatible data preserves integrity
            but causes data loss during outages. Soft enforcement that coerces
            fields, fills nulls, or quarantines rows keeps pipelines running but
            may leak low quality data. For financial transactions or compliance
            data, fail fast. For behavioral logs or less critical analytics,
            graceful degradation might be acceptable.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strict schema on write guarantees quality and predictable
                  downstream systems but reduces agility and can block urgent
                  changes during incidents or traffic spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema on read enables fast iteration and flexible ingest but
                  leads to inconsistent data interpretation across teams and
                  hidden quality problems discovered weeks later
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard enforcement (reject writes) preserves data integrity but
                  causes outages and data loss, while soft enforcement (coerce
                  or quarantine) maintains availability but risks leaking bad
                  data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision criteria: use strict schema on write for financial,
                  compliance, or ML training data (correctness over
                  availability). Use schema on read for exploratory analytics or
                  behavioral logs (availability over correctness).
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
                  A strict Delta Lake table rejects writes when an upstream
                  service adds an unexpected field, causing a 30 minute outage
                  affecting 50 downstream dashboards until schema is updated
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data lake with schema on read ingests raw logs successfully,
                  but three different teams interpret the
                  &lt;code&gt;timestamp&lt;/code&gt; field differently (Unix
                  seconds, milliseconds, ISO string), causing inconsistent
                  reports
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Banking transaction pipeline uses hard enforcement and rejects
                  10k writes during a schema mismatch, preserving data integrity
                  but requiring manual recovery and customer communication
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaValidationSchemaValidationTradeOffsFlexibilityVsSafety;
