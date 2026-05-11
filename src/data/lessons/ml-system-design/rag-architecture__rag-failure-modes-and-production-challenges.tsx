import type { Component } from "solid-js";

const LessonRagArchitectureRagFailureModesAndProductionChallenges: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            RAG Failure Modes and Production Challenges
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Constraint:</strong>
            RAG's generation quality is upper bounded by retrieval quality. Even
            the most capable LLM cannot produce accurate answers if the
            retrieval system returns irrelevant, incomplete, or incorrect
            documents. This dependency creates several critical failure modes
            that interviewers love to probe.
            <p></p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> If the right document is not
              retrieved, the system will hallucinate, fabricate connections
              between unrelated text, or confidently state "I don't know" when
              the answer exists in your corpus.
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Retrieval Quality Failures
            </p>
            <p style="margin-top: 0">
              Poor embeddings cause semantic mismatches. If your embedding model
              was trained on general web text but you are searching medical
              literature with specialized terminology, semantically similar
              medical concepts may map to distant vectors. A query about
              "myocardial infarction" might miss documents about "heart attack"
              if the model does not understand they are synonyms. Wrong chunking
              granularity breaks context. Imagine a document that says "Product
              X is safe for users over 18" chunked into "Product X is safe"
              (chunk 1) and "for users over 18" (chunk 2). Retrieving only chunk
              1 leads to dangerous misinformation. This happens frequently with
              200 to 300 token chunks where critical caveats fall into adjacent
              chunks that do not get retrieved. Query formulation issues
              compound the problem. User queries are often vague, ambiguous, or
              use different vocabulary than documents. "How do I ship code?"
              might mean deployment pipelines, code review process, or version
              control workflows. Without query understanding or expansion,
              retrieval returns irrelevant results.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Context Overflow and Truncation
            </p>
            <p style="margin-top: 0">
              A 32,000 token context limit seems generous until you account for
              system prompts (500 to 1000 tokens), conversation history (2000 to
              5000 tokens for multi turn chats), and instructions (500 tokens).
              That leaves roughly 24,000 tokens for retrieved documents. If you
              naively insert 40 chunks of 1000 tokens each, you exceed the
              limit. Most systems silently truncate, keeping the first N chunks.
              This means later retrieved documents, which might contain critical
              information, get dropped. The LLM generates answers citing wrong
              sections or missing important caveats because it never saw the
              relevant context.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Context Budget Example
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">32K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TOTAL LIMIT
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">8K</div>
                  <div style="font-size: 10px; font-weight: 600">OVERHEAD</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">24K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    FOR RETRIEVAL
                  </div>
                </div>
              </div>
            </div>
            Mitigations include smarter chunk selection with relevance
            thresholds, summarization of retrieved documents before insertion,
            and query specific compression techniques. Some systems use a
            smaller model to extract only relevant sentences from chunks rather
            than including entire chunks.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Security and Multi Tenancy
            </p>
            <p style="margin-top: 0">
              Vector indexes leak information in subtle ways. If your index does
              not enforce access control lists (ACLs) at retrieval time, a user
              in Sales might retrieve embeddings for confidential Engineering
              documents. Even without returning raw text, the embedding
              proximity itself reveals information: "your query is very similar
              to this document you cannot access" tells the user something.
              Production systems at companies like Microsoft apply per document
              ACL filters during vector search, filtering out results the user
              cannot access before re ranking. This requires the vector database
              to support efficient metadata filtering without scanning all
              vectors. For strong guarantees, some organizations maintain
              physically isolated indexes per tenant, trading increased storage
              and operational cost for security.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Staleness and Embedding Drift
            </p>
            <p style="margin-top: 0">
              If ingestion runs nightly, a critical policy change at 10 AM is
              invisible to users until tomorrow. Real time indexing reduces lag
              to minutes or seconds but increases resource usage by 3 to 5x and
              adds complexity around eventual consistency. Upgrading embedding
              models invalidates existing indexes. Mixing embeddings from{" "}
              <code>text-embedding-ada-002</code> and{" "}
              <code>text-embedding-3-large</code> in one index breaks vector
              similarity: distances are no longer comparable. The solution is
              versioned indexes and batch re embedding, but during migration you
              see degraded relevance for days. With 200 million embeddings, re
              embedding at 1000 vectors per second takes over 2 days.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Challenges
            </p>
            <p style="margin-top: 0">
              RAG systems produce fluent but subtly wrong answers that are hard
              to catch. You need metrics for groundedness (does the answer stick
              to retrieved facts), citation correctness (are citations
              accurate), and coverage (did retrieval find all relevant sources).
              Human labeled test sets with 500 to 1000 examples provide the gold
              standard, but automatic heuristics like checking for unsupported
              claims or hallucinated citations catch many issues in production.
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
                  Retrieval quality strictly bounds generation quality: wrong
                  chunking, poor embeddings, or bad query formulation cause
                  hallucinations regardless of LLM capability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context overflow with 32K token limits leaves only 24K tokens
                  after overhead, requiring smart chunk selection or
                  summarization to avoid silent truncation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tenancy requires ACL enforcement at retrieval time;
                  embeddings leak information even without returning raw text,
                  necessitating per tenant indexes for strong security
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embedding model upgrades invalidate indexes: re embedding 200
                  million vectors at 1000 per second takes over 2 days with
                  degraded relevance during migration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Evaluation needs human labeled test sets (500 to 1000
                  examples) plus automatic groundedness and citation correctness
                  checks to catch subtle errors
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
                  Medical RAG system: Query "treatment for chest pain" retrieves
                  generic wellness advice but misses critical document about
                  emergency cardiac protocols due to embedding model trained on
                  general text, not medical terminology, resulting in dangerous
                  answer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enterprise assistant: Document stating "Feature X requires
                  approval for deployments over 1000 users" chunked into
                  separate pieces, only first chunk retrieved, system tells user
                  "Feature X requires approval" without the threshold, causing
                  incorrect process
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tenant SaaS: Sales team member searches for "Q4
                  strategy", vector search returns Engineering roadmap
                  embeddings with high similarity, revealing confidential
                  information about unannounced features despite not returning
                  document text
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRagArchitectureRagFailureModesAndProductionChallenges;
