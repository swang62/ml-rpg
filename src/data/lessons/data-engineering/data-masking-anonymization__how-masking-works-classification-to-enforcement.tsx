import type { Component } from "solid-js";

const LessonDataMaskingAnonymizationHowMaskingWorksClassificationToEnforcement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Masking Works: Classification to Enforcement
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Architecture:</strong>
            Data masking at scale isn't a single operation. It's a pipeline that
            starts with identifying what's sensitive, defining policies, and
            enforcing them consistently across ingestion, storage, and query
            paths. At a company ingesting 100,000 events per second, every event
            must be classified in near real time. The classification layer uses
            three detection methods: schema based rules (columns named{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              email
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              phone_number
            </code>
            ), regex patterns (matching email formats or credit card
            structures), and ML classifiers trained on labeled PII samples to
            catch free form text containing sensitive data.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Ingest Classification:</strong> Events hit the
                  pipeline, and a service detects PII fields using rules and ML
                  models with p50 latency of 20 to 30 milliseconds.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Policy Lookup:</strong> Central policy engine
                  determines transformations per role: analysts see tokenized{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    user_id
                  </code>
                  , support sees last 4 phone digits.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Transformation:</strong> Stateless operations like
                  hashing happen inline. Reversible tokenization calls a vault
                  service with p50 under 3 milliseconds, p99 under 15
                  milliseconds at 10k ops/sec.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Storage:</strong> Masked data lands in data lake and
                  warehouse. Raw PII never touches disk in most systems,
                  reducing breach surface area.
                </div>
              </div>
            </div>
            <strong>Policy Engine in Detail:</strong>
            The policy engine is the brain of the system. It stores rules like{" "}
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Event Stream</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    100k events/sec
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Classification Layer</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Regex + ML + Schema Rules
                  </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center">
                  <div style="text-align: center; font-size: 18px; font-weight: bold">
                    ↙
                  </div>
                  <div style="text-align: center; font-size: 18px; font-weight: bold">
                    ↓
                  </div>
                  <div style="text-align: center; font-size: 18px; font-weight: bold">
                    ↘
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 11px">Hash Email</strong>
                    <div style="font-size: 9px; margin-top: 2px">Stateless</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 11px">Tokenize CC</strong>
                    <div style="font-size: 9px; margin-top: 2px">
                      Vault: 3ms p50
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 11px">Truncate IP</strong>
                    <div style="font-size: 9px; margin-top: 2px">Inline</div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold; margin-top: 4px">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Data Lake/Warehouse</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Masked at rest
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
                  Classification happens at ingest using schema rules, regex
                  patterns, and ML models to detect PII in real time at 100k
                  events per second with 20 to 30 ms p50 latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Central policy engine stores role based rules determining
                  which transformations apply: analysts see tokens, support sees
                  partial data, ML services get aggregated features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization vault enables reversible masking with p50 latency
                  under 3 ms and p99 under 15 ms at 10k operations per second
                  using sharded storage and caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Format preserving transformations maintain structural validity
                  (phone numbers stay 10 digits, emails keep @ symbol) so
                  downstream systems and tests don't break
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
                  Netflix generates synthetic datasets daily for dev/QA where
                  feature distributions are preserved but direct identifiers are
                  removed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google and Meta architectures use central authorization
                  services that all data UIs and APIs consult before executing
                  queries, rewriting them to apply role based masking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization service with consistent hashing ensures same
                  email always maps to same token across all systems, enabling
                  joins while protecting raw PII
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous scanning samples warehouse tables weekly to detect
                  new PII patterns in unclassified columns like free form notes
                  fields
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMaskingAnonymizationHowMaskingWorksClassificationToEnforcement;
