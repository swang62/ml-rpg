import type { Component } from "solid-js";

const LessonSchemaEvolutionExpandAndContractPatternForSafeSchemaEvolution: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Expand and Contract Pattern for Safe Schema Evolution
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Deployment Problem:
            </div>
            How do you change a schema in a live system with millions of events
            per second and hundreds of consumers, some of which deploy monthly?
            The naive approach is to change the schema and hope everyone
            upgrades quickly. In practice, this causes outages, data loss, and
            weeks of incident response. The expand and contract pattern is a
            disciplined three phase approach used at companies like LinkedIn and
            Netflix to evolve schemas safely over months, allowing gradual
            migration without breaking existing consumers.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Phase One: Expand:
            </div>
            First, you expand the schema in a backward compatible way. If you
            want to rename total to total_amount, you do not remove total yet.
            Instead, you add total_amount as a new optional field and write both
            fields with the same value. Producers now emit dual format data.
            This phase requires no consumer changes. Old consumers continue
            reading total. New consumers can start reading total_amount. Both
            work simultaneously. You run in this dual mode for a migration
            window, typically measured in weeks or months depending on your
            deployment cadence. For a high volume topic at 200 thousand events
            per second, writing both fields increases payload size by perhaps 10
            to 20 percent for numeric fields. This costs extra network and
            storage but buys you safety. The alternative is coordinating a
            lockstep deployment across thousands of services, which is
            operationally impossible at that scale.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Phase Two: Migrate Consumers:
            </div>
            During the expand phase, you update consumers to use the new field.
            This happens gradually. Critical services upgrade first, then batch
            jobs, then long tail BI dashboards. You monitor consumer lag and
            error rates to ensure no one is breaking. Some consumers may never
            upgrade. For these, you maintain the old field indefinitely or
            deprecate it with a long sunset period. At Netflix scale, some
            internal tools deploy quarterly. You cannot block schema evolution
            on their schedule, so you design for partial migration.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> LinkedIn uses governance tools to
              track which consumers read which fields. Before contracting
              (removing old fields), they run reports showing zero reads of the
              deprecated field over a 30 day window. Only then is it safe to
              proceed to phase three.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Phase Three: Contract:
            </div>
            After all critical consumers have migrated and you have verified
            zero usage of the old field, you contract the schema by removing
            total. Producers stop writing it. The schema is now in its target
            state, with only total_amount. This phase requires careful
            validation. You check audit logs, consumer metrics, and run contract
            tests to ensure no hidden dependencies. A premature contract will
            break unmigrated consumers, forcing a rollback and restarting the
            entire process.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Trade Offs and Costs:
            </div>
            Expand and contract is slow and expensive. For a high value schema
            change, the full cycle may take three months. You pay storage and
            compute costs for dual format data during the expand phase. You also
            pay coordination costs, as schema changes require governance review
            and consumer communication. The alternative is faster but riskier.
            You could use breaking changes with version bumps, creating
            payment_event_v1 and payment_event_v2 as separate topics. This
            avoids the expand phase but fragments your data model. Downstream
            joins and aggregations now need to union across versions, adding
            complexity forever. Most production systems use expand and contract
            for core shared schemas and accept breaking version bumps for
            experimental or low value data. The decision depends on how many
            consumers you have and how critical correctness is. A payments
            pipeline will invest months in expand and contract. A debug logging
            pipeline will break and fix.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 6px">
                  Expand and Contract Timeline
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Week 1-4: Expand Phase
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Producers write both{" "}
                    <code style="padding: 2px 4px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 11px">
                      total
                    </code>{" "}
                    and{" "}
                    <code style="padding: 2px 4px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 11px">
                      total_amount
                    </code>
                    <br />
                    All consumers continue working
                    <br />
                    Payload size +15%, storage cost +15%
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Week 5-10: Migration Phase
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Consumers gradually switch to{" "}
                    <code style="padding: 2px 4px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 11px">
                      total_amount
                    </code>
                    <br />
                    Monitor: Zero reads of{" "}
                    <code style="padding: 2px 4px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 11px">
                      total
                    </code>{" "}
                    for 30 days
                    <br />
                    Long tail BI tools still using old field
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Week 11-12: Contract Phase
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Remove{" "}
                    <code style="padding: 2px 4px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 11px">
                      total
                    </code>{" "}
                    from schema and producers
                    <br />
                    Only{" "}
                    <code style="padding: 2px 4px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 11px">
                      total_amount
                    </code>{" "}
                    remains
                    <br />
                    Payload size and cost return to baseline
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
                  Expand phase adds new fields while keeping old fields, writing
                  dual format data that increases payload size by 10 to 20
                  percent for the migration window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Migration phase updates consumers gradually over weeks or
                  months, with governance tools tracking which consumers read
                  which fields before allowing contraction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Contract phase removes old fields only after verifying zero
                  usage over 30 days, preventing premature removal that would
                  break unmigrated consumers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full expand and contract cycle for high value schemas takes 3
                  months at companies like LinkedIn and Netflix, paying storage
                  costs for safety at 200 thousand events per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alternative approach of version bumping (payment_event_v1,
                  payment_event_v2) avoids expand phase but fragments data
                  model, requiring downstream joins to union across versions
                  forever
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
                  LinkedIn payment event rename: Expand by adding total_amount
                  while keeping total for 6 weeks. Migrate 200 consumers over 8
                  weeks, monitoring reads. Contract after 30 days of zero total
                  reads. Full cycle: 14 weeks.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix high volume topic: At 200k events/sec, expand phase
                  writing both total and total_amount adds 20% payload size.
                  Over 4 week expand phase, extra storage cost is 0.8 PB (200k *
                  4 bytes * 60 sec * 60 min * 24 hr * 28 days * 1.2x = ~800 TB
                  additional).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaEvolutionExpandAndContractPatternForSafeSchemaEvolution;
