import type { Component } from "solid-js";

const LessonDataQualityDimensionsProductionRealityQualityAtNetflixAndUberScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Reality: Quality at Netflix and Uber Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Scale Context:
            </div>
            At 20 billion events per day like Uber, or petabytes of viewing data
            like Netflix, manual quality checks are impossible. These companies
            build automated systems that define, measure, and enforce quality
            dimensions continuously. The key shift is treating data quality as
            infrastructure, not as an afterthought.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Two Tier Metrics Architecture:
            </div>
            Netflix and similar companies often expose two layers of metrics to
            balance speed versus correctness. A "near real time" dashboard
            updates within 2 to 5 minutes but is only 95 to 99 percent complete.
            A "financially correct" dashboard waits 30 to 60 minutes to ensure
            99.99 percent completeness and passes all reconciliation checks.
            This dual approach lets product teams iterate fast while finance and
            compliance teams get guaranteed accuracy.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Dashboard Latency vs Completeness Trade-off
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    REAL TIME (95% COMPLETE)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">45 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    FINANCIAL (99.99% COMPLETE)
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Automated Anomaly Detection:
            </div>
            When scale grows 10x, manual rule maintenance breaks down.
            Production systems introduce statistical profiling that learns
            normal distributions, correlations, and seasonality for each dataset
            automatically. If a feature for a machine learning model suddenly
            becomes constant or its variance drops by 95 percent, the system
            flags it even if static quality checks pass. For example, if average
            trip distance normally varies between 3 and 8 kilometers with a
            standard deviation of 2 kilometers, and suddenly all values cluster
            around exactly 5 kilometers, this signals a data generation bug.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Partition Level Granularity:
            </div>
            Completeness failures often hide in aggregate metrics. A single
            Kafka partition may get stuck, causing event loss for a subset of
            users while global volume looks normal. High scale systems monitor
            at partition level granularity. At Uber scale with hundreds of
            partitions per topic, monitoring compares each partition's
            throughput to its own baseline and to peer partitions, catching
            localized failures that would be invisible in aggregate.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> A sports betting service might
              see 5x traffic during a championship game. Naive completeness
              alerts tuned to "3x deviation from baseline" will fire constantly.
              You need contextual baselines that account for scheduled events,
              seasonality, and known traffic patterns to avoid alert fatigue.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Source of Truth Definitions:
            </div>
            At Meta scale where data exists in dozens of systems, consistency
            requires explicit "source of truth" definitions per entity. When
            user profile data conflicts between cache and database, which system
            wins? These decisions are documented in data contracts and enforced
            by reconciliation jobs. For financial data like ad spend, billing
            system is typically source of truth. For user behavior data, event
            logs are authoritative. Clear ownership prevents endless debates
            during incident response.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Cost of Quality:
            </div>
            Strict validation is not free. Enforcing accuracy checks at
            ingestion can increase p99 latency from 50 milliseconds to 150
            milliseconds. Strong consistency checks across services can limit
            throughput, especially above 50,000 writes per second. Production
            systems make explicit trade offs: lighter validation at high
            throughput edges, heavier audits in batch processing where latency
            matters less.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two tier metrics provide both speed for product iteration (2
                  to 5 minutes, 95 to 99 percent complete) and accuracy for
                  financial reporting (30 to 60 minutes, 99.99 percent complete)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical profiling automatically detects anomalies like
                  sudden distribution shifts or variance drops, catching
                  semantic issues that pass static validation rules
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition level monitoring catches localized failures
                  invisible in aggregate metrics, critical when processing
                  hundreds of partitions per topic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Source of truth definitions per entity prevent consistency
                  conflicts when data exists in multiple systems, explicitly
                  documented in data contracts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strict quality enforcement has measurable costs: p99 latency
                  can increase from 50 milliseconds to 150 milliseconds with
                  thorough validation at ingestion
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
                  Netflix exposes real time dashboard for product teams (2
                  minute lag, 97 percent complete) and financial dashboard for
                  billing (45 minute lag, 99.99 percent complete with full
                  reconciliation).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical anomaly detection flags when average trip distance
                  variance drops from 2 kilometers standard deviation to 0.1
                  kilometers, signaling data generation bug even though values
                  are valid.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition monitoring at Uber detects single stuck Kafka
                  partition losing 10,000 events per minute while aggregate
                  topic throughput appears normal.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityDimensionsProductionRealityQualityAtNetflixAndUberScale;
