import type { Component } from "solid-js";

const LessonDataAnonymizationProductionImplementationMultiTierPiiDetectionPipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Multi-Tier PII Detection Pipeline
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
                A <strong>Multi-Tier PII Detection Pipeline</strong> combines
                rule-based regex, NER models, and statistical methods to
                identify PII across data sources before ML training.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TIER 1: RULE-BASED DETECTION
            </p>
            <p style="margin-top: 0">
              Deterministic regex patterns for structured PII: emails, phone
              numbers, credit cards, SSNs, IPs. Fast (microseconds per record),
              high precision for well-formatted data, but misses variations and
              cannot detect free-text PII like names in sentences.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TIER 2: NER-BASED DETECTION
            </p>
            <p style="margin-top: 0">
              Named entity recognition (fine-tuned BERT or spaCy) detects PII in
              unstructured text: names, addresses, organizations. Set confidence
              thresholds based on risk—high-sensitivity data uses lower
              thresholds (more false positives, fewer misses).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> NER requires domain-specific
              training. A medical NER may miss financial PII patterns. Build
              specialized models per domain or ensemble multiple models.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TIER 3: STATISTICAL DETECTION
            </p>
            <p style="margin-top: 0">
              Detects quasi-identifiers by analyzing column uniqueness and
              correlation. High-cardinality columns are flagged as potential
              identifiers. Correlation analysis identifies field combinations
              enabling re-identification even when individual fields appear
              safe.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PIPELINE ARCHITECTURE
            </p>
            <p style="margin-top: 0">
              Run tiers sequentially: regex first (fast), NER second (broader
              coverage), statistical last (batch). Log detected PII with
              confidence for human review. Build feedback loops where reviewers
              correct mistakes to improve accuracy.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Aggressive detection (lower
              thresholds) catches more PII but increases false positives,
              requiring more review and potentially anonymizing useful
              non-sensitive data.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 620px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Tier 1: Schema Validation</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Latency: under 1ms | Coverage: 100% structured
                    <br />
                    Drop: email, full IP, GPS &gt; 3 decimals
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ 200K events/sec
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Tier 2: Pattern Detectors + Token Vault</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Latency: 2 to 8ms | Coverage: 80 to 90% structured
                    <br />
                    Regex: CC, SSN, emails | Vault: 50K ops/sec
                  </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="flex: 1; text-align: center; font-size: 18px; font-weight: bold">
                    ↓ Hot path
                    <br />
                    (redacted)
                  </div>
                  <div style="flex: 1; text-align: center; font-size: 18px; font-weight: bold">
                    → Side stream
                    <br />
                    (samples)
                  </div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">
                      Real-time dashboards
                    </strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      p95 &lt; 250ms
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Tier 3: NER (async)</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      0.5 to 0.8s/doc
                      <br />
                      Retroactive patch
                    </div>
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
                  Multi-tier detection combines regex (fast, structured), NER
                  (unstructured text), and statistical analysis
                  (quasi-identifiers)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NER models require domain-specific training—medical NER may
                  miss financial PII patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical methods detect quasi-identifiers through
                  uniqueness and correlation analysis
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
                  Run tiers sequentially: regex first for speed, NER for
                  coverage, statistical for quasi-identifier discovery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Build feedback loops where human reviewers correct false
                  positives to improve detection
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataAnonymizationProductionImplementationMultiTierPiiDetectionPipeline;
