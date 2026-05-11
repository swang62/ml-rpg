import type { Component } from "solid-js";

const LessonBatchVsRealtimeInferenceBatchVsRealTimeMakingTheChoice: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batch vs Real-time: Making the Choice
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p style="margin-top: 0">
              This is not about "better" or "worse." It is about marginal value
              of freshness versus marginal cost and operational complexity.
              Every second of reduced staleness has a cost. Every nine of
              availability in your Service Level Agreement (SLA) costs more.
            </p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Batch Inference
                </div>
                <div style="font-size: 12px; margin-bottom: 6px">
                  Cheap per prediction, hours to days stale
                </div>
                <div style="font-size: 11px">
                  Best for: slow decay utility, population scoring
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Real-time Inference
                </div>
                <div style="font-size: 12px; margin-bottom: 6px">
                  Expensive, milliseconds to seconds fresh
                </div>
                <div style="font-size: 11px">
                  Best for: fast decay utility, per-request context
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework: Four Questions
            </p>
            <p style="margin-top: 0">
              First, what is acceptable freshness? If churn prediction for next
              month can use yesterday's model, batch wins. If payment fraud
              needs current transaction context, real-time is required. Second,
              what is the per interaction value? Low value, high volume
              interactions (email recommendations, content feeds) favor batch.
              High value interactions (fraud gating, ad auctions where
              milliseconds equal dollars) justify real-time cost. Third, what is
              your read to write ratio? Systems that are write heavy (over 80%
              writes) like event logs should minimize online compute. Systems
              that are read heavy (over 99% reads) like user profiles can afford
              online enrichment. Fourth, can you decompose the problem? Most
              production systems do. Compute expensive embeddings and candidate
              sets offline. Do lightweight re-ranking and contextualization
              online.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hybrid Pattern: Best of Both
            </p>
            <p style="margin-top: 0">
              Netflix style recommendations illustrate this perfectly. Offline
              batch computes top 1000 candidate videos per user daily using
              heavy models and collaborative filtering. This runs for hours
              using massive clusters. Online service reads the precomputed
              candidates (one Redis lookup, under 5ms), applies real-time
              filters (recently watched, device type, current session), and
              re-ranks with a lightweight model in under 100 milliseconds. Total
              cost: batch runs once daily, online only pays for fast lookups and
              light models. Freshness: candidates refresh daily,
              contextualization is real-time. This is the pattern at YouTube,
              Pinterest, LinkedIn feeds: heavy lifting offline, last mile
              online.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Reality Check
            </p>
            <p style="margin-top: 0">
              Real-time serving can cost 5x to 20x more than batch for the same
              number of predictions. Why? You pay for peak capacity 24/7, not
              just the hours you are computing. Warm pools to avoid cold start
              penalties. Redundancy for availability. Networking and
              orchestration overhead. Batch scales to zero. Spin up 10,000 cores
              for 2 hours, process 1 billion predictions, pay for 20,000 core
              hours, done. Real-time serving 1 billion predictions at 10,000 per
              second takes 100,000 seconds (28 hours), but you must provision
              for peak QPS and keep capacity running continuously.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not 'can we afford real-time?' It is 'what is
                the minimum freshness that still achieves business outcomes?'
                Start with the most relaxed freshness, then tighten only where
                value justifies cost."
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Hybrid Breaks Down
            </p>
            <p style="margin-top: 0">
              Hybrid assumes stable batch components and volatile online
              context. This fails when the stable part becomes volatile.
              Example: news recommendation during breaking events. Precomputed
              candidates from this morning miss the story everyone wants now.
              You need either very frequent batch refreshes (every 15 minutes,
              expensive) or shift more logic online (complex). Another failure:
              version skew. Online ranker expects feature schema version N+1
              while batch produced N. Predictions become garbage. Mitigation:
              enforce version pinning and atomic rollouts.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams often default to
              real-time because it "feels modern" without quantifying the actual
              freshness requirement. Measure the business impact of 1 hour
              staleness versus 1 minute staleness. Often the difference is
              negligible but the cost difference is 10x.
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
                  Decision framework: acceptable freshness, per interaction
                  value, read to write ratio, and decomposability determine
                  batch versus real-time choice
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid pattern is the production standard: compute expensive
                  embeddings and candidate sets offline, do lightweight
                  contextualization and re-ranking online
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real-time serving costs 5x to 20x more than batch due to
                  always on capacity, warm pools, redundancy, and provisioning
                  for peak traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch scales to zero cost when idle; real-time requires
                  continuous capacity even during low traffic periods
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose the most relaxed freshness that achieves business
                  outcomes, then tighten only where marginal value justifies
                  marginal cost increase
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
                  Netflix computes top 1000 candidates per user daily in batch,
                  then online service does 5ms Redis lookup plus lightweight
                  re-ranking in under 100ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  News recommendations during breaking events expose hybrid
                  limits: precomputed candidates miss trending stories,
                  requiring frequent batch refreshes or online candidate
                  generation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ad auctions justify real-time cost because milliseconds of
                  latency directly impact revenue; email campaigns tolerate 24
                  hour batch staleness with no business impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchVsRealtimeInferenceBatchVsRealTimeMakingTheChoice;
