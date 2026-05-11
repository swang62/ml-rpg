import type { Component } from "solid-js";

const LessonDataQualityDimensionsWhatAreDataQualityDimensions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What are Data Quality Dimensions?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Data Quality Dimensions</strong> are measurable
                properties that determine whether data is fit for its intended
                use. The three foundational dimensions are accuracy,
                completeness, and consistency.
              </div>
            </div>
            At scale, bad data drives bad decisions at scale. A pricing model
            trained on corrupted data can lose millions per day. A
            recommendation engine fed incomplete events shows users irrelevant
            content. Data quality dimensions transform vague complaints like
            "data is bad" into explicit, measurable properties you can monitor
            and enforce.
            <strong>Accuracy: Is it Correct?</strong>
            Accuracy measures correctness relative to the real world. If an
            orders table shows a user paid $9.99 but the payment processor
            charged $19.99, that data is inaccurate. This goes beyond format
            validation. A value can be syntactically valid but semantically
            wrong. Typical checks include comparing derived data against trusted
            sources, or validating realistic ranges: latitude between negative
            90 and 90, user age between 13 and 120.
            <strong>Completeness: Is Everything Present?</strong>
            Completeness measures whether all expected data arrived. A dataset
            can be accurate but incomplete. You might have all orders that did
            arrive perfectly recorded, but be missing 1 percent due to Kafka lag
            or a broken ingestion job. Completeness is quantified as a
            percentage: for example, 99.9 percent of expected events for a given
            hour actually arrived in the warehouse.
            <strong>Consistency: Does it Agree With Itself?</strong>
            Consistency measures whether data aligns across different views or
            systems. Within a table, this covers constraints like unique
            identifiers and referential integrity. Across systems, it means user
            state in the data warehouse matches the source systems within
            expected lag. You can tolerate some delay, but not permanent
            contradictions like an order marked "refunded" in one table and
            "completed" in another forever.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> These dimensions are not abstract
              theory. Companies like Uber processing 20 billion events per day
              define explicit Service Level Objectives (SLOs) for each dimension
              per dataset, treating violations like availability incidents.
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
                  Accuracy means semantic correctness relative to real world
                  truth, not just syntactic validity of data types or formats
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Completeness measures what percentage of expected records
                  actually arrived, typically tracked per time window and data
                  source
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency ensures data agrees with itself within tables
                  through constraints and across systems through reconciliation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each dimension requires different enforcement strategies:
                  accuracy at ingestion, completeness through counting,
                  consistency via audits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems define explicit SLOs per dimension per
                  dataset, such as 99.9 percent completeness within 30 minutes
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
                  Accuracy violation: Mobile SDK bug swaps latitude and
                  longitude. Values pass numeric range checks but all locations
                  are wrong by hundreds of kilometers.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Completeness issue: Expected 2 million events between 10:00
                  and 10:05 UTC based on historical baseline, but only 1.2
                  million arrived due to partition lag.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency failure: User profile shows status as active in
                  cache but suspended in source database, creating contradictory
                  application behavior.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityDimensionsWhatAreDataQualityDimensions;
