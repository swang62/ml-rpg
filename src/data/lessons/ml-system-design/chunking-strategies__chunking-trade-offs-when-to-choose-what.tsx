import type { Component } from "solid-js";

const LessonChunkingStrategiesChunkingTradeOffsWhenToChooseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Chunking Trade-offs: When to Choose What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Decision Framework:</strong>
            Choosing a chunking strategy is not about finding the "best"
            approach. It is about matching your choice to three constraints:
            corpus characteristics, query patterns, and operational budget. The
            same system might use different strategies for different document
            types.<p></p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Small Chunks (150 to 300 tokens)
                </div>
                <div style="font-size: 12px">
                  High precision, fit 40 to 80 chunks. Risk: lose context across
                  boundaries
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Large Chunks (800 to 1,200 tokens)
                </div>
                <div style="font-size: 12px">
                  Preserve context, fit 10 to 20 chunks. Risk: wasted tokens on
                  irrelevant text
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Small Chunks Win
            </p>
            <p style="margin-top: 0">
              Use 150 to 300 token chunks when your queries are precise and
              documents are dense with distinct topics. For example, a medical
              knowledge base with thousands of drug monographs benefits from
              small chunks because each query targets a specific drug. Small
              chunks improve retrieval precision: you get exactly the relevant
              paragraph without dragging along unrelated sections. The math
              matters here. With a 32k context window and 200 token chunks, you
              can fit 100 to 150 chunks after accounting for instructions and
              history. This diversity helps when the answer requires
              synthesizing information from many sources. However, small chunks
              fail catastrophically with cross references. If a legal document
              says "see section 4.2 for exceptions" and section 4.2 is in a
              different chunk, the model will miss the exceptions and generate
              incorrect answers.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Large Chunks Win
            </p>
            <p style="margin-top: 0">
              Use 800 to 1,200 token chunks when documents have strong internal
              dependencies or your queries are exploratory. For example, code
              documentation that references imports, configuration files, and
              API contracts in a single explanation needs large chunks to keep
              everything together. Large chunks also help with narrative
              documents like design docs or incident reports, where
              understanding requires reading several paragraphs in sequence. The
              trade off is reduced diversity: with 128k tokens and 1,000 token
              chunks, you fit only 80 to 100 chunks after other allocations. You
              are betting that depth on fewer sources beats breadth across many
              sources.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Chunk Count vs Size Trade-off (128k Context)
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    150 chunks
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    AT 200 TOKENS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">40 chunks</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AT 800 TOKENS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20 chunks</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AT 1200 TOKENS
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Overlap and Its Cost
            </p>
            <p style="margin-top: 0">
              Overlap is insurance against boundary problems but comes with real
              infrastructure cost. A 20 percent overlap on 500 million chunks
              means 100 million extra vectors to store, embed, and search. At
              1,536 dimensions per vector and 4 bytes per float, that is 600 GB
              of additional index data. The decision criteria: use overlap when
              boundary loss would cause serious errors (legal, medical,
              financial documents) and you can absorb the cost. Skip overlap for
              high volume, low stakes corpora like customer support tickets or
              internal chat logs where occasional boundary loss is acceptable.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fixed vs Semantic: The Real Trade-off
            </p>
            <p style="margin-top: 0">
              Fixed length chunking is the default for systems prioritizing
              operational simplicity and scale. It handles 100 million documents
              per day without parsing complexity, produces predictable token
              counts for budgeting, and never fails on malformed input. Use
              fixed chunking when you have massive throughput requirements or
              highly variable document quality. Semantic chunking is worth the
              complexity when answer quality directly impacts business metrics
              and you can invest in robust parsing infrastructure. The 5 to 15
              percent quality improvement matters when you are measuring user
              satisfaction, support ticket deflection, or compliance accuracy.
              However, you need to cap maximum chunk size to prevent variable
              size from breaking budgets.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not which chunking strategy is best. It is:
                what are my corpus characteristics, my error budget for boundary
                loss, and my infrastructure cost constraints? Then pick the
                simplest strategy that meets those requirements."
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
                  Small chunks (150 to 300 tokens) maximize retrieval precision
                  and diversity, fitting 100 to 150 chunks in context, but risk
                  losing cross references and definitions that span boundaries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large chunks (800 to 1,200 tokens) preserve narrative flow and
                  dependencies, critical for code docs and legal text, but fit
                  only 20 to 40 chunks and waste tokens on irrelevant sections
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  20 percent overlap prevents boundary loss but increases
                  infrastructure cost proportionally: 100 million extra vectors
                  for a 500 million chunk corpus means 600 GB more index storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fixed length chunking handles 100 million documents per day
                  with zero parsing overhead, preferred when operational
                  simplicity and throughput dominate quality concerns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic chunking improves answer quality by 5 to 15 percent
                  in evaluations, worth the 50x to 100x ingestion slowdown when
                  quality directly impacts business metrics like support
                  deflection
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
                  Medical knowledge bases use 200 token chunks for high
                  precision drug queries, accepting boundary risk because each
                  monograph is self contained
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Code documentation systems use 1,000 token chunks to preserve
                  imports, function definitions, and usage examples that must be
                  read together
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High volume log ingestion prefers fixed 256 token chunks to
                  process 100 million entries daily without parsing bottlenecks
                  or variance in chunk size
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChunkingStrategiesChunkingTradeOffsWhenToChooseWhat;
