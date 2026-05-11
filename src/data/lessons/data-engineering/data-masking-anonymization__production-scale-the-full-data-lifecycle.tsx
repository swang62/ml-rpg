import type { Component } from "solid-js";

const LessonDataMaskingAnonymizationProductionScaleTheFullDataLifecycle: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale: The Full Data Lifecycle
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Reality of Scale:</strong>
            At companies like Uber or Airbnb handling billions of events daily,
            masking and anonymization aren't single step operations. They're
            enforced across the entire data lifecycle: ingestion, storage, batch
            processing, real time serving, and external sharing. Each stage has
            different latency requirements and risk profiles.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                System Scale Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5 TB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DAILY EVENTS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">200+</div>
                  <div style="font-size: 10px; font-weight: 600">ANALYSTS</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20</div>
                  <div style="font-size: 10px; font-weight: 600">
                    MICROSERVICES
                  </div>
                </div>
              </div>
            </div>
            <strong>Stage 1: Ingestion and Early Masking:</strong>
            Events land at the edge at 100k per second through Kafka or Kinesis.
            Certain fields are never stored raw. Email addresses get hashed
            immediately using SHA-256 with application specific salt, producing
            consistent tokens across all downstream systems. IP addresses are
            truncated to /24 CIDR blocks (city level) before hitting storage.
            GPS coordinates are rounded to 3 decimal places (roughly 100 meter
            precision) instead of the raw 8 decimal place data from mobile
            devices. This early transformation is critical: it means your data
            lake and warehouse never contain raw PII, dramatically reducing the
            blast radius if storage is compromised. The latency cost is minimal
            because hashing and truncation are CPU bound operations taking
            microseconds per field.
            <strong>Stage 2: Role Based Query Time Masking:</strong>
            In the warehouse serving 1k to 5k queries per second, different
            roles see different views of the same data. Analysts querying user
            behavior see tokenized{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            but not emails or phone numbers. Customer support has access to last
            4 digits of phone numbers for verification. ML training jobs get
            heavily aggregated features: not individual ages but age buckets (25
            to 34), not exact locations but metropolitan regions. This is
            implemented through view layers or query rewriting. When a user with
            role{" "}
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Early transformation at ingestion (hashing emails, truncating
                  IPs before storage) means data lake never holds raw PII,
                  reducing breach surface area by 80%+ compared to masking at
                  query time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query time masking serves different roles through views or
                  query rewriting: analysts see tokens, support sees partial
                  data, with 1k to 5k QPS handled via cached policy lookups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch anonymization processes 5 TB daily within 2 hour
                  windows, applying aggregation (minimum 100 user cohorts) and
                  generalization (ZIP codes become regions) for external sharing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dev and QA environments get synthetic datasets generated daily
                  with preserved feature distributions but removed identifiers,
                  supporting 50 to 100 engineers without raw PII access
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
                  Uber style implementation: rider and driver GPS coordinates
                  stored as rounded H3 geohashes (city block level) while exact
                  coordinates only in hot cache for 15 minutes for active trips
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn approach: generating synthetic profiles where job
                  title distributions and connection patterns match production
                  but names, emails, and rare attribute combinations are
                  replaced
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix masking: viewing history available to analysts as
                  show_id with viewing_duration but user demographic data only
                  as aggregated cohorts (age ranges, regional groupings)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Daily ETL job at e-commerce company: processes 2 TB of order
                  data, replacing customer names with format consistent fake
                  names while preserving order patterns for fraud model training
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMaskingAnonymizationProductionScaleTheFullDataLifecycle;
