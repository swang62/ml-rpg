import type { Component } from "solid-js";

const LessonSearchPersonalizationSessionFeatureComputationRealTimeUpdatesWithinLatencyConstraints: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Session Feature Computation: Real-Time Updates Within Latency
            Constraints
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Challenge
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Session features must update within milliseconds of user actions
                and be available for the next search request. This requires
                streaming computation and storage optimized for both high write
                throughput and low-latency reads.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Session Features Capture
            </p>
            <p style="margin-top: 0">
              Session features summarize in-session behavior: clicked item IDs
              (last 10-20), clicked categories, query history, dwell time on
              viewed items, add-to-cart events. These are aggregated into
              feature vectors:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                session_category_dist = [0.4, 0.3, 0.2, 0.1]
              </code>{" "}
              showing interest distribution across top categories. Also
              computed: session embeddings (average of clicked item embeddings),
              recency-weighted click scores, and cross features (query-click
              similarity).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Update Path: Click to Feature
            </p>
            <p style="margin-top: 0">
              When user clicks item X: (1) Click event hits event stream (Kafka
              or similar) with sub-100ms latency. (2) Stream processor updates
              session state: appends X to click list, recomputes session
              embedding, updates category distribution. (3) Updated session
              stored in low-latency key-value store keyed by session ID. (4)
              Next search request fetches session features in 1-3ms. Total time
              from click to searchable feature: 100-500ms. The user's next
              search (typically 2-10 seconds later) sees updated
              personalization.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budget Breakdown
            </p>
            <p style="margin-top: 0">
              For a 200ms end-to-end search: retrieval gets 50ms, ranking gets
              80ms, personalization gets 20-30ms, network overhead 40ms. Within
              personalization: session feature fetch 3ms, long-term profile
              fetch 3ms, feature combination 5ms, score adjustment 10ms. Every
              component must stay within budget. If session store latency spikes
              to 50ms, personalization blows its budget and either times out
              (skipping personalization) or delays the entire response.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Storage Trade-offs
            </p>
            <p style="margin-top: 0">
              Session data is ephemeral (expires after 30 min to 24 hours) but
              must be fast. In-memory stores provide &lt;1ms reads but lose data
              on restart. Distributed key-value stores provide durability but
              add 2-5ms latency. Hybrid approach: write-through to both; serve
              from memory when available, fall back to persistent store. Session
              loss is acceptable (user gets un-personalized results for one
              search) but shouldn't happen frequently.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    User Events Stream (Kafka)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Clicks, skips, bookings | 60k writes/sec peak
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Stream Processor</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sessionize (30 min gap) | Update aggregates
                    <br />
                    Category intensity, click centroid, price histogram
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Online Feature Store (Redis/DynamoDB)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Key: user_id or session_id | TTL: days to weeks
                    <br />
                    Fetch: 1 to 5ms p95 | 20 to 50 features per request
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 4px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Item Features</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Cached in RAM on search server
                      <br />
                      Embeddings, quality, price
                      <br />
                      No network call per candidate
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Similarity Features</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Computed on search server
                      <br />
                      EmbClickSim dot product
                      <br />
                      Sub 1ms for 1,000 candidates
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
                  Session features: last 10-20 clicked items, category
                  distribution, session embedding (average of click embeddings)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Update path: click → event stream → stream processor → session
                  store in 100-500ms total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budget: personalization gets 20-30ms within 200ms
                  search; session fetch must be 3ms or less
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage trade-off: in-memory (&lt;1ms but volatile) vs
                  distributed KV (2-5ms but durable); hybrid approach common
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session loss is acceptable (one un-personalized search) but
                  latency spikes break the entire search budget
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
                  Walk through the update path: click → event stream (100ms) →
                  processor → store → next search sees it
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Give the latency breakdown: retrieval 50ms, ranking 80ms,
                  personalization 20-30ms, network 40ms = 200ms total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain session embedding: average of item embeddings for last
                  N clicked items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchPersonalizationSessionFeatureComputationRealTimeUpdatesWithinLatencyConstraints;
