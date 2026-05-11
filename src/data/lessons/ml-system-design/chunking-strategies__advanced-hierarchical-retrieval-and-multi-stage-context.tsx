import type { Component } from "solid-js";

const LessonChunkingStrategiesAdvancedHierarchicalRetrievalAndMultiStageContext: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced: Hierarchical Retrieval and Multi Stage Context
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Beyond Flat Chunking:</strong>
            Flat chunking treats every document as a sequence of independent
            chunks, but many real world corpora have rich structure: books have
            chapters and sections, codebases have directories and imports, legal
            documents have hierarchical clauses. Hierarchical retrieval exploits
            this structure to improve both precision and context completeness.
            The core idea is to chunk at multiple granularities simultaneously.
            A design document might be chunked as: the full document (5,000
            tokens), each major section (800 to 1,200 tokens), and individual
            paragraphs (200 to 400 tokens). All three levels are embedded and
            indexed. At query time, the system can retrieve at the appropriate
            level: paragraph chunks for precise facts, section chunks for
            broader context, or the full document when the query is exploratory.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Multi Level Retrieval Works
            </p>
            <p style="margin-top: 0">
              Suppose a user asks "What were the performance goals for the 2024
              roadmap?" A single level system retrieves paragraph chunks
              mentioning performance and 2024, but might miss the executive
              summary that contextualizes those goals. A hierarchical system
              retrieves both: the executive summary chunk (document level) and
              the specific performance metrics paragraph (paragraph level). The
              implementation uses a two pass retrieval strategy. First pass
              retrieves candidates at all levels: maybe 50 paragraph chunks, 20
              section chunks, and 5 full document chunks. Second pass re ranks
              them together and selects a diverse set. The key is the context
              budget allocation: you might spend 10k tokens on full document
              chunks (providing broad context), 30k tokens on section chunks
              (providing detailed coverage), and 10k tokens on paragraph chunks
              (providing specific facts).
            </p>
            <div style="margin: 20px 0 20px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  1
                </div>
                <div style="flex: 1">
                  <strong>Ingestion:</strong> Chunk document at three levels:
                  full doc (5k tokens), sections (1k tokens), paragraphs (300
                  tokens). Embed and index all levels with parent/child links.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  2
                </div>
                <div style="flex: 1">
                  <strong>Retrieval:</strong> Query all three indexes
                  simultaneously. Retrieve 50 paragraphs, 20 sections, 5 full
                  docs in parallel (50 to 80 ms total).
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  3
                </div>
                <div style="flex: 1">
                  <strong>Reranking:</strong> Score all candidates together. Use
                  cross encoder to identify best 2 full docs, 8 sections, 10
                  paragraphs based on relevance and diversity.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  4
                </div>
                <div style="flex: 1">
                  <strong>Assembly:</strong> Arrange chunks hierarchically in
                  context: full docs first (broad context), then sections, then
                  paragraphs. Total 50k tokens across all levels.
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Hierarchical Retrieval Wins
            </p>
            <p style="margin-top: 0">
              This approach shines for complex questions that require both high
              level understanding and specific details. For example, debugging
              questions in technical documentation: "Why is my API call failing
              with error 403?" benefits from both the high level authentication
              architecture doc (to understand the auth flow) and the specific
              error code reference (to see what 403 means in this context). The
              trade off is operational complexity. You now maintain three
              indexes instead of one, tripling storage and ingestion cost.
              Retrieval latency increases slightly because you query multiple
              indexes, though parallel execution keeps the overhead to 10 to 20
              ms. Re ranking across different chunk sizes is also tricky: how do
              you compare the relevance of a 300 token paragraph to a 5,000
              token full document? Most systems normalize scores by chunk size
              and apply learned weights.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Parent Document Retrieval
            </p>
            <p style="margin-top: 0">
              A simpler variant is parent document retrieval. You chunk and
              embed at fine granularity (for example, 200 token paragraphs for
              precise matching), but at retrieval time you return the entire
              parent document or section instead of just the matched chunk. This
              gives the model much more context than the specific paragraph that
              matched. For example, a 10 page incident report is chunked into 50
              paragraphs. The query "What was the root cause?" matches paragraph
              23. Instead of returning just that paragraph, the system returns
              the entire "Root Cause Analysis" section (2,000 tokens). The model
              gets all supporting details, timeline, and evidence that surround
              the specific sentence that matched. The cost is token budget. If
              you return 10 parent documents at 2,000 tokens each, you consume
              20k tokens. This only works when parent documents are reasonably
              sized (under 2,000 to 3,000 tokens) and queries are specific
              enough that you do not need many parents. For broad exploratory
              queries, parent retrieval wastes tokens on mostly irrelevant
              context.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Context Allocation: Hierarchical vs Flat
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3 levels</div>
                  <div style="font-size: 10px; font-weight: 600">
                    HIERARCHICAL
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    50k tokens
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    MIXED GRANULARITY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    +15% quality
                  </div>
                  <div style="font-size: 10px; font-weight: 600">VS FLAT</div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Recursive Retrieval for Code and APIs
            </p>
            <p style="margin-top: 0">
              For codebases, a specialized form of hierarchical retrieval
              follows import and dependency graphs. When a user asks about a
              function, the system retrieves the function definition chunk, then
              recursively retrieves chunks for any functions or classes it
              imports, then retrieves configuration or data schemas those depend
              on. This can quickly explode: a single function might transitively
              import 20 other files. The solution is depth limiting and
              relevance filtering. Set a maximum depth (for example, 2 levels of
              imports) and at each level only follow the top 3 to 5 most
              relevant dependencies based on embedding similarity to the
              original query. This keeps total chunks bounded while still
              providing critical context that naive flat retrieval would miss.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Large companies like Google and
              Meta use hierarchical retrieval for internal documentation systems
              serving tens of thousands of engineers. The 10 to 15 percent
              improvement in answer quality for complex technical queries
              justifies the 2x to 3x increase in infrastructure cost, because
              engineer productivity gains far exceed the compute spend.
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
                  Hierarchical retrieval chunks at multiple granularities (full
                  docs, sections, paragraphs) and retrieves at the appropriate
                  level, improving quality by 10 to 15 percent for complex
                  queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi level context allocation spends tokens strategically:
                  10k on full documents for broad understanding, 30k on sections
                  for details, 10k on paragraphs for specific facts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parent document retrieval embeds fine grain chunks (200
                  tokens) for precision but returns entire parent sections
                  (2,000 tokens) for context completeness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recursive retrieval for code follows import graphs with depth
                  limiting (2 levels max) and relevance filtering (top 3 to 5
                  dependencies per level) to avoid context explosion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational cost triples storage and ingestion when
                  maintaining three index levels, justified only when answer
                  quality gains translate to measurable business value
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
                  Technical documentation systems retrieve both high level
                  architecture docs (5k tokens) and specific error code
                  references (300 tokens) for debugging queries, providing
                  comprehensive context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Code Q&amp;A systems retrieve a function definition (400
                  tokens), its imported utilities (800 tokens), and relevant
                  config schemas (600 tokens), following dependency graph with
                  depth limit of 2
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google and Meta internal assistants use hierarchical retrieval
                  for 50k+ engineers, accepting 2x to 3x infrastructure cost for
                  15 percent quality improvement on complex technical queries
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChunkingStrategiesAdvancedHierarchicalRetrievalAndMultiStageContext;
