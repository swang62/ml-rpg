import type { Component } from "solid-js";

const LessonRagArchitectureScalingRagToProductionArchitecturePatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Scaling RAG to Production: Architecture Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Scaling Challenge:</strong>
            At 500 queries per second (QPS) with 1 second p95 latency targets,
            any component with p99 latency over 200 milliseconds dominates tail
            latency. RAG systems at this scale require careful architectural
            choices around sharding, caching, replication, and separation of
            concerns.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Vector Index Deployment
            </p>
            <p style="margin-top: 0">
              Deploy the vector index as a replicated cluster with sharding.
              With 200 million embeddings at 12 kilobytes each (including
              metadata), you have 2.4 terabytes of data. A single node with 512
              gigabytes of memory can hold roughly 40 million embeddings in RAM
              for sub 20 millisecond p95 retrieval. You need at least 5 to 6
              shards, each replicated 3x for availability. Sharding strategies
              matter. Random sharding by document ID distributes load evenly but
              requires querying all shards and merging results: 5 shards means 5
              parallel queries, increasing complexity. Semantic space
              partitioning using clustering (like k means with k equal to shard
              count) routes queries to 1 to 2 relevant shards, reducing fan out
              but risking hot spots if queries cluster around popular topics.
              Load balancing across replicas uses round robin with health
              checks. If one replica hits p95 latency over 50 milliseconds due
              to garbage collection or disk I/O, remove it from rotation
              temporarily.
            </p>
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 13px; margin-bottom: 8px">
                  Sharded Vector Index
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Shard 1</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      40M vectors
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Shard 2</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      40M vectors
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Shard 3</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      40M vectors
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center">↓</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Merge Top K</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Combine results from shards
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hot and Cold Data Separation
            </p>
            <p style="margin-top: 0">
              Recent documents get 80% of queries due to recency bias. Separate
              hot data (last 30 days, roughly 10 million embeddings) into a
              smaller in memory index optimized for ultra low latency: 5 to 10
              milliseconds p95. Route queries there first. If results are
              insufficient (fewer than 5 chunks with relevance score over 0.7),
              fall back to the cold index (remaining 190 million embeddings)
              with 30 to 50 millisecond p95 latency from disk backed storage.
              This pattern reduces infrastructure cost by 40% to 60%: you only
              need expensive high memory instances for 5% of your data while
              serving 80% of traffic with excellent latency.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching Strategy
            </p>
            <p style="margin-top: 0">
              Cache at multiple layers. Embedding cache stores query embeddings
              keyed by query text: if two users ask "How do I reset my
              password?", compute the embedding once. With 100,000 unique
              queries per day and 50% repeat rate, this saves 50,000 embedding
              calls at $0.0001 each: $5 daily or $1,825 annually. More
              importantly, it cuts 20 to 50 milliseconds from latency. Retrieval
              cache stores top K results for exact query matches. This works
              well for common questions but has low hit rates (10 to 20%) for
              long tail queries. Use a Least Recently Used (LRU) cache with 1
              hour time to live (TTL) to balance freshness and hit rate. LLM
              response cache is trickier because context changes with
              conversation history. Partial caching of common document chunk
              combinations can help, but requires careful cache key design.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Observability and Guardrails
            </p>
            <p style="margin-top: 0">
              Log which documents were retrieved, which made it into the prompt,
              and which citations appeared in the answer. This supports offline
              analysis of failures and online guardrails like blocking answers
              if all retrieved docs score below a confidence threshold (for
              example, 0.6 similarity). Track per query metrics: retrieval
              latency breakdown (embedding, search, re ranking), context length
              used, citation count, and user feedback signals. Alert when p95
              retrieval latency exceeds 50 milliseconds or when average
              relevance score drops below 0.7, indicating index drift or quality
              degradation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> OpenAI and Anthropic expose
              retrieval quality metrics and grounded generation scores in their
              APIs specifically to enable this kind of monitoring and guardrail
              logic.
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost at Scale
            </p>
            <p style="margin-top: 0">
              At 500 QPS with 1.5 second average latency, each request uses
              5,000 input tokens (retrieved context) and 500 output tokens.
              Daily cost with GPT 4 pricing ($0.01 per 1K input, $0.03 per 1K
              output): 500 QPS * 86,400 seconds * 5K tokens / 1000 * $0.01 plus
              output tokens equals roughly $21,600 for input and $6,480 for
              output, totaling $28,080 daily or $10.2 million annually just for
              LLM calls. Infrastructure (vector index, re ranker, embedding)
              adds another $1 to 2 million annually. Total system cost: $11 to
              12 million per year at this scale. This is why aggressive caching,
              hot/cold separation, and careful context management are essential.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shard 200 million embeddings across 5 to 6 nodes with 40
                  million vectors per shard in memory for sub 20ms p95
                  retrieval, replicate 3x for availability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot and cold data separation puts recent 10 million embeddings
                  (30 days) in fast in memory index serving 80% of traffic,
                  reduces cost by 40 to 60%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi layer caching saves 50% of embedding calls ($1,825
                  annually) and cuts 20 to 50ms latency for repeated queries
                  with 50% hit rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 500 QPS scale, LLM costs dominate at $10.2M annually for
                  tokens plus $1 to 2M for infrastructure, totaling $11 to 12M
                  per year
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Observability requires logging retrieved documents, citations,
                  and relevance scores to enable guardrails like blocking low
                  confidence answers under 0.6 similarity
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
                  E commerce RAG at 800 QPS: 6 shard vector index with 50M
                  embeddings per shard, hot index for last 14 days of product
                  updates serving 85% of queries in 8ms p95, cold index for
                  historical data at 40ms p95, saves $4M annually versus uniform
                  deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial services assistant: Embedding cache with 65% hit
                  rate on 200K daily queries saves 130K embedding calls at
                  $0.0001 each ($4,745 annually) and reduces p95 latency from
                  1.8s to 1.5s
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Healthcare documentation system: Guardrail blocks answers when
                  top retrieved chunk scores under 0.65 similarity, forces
                  fallback to traditional search results, reduces hallucination
                  rate from 8% to 1.5% in audit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRagArchitectureScalingRagToProductionArchitecturePatterns;
