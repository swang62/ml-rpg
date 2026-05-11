import type { Component } from "solid-js";

const LessonSchemaValidationSchemaEnforcementModesAndEvolutionPolicies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Schema Enforcement Modes and Evolution Policies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Four Enforcement Strategies:
            </div>
            When data violates a schema, you need a policy. This is not just a
            technical choice but a business decision about availability,
            correctness, and operational burden.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Hard Fail:</strong> Reject the write or message
                  entirely. Increment error counters and raise alerts. This is
                  what Delta Lake does: schema mismatches are rejected
                  immediately. Use for critical data where correctness matters
                  more than availability.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Quarantine:</strong> Accept the batch but route
                  invalid rows to a separate table or topic with different
                  retention. This maintains pipeline availability while
                  isolating bad data for inspection. Adds complexity but
                  prevents total outages.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Coerce and Log:</strong> Attempt type conversions
                  (string to integer), fill nulls with defaults, and emit
                  detailed warnings. Keeps data flowing but risks silent
                  correctness degradation. Monitor conversion rates closely.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Auto Evolution with Guardrails:</strong> If the change
                  is compatible (adding nullable field), automatically update
                  schema and record the change. If potentially breaking (type
                  narrowing), require manual approval. Balances automation with
                  safety.
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Evolution Compatibility Modes:
            </div>
            At FAANG scale, schema changes are constant. The key is controlled
            evolution with clear compatibility guarantees. Most companies adopt
            explicit modes:
            <div style="margin: 12px 0; border: 2px solid; border-radius: 6px; overflow: hidden">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-weight: 700; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Mode
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Guarantee
                </div>
                <div style="padding: 8px 12px">Constraint</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Backward
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  New schema reads old data
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Add optional fields only
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Forward
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Old readers consume new data
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Restrict field removal
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; font-weight: 600">
                  Full
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Both directions work
                </div>
                <div style="padding: 8px 12px">
                  Strictest: optional adds only
                </div>
              </div>
            </div>
            Backward compatibility means new code can read old data. You may add
            optional fields or relax constraints but cannot remove required
            fields. Forward compatibility means old code can consume new data,
            constraining how you add fields. Full compatibility is the
            strictest: both directions must work.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Validating 1 billion records in
              a daily batch with 1 ms per record means 277 hours of compute
              time. Use vectorized validation or statistical sampling to keep
              validation cost reasonable at scale.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Integration with Governance:
            </div>
            Mature systems integrate schema enforcement with data catalogs and
            lineage tracking. When a producer proposes a schema change, the
            system identifies impacted downstream pipelines automatically. You
            can coordinate rollout, notify affected teams, and run compatibility
            checks before deployment. This is the difference between ad hoc
            validation and production grade schema governance that interviewers
            expect at scale.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Schema Change Proposed
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Add optional field: is_premium
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Compatibility Check</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Mode: Backward compatible
                  </div>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 16px; font-weight: bold">
                      ✓ Compatible
                    </div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 11px; max-width: 140px">
                      Auto update schema, notify 47 downstream consumers
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 16px; font-weight: bold">
                      ✗ Breaking
                    </div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 11px; max-width: 140px">
                      Require manual approval from affected teams
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
                  Four enforcement modes: hard fail (reject for critical data),
                  quarantine (isolate bad rows while maintaining availability),
                  coerce and log (convert types with warnings), auto evolve with
                  guardrails (update compatible changes automatically)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution compatibility modes provide guarantees:
                  backward (new schema reads old data), forward (old readers
                  consume new data), full (both directions work with strictest
                  constraints)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale, validation cost matters: validating 1 billion
                  records at 1 ms each requires 277 hours of compute. Use
                  vectorized validation or statistical sampling to keep costs
                  reasonable.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems integrate schema enforcement with data
                  catalogs to identify impacted downstream pipelines when
                  changes are proposed, enabling coordinated rollout and
                  automated compatibility checks
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
                  Delta Lake uses hard fail enforcement: a write with schema
                  mismatch is immediately rejected with detailed error metadata,
                  preserving data integrity but requiring manual intervention
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A streaming pipeline uses quarantine mode: invalid events are
                  routed to a separate Kafka topic with 7 day retention for
                  debugging, while valid events flow to production with zero
                  downtime
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn enforces backward compatibility on Kafka topics:
                  producers can add optional fields freely, but removing or
                  changing required fields requires approval from all registered
                  consumer teams
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaValidationSchemaEnforcementModesAndEvolutionPolicies;
