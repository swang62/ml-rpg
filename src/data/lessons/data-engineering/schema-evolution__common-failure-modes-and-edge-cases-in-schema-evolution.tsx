import type { Component } from "solid-js";

const LessonSchemaEvolutionCommonFailureModesAndEdgeCasesInSchemaEvolution: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Common Failure Modes and Edge Cases in Schema Evolution
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Unintended Breaking Changes:
            </div>
            The most common failure mode is a change that passes compatibility
            checks but fails in production due to semantic assumptions. Consider
            a field rename from total to total_amount. Technically, this is a
            removal of total and addition of total_amount. Under the hood, it
            satisfies backward compatibility rules if total_amount has a
            default. But old consumers that depend on total start reading null,
            which may silently propagate into metrics. At LinkedIn scale, a
            missing field in a core event type can corrupt dashboards used by
            thousands of internal users before anyone notices. The fix requires
            both reverting the schema change and backfilling corrupted
            aggregates, which can take days for high volume tables.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Type Narrowing and Silent Truncation:
            </div>
            Type changes are another subtle failure. Suppose an id field that
            previously held up to 9 digit integers starts needing 12 digits to
            support international markets. If the schema change narrows or
            changes the type incorrectly (for example, from long to int), some
            runtimes will truncate silently, others will throw exceptions. This
            can cause a small fraction of events, for example 0.1 percent, to
            fail deserialization. In a busy stream processor consuming 100
            thousand events per second, that still means 100 failed events per
            second filling dead letter queues and triggering alerts. The problem
            is hard to debug because 99.9 percent of events work fine. Only edge
            cases with large IDs fail, often from specific geographic regions or
            user cohorts.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Multi Language and Library Incompatibilities:
            </div>
            Multi language ecosystems introduce edge cases. Confluent documents
            real incidents where a change that is technically compatible in Avro
            or Protobuf behaves differently in Java versus Python clients. For
            example, default value handling or enum evolution may differ across
            language implementations. A schema may be backward compatible in
            theory, but a certain client library version mishandles missing
            fields and crashes. This is especially painful during partial
            deployments. A blue green rollout upgrades only half the producers.
            For some period, consumers receive a mix of schema versions. If
            consumers cache schemas aggressively or do not handle per message
            schema identifiers correctly, they can attempt to deserialize with
            the wrong version and fail sporadically.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Aggressive schema caching in
              consumers can cause them to miss new schema versions during
              partial deployments. Always implement per message schema ID
              extraction and cache expiration, not just topic level schema
              lookups at consumer startup.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Data Lake Specific Failures:
            </div>
            In data lakes, schema evolution can break indexing strategies.
            Adding a partition column late or changing the meaning of an
            existing column can cause queries that used to scan a few gigabytes
            to suddenly scan tens of terabytes. This happens because the query
            planner's partition pruning logic relies on consistent partition
            semantics. For example, a table partitioned by date with a country
            column added later will have null country values in historical
            partitions. A query filtering on country equals USA must scan all
            historical partitions (because null could mean USA under old schema)
            even though logically those records predate the feature. Snowflake
            and Databricks users often see cost spikes after schema changes that
            increase column cardinality or add many nullable fields to wide
            tables. A table that grows from 50 to 200 columns over two years
            will have slower full table scans, even with columnar formats,
            because more data must be read from storage per row.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Drift from Uncontrolled Evolution:
            </div>
            Finally, the long term failure mode is schema drift. Without
            governance, teams create many similar but not identical event types
            for the same concept. You end up with user_clicked_v1,
            user_clicked_v2, user_click_event, and click_stream_event, each with
            slightly different field names and types. Downstream pipelines need
            custom logic for each variant, and cross team queries become
            impossible. This is the ultimate failure of schema evolution: Not a
            single breaking change, but death by a thousand uncoordinated
            changes over years.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Type Narrowing Failure
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Schema v1: id (long)</strong>
                  <div style="margin-top: 8px; font-size: 12px; font-family: monospace">
                    Range: 0 to 9,223,372,036,854,775,807
                    <br />
                    Works for: All users globally
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Schema v2: id (int) ⚠️</strong>
                  <div style="margin-top: 8px; font-size: 12px; font-family: monospace">
                    Range: 0 to 2,147,483,647
                    <br />
                    Breaks for: IDs &gt; 2.1B
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 4px">
                  <div style="font-size: 12px">
                    <strong>Impact at 100k events/sec:</strong>
                    <br />
                    0.1% failure rate = 100 failed events/sec
                    <br />
                    Fails only for specific regions with large IDs
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
                  Field renames pass compatibility checks but break consumers
                  semantically, causing silent null propagation into metrics
                  that corrupt dashboards at scale for days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type narrowing (long to int) can cause 0.1 percent
                  deserialization failures, generating 100 failed events per
                  second at 100 thousand events per second throughput for edge
                  case values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi language ecosystems show different behavior for the same
                  schema change across Java and Python clients, especially for
                  default value handling and enum evolution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial deployments with aggressive consumer side schema
                  caching cause sporadic failures when consumers deserialize
                  with wrong cached version instead of per message schema ID
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adding partition columns late or changing column semantics
                  breaks partition pruning, causing queries to scan tens of
                  terabytes instead of gigabytes unexpectedly
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
                  LinkedIn breaking change: Core event type renames field from
                  total to total_amount. Old consumers read null for total,
                  corrupting thousands of dashboards. Fix requires schema revert
                  plus multi day backfill of aggregates.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type narrowing incident: ID field narrows from long to int to
                  support 12 digit international IDs. 0.1% of events from Asia
                  with IDs over 2.1 billion fail deserialization. Dead letter
                  queues fill at 100 events/sec, triggering alerts. Root cause
                  takes hours to find because 99.9% of events work fine.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaEvolutionCommonFailureModesAndEdgeCasesInSchemaEvolution;
