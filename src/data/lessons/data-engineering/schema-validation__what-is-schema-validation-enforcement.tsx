import type { Component } from "solid-js";

const LessonSchemaValidationWhatIsSchemaValidationEnforcement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Schema Validation &amp; Enforcement?
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
                <strong>Schema validation</strong> checks that incoming data
                matches an expected structural contract (field names, data
                types, nullability). <strong>Schema enforcement</strong> decides
                what happens when data violates that contract (reject, coerce,
                or quarantine).
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            At scale, the biggest silent killer of data systems is not latency,
            but bad or drifting data. When you have 50 microservices producing
            events and 200 downstream consumers, one team might rename a field
            from{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              userId
            </code>{" "}
            or change a price from integer cents to decimal dollars. Without
            validation, this flows silently into your data lake and warehouse.
            Problems only surface days later as broken dashboards, mis trained
            ML models, or compliance failures.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How It Works:
            </div>
            The schema is your contract. It defines field names, data types like
            string or integer, whether fields can be null, and sometimes
            constraints like allowed ranges or formats. Think of it like an API
            contract for your data. Validation happens at strategic points: at
            the producer before events enter the message bus, at the schema
            registry when messages are published, or at the storage layer when
            writing to your data lake. When data does not match the schema,
            enforcement kicks in. You might reject the write entirely (hard
            fail), route bad records to a quarantine table for inspection, or
            coerce values and log warnings (soft fail).
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Three Key Patterns:
            </div>
            Schema on write validates at ingestion time, before data becomes
            authoritative. This is what systems like Delta Lake and data
            warehouses do. Schema on read stores data loosely and enforces
            structure when transforming or querying it, common in early data
            lake designs. Schema evolution manages controlled changes over time
            with compatibility guarantees, so existing consumers keep working
            when schemas change.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Producer Event</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    &#123;user_id: 123, price: 999&#125;
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Schema Validation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Check types, fields, nulls
                  </div>
                </div>
                <div style="display: flex; gap: 20px; align-items: center">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 18px; font-weight: bold">
                      ✓ Valid
                    </div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 12px">
                      Write to Lake
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 18px; font-weight: bold">
                      ✗ Invalid
                    </div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 12px">
                      Reject or Quarantine
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
                  Schema validation checks data structure against a contract
                  (field names, types, nullability, constraints) before or
                  during ingestion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforcement policies determine what happens on violation:
                  reject writes (hard fail), route to quarantine for inspection,
                  or coerce with logging (soft fail)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema on write validates at ingestion for quality guarantees,
                  schema on read validates at query time for flexibility, schema
                  evolution manages controlled changes with compatibility rules
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without validation, upstream changes (renamed fields, type
                  changes) silently corrupt downstream systems and only surface
                  as broken dashboards or ML models days later
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
                  Delta Lake enforces table schema at write time: attempting to
                  write a DataFrame with an extra column or mismatched type gets
                  rejected immediately
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kafka with schema registry validates every published message
                  against registered schema versions, rejecting incompatible
                  events or routing them to dead letter topics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A price field changing from integer cents (999) to decimal
                  string ("9.99") without validation breaks all downstream
                  aggregations and financial reports
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaValidationWhatIsSchemaValidationEnforcement;
