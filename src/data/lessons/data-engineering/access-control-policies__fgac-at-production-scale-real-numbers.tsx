import type { Component } from "solid-js";

const LessonAccessControlPoliciesFgacAtProductionScaleRealNumbers: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            FGAC at Production Scale: Real Numbers
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Scale Challenge:
            </div>
            Fine grained access control becomes dramatically harder when you
            operate a unified data platform with 5 petabytes of data, 50,000
            tables, and query volumes hitting 200,000 interactive queries plus
            50,000 scheduled jobs daily. The challenge is not whether FGAC works
            in theory. It is whether policy evaluation stays fast enough that
            p99 latency for interactive business intelligence remains under 30
            seconds. Consider the mathematics. If policy evaluation adds 5
            milliseconds per query, that is 1,000 seconds or 16 minutes of pure
            overhead across 200,000 queries. At 50,000 queries per hour during
            peak, you need a policy engine capable of handling roughly 14
            decisions per second continuously. But p99 matters more than
            average. If 1% of policy lookups take 100 milliseconds instead of 1
            millisecond due to cache misses or complex attribute resolution, you
            blow through latency budgets.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Multi Layer Enforcement:
            </div>
            Production systems enforce policies across multiple layers because
            data has many access paths. The warehouse enforces FGAC in SQL
            queries. But what about the vector store built from the same data
            for semantic search? Or the backup exports to object storage? Or the
            streaming pipeline that materializes aggregates? AWS explicitly
            addresses this for generative AI use cases: permission evaluation
            happens in Lake Formation for structured data, fine grained controls
            apply in OpenSearch for vector retrieval, encryption at rest uses
            Key Management Service (KMS), and output filtering applies privacy
            policies to generated responses. Each layer must enforce
            consistently or you create bypass paths.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Production Scale
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5 PB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DATA VOLUME
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">250K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DAILY QUERIES
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 TARGET
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Caching and Staleness Trade-offs:
            </div>
            Policy caching is essential at scale but introduces risk. With a 5
            minute cache Time To Live (TTL), a terminated employee retains
            access long enough to potentially exfiltrate sensitive data. But
            disabling caching entirely might add 5 to 10 milliseconds per query
            at p99, which overwhelms the policy store at tens of thousands of
            queries per second. The typical compromise is tiered caching. Hot
            path decisions for active users cache with 1 minute TTL. Cold path
            decisions for service accounts cache longer. Critical revocations,
            like employee termination, trigger immediate cache invalidation.
            This keeps p99 policy overhead under 2 milliseconds while providing
            acceptable security.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> At 10x scale increases, pressure
              falls on the policy engine and permission tables. You might need
              to shard the policy store, pre compute permission views for
              frequent patterns, and carefully tune cache TTL versus revocation
              latency.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">SQL Queries</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Warehouse FGAC
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Vector Search</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    OpenSearch filters
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Object Storage</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    IAM + VPC controls
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Streaming ETL</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Service principal scope
                  </div>
                </div>
                <div style="font-size: 12px; font-weight: 600; margin-top: 4px">
                  All enforce same policies
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
                  At 250,000 daily queries, policy evaluation must complete in
                  under 1ms to avoid dominating latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policies must apply across all data access paths: warehouse,
                  vector search, object storage, and ETL
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Caching with 1 to 5 minute TTL balances performance against
                  revocation latency for terminated access
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems typically operate with p99 query latency
                  targets under 30 seconds for interactive BI
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy stores require sharding or pre computed views when
                  scaling beyond tens of thousands of queries per second
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
                  A query that normally completes in 5 seconds degrades to 20
                  seconds p99 when complex user specific predicates cannot push
                  down efficiently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vector embeddings built from customer support tickets require
                  FGAC in OpenSearch to prevent search bypass of warehouse row
                  level security
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fired employee with 5 minute policy cache retains access long
                  enough to export thousands of customer records before
                  revocation takes effect
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAccessControlPoliciesFgacAtProductionScaleRealNumbers;
