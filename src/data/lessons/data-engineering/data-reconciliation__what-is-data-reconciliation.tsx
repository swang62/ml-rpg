import type { Component } from "solid-js";

const LessonDataReconciliationWhatIsDataReconciliation: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Reconciliation?
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
              <strong>Data reconciliation</strong> is the process of
              systematically checking that multiple copies or representations of
              the same business data remain consistent, accurate, and complete
              across different systems.
            </div>
          </div>
          <strong>The Core Problem:</strong> In distributed systems, the same
          business entity lives in multiple places. A payment record exists in
          your payment processor, your ledger service, your data warehouse, and
          your machine learning feature store. Once data leaves the primary
          system of record, you can no longer rely on ACID (Atomicity,
          Consistency, Isolation, Durability) transactions to keep these views
          synchronized. This creates a trust problem. Without reconciliation,
          you have no systematic way to verify that all these copies are
          actually telling the same story.
          <strong>The Three Pillars:</strong> Every reconciliation system
          addresses three core challenges. First is <strong>matching</strong>,
          which is deciding that a record in system A corresponds to a record in
          system B. You might use a primary key like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            order_id
          </code>
          , a composite business key like (
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            transaction_date
          </code>
          ), or more advanced fuzzy matching. Second is{" "}
          <strong>comparison</strong>, which is deciding what to check once
          records are matched. Lightweight approaches compare just counts and
          aggregate checksums. Thorough approaches compare every field value,
          business rules, and derived metrics. Third is{" "}
          <strong>resolution</strong>, which is what you do when differences are
          found. This ranges from automatic correction (like rerunning an ETL
          job) to raising critical incidents when money or compliance is
          involved.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Think of reconciliation as a
            continuous monitoring layer around your data movement processes, not
            a one time data migration checklist. Systems like Uber reconcile
            millions of trip records hourly to ensure their transactional
            database matches their analytics warehouse.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Payment System</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  order_id: 12345
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Matching</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Join on order_id
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Data Warehouse</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  order_id: 12345
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; margin-top: 8px">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 13px">Comparison Result</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  amount: $50.00 ≠ $49.99
                </div>
                <div style="font-size: 11px; font-weight: 600">MISMATCH</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data reconciliation solves the trust problem that emerges when
                business data is copied across multiple systems and you can no
                longer rely on transactions to maintain consistency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The three pillars are matching (how you identify corresponding
                records), comparison (what fields or metrics you check), and
                resolution (how you handle discovered differences)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Reconciliation operates at different levels: lightweight checks
                like row counts detect gross issues cheaply, while cell level
                comparison of every field is expensive but necessary for high
                risk domains like billing
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Modern reconciliation is a continuous monitoring layer, not a
                one time activity, running hourly or daily to detect drift as
                data flows through pipelines
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
                At Uber, trip data flows from mobile apps to transactional
                stores, through Kafka into stream processors, and finally into
                data lakes. Reconciliation ensures the sum of completed trips in
                the OLTP system matches the warehouse total within a few basis
                points every hour
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A payment processor might reconcile 500 million records by
                joining on order_id and comparing amount, currency, and status
                fields, flagging any mismatches for investigation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataReconciliationWhatIsDataReconciliation;
