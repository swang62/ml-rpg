import type { Component } from "solid-js";

const LessonDataFederationFederationFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Federation Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Failure Mode 1: Tail Latency Amplification</strong>
            The most common production issue is that a single slow source
            dominates end to end latency. Your federation query fans out to 4
            systems. Three respond in 150ms, but the fourth, a SaaS CRM with API
            rate limits, takes 8 seconds during peak hours. Your p50 latency is
            200ms, but p95 explodes to 8+ seconds, violating Service Level
            Objectives (SLOs). This gets worse at scale. With 15 queries per
            second touching 3 sources each, you generate 45 subqueries per
            second. If each source can handle only 10 concurrent queries before
            queuing, you hit limits quickly. One slow source creates a backlog
            that cascades.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Tail Latency Cascade
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SOURCE 1-3
                  </div>
                  <div style="font-size: 16px; font-weight: 800">150 ms</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">+</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SOURCE 4 (SLOW)
                  </div>
                  <div style="font-size: 16px; font-weight: 800">8 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">=</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">TOTAL P95</div>
                  <div style="font-size: 16px; font-weight: 800">8+ sec</div>
                </div>
              </div>
            </div>
            Mitigation requires per source timeouts (kill subqueries after 2 to
            3 seconds), circuit breakers (stop querying a failing source), and
            fallback strategies (return partial results with warnings). You also
            need per source concurrency limits and query queuing to prevent
            overwhelming operational systems.
            <strong>Failure Mode 2: Partial Unavailability</strong>
            What happens when one source is down, behind a maintenance window,
            or rate limited? Some systems return partial results with warnings.
            Others fail the entire query for correctness. For compliance
            critical financial reports, partial data may be unacceptable. For
            exploratory analytics, it might be fine. You need explicit policies:
            Does this query require all sources? Can it proceed with 3 of 4? Do
            you return cached stale data or fail fast? These decisions affect
            both user experience and compliance posture.
            <strong>Failure Mode 3: Cross System Consistency</strong>
            Joining an orders table from a replicated OLTP database with
            inventory from a data lake snapshot creates temporal inconsistency.
            You might see orders newer than the inventory snapshot. At financial
            or regulatory scale, this creates audit issues. Strictly consistent
            snapshots across independent systems require coordination. Change
            Data Capture (CDC) can create aligned views by tagging events with
            logical timestamps. Without this, federation alone cannot guarantee
            cross system consistency. You are trading consistency for
            availability and partition tolerance (classic CAP theorem trade
            off).
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Federation gives you availability
              and partition tolerance, but cross system consistency requires
              additional infrastructure like CDC with logical timestamps or
              distributed transactions.
            </div>
            <strong>Failure Mode 4: Schema Drift</strong>A SaaS provider renames{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              customer_email
            </code>{" "}
            to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              email_address
            </code>
            . Federated queries relying on the old field name fail at runtime.
            Without strong metadata management, contract testing, and schema
            versioning, this breaks many dashboards simultaneously. Production
            systems use schema registries, automated compatibility checks, and
            gradual rollouts. When a source schema changes, you need a grace
            period where both old and new schemas work, giving consumers time to
            migrate.
            <strong>Failure Mode 5: Security Leaks</strong>
            Federation is where global access control is enforced. Misconfigured
            row level filters or masking rules can expose sensitive data that
            was previously protected by system boundaries. In a healthcare
            scenario, if federation incorrectly applies filters, analysts might
            see patient records they should not access. Defense requires
            centralized policy management, automated testing of access rules
            against test data, and audit logging of all data access. Every query
            should log who accessed what from which sources, enabling forensic
            analysis if a leak occurs.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-align: center">
                Failure Cascade Timeline
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="width: 60px; font-size: 11px; font-weight: 700">
                    T=0
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Normal:</strong> 15 QPS, p95 = 500ms
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="width: 60px; font-size: 11px; font-weight: 700">
                    T=30s
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>SaaS API slow:</strong> One source at 6s latency
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="width: 60px; font-size: 11px; font-weight: 700">
                    T=60s
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Queue builds:</strong> 45 subqueries/sec exceed 10
                    concurrent limit
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="width: 60px; font-size: 11px; font-weight: 700">
                    T=90s
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Cascade:</strong> p95 &gt; 10s, timeouts, user
                    complaints
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
                  Tail latency amplification: one slow source (8 seconds) among
                  four fast ones (150ms) drives p95 to 8+ seconds, violating
                  SLOs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross system consistency requires CDC or distributed
                  transactions; naive federation can show orders newer than
                  inventory snapshots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema drift in SaaS sources breaks federated queries at
                  runtime without schema registries and contract testing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Security misconfiguration in federation layer can expose data
                  across system boundaries that were previously isolated
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mitigation requires per source timeouts (2 to 3 seconds),
                  circuit breakers, concurrency limits (5 to 10 queries), and
                  partial result policies
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
                  Production incident: Salesforce API rate limit hit during peak
                  hours, causing 8 second latency that cascaded to all federated
                  queries touching CRM data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial audit failure: Orders from real time database joined
                  with 2 hour old inventory snapshot showed negative inventory,
                  requiring CDC based alignment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema change: SaaS provider renamed customer_email field,
                  breaking 40 federated dashboards until metadata was updated
                  and queries migrated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataFederationFederationFailureModesAndEdgeCases;
