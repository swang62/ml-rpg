import type { Component } from "solid-js";

const LessonApiDataIngestionChoosingYourIngestionPatternTradeOffsAndDecisionCriteria: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Your Ingestion Pattern: Trade-offs and Decision Criteria
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            The question is not which pattern is best. The question is which
            trade-offs match your constraints.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Pull Based Polling
                </div>
                <div style="font-size: 12px">
                  Simple, predictable, p95 lag 5 to 10 min
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Push Based Webhooks
                </div>
                <div style="font-size: 12px">
                  Sub second latency, complex ops
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              API Ingestion vs File Based Transfer:
            </div>
            File based feeds, like nightly CSV drops into S3, can deliver
            hundreds of gigabytes in one transfer with minimal API overhead. If
            your upstream system can generate full snapshots daily, this might
            be simpler than API pagination. But files are coarse grained. You
            get everything or nothing, typically once per day. APIs let you
            fetch only changed objects using{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              updated_at
            </code>{" "}
            filters or cursors. For systems with millions of records but only
            thousands changing daily, incremental API syncs save bandwidth and
            processing time. Choose file based when: Data volume is huge
            (terabytes), updates are naturally batched (daily reports), and
            freshness requirements are relaxed (24 hour latency is acceptable).
            Choose API based when: You need sub hour freshness, only a small
            fraction of data changes frequently, or the source does not support
            bulk exports.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              API Ingestion vs Change Data Capture:
            </div>
            Change Data Capture (CDC) from database transaction logs offers near
            real time replication with p99 lag under a few seconds. Systems like
            Debezium tap into MySQL binlog or Postgres Write Ahead Log (WAL) and
            stream every change. But CDC requires database access privileges.
            SaaS vendors like Salesforce or Shopify will never grant you direct
            database access. API ingestion is your only option. Even for
            internal systems, CDC has operational complexity. You must manage
            replication slots, handle schema evolution in the binlog, and deal
            with database failovers. APIs provide a stable contract that
            isolates you from backend changes. Choose CDC when: You control the
            database, need sub second replication lag, and can handle the
            operational complexity of managing replication state. Choose API
            ingestion when: The source is a third party SaaS, you lack database
            privileges, or you prefer operational simplicity over absolute
            minimum latency.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Pull vs Push Decision Matrix:
            </div>
            Polling wastes API quota. If nothing changed, you still made a
            request. At scale with hundreds of sources, this adds up. A 10x
            increase in connected systems means 10x more wasted calls. Webhooks
            eliminate waste. The source only calls you when something changes.
            Latency can be sub second instead of minutes. But webhooks require
            you to run a highly available endpoint. You must validate signatures
            to prevent spoofing, handle replay attacks, and deal with out of
            order delivery. You also need reconciliation logic because webhooks
            are at most once delivery: if your endpoint is down, events are
            lost.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not pull versus push. It is: can I afford the
                operational complexity of webhooks for the latency improvement I
                need?"
              </div>
            </div>
            Choose polling when: Sources number in the dozens or low hundreds,
            freshness requirements are 5 to 10 minutes, and you want simple
            operations. Choose webhooks when: Latency requirements are under one
            minute, event volume justifies the infrastructure cost, and you can
            build robust validation and reconciliation.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When Async Job Based Fits:
            </div>
            If the upstream API involves heavy server side processing, like
            indexing or batch transformations, async job submission is the right
            pattern. You decouple submission from execution, preventing client
            timeouts. The server can throttle background work to protect its
            SLAs. Bloomreach limits ingestion requests to one per minute per
            catalog and indexing to once per hour. This prevents runaway
            background jobs from impacting customer facing APIs. Your ingestion
            client polls job status instead of blocking on a long running
            request.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  File based transfer handles terabytes efficiently but provides
                  daily freshness; API ingestion fetches only changed data with
                  sub hour freshness at cost of rate limit complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CDC offers sub second lag with p99 under a few seconds but
                  requires database access that SaaS vendors never grant; API
                  ingestion is more portable with lag in minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Polling is operationally simple with p95 lag of 5 to 10
                  minutes; webhooks achieve sub second latency but require
                  highly available endpoints, signature validation, and
                  reconciliation logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Async job based patterns decouple submission from execution
                  when server side processing is heavy, preventing timeouts
                  while allowing backends to throttle work
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
                  Choose file based: Daily financial reports with terabytes of
                  data where 24 hour latency is acceptable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose API polling: Salesforce account syncs with thousands of
                  updates daily, 10 minute freshness requirement, hundreds of
                  integrated customers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose webhooks: Payment processor sending transaction events
                  where fraud detection needs sub second alerting and system
                  handles tens of thousands of events per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose async jobs: Bloomreach product catalog with one
                  ingestion request per minute limit and one index rebuild per
                  hour to protect search cluster
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApiDataIngestionChoosingYourIngestionPatternTradeOffsAndDecisionCriteria;
