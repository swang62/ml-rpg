import type { Component } from "solid-js";

const LessonGdprComplianceGdprInDistributedDataPipelines: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          GDPR in Distributed Data Pipelines
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Architecture Challenge:</strong>
          At a company like Meta or Amazon with 100 million monthly active
          users, personal data flows through thousands of microservices at 1
          million events per second. GDPR compliance means controlling this data
          across the entire pipeline: from user devices to edge APIs, through
          streaming systems, into data lakes and warehouses, then into machine
          learning feature stores and dashboards. Here's how the flow works in
          practice:
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Collection with consent checks:</strong> Mobile app
                sends analytics events with{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  user_id
                </code>
                ,{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  device_id
                </code>
                , and context. Privacy layer enforces consent at ingestion. If
                user opted out of personalization, events are tagged "analytics
                only" and excluded from ad targeting pipelines.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Ingestion at scale:</strong> Events land in streaming
                system at 500,000 events per second with p99 latency of 2
                seconds. Schema registry classifies fields as PII, quasi
                identifiers, or non sensitive. PII fields are tokenized or
                encrypted immediately, with raw identifiers written only to
                tightly controlled "hot PII" stores.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Processing with purpose limits:</strong> Batch and
                streaming jobs must respect data retention and purpose tags.
                Advertising models only consume events with allowed purposes.
                Historical data beyond 13 months is dropped or aggregated to
                prevent indefinite accumulation.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                4
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Controlled access:</strong> Business intelligence tools
                query sanitized, pseudonymized views. Row and column level
                policies ensure only authorized roles see direct identifiers.
                Aggregate queries prevent reidentification by enforcing minimum
                group sizes.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                5
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Rights handling:</strong> Data subject service tracks
                identities and rights requests. When user requests deletion,
                service publishes "deletion order" that flows through
                infrastructure. Downstream systems execute deletion within 7 to
                30 day target SLA, including backups.
              </div>
            </div>
          </div>
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Google's data subject pipelines
            traverse all storage systems as a graph traversal and workflow
            orchestration problem. At scale, this isn't just a database delete,
            it's coordinating deletions across hundreds of datasets, replicas,
            and derived artifacts.
          </div>
          <strong>Scale Reality:</strong>
          At 500,000 events per second ingestion rate, even 5 milliseconds of
          additional latency for tokenization adds up. Companies must balance
          synchronous protection (higher latency but immediate safety) versus
          asynchronous batching (lower latency but windows where raw PII exists
          in logs). The choice depends on data sensitivity and compliance risk
          tolerance.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">User Events</strong>
                <div style="font-size: 11px; margin-top: 4px">500k/sec</div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Privacy Layer</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Consent + Tokenization
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 12px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Analytics</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>ML Models</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Data Lake</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At 500,000 events per second ingestion, even 5ms tokenization
                latency becomes significant cost requiring synchronous versus
                asynchronous trade off decisions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema registry automatically classifies fields as PII, quasi
                identifiers, or non sensitive to enforce consistent protection
                across all downstream systems
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Purpose tags flow with data through entire pipeline, ensuring
                advertising models cannot consume events where user opted out of
                personalization
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Deletion orders propagate through pub sub system to all
                consumers (databases, warehouses, caches, search indexes) with 7
                to 30 day SLA targets
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data retention policies automatically drop or aggregate events
                beyond 13 months to prevent indefinite accumulation of personal
                data
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
                Mobile app event tagged "analytics only" is ingested normally
                but excluded from recommendation engine pipeline that targets
                ads
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Email address tokenized to stable identifier like "token_8f3a2b"
                at ingestion, allowing joins and analytics while keeping raw PII
                in isolated key vault
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Deletion request for user publishes event to Kafka topic,
                consumed by 50+ systems that each mark data deleted and report
                completion status to orchestrator
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonGdprComplianceGdprInDistributedDataPipelines;
