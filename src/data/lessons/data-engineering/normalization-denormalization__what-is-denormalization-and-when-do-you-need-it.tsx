import type { Component } from "solid-js";

const LessonNormalizationDenormalizationWhatIsDenormalizationAndWhenDoYouNeedIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Denormalization and When Do You Need It?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Normalized schemas optimize for write correctness, but they make
            reads expensive. When a product detail page needs to display
            customer reviews, seller ratings, inventory status, shipping
            estimates, and related products, a fully normalized query might join
            8 tables and aggregate millions of rows. At billions of products and
            petabytes of data, this can push latency to multiple seconds, far
            exceeding the 50 to 150 millisecond budget for customer facing APIs.
            Denormalization solves this by intentionally duplicating data. You
            store customer name, product title, category, and precomputed totals
            directly in the orders_read table, avoiding joins entirely. A single
            lookup returns everything needed.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Trade Off:
            </div>
            Reads become blazingly fast because there are no joins or
            aggregations at query time. A denormalized search index at Netflix
            or LinkedIn can serve hundreds of thousands of queries per second
            with p99 latencies under 100 milliseconds. The cost shifts to
            writes. Every change must propagate to multiple places where that
            fact appears. When a user updates their display name, that change
            needs to flow to their profile store, their posts in the feed store,
            their comments in the discussion store, and potentially dozens of
            other denormalized copies. This propagation typically happens
            asynchronously through Change Data Capture (CDC) pipelines, which
            introduces eventual consistency. During the propagation window,
            which can be seconds to minutes under normal load or longer during
            outages, different parts of the system show different values.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Denormalization is not a database
              setting you flip. It is a system architecture decision that spans
              your write path, streaming pipelines, consistency model, and
              operational monitoring.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Pattern:
            </div>
            At Meta, the social graph storing users, friendships, and posts is
            relatively normalized. But the News Feed that millions of users see
            is served from heavily denormalized stores. Each feed entry
            duplicates author name, profile picture URL, post text, like counts,
            and rendering metadata. This enables the feed service to handle
            millions of read queries per second without touching the normalized
            graph database. Updates flow through a streaming platform that
            asynchronously rebuilds affected feed entries.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose Denormalization:
            </div>
            Denormalize when you have read heavy workloads with strict latency
            requirements that normalized schemas cannot meet, even with
            aggressive indexing. This is common in search systems,
            recommendation engines, analytics dashboards, and mobile APIs where
            round trips are expensive. The key is to denormalize selectively for
            measured query patterns, not speculatively across your entire
            schema.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Normalized vs Denormalized Read Path
              </div>
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 12px; margin-bottom: 8px; text-align: center">
                    Normalized Query
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    JOIN customers, orders, products, inventory
                    <br />
                    <br />
                    <strong>Latency:</strong> 800ms
                    <br />
                    <strong>Joins:</strong> 6 tables
                    <br />
                    <strong>Rows scanned:</strong> 2M
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 12px; margin-bottom: 8px; text-align: center">
                    Denormalized Query
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    SELECT * FROM orders_read WHERE id=?
                    <br />
                    <br />
                    <strong>Latency:</strong> 12ms
                    <br />
                    <strong>Joins:</strong> None
                    <br />
                    <strong>Rows scanned:</strong> 1
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
                  Eliminates joins by duplicating data across tables, enabling
                  single lookup queries that complete in 10 to 50 milliseconds
                  instead of hundreds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Essential for read heavy workloads serving 100,000+ queries
                  per second with p99 latencies under 100 milliseconds, common
                  in search and recommendation systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Increases write complexity; every update must propagate to all
                  denormalized copies, often asynchronously through CDC
                  pipelines with seconds to minutes of lag
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Introduces eventual consistency; during propagation windows or
                  pipeline failures, different system components may show stale
                  or conflicting data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Works best when combined with normalized write models; keep
                  the source of truth normalized, then derive denormalized
                  projections for specific query patterns
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
                  Search index: Store flattened product documents with title,
                  category, price, seller rating, and availability flags. Serve
                  product search in 20ms without querying the normalized product
                  database.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feed service: Duplicate author name, profile picture, post
                  text, and like counts in each feed entry. Serve user timelines
                  in 50ms without joining the social graph.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analytics dashboard: Precompute daily revenue by category and
                  region in a wide fact table. Refresh dashboard queries in
                  seconds instead of scanning billions of transaction rows.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNormalizationDenormalizationWhatIsDenormalizationAndWhenDoYouNeedIt;
