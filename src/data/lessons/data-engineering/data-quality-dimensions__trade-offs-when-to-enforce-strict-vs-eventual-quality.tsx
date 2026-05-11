import type { Component } from "solid-js";

const LessonDataQualityDimensionsTradeOffsWhenToEnforceStrictVsEventualQuality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex: 1 1 0%; min-width: 0px; max-width: 800px; margin: 0px auto;">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: When to Enforce Strict vs Eventual Quality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Trade-off:
            </div>
            The fundamental question is: how strict and how early do you enforce
            each dimension, and what are you willing to pay in latency,
            availability, and complexity? There is no universal answer. The
            decision depends on use case criticality, read versus write ratio,
            and tolerance for temporary inconsistency.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Strict Validation at Ingestion
                </div>
                <div style="font-size: 12px">
                  Zero bad data enters, but p99 latency increases from 50ms to
                  150ms. Risk of blocking pipeline if validators overloaded.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Light Validation + Downstream Audits
                </div>
                <div style="font-size: 12px">
                  Fast ingestion (50ms p99), but some bad data exists
                  temporarily. Quarantined later by audits.
                </div>
              </div>
            </div>
            <strong>Accuracy: Front Door vs Downstream Filtering</strong>
            Strict accuracy checks at ingestion prevent bad data from polluting
            downstream systems. The cost is higher latency and potential
            availability impact. If your validator rejects events or blocks
            waiting for external lookups like currency validation, you risk
            drops when validators are overloaded. Some companies choose lighter
            validation at the edge: check basic types and ranges, but defer
            semantic validation to downstream processing where you can
            quarantine bad data without blocking ingestion. Decision criteria:
            Use strict ingestion validation when bad data has immediate user
            facing impact (payment processing, inventory updates) or when
            downstream correction is very expensive (retraining machine learning
            models). Use eventual validation when you can tolerate temporary bad
            data and when ingestion throughput is critical (logging, analytics
            events at over 100,000 events per second).
            <strong>Completeness: Speed vs Integrity</strong>
            You can run a report on partial data quickly, or wait until you are
            confident all data arrived. The trade off is explicit. A dashboard
            that refreshes every 2 minutes shows 95 to 98 percent of data.
            Waiting 30 minutes gets you to 99.95 percent. For operational
            dashboards where directional trends matter more than exact counts,
            fast and incomplete wins. For financial reporting or compliance
            where every transaction must be accounted for, slow and complete is
            mandatory. Decision criteria: Real time operational metrics tolerate
            2 to 5 percent incompleteness for speed. Financial aggregates,
            Service Level Agreement (SLA) reporting, and compliance audits
            require 99.9+ percent completeness even if it means 30 to 60 minute
            lag.
            <strong>
              Consistency: Synchronous Coordination vs Eventual Reconciliation
            </strong>
            Strong cross system consistency requires coordination, possibly
            distributed transactions. This limits throughput and increases
            latency. At write rates above 50,000 per second, synchronous
            consistency becomes a bottleneck. Most high scale systems accept
            eventual consistency and rely on periodic reconciliation jobs to
            catch drift. The trade off is that for some window (often minutes to
            hours), downstream analytics might observe contradictory states.
            <div style="margin: 12px 0; border: 2px solid; border-radius: 6px; overflow: hidden">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-weight: 700; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Property
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Sync Consistency
                </div>
                <div style="padding: 8px 12px">Eventual Consistency</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Write Throughput
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  10k to 20k/sec
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  100k+ per second
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Lag Window
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  None
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Minutes to hours
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; font-weight: 600">
                  Use Case
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Banking, inventory
                </div>
                <div style="padding: 8px 12px">Social feeds, analytics</div>
              </div>
            </div>
            Decision criteria: Use synchronous consistency when correctness is
            non negotiable and write throughput is moderate (banking
            transactions, inventory reservations). Use eventual consistency with
            reconciliation when you can tolerate temporary drift and need high
            write throughput (user activity logging, metrics collection, social
            media feeds).
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not whether to enforce quality, but where in
                the pipeline and at what cost. Every choice is a trade off
                between catching errors early versus maintaining throughput and
                availability."
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
                  Strict ingestion validation increases p99 latency by 3x (50ms
                  to 150ms) but prevents bad data from entering the system
                  entirely
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fast dashboards trade completeness for speed: 2 minute refresh
                  shows 95 to 98 percent of data versus 30 minute wait for 99.95
                  percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Synchronous consistency limits write throughput to 10,000 to
                  20,000 per second versus 100,000+ per second with eventual
                  consistency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use strict validation when bad data has immediate user impact
                  or expensive downstream correction costs like model retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Eventual consistency with reconciliation works when temporary
                  contradictions are tolerable and write throughput requirements
                  exceed 50,000 per second
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
                  Payment processing uses strict ingestion validation despite
                  150ms p99 latency because incorrect amounts have immediate
                  financial and legal consequences.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Social media analytics accepts 2 to 5 percent data
                  incompleteness in real time dashboards, running reconciliation
                  jobs hourly to catch up to 99.9 percent for billing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High volume logging systems at over 100,000 events per second
                  use light ingestion checks and quarantine invalid data in
                  downstream batch processing to avoid blocking ingestion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityDimensionsTradeOffsWhenToEnforceStrictVsEventualQuality;
