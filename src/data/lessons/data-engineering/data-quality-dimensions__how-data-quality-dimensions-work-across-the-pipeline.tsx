import type { Component } from "solid-js";

const LessonDataQualityDimensionsHowDataQualityDimensionsWorkAcrossThePipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Data Quality Dimensions Work Across the Pipeline
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Challenge:
            </div>
            At scale, data flows through multiple stages: ingestion from
            clients, event streaming, processing, warehousing, and serving to
            analytics or machine learning. Each stage can degrade quality. The
            key insight is that you enforce and monitor each dimension at
            different points in this pipeline, not just once.
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Mobile Clients</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Generate Events
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Ingestion Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Schema + Range Checks
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Stream Processing</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Cardinality Counting
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Warehouse + Serving</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Reconciliation Audits
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Accuracy at Ingestion:
            </div>
            For a ride sharing app processing millions of trip events, accuracy
            starts at the edge. Each event includes coordinates, timestamps,
            fare, and identifiers. Input validation enforces basic rules:
            timestamp not more than 5 minutes in the future, coordinates within
            city bounds, fare non negative. This catches obviously incorrect
            data before it spreads downstream. Deeper semantic checks happen
            later, such as "total fare equals sum of components within 1 cent"
            or "trip duration matches distance given typical speed
            distributions."
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Completeness Through Counting:
            </div>
            A common pattern is event count and cardinality checks per topic,
            per partition, per time window. If you usually see around 2 million
            events between 10:00 and 10:05 UTC and today you see only 1.2
            million, an alert triggers. At companies like Netflix, warehouse
            ingestion compares transaction counts against source Online
            Transaction Processing (OLTP) systems every hour. SLAs define
            expectations: "99.95 percent of source transactions must arrive
            within 30 minutes."
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Completeness Detection Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">2M events</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">TODAY</div>
                  <div style="font-size: 16px; font-weight: 800">
                    1.2M events
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">ACTION</div>
                  <div style="font-size: 16px; font-weight: 800">
                    Alert fired
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Consistency Through Reconciliation:
            </div>
            Data gets denormalized and replicated across systems. A user profile
            exists in OLTP, cache, Kafka, and warehouse. With eventual
            consistency, you accept timing differences. But invariants matter:
            "no orphaned orders without a user" and "status transitions are
            valid." At Meta scale, consistency checks run as data audits that
            reconcile aggregates between systems, like total ad spend per
            advertiser between billing and reporting. These audits run daily or
            hourly, and discrepancies above 0.1 percent trigger incident review.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy is enforced earliest at ingestion with schema
                  validation and range checks, catching obviously incorrect data
                  before it spreads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Completeness monitoring uses baseline comparisons per time
                  window, alerting when actual counts deviate significantly from
                  expected patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency requires cross system reconciliation jobs that
                  compare aggregates, accepting small lag but flagging permanent
                  contradictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each pipeline stage applies appropriate checks: lightweight
                  validation at high throughput ingestion, heavier audits in
                  batch warehouse processing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems treat data quality violations like
                  availability incidents, with on call rotations responding to
                  breaches of defined SLOs
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
                  Ingestion accuracy: Ride event validation rejects timestamp 10
                  minutes in future or coordinates outside service area before
                  writing to Kafka.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Completeness monitoring: Warehouse ingestion compares hourly
                  transaction count from source database to arrived events,
                  alerting if gap exceeds 0.05 percent.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency audit: Nightly job compares total revenue per
                  country from checkout service versus data warehouse, opening
                  incident if difference exceeds 0.5 percent.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityDimensionsHowDataQualityDimensionsWorkAcrossThePipeline;
