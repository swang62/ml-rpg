import type { Component } from "solid-js";

const LessonAvroSchemaRegistryFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>When Schema Evolution Goes Wrong:</strong> The most insidious
          failure mode is an incompatible schema change that bypasses registry
          checks. Imagine compatibility enforcement is accidentally disabled or
          the wrong subject naming strategy is configured. A producer changes a
          field from{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            order_amount
          </code>{" "}
          (string) to{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            order_amount
          </code>{" "}
          (integer) without adding a new field name. The registry registers this
          breaking change. Consumers that have not updated their reader schemas
          now fail deserialization with cryptic type mismatch errors. This gets
          worse with historical data. A batch job reading three month old events
          suddenly crashes because it encounters the new incompatible schema
          mixed with old data. The fix requires either rolling back the schema
          change (if caught quickly) or deploying updated reader code to all
          consumers before the producer change, which defeats the purpose of
          independent evolution. Prevention requires strict governance: enforce
          compatibility modes (backward transitive at minimum) with monitoring
          and alerting on registry rejections.
          <strong>Partial Rollout Chaos:</strong> Multi region deployments
          create timing hazards. Region A upgrades producers to schema version
          8, but region B consumers still only handle version 6. If
          compatibility is backward only (not forward), consumers in region B
          fail when they encounter fields from version 8 that they do not
          understand. The safe rollout sequence is always N plus 1: first
          upgrade ALL consumers globally to support both old and new schemas,
          validate with canary topics and metrics, then upgrade producers.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Rollout Failure Timeline
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">HOUR 0</div>
                <div style="font-size: 16px; font-weight: 800">Normal</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">HOUR 2</div>
                <div style="font-size: 16px; font-weight: 800">Producer v8</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">HOUR 3</div>
                <div style="font-size: 16px; font-weight: 800">Failures</div>
              </div>
            </div>
          </div>
          <strong>Schema Registry as Single Point of Failure:</strong> If the
          registry becomes unavailable or p99 latency spikes beyond 200 ms,
          producers attempting to register new schemas will timeout or fail.
          Steady state traffic continues because clients cache schemas, but
          deployments requiring new schema versions are blocked. At scale, this
          is catastrophic. A deployment window for 500 microservices stalls
          because the registry is down. Mitigation requires multi node registry
          with synchronous replication and quorum writes (typically 3 or 5
          nodes). Monitor registry Queries Per Second (QPS), p99 latency (target
          under 50 ms), and error rates. Implement cross region disaster
          recovery with careful schema identifier (ID) coordination to prevent
          divergence. Some companies run active passive registry clusters with
          automated failover.
          <strong>Subtle Edge Cases:</strong> Union types and nullable fields
          create tricky evolution paths. Changing a field from{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            union [null, string]
          </code>{" "}
          to{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            union [null, int]
          </code>{" "}
          is technically a type change and typically breaks compatibility, even
          though both are nullable. Another trap: schema retention policies. If
          Kafka uses log compaction or short retention (7 days) but the registry
          keeps schemas forever, you accumulate thousands of versions for topics
          that no longer exist. Implement schema lifecycle governance: deprecate
          unused schemas, archive old versions, and enforce retention limits per
          subject.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Test schema evolution in staging with
            realistic data volumes and latency profiles. Simulate partial
            rollouts and registry outages. Many teams discover compatibility
            issues only in production when it is too late.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Incompatible schema changes that bypass registry checks cause
                silent failures in consumers, especially when reading historical
                data from topics with long retention
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Safe rollouts require N plus 1 deployments: upgrade all
                consumers to handle new schemas BEFORE upgrading producers to
                emit them
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema Registry outages block new schema registrations, stalling
                deployments even though steady state traffic continues with
                cached schemas
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Union type changes (such as from nullable string to nullable
                int) break compatibility despite both being nullable, requiring
                careful evolution planning
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema lifecycle governance is needed to prevent accumulating
                thousands of unused schema versions when topics are deleted or
                deprecated
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
                A producer accidentally registers a schema changing
                &lt;code&gt;price&lt;/code&gt; from string to int. Three weeks
                later, a batch job reprocessing old events fails because it
                encounters the type mismatch in historical data.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                During a multi region rollout, region A producers emit schema
                v10 while region B consumers only support v8. Forward
                incompatibility causes consumer lag to spike and alerts fire
                across monitoring dashboards.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema Registry p99 latency degrades to 500 ms during peak
                traffic. New microservice deployments requiring schema
                registration timeout, blocking a critical feature launch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAvroSchemaRegistryFailureModesAndEdgeCases;
