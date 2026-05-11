import type { Component } from "solid-js";

const LessonRagArchitectureRagSystemArchitectureAndDataFlow: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          RAG System Architecture and Data Flow
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Two Critical Paths:</strong>
          RAG systems operate through two distinct pipelines: offline data
          ingestion that builds the knowledge index, and online query serving
          that retrieves and generates answers in real time. Understanding both
          is essential for system design interviews.<p></p>
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Raw Documents</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Wikis, PDFs, Code, Tickets
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Chunk + Embed</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  500 to 1000 tokens per chunk
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Vector Index</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Millions of searchable embeddings
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Retrieval + Generation</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Query time: 1 to 2 sec p95
                </div>
              </div>
            </div>
          </div>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Offline Ingestion Pipeline
          </p>
          <p style="margin-top: 0">
            Documents arrive from multiple sources: document stores, code
            repositories, ticketing systems, and email archives. The system
            normalizes formats, extracts text, and splits content into chunks.
            Chunk size is critical. Too small (50 to 100 tokens) and you lose
            semantic coherence. Too large (3000 tokens) and retrieval becomes
            coarse and expensive. Production systems typically settle on 300 to
            1000 tokens per chunk with 50 to 100 token overlap to preserve
            context at boundaries. Each chunk gets embedded once using a model
            like OpenAI <code>text-embedding-3-large</code> (3072 dimensions) or
            similar. For 50 million documents split into 500 token chunks, you
            might generate 200 million embeddings. At 12 kilobytes per embedding
            with metadata, that is roughly 2.4 terabytes of index data. These
            vectors are stored in a vector database like Pinecone, Weaviate, or
            Milvus with metadata including access control lists, document IDs,
            and timestamps.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Online Query Serving
          </p>
          <p style="margin-top: 0">
            When a user asks "How do I roll out a new microservice?", the system
            first embeds the query using the same embedding model (typically 20
            to 50 milliseconds). It executes a vector search to find the top 50
            similar chunks, usually completing in 10 to 30 milliseconds at p95
            with approximate nearest neighbor algorithms. Many systems then
            apply a re ranker, a smaller cross encoder model that scores query
            to document relevance more accurately than pure vector similarity.
            This narrows 50 candidates to the best 5 to 10 chunks in another 10
            to 30 milliseconds. The selected passages plus instructions are
            inserted into the LLM prompt.
          </p>
          <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Typical Query Latency Breakdown
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">30ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  VECTOR SEARCH
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">20ms</div>
                <div style="font-size: 10px; font-weight: 600">RE-RANKING</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">600ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  LLM GENERATION
                </div>
              </div>
            </div>
          </div>
          The LLM generates a 1000 token answer, taking 400 to 800 milliseconds
          at p95 for GPT 4 class models. Total end to end latency: 600
          milliseconds at p50, 1.5 to 2.0 seconds at p95. Systems like Microsoft
          365 Copilot and OpenAI ChatGPT Enterprise follow this pattern,
          achieving sub 2 second responses for complex queries over millions of
          documents.<p></p>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Offline ingestion chunks documents into 300 to 1000 token pieces
                with overlap, embeds each chunk, and stores in vector index with
                metadata
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Chunk size trades off semantic coherence (too small loses
                context) versus retrieval precision (too large is coarse and
                expensive)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Online serving performs query embedding (20 to 50ms), vector
                search (10 to 30ms p95), re ranking (10 to 30ms), then LLM
                generation (400 to 800ms p95)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                For 200 million embeddings at 12KB each with metadata, expect
                roughly 2.4TB of index storage requiring sharded deployment
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Approximate nearest neighbor algorithms are essential: exact
                search over 100 million vectors cannot meet sub 50ms p95 latency
                targets
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
                Enterprise assistant handling 20,000 employees querying 50
                million documents (30TB text): chunks to 200M embeddings,
                sharded vector index across 20 nodes, hybrid search combining
                semantic and keyword signals, achieving 200 QPS at 1.8 second
                p95 latency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Customer support system with daily document updates: incremental
                indexing adds new chunks in 5 to 10 minutes, hot recent
                documents in memory optimized index, cold historical data in
                larger disk backed index with slightly higher latency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Legal research platform: 10 million case documents split into 80
                million chunks, cross encoder re ranker improves relevance by
                25% compared to pure vector search, citations to specific
                paragraphs required for every generated claim
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonRagArchitectureRagSystemArchitectureAndDataFlow;
