import type { Component } from "solid-js";

const LessonChunkingStrategiesChunkingStrategiesFixedVsSemantic: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Chunking Strategies: Fixed vs Semantic
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Strategy Decision:</strong>
            Once you decide to chunk documents, you face a critical
            implementation choice: how exactly do you split the text? The two
            dominant approaches are fixed length chunking and semantic chunking,
            each with measurably different performance characteristics.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fixed Length Chunking
            </p>
            <p style="margin-top: 0">
              This approach splits documents every N tokens regardless of
              content structure. For example, a 5,000 token legal contract
              becomes exactly 10 chunks of 500 tokens each. The implementation
              is trivial: tokenize the document, group into fixed size arrays,
              optionally add 10 to 30 percent overlap between adjacent chunks.
              The advantage is speed and predictability. At ingestion throughput
              of 100 million log entries per day, fixed chunking processes
              documents in microseconds with zero parsing complexity. Token
              budgeting is trivial because every chunk has identical size.
              However, you frequently cut across semantic boundaries: a table
              might be split so headers land in one chunk and data rows in
              another, or a legal definition might be separated from the clause
              that references it.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Ingestion Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10 μs</div>
                  <div style="font-size: 10px; font-weight: 600">
                    FIXED LENGTH
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">500 μs</div>
                  <div style="font-size: 10px; font-weight: 600">SEMANTIC</div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Semantic Chunking
            </p>
            <p style="margin-top: 0">
              This approach respects document structure by splitting on natural
              boundaries: section headers, paragraph breaks, or embedding based
              topic shifts. A design doc with 5 sections becomes 5 chunks of
              varying size (200 to 1,200 tokens). Some systems use a small
              language model to detect when the next paragraph shifts topics
              based on embedding distance. Semantic chunking typically improves
              answer quality by 5 to 15 percent in evaluations because chunks
              are self contained and coherent. A compliance policy chunk will
              include both the rule and its exceptions. However, variable chunk
              sizes complicate context budgeting: you might plan for 20 chunks
              but only fit 12 because several are unusually large. Ingestion is
              also 50x to 100x slower due to parsing overhead.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Semantic chunking that produces
              chunks ranging from 50 to 2,000 tokens makes retrieval
              unpredictable. You may retrieve one massive chunk that consumes
              your entire budget or many tiny fragments that lack context.
              Hybrid strategies cap semantic chunks at a max size (for example,
              800 tokens) to bound variance.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
                <div style="display: flex; flex-direction: column; gap: 8px">
                  <div style="font-weight: 700; font-size: 13px; text-align: center; margin-bottom: 4px">
                    Fixed Length (500 tokens)
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    Chunk 1: Introduction and first...
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    Chunk 2: ...section. Next sec...
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    Chunk 3: ...tion continues here
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px">
                  <div style="font-weight: 700; font-size: 13px; text-align: center; margin-bottom: 4px">
                    Semantic (by section)
                  </div>
                  <div style="border: 2px solid; padding: 14px; border-radius: 4px; font-size: 11px; text-align: center">
                    Chunk 1: Introduction (320 tokens)
                  </div>
                  <div style="border: 2px solid; padding: 20px; border-radius: 4px; font-size: 11px; text-align: center">
                    Chunk 2: Section 1 (780 tokens)
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    Chunk 3: Section 2 (410 tokens)
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
                  Fixed length chunking processes documents in microseconds but
                  cuts across semantic boundaries, potentially splitting tables,
                  definitions, or code blocks mid concept
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic chunking improves answer quality by 5 to 15 percent
                  by preserving logical units, but is 50x to 100x slower and
                  produces variable chunk sizes that complicate budgeting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Overlap of 10 to 30 percent reduces boundary loss (missing key
                  references at split points) but increases index size and
                  retrieval cost proportionally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At billion chunk scale, a 20 percent overlap means tens of
                  millions of extra vectors to store and search, directly
                  impacting infrastructure cost
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
                  Google scale documentation systems often use semantic chunking
                  with section headers, accepting 500 microsecond per document
                  overhead for better retrieval precision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High volume log ingestion pipelines prefer fixed 256 token
                  chunks to process 100 million entries per day without parsing
                  bottlenecks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChunkingStrategiesChunkingStrategiesFixedVsSemantic;
