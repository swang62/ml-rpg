import type { Component } from "solid-js";

const LessonSchemaEvolutionUnderstandingCompatibilityModesBackwardForwardAndFull: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Understanding Compatibility Modes: Backward, Forward, and Full
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Three Directions:
            </div>
            Compatibility is not binary. There are three distinct directions,
            each enabling different deployment strategies. Backward
            compatibility means a new schema can read data written with older
            schemas. This lets you upgrade consumers first. Forward
            compatibility means old schemas can read data written with newer
            schemas, so you can upgrade producers first. Full compatibility
            guarantees both directions, allowing upgrades in any order. These
            are not theoretical concepts. They dictate your deployment rollout
            plan and determine what changes are safe.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Backward Compatibility in Practice:
            </div>
            With backward compatibility, you deploy consumers before producers.
            Suppose your event has three fields in version 1. Version 2 adds an
            optional field with a default value. A consumer upgraded to version
            2 can read both old data (treating the missing field as the default)
            and new data (using the actual value). The rule is simple: You can
            add fields with defaults, and you can delete optional fields. You
            cannot remove required fields or change types in incompatible ways.
            Systems like Confluent Schema Registry enforce this by checking each
            new schema against the previous version before allowing
            registration. If you try to remove a required field, the registry
            rejects the change with a 409 conflict error.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Renaming a field is not a
              cosmetic change. Under the hood it is a removal plus an addition.
              Old consumers will suddenly read null for the original field name,
              potentially corrupting metrics silently. Always treat renames as
              breaking changes requiring migration.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Forward Compatibility in Practice:
            </div>
            Forward compatibility lets producers upgrade first. Old consumers
            must handle new data gracefully. This requires stricter rules: You
            can only delete fields with defaults, and you can only add optional
            fields. The consumer cannot assume new fields exist, but it must not
            crash when encountering them. This mode is less common because it is
            harder to guarantee. It requires consumers to explicitly ignore
            unknown fields, which not all serialization libraries do by default.
            However, it is valuable when you have many slow moving consumers
            (think BI dashboards or long running batch jobs) and you want to
            roll out producer changes without waiting for everyone downstream.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Full Compatibility and the Trade Off:
            </div>
            Full compatibility is the intersection of backward and forward.
            Changes must satisfy both sets of rules. In practice, this restricts
            you to adding and deleting optional fields with defaults. Many
            production systems default to full compatibility for critical data
            like payments or user profiles, accepting the slower pace of change
            in exchange for safety. The trade off is agility versus risk. A
            logging pipeline for internal debugging might use backward only or
            even no compatibility checks for maximum developer speed. A payments
            pipeline feeding regulatory reports will use full compatibility and
            require schema review, because a silent null in a critical field
            could have legal consequences.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Compatibility Modes Deployment Flow
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Backward Compatible</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Deploy: Consumers first → Producers second
                    <br />
                    <strong>Safe:</strong> Add optional fields, delete optional
                    fields
                    <br />
                    <strong>Blocked:</strong> Remove required fields
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Forward Compatible</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Deploy: Producers first → Consumers second
                    <br />
                    <strong>Safe:</strong> Delete fields with defaults
                    <br />
                    <strong>Blocked:</strong> Add required fields
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Full Compatible</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Deploy: Any order (safest, slowest)
                    <br />
                    <strong>Safe:</strong> Add/delete optional fields only
                    <br />
                    <strong>Best for:</strong> Payments, regulated data
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
                  Backward compatibility allows consumer upgrades first and
                  permits adding optional fields or deleting optional fields
                  from schemas
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Forward compatibility allows producer upgrades first but
                  requires stricter rules, only permitting deletion of fields
                  with defaults
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full compatibility is the intersection of both modes,
                  restricting changes to adding or deleting optional fields with
                  defaults only
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Field renames are always breaking changes because they combine
                  a removal and addition, causing old consumers to read null
                  values unexpectedly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Critical data pipelines for payments or compliance typically
                  use full compatibility, accepting slower evolution for
                  guaranteed safety, while debug logging may use no
                  compatibility checks for maximum agility
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
                  Backward mode rollout: Add optional experiment_bucket field to
                  clickstream event. Deploy consumers over 2 days (they handle
                  both old and new data). Then deploy producers over 1 day (new
                  field starts appearing).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full compatibility failure: Team tries to rename total to
                  total_amount in payment event. Registry rejects with 409 error
                  because rename is a removal plus addition, breaking old
                  consumers that depend on total field.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaEvolutionUnderstandingCompatibilityModesBackwardForwardAndFull;
