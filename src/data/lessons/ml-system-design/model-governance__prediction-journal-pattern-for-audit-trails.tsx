import type { Component } from "solid-js";

const LessonModelGovernancePredictionJournalPatternForAuditTrails: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Prediction Journal Pattern for Audit Trails
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Prediction Journal Architecture:
            </div>
            The prediction journal is an append only log that captures minimally
            sufficient metadata for every model inference, enabling complete
            auditability without destroying performance. For each decision, the
            system records a stable request ID, caller identity, model version,
            dataset manifest hash, feature vector hash (not raw Personally
            Identifiable Information or PII), top outputs with confidence
            scores, decision threshold, and explanation reference ID. The key
            challenge is doing this at scale. At 20,000 Requests Per Second
            (RPS) with 800 bytes per log entry, the system must persist 13.8
            million records per hour or 1.4 terabytes per day while maintaining
            inference latency Service Level Objectives (SLOs) like p99 under 50
            milliseconds.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Asynchronous Write Strategy:
            </div>
            Production systems solve this through asynchronous writes to a
            durable queue. The critical path of the prediction service only
            enqueues the log entry, targeting p99 enqueue latency under 5
            milliseconds. A separate sink service consumes from the queue and
            persists to append only storage with Write Once Read Many (WORM)
            policies that prevent tampering. End to end persistence completes
            within 1 second, fast enough for near real time forensics but
            decoupled from serving latency. The queue itself must be durable and
            partitioned. At 20,000 RPS, partition by time bucket and model ID to
            scale horizontally and avoid hot partitions.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Storage Strategy:
            </div>
            Storage strategy balances cost and access patterns. Keep 30 days hot
            in a columnar store like Apache Parquet on object storage for fast
            operational investigations (what predictions did this user receive
            yesterday?). After 30 days, move to cold storage for regulatory
            retention. Financial services often require 7 years per SR 11 to 7.
            At 1.4 terabytes per day, 7 years is 3.5 petabytes. Compressed cold
            storage with lifecycle policies reduces this to under 1 petabyte and
            cents per gigabyte per month. For cost sensitive deployments, sample
            low risk traffic at 10 to 20 percent but ensure full fidelity
            logging for high risk segments like loan denials or content
            moderation actions.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Privacy Protection:
            </div>
            Privacy is critical. Logging raw feature vectors exposes PII and
            violates General Data Protection Regulation (GDPR). Instead, hash
            feature vectors with a keyed Hashed Message Authentication Code
            (HMAC) or use deterministic tokenization. Store the hash in the
            journal. For reproduction, recompute features from the feature store
            using time travel to retrieve values as of the decision timestamp,
            then verify the hash matches. This protects privacy while enabling
            auditability. For the right to be forgotten, you can delete the
            reproduction capability without retraining if you never logged raw
            data, or trigger incremental retraining if the model itself must
            forget.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 11px">
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Prediction Service (20K RPS)
                  </strong>
                  <div style="font-size: 11px; margin-top: 5px">
                    Model inference: 35ms p99 → Enqueue log: +5ms p99
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓ async write
                </div>
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Durable Queue (partitioned by time + model ID)
                  </strong>
                  <div style="font-size: 11px; margin-top: 5px">
                    Request ID, model v3.2, dataset hash abc123, feature HMAC,
                    output, threshold
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓ persist within 1s
                </div>
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Append Only Storage (WORM policy)
                  </strong>
                  <div style="font-size: 11px; margin-top: 5px">
                    Hot: 30 days (1.4 TB/day) → Cold: 7 years (compressed to
                    &lt;1 PB total)
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
                  Asynchronous journaling decouples audit logging from inference
                  latency, achieving p99 enqueue under 5 milliseconds so the
                  overall prediction Service Level Objective (SLO) of 50
                  milliseconds is maintained even at 20,000 Requests Per Second
                  (RPS)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log minimally sufficient metadata including request ID, model
                  version, dataset hash, and feature vector Hashed Message
                  Authentication Code (HMAC) rather than raw Personally
                  Identifiable Information (PII) to satisfy General Data
                  Protection Regulation (GDPR) privacy requirements while
                  enabling reproduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 20,000 RPS with 800 bytes per entry, systems generate 1.4
                  terabytes per day, requiring partitioned queues by time and
                  model ID to scale horizontally and avoid hot partition
                  bottlenecks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two tier storage strategy keeps 30 days hot in columnar format
                  (Apache Parquet) for fast operational queries, then moves to
                  compressed cold storage for 7 year retention required by
                  financial regulations like SR 11 to 7, reducing costs from 3.5
                  petabytes to under 1 petabyte
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature vector hashing protects privacy by never logging raw
                  sensitive data, reproduction happens by time travel querying
                  the feature store to recompute values as of decision time and
                  verifying the hash matches the journal entry
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For cost optimization, sample low risk traffic at 10 to 20
                  percent while maintaining full fidelity logging for high risk
                  decisions like loan denials, fraud blocks, or content
                  moderation takedowns where auditability is legally required
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
                  Production fraud detection system logs &#123;"req_id":
                  "a1b2c3", "model": "fraud_v3.2", "dataset": "sha256:abc123",
                  "features_hmac": "hmac_sha256:def456", "score": 0.87,
                  "threshold": 0.75, "decision": "block", "timestamp":
                  "2024-01-15T10:23:45Z"&#125; with 5ms p99 enqueue and 1 second
                  end to end persistence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bank maintains hot Parquet files partitioned by date on S3
                  Standard for 30 days (analyst query: SELECT * WHERE
                  user_id='X' AND date='2024-01-15' returns in 2 seconds), then
                  transitions to S3 Glacier Deep Archive at $1 per terabyte per
                  month for 7 years
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Right to be forgotten request deletes user tokenization keys
                  and purges feature store history, journal keeps HMAC hashes so
                  reproduction is impossible (satisfying deletion) but aggregate
                  statistics remain valid for compliance reporting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelGovernancePredictionJournalPatternForAuditTrails;
