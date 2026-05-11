import type { Component } from "solid-js";

const LessonGraphFraudDetectionFailureModesAndAdversarialRobustnessInGraphFraudDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Adversarial Robustness in Graph Fraud Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Graph Topology Attacks
            </p>
            <p>
              Sophisticated fraudsters manipulate the graph structure itself.
              Creating fake edges to legitimate users dilutes suspicion by
              associating fraud accounts with clean neighborhoods. Deleting
              suspicious edges (using different devices, avoiding direct
              transfers) hides connections. Sybil attacks create many fake
              identities to overwhelm the graph with noise, making fraud rings
              harder to distinguish from normal user clusters.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Defense Principle:</strong> Defense requires layered
              signals. Graph structure alone is attackable. Combine with
              behavioral features (timing patterns, amount distributions) and
              device fingerprinting that are harder to fake at scale.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Embedding Drift
            </p>
            <p>
              As the graph evolves, the embedding space drifts. Nodes that were
              similar a month ago may no longer be. Models trained on historical
              embeddings degrade as the live graph diverges. Monitor embedding
              distribution statistics (mean, variance, cluster centers) and
              retrain when drift exceeds thresholds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Contamination During Training
            </p>
            <p>
              If fraud labels are incomplete (many undetected fraud cases
              labeled as legitimate), the model learns that fraud patterns are
              normal. This is especially problematic for GNNs: a few mislabeled
              fraud nodes propagate clean signals through their neighborhoods,
              corrupting embeddings for connected legitimate users.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Label contamination propagates through
              graph structure. One mislabeled fraud ring can corrupt embeddings
              for all connected nodes, causing cascade of false negatives in the
              neighborhood.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start for New Nodes
            </p>
            <p>
              New users and accounts have no graph history. The GNN produces
              generic embeddings based only on node features, missing the
              relational signals that make graph models powerful. Mitigation:
              use population-level baselines for new nodes, require minimum
              activity before graph-based scoring, or employ temporal attention
              that weighs recent connections more heavily.
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
                  Fraudsters attack graph structure: fake edges to clean users,
                  deleted suspicious connections, Sybil attacks with many fake
                  identities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Label contamination propagates through graph—one mislabeled
                  fraud ring corrupts embeddings for all connected nodes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  New nodes lack graph history, producing generic embeddings—use
                  population baselines or require minimum activity before graph
                  scoring
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
                  Explain that defense requires layered signals: graph structure
                  alone is attackable, so combine with behavioral features and
                  device fingerprinting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing drift, mention monitoring embedding
                  distribution statistics and retraining when drift exceeds
                  thresholds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGraphFraudDetectionFailureModesAndAdversarialRobustnessInGraphFraudDetection;
