import type { Component } from "solid-js";

const LessonRealtimeEmbeddingUpdatesWhatIsRealTimeIncrementalIndexing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Real-Time Incremental Indexing?
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
                <strong>Real-time incremental indexing</strong> is the process
                of updating a vector index as new items arrive, rather than
                rebuilding the entire index from scratch.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY BATCH REBUILDS FAIL
            </p>
            <p>
              A batch rebuild approach means regenerating the complete index
              whenever content changes. For a 100M vector index, this takes 2-8
              hours. If new products are added hourly, batch rebuilds create an
              impossible backlog. Users searching for a product uploaded 5
              minutes ago would find nothing.
            </p>
            <p>
              The fundamental tension: indexes built for fast search (like IVF
              or HNSW) are optimized for static data. Their internal structures
              (cluster centroids, graph edges) assume the data distribution is
              fixed. Adding vectors incrementally can degrade these structures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FRESHNESS REQUIREMENTS BY USE CASE
            </p>
            <p>
              <strong>E-commerce listings:</strong> New products must be
              searchable within minutes. A seller uploading inventory expects
              immediate visibility. Delay = lost sales.
            </p>
            <p>
              <strong>News/content:</strong> Breaking news needs to appear in
              search within seconds to minutes. A 6-hour rebuild cycle makes the
              system useless for current events.
            </p>
            <p>
              <strong>Social media:</strong> Posts should be searchable nearly
              instantly. Users expect to find content they just saw in their
              feed.
            </p>
            <p>
              <strong>Catalog updates:</strong> Weekly refresh is acceptable for
              stable catalogs like movie libraries. Here, batch rebuilds work
              fine.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE INCREMENTAL CHALLENGE
            </p>
            <p>
              Vector indexes are not designed for modification. HNSW builds a
              graph where each node connects to neighbors. Adding a new node
              requires finding its neighbors, which requires searching the
              index. If you add thousands of nodes per second, search
              performance degrades.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Incremental indexing trades index
              optimality for freshness. The index gradually becomes suboptimal
              until a periodic rebuild restores quality.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Source DB Change</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Product update at t=0
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">CDC Event Log</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Seq #12345, Version 7
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Index Upsert</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    50ms write latency
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Queryable at t=2s</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    p95 query 80ms
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
                  Batch rebuilds (2-8 hours for 100M vectors) create
                  unacceptable freshness delays for real-time use cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vector indexes like HNSW and IVF are optimized for static
                  data—adding vectors incrementally degrades their structure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness requirements vary: e-commerce needs minutes, news
                  needs seconds, catalogs can tolerate weekly rebuilds
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
                  Interview Tip: Start by explaining WHY incremental indexing is
                  needed—batch rebuilds are too slow for dynamic content.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Give concrete freshness requirements for
                  different use cases to show you understand the business
                  context.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeEmbeddingUpdatesWhatIsRealTimeIncrementalIndexing;
