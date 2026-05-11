import type { Component } from "solid-js";

const LessonReverseEtlReverseEtlFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Reverse ETL Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Silent Data Inconsistencies:
          </div>
          The most dangerous failures are the ones you do not notice. APIs can
          partially succeed: 9,500 records write successfully, but 500 fail due
          to validation errors like malformed phone numbers or missing required
          fields. If your observability is weak, sales teams spend weeks making
          decisions on incomplete data before someone realizes accounts are
          missing churn scores. This gets worse at scale. Syncing 5 million
          records daily with a 0.1% error rate produces 5,000 incorrect records
          per day. Over a month, that is 150,000 bad records silently polluting
          your CRM. The failure is not catastrophic enough to page anyone, but
          it is large enough to materially harm business operations.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Always implement per field validation
            metrics and dead letter queue monitoring. Alert when error rates
            exceed thresholds like 0.5% of records or 1,000 failures in a
            rolling hour.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Idempotency Failures and Side Effects:
          </div>
          Many destination APIs trigger side effects on writes. Updating a lead
          score in a CRM might automatically reassign the lead to a different
          sales rep or trigger an email workflow. If your sync retries without
          proper idempotency, you can create chaos. Consider a sync processing 1
          million records that fails midway and retries 3 times without
          idempotence keys. That is 3 million writes instead of 1 million. If
          each write triggers an email, you just sent 2 million duplicate emails
          to customers. If each write increments a counter, your metrics are now
          triple counted. Production systems must use version checks,
          idempotency tokens, or compare timestamps before writing.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Identity Resolution Breaks:
          </div>
          Most Reverse ETL systems match records using keys like email addresses
          or external IDs. This works until it does not. If you match by email
          and a user changes their email, you might create a duplicate record in
          the destination instead of updating the existing one. Now you have two
          CRM contacts for the same person. Backfills are especially dangerous.
          If you reprocess historical data and your warehouse primary keys
          change (common when rebuilding dimension tables), the mapping between
          warehouse IDs and destination IDs breaks. Your sync might create
          thousands of orphan records or fail to update existing ones. The fix
          requires maintaining stable external IDs that survive backfills or
          implementing fuzzy matching logic.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Failure Impact Example
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">1M writes</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">BUG + RETRY</div>
                <div style="font-size: 16px; font-weight: 800">3M writes</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">IMPACT</div>
                <div style="font-size: 16px; font-weight: 800">
                  2M dupe emails
                </div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Schema Drift:
          </div>
          Warehouses and destination APIs both evolve. Your warehouse team
          renames a column from{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_score
          </code>{" "}
          to{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            churn_risk_score
          </code>
          . Your sync breaks because the transformation layer still maps the old
          column name. Worse, Salesforce deprecates a custom field you are
          writing to. Your sync fails silently or writes to the wrong field.
          Production systems need schema validation on both sides. Before
          running a sync, check that expected columns exist in the warehouse and
          required fields are writable in the destination. Tools like Census and
          Hightouch provide schema drift detection, but it is not foolproof.
          Strong data contracts and change management processes are essential.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Regulatory Edge Cases:
          </div>
          When a user requests deletion under General Data Protection Regulation
          (GDPR) or California Consumer Privacy Act (CCPA), deleting from the
          warehouse is insufficient. Reverse ETL must propagate deletions or opt
          out flags to all destinations. If you only sync positive data and
          ignore hard deletes, stale user records remain in your CRM and
          marketing tools, keeping you in violation. Implementing compliant
          deletion requires tracking which records were synced to which
          destinations, then issuing delete API calls to each. Some destinations
          lack delete APIs entirely, forcing manual cleanup. The complexity
          multiplies with each new destination you add.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Partial API failures at scale are dangerous: 0.1% error rate on
                5 million daily records produces 5,000 bad records per day,
                silently corrupting operational data over time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Non idempotent retries can cause massive side effects; a failed
                sync retrying 3 times without idempotency keys can trigger
                millions of duplicate emails or triple count metrics
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Identity resolution breaks during backfills when warehouse
                primary keys change, creating orphan records or duplicates if
                stable external IDs are not maintained across rebuilds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema drift in either warehouse or destination APIs causes
                silent failures when columns are renamed or fields deprecated
                without corresponding sync configuration updates
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                GDPR and CCPA compliance requires propagating deletions to all
                synced destinations, not just the warehouse; lacking destination
                delete APIs can leave you in violation with stale user data
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
                A company syncing to HubSpot experiences 0.2% validation
                failures due to international phone number formatting issues,
                resulting in 10,000 contacts with missing data over a month
                before being noticed
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A marketing automation sync retries 3 times after network
                failures, sending 600,000 duplicate welcome emails to new users
                because the system lacked idempotency tokens
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                After a warehouse migration that reassigned user IDs, a
                Salesforce sync creates 50,000 duplicate contact records because
                the ID mapping table was not updated with stable external
                identifiers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonReverseEtlReverseEtlFailureModesAndEdgeCases;
