import type { Component } from "solid-js";

const LessonChunkingStrategiesFailureModesWhenChunkingBreaks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: When Chunking Breaks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Partial Context: The Plausible but Wrong Answer:</strong>
            The most dangerous failure mode is when chunking splits critical
            qualifiers from their associated rules, producing answers that sound
            confident but violate exceptions. Consider a compliance policy that
            states a rule in paragraph one and lists three exceptions in
            paragraph two. Fixed length chunking at 400 tokens might split these
            into separate chunks. At retrieval time, the system returns only the
            rule chunk because it matches the query. The model generates an
            answer based on the rule alone, completely missing the exceptions.
            This is catastrophic in regulated domains: a financial services
            chatbot might tell a customer they are eligible for a loan when an
            exception actually disqualifies them. The answer is fluent,
            specific, and completely wrong. The mitigation is hierarchical
            metadata. Tag each chunk with its section path (for example,{" "}
            <code>document_id.section_2.subsection_a</code>) and always retrieve
            adjacent chunks when a high confidence match occurs. Some systems
            use a two pass retrieval: first find the best chunk, then
            automatically pull the chunk immediately before and after to capture
            context. This triples retrieval cost but prevents silent failures.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Context Flooding: Death by a Thousand Chunks
            </p>
            <p style="margin-top: 0">
              The opposite failure occurs when retrieval is too aggressive or
              chunks are too large. Suppose your system retrieves 50 chunks of
              1,000 tokens each, consuming 50k of your 128k budget. The model
              receives a flood of semi relevant text and starts anchoring on
              spurious details buried deep in the context. This manifests as
              hallucinations where the model combines facts from unrelated
              chunks, or contradictions where the answer shifts based on which
              chunk the model happened to focus on. Users report that the same
              question gives different answers on successive attempts. Latency
              also spikes: processing 50k extra tokens adds 200 to 400 ms to
              inference time. The fix is aggressive re ranking and diversity
              filtering. After initial retrieval of 100 to 200 candidates, use a
              cross encoder or small LLM to score relevance, then apply maximal
              marginal relevance to select a diverse set of 10 to 20 chunks.
              This keeps context focused on distinct perspectives rather than
              repetitive near duplicates.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Retrieval Cascade
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    VECTOR SEARCH
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    200 candidates
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    CROSS ENCODER
                  </div>
                  <div style="font-size: 16px; font-weight: 800">50 scored</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DIVERSITY FILTER
                  </div>
                  <div style="font-size: 16px; font-weight: 800">15 final</div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Structured Data and Cross Document References
            </p>
            <p style="margin-top: 0">
              Tables, code, and API documentation frequently depend on non
              contiguous information. A code snippet might reference an import
              at line 1, use a function defined in a separate file, and require
              configuration from a third file. Simple contiguous chunking will
              either split these apart or create a massive chunk that spans
              multiple files. A concrete example: an API endpoint documentation
              chunk describes parameters but the authentication scheme is
              documented in a separate security section. When a developer asks
              "how do I authenticate this endpoint?", retrieval returns the
              endpoint chunk but misses the auth chunk because they are
              semantically distant. The model hallucinates a plausible but
              incorrect authentication method. The solution is explicit linking
              during chunking. When parsing code or structured docs, create
              bidirectional links between related chunks (imports, function
              definitions, configuration references). At retrieval time, follow
              these links to pull in dependencies even if they do not match the
              query directly. This requires custom parsing per document type but
              prevents silent failures in technical documentation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale Induced Index Degradation
            </p>
            <p style="margin-top: 0">
              At billion chunk scale, naive overlapping and semantic chunking
              can cause operational failures. Suppose you chunk 10 million
              documents into an average of 50 chunks each with 25 percent
              overlap. That is 625 million vectors. When the corpus grows 10x to
              100 million documents, you have 6.25 billion vectors. Most vector
              databases use approximate nearest neighbor (ANN) search algorithms
              like HNSW or IVF that trade accuracy for speed. As index size
              grows, recall degrades: you might retrieve the true top 20 chunks
              only 70 to 80 percent of the time instead of 95+ percent. This
              manifests as inconsistent answer quality where the same question
              sometimes gets great answers and sometimes misses obvious relevant
              documents. The mitigation is either sharding the index by document
              type or access domain, or investing in more expensive exact search
              for the final re ranking stage. You might use ANN to narrow 6
              billion chunks to 1,000 candidates in 30 ms, then use exact search
              over those 1,000 to pick the final 20 in another 20 ms. This
              hybrid approach keeps total latency acceptable while maintaining
              high recall.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Access control leakage is a common
              failure when chunks cross document boundaries with different
              permissions. If you chunk a directory of files without respecting
              per file ACLs (Access Control Lists), retrieval might return a
              chunk that mixes public and confidential content, exposing
              secrets. Always tag chunks with the strictest ACL of any content
              they contain and filter at retrieval time.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="font-weight: 700; font-size: 13px; text-align: center; margin-bottom: 6px">
                  Partial Context Failure
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 11px; margin-bottom: 3px">
                    Chunk 1: Rule (retrieved ✓)
                  </div>
                  <div style="font-size: 10px">
                    "Employees may request up to 15 days of remote work per
                    quarter."
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 11px; margin-bottom: 3px">
                    Chunk 2: Exceptions (missed ✗)
                  </div>
                  <div style="font-size: 10px">
                    "Exceptions: New hires first 90 days, customer facing roles,
                    and managers require approval."
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <div style="font-weight: 700; font-size: 11px; margin-bottom: 3px">
                    Model Answer (Wrong)
                  </div>
                  <div style="font-size: 10px">
                    "Yes, you can request 15 days remote." (ignores manager
                    exception)
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
                  Partial context failure occurs when rules and exceptions split
                  across chunks, producing confident but incorrect answers that
                  violate hidden qualifiers in compliance or legal domains
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context flooding with 50+ chunks causes hallucinations and
                  contradictions as the model anchors on spurious details,
                  adding 200 to 400 ms latency from processing excess tokens
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Structured data like code or API docs requires explicit
                  linking during chunking to pull in dependencies (imports, auth
                  schemes, config) that are semantically distant from the query
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Billion chunk scale degrades ANN (Approximate Nearest
                  Neighbor) recall from 95+ percent to 70 to 80 percent, causing
                  inconsistent answer quality; hybrid exact search over top
                  candidates restores precision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Access control leakage happens when chunks cross document
                  boundaries with different ACLs (Access Control Lists),
                  exposing confidential content; always tag chunks with
                  strictest permission and filter at retrieval
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
                  Financial chatbot splits loan eligibility rules from exception
                  list, tells disqualified customer they are approved, violating
                  compliance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  API documentation retrieves endpoint description but misses
                  authentication section in separate chunk, model hallucinates
                  incorrect auth method
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  10 million document corpus with 50 chunks each and 25 percent
                  overlap creates 625 million vectors; 10x growth to 6.25
                  billion vectors degrades recall by 15 to 25 percent without
                  infrastructure changes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChunkingStrategiesFailureModesWhenChunkingBreaks;
