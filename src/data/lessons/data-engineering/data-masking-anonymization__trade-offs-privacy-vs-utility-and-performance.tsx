import type { Component } from "solid-js";

const LessonDataMaskingAnonymizationTradeOffsPrivacyVsUtilityAndPerformance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex: 1 1 0%; min-width: 0px; max-width: 800px; margin: 0px auto;">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Privacy vs Utility and Performance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Central Tension:</strong>
            Every masking decision trades privacy for utility. Aggressive
            anonymization protects users but destroys the signals needed for
            personalization, fraud detection, and churn prediction. The question
            isn't whether to mask, but how much and where.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Reversible Tokenization
                </div>
                <div style="font-size: 12px">
                  Preserves joins and longitudinal analysis. Adds 1 to 5 ms per
                  lookup. Vault becomes attack target and single point of
                  failure.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Stateless Hashing
                </div>
                <div style="font-size: 12px">
                  Scales infinitely, microsecond latency. Irreversible means no
                  recovery for legitimate use cases like support.
                </div>
              </div>
            </div>
            <strong>Utility Trade-off with Real Numbers:</strong>
            Consider user level churn prediction. With full{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              session_duration
            </code>
            , and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              feature_usage
            </code>{" "}
            history, your model achieves 0.85 AUC (Area Under the Curve). Apply
            aggressive anonymization, replacing individual data with cohort
            level statistics (age brackets, regional aggregates, weekly averages
            instead of daily), and AUC drops to 0.68. That's the difference
            between catching 85% of churners and 68%, a massive revenue impact
            for subscription businesses. The decision framework: For customer
            facing fraud detection where false positives hurt conversion, you
            need high fidelity data with minimal masking. Accept the risk and
            implement strong access controls. For internal analytics about
            product adoption trends, cohort level data at 1000+ user groups is
            sufficient. Anonymize aggressively.
            <strong>Performance Trade-off:</strong>
            Applying masking at write time (ingestion) adds 5 to 10 ms to event
            processing but makes all reads safe and fast. Applying at read time
            keeps writes clean but adds 2 to 3 ms per query. At 5000 QPS, that
            read time overhead costs 10 to 15 extra CPU cores and increases your
            p99 latency from 50 ms to 80 ms.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose write time masking when reads outnumber writes 10 to 1
                or more. Choose read time masking when you need flexibility to
                change policies without reprocessing terabytes of historical
                data."
              </div>
            </div>
            <strong>Centralization vs Flexibility:</strong>A central policy
            engine ensures consistency: every system applies the same masking to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              email
            </code>{" "}
            fields. But it's also a bottleneck. Policy changes require
            coordination across 20+ teams. A single misconfiguration breaks
            multiple services simultaneously. Rolling back a policy update might
            require reprocessing days of data. Decentralized approaches (each
            team implements their own masking) move faster but create
            inconsistency. Team A hashes emails with SHA-256, Team B with MD5,
            and suddenly cross team joins fail because the same user has
            different tokens in different systems.
            <div style="margin: 12px 0; border: 2px solid; border-radius: 6px; overflow: hidden">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-weight: 700; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Approach
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Best For
                </div>
                <div style="padding: 8px 12px">Accept</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Tokenization
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Support, reversible
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Latency, vault risk
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Hashing
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Analytics, joins
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Irreversible
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; font-weight: 600">
                  Aggregation
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  External sharing
                </div>
                <div style="padding: 8px 12px">Loss of precision</div>
              </div>
            </div>
            <strong>When NOT to Mask:</strong>
            Don't mask data that fraud or security systems need in real time. A
            fraud detector analyzing 10k transactions per second cannot afford
            even 5 ms of tokenization overhead. These systems work on raw data
            in memory with strict access controls and audit logging instead.
            Don't mask low risk derived metrics. If you've already aggregated to
            daily active users by country, there's no PII left to protect. Over
            masking adds complexity without security benefit.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User level ML models with full history achieve 0.85 AUC;
                  cohort level anonymized data drops this to 0.68, massive
                  impact for churn prediction and personalization quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write time masking costs 5 to 10 ms per event but makes reads
                  fast; read time masking keeps writes clean but adds 2 to 3 ms
                  per query, costing 10 to 15 extra cores at 5k QPS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization enables reversibility for support and compliance
                  but vault becomes single point of failure and adds 1 to 5 ms
                  latency; hashing scales infinitely but is irreversible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose aggressive anonymization (aggregation, generalization)
                  for external sharing or low sensitivity analytics; choose
                  minimal masking (tokenization, partial redaction) for fraud
                  detection and high precision ML
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
                  Subscription business case: fraud model needs user level
                  behavior to achieve 0.85 AUC, accepts tokenization latency;
                  marketing analytics works with weekly cohorts aggregated to
                  1000+ users, uses heavy anonymization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Banking system: transaction fraud runs on raw data in isolated
                  environment with strict access logs, no masking; customer
                  analytics team sees aggregated statistics only with 100+ user
                  minimum group size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce personalization: needs user level purchase history,
                  uses tokenized customer_id; public research dataset uses
                  differential privacy with calibrated noise, loses individual
                  signal but enables external collaboration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real time bidding system: cannot afford tokenization latency,
                  processes raw device IDs in memory with 2 ms TTL (Time To
                  Live), then immediately masks before storage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMaskingAnonymizationTradeOffsPrivacyVsUtilityAndPerformance;
