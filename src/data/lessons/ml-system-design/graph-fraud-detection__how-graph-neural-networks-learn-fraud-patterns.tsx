import type { Component } from "solid-js";

const LessonGraphFraudDetectionHowGraphNeuralNetworksLearnFraudPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Graph Neural Networks Learn Fraud Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Message Passing Fundamentals
            </p>
            <p>
              GNNs learn by passing messages between connected nodes. Each node
              starts with its own features (transaction amount, user age, device
              type). In each layer, nodes aggregate messages from their
              neighbors, combine them with their own features, and produce
              updated representations. After 2-3 layers, each node embedding
              contains information from its extended neighborhood.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Core Mechanism:</strong> A 2-layer GNN lets each node see
              2 hops away. If user A connects to device B, and device B connects
              to flagged user C, then A incorporates signals from C even without
              direct connection. This multi-hop visibility catches fraud rings.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Aggregation Functions
            </p>
            <p>
              How nodes combine neighbor messages determines what patterns the
              model learns. Mean aggregation treats all neighbors equally—good
              for density anomalies. Max aggregation captures the most
              suspicious neighbor—good for single toxic connections.
              Attention-based aggregation learns which neighbors matter most,
              adapting weights based on the task.
            </p>
            <p>
              For fraud detection, attention mechanisms often outperform fixed
              aggregations. The model learns that connections to recently
              created accounts matter more than connections to established
              accounts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training on Imbalanced Labels
            </p>
            <p>
              Fraud is rare (0.1-1% of transactions). Standard training produces
              models predicting everything as legitimate. Solutions: oversample
              fraud cases, use focal loss emphasizing hard examples, or frame as
              edge prediction (predicting whether a transaction will be
              fraudulent).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Training Insight:</strong> Edge-level prediction (given a
              proposed transaction edge, predict fraud) naturally handles class
              imbalance since you control which edges to train on.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Message Passing: 2 Hop Aggregation
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 80px; text-align: center">
                    <strong style="font-size: 12px">Device 1</strong>
                    <div style="font-size: 10px; margin-top: 4px">Age: 5d</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 80px; text-align: center">
                    <strong style="font-size: 12px">Device 2</strong>
                    <div style="font-size: 10px; margin-top: 4px">Age: 2d</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 80px; text-align: center">
                    <strong style="font-size: 12px">Card A</strong>
                    <div style="font-size: 10px; margin-top: 4px">CB: 0%</div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Aggregate (Hop 1)
                </div>
                <div style="display: flex; justify-content: center">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; min-width: 120px">
                    <strong style="font-size: 13px">User Node</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Embed: 128d
                    </div>
                    <div style="font-size: 10px; margin-top: 2px">
                      Spend: $2.5K
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Aggregate (Hop 2)
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 90px; text-align: center">
                    <strong style="font-size: 12px">Merchant X</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Risk: 0.02
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 90px; text-align: center">
                    <strong style="font-size: 12px">Merchant Y</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Risk: 0.15
                    </div>
                  </div>
                </div>
                <div style="margin-top: 12px; padding: 10px; border-radius: 6px; border: 2px solid; text-align: center">
                  <strong style="font-size: 12px">
                    Output: Fraud Score 0.08
                  </strong>
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
                  GNNs pass messages between connected nodes over 2-3 layers to
                  capture multi-hop relationships
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Attention-based aggregation learns which neighbor connections
                  matter, often outperforming fixed mean or max aggregation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge-level prediction naturally handles extreme class
                  imbalance better than node classification
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
                  Explain that a 2-layer GNN sees 2 hops away—if user A shares
                  device with flagged user C via device B, A incorporates risk
                  signals from C
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention fraud is 0.1-1% of transactions, so systems use edge
                  prediction or focal loss to handle imbalance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGraphFraudDetectionHowGraphNeuralNetworksLearnFraudPatterns;
