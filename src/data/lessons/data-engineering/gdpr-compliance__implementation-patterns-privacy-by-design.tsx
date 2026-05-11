import type { Component } from "solid-js";

const LessonGdprComplianceImplementationPatternsPrivacyByDesign: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Patterns: Privacy by Design
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Architecture Components:</strong>
            GDPR compliance at scale requires systematic architectural patterns,
            not ad hoc solutions. These patterns embed privacy controls into
            your data platform from the ground up, making compliance automatic
            rather than manual.
            <strong>Pattern 1: PII Isolation with surrogate keys</strong>
            Use surrogate keys for internal references and keep mapping from
            real world identifiers (email, phone, government identifier) in
            small, heavily protected identity store. Downstream data lakes and
            warehouses operate on surrogate keys like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              surrogate_id=abc123
            </code>
            , not raw email addresses. This sharply limits where direct PII
            exists, reducing your blast radius for breaches and simplifying
            deletion.
            <strong>
              Pattern 2: Data catalog with automated classification
            </strong>
            Maintain central catalog that knows every dataset, its schema, and
            classification of each column as PII, quasi identifier, or non
            sensitive. Integrate automated scanners that detect likely PII
            patterns using regular expressions and machine learning, quarantine
            new datasets until reviewed. This becomes source of truth when
            processing deletion requests or compliance audits. At scale, manual
            classification is impossible; automation is mandatory.
            <strong>Pattern 3: Consent and purpose service</strong>
            Separate service stores user consents and allowed purposes for each
            data category. All data production and consumption code queries this
            service, either inline or via replicated policy caches, to decide
            which events to drop, tag, or route. For example, recommendation
            engine checks if user consented to personalization before reading
            their browsing history. Service must handle 100,000 to 500,000
            requests per second with p99 latency under 10 milliseconds to avoid
            becoming bottleneck.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Tokenization Service Requirements
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">500k/s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    THROUGHPUT
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;10ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 LATENCY
                  </div>
                </div>
              </div>
            </div>
            <strong>Pattern 4: Field level protection with tokenization</strong>
            Apply tokenization, hashing, or encryption at field level for PII.
            Tokenization systems provide stable tokens for linkage: each email
            maps to consistent token like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              token_8f3a2b
            </code>
            , allowing analytics and joins while keeping raw PII in minimal key
            vault. Challenge is this system must scale with total write traffic,
            requiring distributed token generation with 100,000 to 500,000
            requests per second throughput and sub 10 millisecond p99 latency.
            <strong>Pattern 5: Tiered storage with retention</strong>
            Implement scheduled jobs that enforce retention policies, dropping
            or aggregating events older than 13 months. Use tiered storage where
            older data is more heavily aggregated and stripped of PII. For
            example, raw logs for 30 days, pseudonymized session level data for
            1 year, only coarse aggregates beyond that. This automatically
            reduces compliance scope as data ages.
            <strong>Pattern 6: Access control with audit logging</strong>
            Use role based and attribute based access controls for analytical
            stores. Log all access to PII or sensitive datasets with user
            identity, purpose, query text, and context. Retain these audit logs
            securely to demonstrate compliance. For high risk access patterns
            (querying millions of user records), require additional approval
            workflows and automated anomaly detection.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "At scale, you cannot manually track compliance. You must
                architect systems where privacy controls are automatic,
                auditable, and impossible to bypass."
              </div>
            </div>
            <strong>Handling 10x Scale Growth:</strong>
            As you grow from 100 terabytes to multiple petabytes, these patterns
            must scale horizontally. Tokenization service becomes distributed
            with consistent hashing for token stability. Data catalog shards by
            dataset namespace. Deletion orchestrator uses partitioned queues to
            parallelize work. The key insight is that privacy infrastructure
            must scale like any other critical path system, with capacity
            planning, load testing, and redundancy built in from day one.
            Companies that treat compliance as afterthought find themselves
            unable to meet SLAs when data volume explodes.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Surrogate keys in downstream systems with real identifiers
                  only in isolated identity store reduces PII blast radius and
                  simplifies deletion across distributed datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated data catalog classification using regular
                  expressions and machine learning is mandatory at scale; manual
                  classification cannot keep pace with new dataset creation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consent and purpose service must handle 100k to 500k requests
                  per second with p99 latency under 10ms to avoid becoming
                  bottleneck in data pipeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization systems provide stable tokens for linkage (each
                  email maps to consistent token) requiring distributed
                  architecture for 100k to 500k requests per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tiered storage with retention automatically reduces compliance
                  scope: raw logs 30 days, pseudonymized sessions 1 year, coarse
                  aggregates only beyond that
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Access to PII requires audit logging with user identity,
                  purpose, and query context, plus automated anomaly detection
                  for high risk patterns like querying millions of records
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
                  User table uses &lt;code&gt;surrogate_id=abc123&lt;/code&gt;
                  everywhere; only identity service maps to actual email.
                  Deletion request deletes identity mapping, orphaning surrogate
                  key across all systems.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization service uses consistent hashing across 20 nodes,
                  maps email john@example.com to stable token_8f3a2b, achieving
                  450k requests per second with p99 latency 8ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scheduled retention job runs weekly, drops raw clickstream
                  events older than 30 days, aggregates 30 to 365 day data to
                  hourly summaries, keeps only daily totals beyond 1 year
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGdprComplianceImplementationPatternsPrivacyByDesign;
