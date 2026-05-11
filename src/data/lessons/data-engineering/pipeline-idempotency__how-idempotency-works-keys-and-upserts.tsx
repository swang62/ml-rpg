import type { Component } from "solid-js";

const LessonPipelineIdempotencyHowIdempotencyWorksKeysAndUpserts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Idempotency Works: Keys and Upserts
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Mechanism:</strong>
            Idempotency relies on two core techniques working together: stable
            identifiers that uniquely represent business events, and upsert
            semantics at the sink that overwrite rather than append.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Producers attach stable keys:</strong> Every event
                  gets an identifier that stays constant across retries. For an
                  order event, this might be <code>order_id</code> plus{" "}
                  <code>line_item_id</code>. For a user action,{" "}
                  <code>user_id</code> plus <code>event_type</code> plus{" "}
                  <code>timestamp</code>.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Sinks use upsert logic:</strong> Instead of INSERT,
                  the sink does INSERT ON CONFLICT UPDATE or MERGE. If a row
                  with that key exists, overwrite it. If not, insert new. Either
                  way, running twice produces the same final row.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>State reflects business reality:</strong> The database
                  or data warehouse now represents each business event exactly
                  once, regardless of how many times the pipeline ran.
                </div>
              </div>
            </div>
            <strong>Real Numbers at Scale:</strong>
            Consider Stripe's payment processing. When a client retries a
            payment API call due to network timeout, they include an{" "}
            <code>idempotency_key</code>. The backend stores results keyed by
            this value. A second request with the same key returns the cached
            result instead of charging twice. This handles billions of API
            requests per year with zero duplicate charges. Data pipelines use
            the same principle. An ads analytics platform ingesting 200,000
            events per second might see 10,000 to 20,000 duplicates per second
            from client retries. With <code>event_id</code> based deduplication,
            those 10,000 duplicates are safely ignored or overwritten,
            maintaining accurate click counts.
            <strong>For Aggregates:</strong>
            When building aggregates like daily revenue per merchant, the
            idempotency key becomes a composite: <code>merchant_id</code> plus{" "}
            <code>date</code>. A daily batch job can be rerun to fix bugs or
            handle late data. It fully recomputes revenue for that merchant and
            date, then upserts the result. The previous value is replaced, not
            added to.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Using auto incrementing IDs or
              timestamps as your idempotency key breaks everything. These change
              on every run, so reprocessing creates new rows instead of updating
              existing ones.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Event Stream</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    order_id: 12345
                    <br />
                    amount: $50
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Processing (Retry)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Same event processed 2x
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Database (Upsert)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    WHERE order_id = 12345
                    <br />
                    Result: ONE row, $50
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
                  Stable identifiers like &lt;code&gt;order_id&lt;/code&gt; or
                  &lt;code&gt;event_id&lt;/code&gt; must stay constant across
                  retries and replays, not change per attempt
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Upsert semantics (INSERT ON CONFLICT UPDATE, MERGE) ensure
                  reprocessing overwrites existing rows instead of creating
                  duplicates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For aggregates, composite keys like
                  &lt;code&gt;merchant_id&lt;/code&gt; plus
                  &lt;code&gt;date&lt;/code&gt; enable safe recomputation of
                  time bucketed metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 200,000 events per second with 5% duplication rate,
                  idempotent processing handles 10,000 duplicate events per
                  second transparently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Keys must represent business identity, not physical artifacts
                  like auto incrementing IDs or processing timestamps
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
                  Postgres upsert: &lt;code&gt;INSERT INTO orders (order_id,
                  amount) VALUES (12345, 50) ON CONFLICT (order_id) DO UPDATE
                  SET amount = EXCLUDED.amount&lt;/code&gt;
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spark Delta Lake merge:
                  &lt;code&gt;deltaTable.alias('target').merge(updates.alias('source'),
                  'target.event_id =
                  source.event_id').whenMatched().updateAll().whenNotMatched().insertAll()&lt;/code&gt;
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stripe API idempotency: Client sends
                  &lt;code&gt;Idempotency-Key: abc123&lt;/code&gt; header.
                  Server caches response by this key. Retry with same key
                  returns cached result, preventing double charge.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineIdempotencyHowIdempotencyWorksKeysAndUpserts;
