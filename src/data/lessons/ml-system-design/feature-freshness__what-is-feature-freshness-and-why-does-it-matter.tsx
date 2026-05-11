import type { Component } from "solid-js";

const LessonFeatureFreshnessWhatIsFeatureFreshnessAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Feature Freshness and Why Does It Matter?
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
                <strong>Feature freshness</strong> is the age of a feature value
                relative to when it is used for prediction, calculated as the
                current time minus the event time that produced the feature.
                When this age exceeds an agreed SLA, the feature is considered
                stale.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Example
            </p>
            <p style="margin-top: 0">
              If a fraud detection feature showing "number of transactions in
              last 5 minutes" was computed 3 minutes ago, its freshness is 3
              minutes. The 3 minute delay may or may not be acceptable depending
              on your SLA.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness Requirements by Use Case
            </p>
            <p style="margin-top: 0">
              Fraud signals and live inventory at companies like Uber must have
              p95 freshness under 5 to 10 seconds because stale data leads to
              incorrect pricing or fraud going undetected. In contrast, user
              embeddings or long term purchase history at Netflix can tolerate
              24 hour staleness since they capture stable patterns.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sensitivity Analysis
            </p>
            <p style="margin-top: 0">
              The impact of staleness must be measured experimentally. LinkedIn
              found that for real time ranking, features representing "clicks in
              last hour" degraded Click Through Rate (CTR) by 3% when served 5
              minutes stale, while "lifetime click count" showed no measurable
              impact even with 24 hour staleness.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Trade-off Triangle
            </p>
            <p style="margin-top: 0">
              Freshness trades directly against latency and cost. Achieving sub
              second freshness requires streaming infrastructure with always on
              compute, adding 10 to 50x cost compared to hourly batch updates.
              The engineering question is: what freshness SLA does each feature
              need to maintain model quality, and what is the minimum cost to
              achieve it?
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Realtime Tier</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    p95 age &lt; 5s | Fraud signals, live inventory
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Nearline Tier</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    p95 age &lt; 5m | User activity, session counters
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Batch Tier</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    p95 age &lt; 24h | User embeddings, lifetime value
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
                  Freshness is calculated as now minus event time, not
                  processing time. A feature computed from a 10 minute old event
                  is 10 minutes stale even if computation just finished.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber marketplace inference runs at over 100k Queries Per
                  Second (QPS) globally during peaks with only 20 to 50ms total
                  prediction budget, leaving 5 to 15ms p99 for feature
                  retrieval.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Staleness harms business metrics measurably. DoorDash found
                  that delivery time predictions degrade significantly when
                  store busy state features exceed 60 seconds of age during peak
                  hours.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Most production systems define three tiers: realtime (p95
                  under 5 seconds), nearline (p95 under 5 minutes), and batch
                  (p95 under 24 hours) with different infrastructure for each.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitoring must track distributions, not averages. A p50
                  freshness of 2 seconds with p99 of 5 minutes means 1% of
                  predictions use critically stale data, causing bad user
                  experiences.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness requirements should be validated through A/B
                  testing. Netflix only pushes features to real time
                  infrastructure when experiments prove that reducing staleness
                  improves Click Through Rate (CTR) or engagement.
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
                  Uber dynamic pricing uses features like nearby driver supply
                  with p95 freshness under 10 seconds. If this goes stale by 5
                  minutes during rush hour, surge multipliers become inaccurate
                  and drivers are misallocated.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn feed ranking combines daily batch user embeddings (24
                  hour staleness acceptable) with nearline engagement signals
                  (updated within 60 seconds) to balance freshness and cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix homepage ranking accepts 24 hour staleness for heavy
                  recommendation embeddings while computing context features
                  like time of day and device type at request time for sub 50ms
                  latency.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureFreshnessWhatIsFeatureFreshnessAndWhyDoesItMatter;
