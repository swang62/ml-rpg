import type { Component } from "solid-js";

const LessonEmbeddingGenerationGraphEmbeddingsForCollaborativeAndStructuralSignals: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Graph Embeddings for Collaborative and Structural Signals
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT GRAPH EMBEDDINGS CAPTURE
            </p>
            <p>
              Graph embeddings encode structural relationships from interaction
              graphs: users connected to items they clicked, items connected to
              categories, users connected to each other through shared
              behaviors. The embedding captures collaborative signals—patterns
              of who interacts with what—that pure text or image embeddings
              completely miss.
            </p>
            <p>
              Example: User A and User B never searched the same keywords, but
              both clicked the same 50 products. Their text queries have zero
              overlap, but their graph embeddings are similar because they have
              demonstrated similar tastes through behavior rather than words.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW GRAPH EMBEDDINGS WORK
            </p>
            <p>
              <strong>Random walk methods (Node2Vec, DeepWalk):</strong> Sample
              random paths through the graph, treat each path as a "sentence" of
              node IDs, apply word2vec-style training. Nodes that appear in
              similar path contexts get similar embeddings. Fast to train,
              scales to billions of edges.
            </p>
            <p>
              <strong>Graph Neural Networks (GNN):</strong> Each node aggregates
              features from its neighbors iteratively. After K layers, each node
              embedding incorporates information from its K-hop neighborhood.
              More expressive than random walks but more expensive to
              train—typically used for smaller graphs or when node features
              matter.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMBINING WITH CONTENT EMBEDDINGS
            </p>
            <p>
              Graph embeddings capture who interacts with what. Content
              embeddings (text, image) capture what items look like. Best
              recommendation systems combine both: concatenate the vectors, or
              train a joint model that uses both signal types.
            </p>
            <p>
              Cold start problem: new items have no graph edges, so graph
              embedding is meaningless. Solution: fall back to content
              embeddings until sufficient interactions accumulate. Typical
              threshold: 10-50 interactions before graph embedding becomes
              reliable.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Use graph embeddings for
              behavioral similarity, content embeddings for semantic similarity.
              Combine both for robust recommendations that work for both new and
              established items.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    User-Item Interaction Graph
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Billions of nodes, tens of billions of edges
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px">
                    <strong>Random Walk Sampling</strong>
                    <div style="margin-top: 4px">Node2Vec: U1→I5→U7→I2</div>
                    <div style="margin-top: 4px">Skip gram objective</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px">
                    <strong>Neighborhood Aggregation</strong>
                    <div style="margin-top: 4px">GraphSAGE: Sum neighbors</div>
                    <div style="margin-top: 4px">Iterate 2 to 3 hops</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Node Embeddings: 64 to 256 dims
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Close in graph → Close in vector space
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Candidate Retrieval</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Return top 100 items in &lt;100ms tail latency
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
                  Graph embeddings capture collaborative signals from user-item
                  interactions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Random walks treat graph paths as sentences for word2vec-style
                  training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start: new items need 10-50 interactions before graph
                  embedding is reliable
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
                  Interview Tip: Explain why graph embeddings complement
                  text—users with different queries but same clicks have similar
                  graph embeddings.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the cold start solution—fall back to
                  content embeddings until sufficient interactions accumulate.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingGenerationGraphEmbeddingsForCollaborativeAndStructuralSignals;
