import type { Component } from "solid-js";

const LessonDeepLearningTimeseriesTransformerArchitecturesForTimeSeriesSelfAttentionAndLongRangeDependencies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Transformer Architectures for Time Series: Self-Attention and Long
            Range Dependencies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Transformers replace sequential recurrence with self-attention
            mechanisms that relate every time step to every other time step in
            parallel. This fundamental shift solves two problems: it enables
            full parallelism during training (processing all time steps
            simultaneously rather than one by one), and it can capture
            dependencies across very long sequences without information decay.
            Self-attention works by computing attention scores between all pairs
            of positions in your context window. For each position, the
            mechanism learns which other positions are relevant, assigns them
            weights, and aggregates their information. With multiple attention
            heads (typically 4 to 8), the model can attend to different patterns
            simultaneously: one head might focus on recent trends, another on
            weekly seasonality, and another on special events. This flexibility
            allows Transformers to capture complex temporal interactions that
            LSTMs struggle with when patterns span hundreds or thousands of
            steps. The critical tradeoff is computational cost. Attention
            requires storing and computing scores for all pairs of time steps,
            which means memory and computation scale quadratically with sequence
            length L. For a batch of 64 sequences of length 512 with 8 attention
            heads, a single attention layer needs about 512 megabytes just for
            attention weight storage. With 4 layers you cross 2 gigabytes before
            activations and gradients. This limits practical context windows and
            makes online serving on CPU challenging without optimization.
            Production deployments manage this through several techniques.
            First, cap context length at 192 to 336 steps and use local or block
            attention patterns that reduce complexity from O(L squared) to O(L).
            Second, downsample distant history using moving averages or dilated
            convolutions, keeping high resolution only for recent windows.
            Third, micro-batch requests during online serving: batching 8 to 16
            forecasts together achieves p99 under 50 milliseconds on CPU for
            compact Transformer encoders with 4 heads and length 192. The result
            is a model architecture that excels when you need to capture
            intricate long range patterns and have abundant training data, but
            requires careful engineering to meet latency Service Level
            Objectives (SLOs). Google and Netflix use Transformer based
            forecasting for capacity planning where forecast quality dominates
            per request latency, typically in batch pipelines with hourly or
            daily cadence. For high Queries Per Second (QPS) online scoring with
            sub 20 millisecond latency requirements, optimized compact
            Transformers can work, but many teams default to LSTMs for their
            predictable efficiency.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Attention Memory Scaling
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Length 192, Batch 32, 4 Heads
                  </div>
                  <div style="font-size: 12px">
                    Attention weights: ~150 MB/layer
                  </div>
                  <div style="font-size: 12px">4 layers: ~600 MB</div>
                  <div style="font-size: 12px; margin-top: 4px">
                    <strong>✓ Feasible for CPU serving</strong>
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center">↓</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Length 512, Batch 64, 8 Heads
                  </div>
                  <div style="font-size: 12px">
                    Attention weights: ~512 MB/layer
                  </div>
                  <div style="font-size: 12px">4 layers: ~2 GB</div>
                  <div style="font-size: 12px; margin-top: 4px">
                    <strong>⚠ GPU required, high cost</strong>
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center">↓</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Length 1024, Batch 64, 8 Heads
                  </div>
                  <div style="font-size: 12px">
                    Attention weights: ~2 GB/layer
                  </div>
                  <div style="font-size: 12px">4 layers: ~8 GB</div>
                  <div style="font-size: 12px; margin-top: 4px">
                    <strong>✗ OOM without sparse attention</strong>
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
                  Self-attention computes relationships between all time step
                  pairs in parallel, enabling capture of dependencies across
                  1000+ steps without decay, unlike sequential LSTMs limited to
                  200 to 700 steps effectively
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quadratic memory and compute scaling: length 512 with batch 64
                  and 8 heads requires 512 MB per attention layer, reaching 2+
                  GB for 4 layers before activations, limiting practical context
                  windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training parallelism gives 2x to 4x faster convergence than
                  LSTMs on same hardware when batch sizes are tuned, critical
                  for frequent retraining on large datasets with billions of
                  observations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production serving requires optimization: compact Transformer
                  with length 192 and 4 heads achieves p99 under 20ms on CPU
                  with micro-batching, but length over 512 needs GPU or sparse
                  attention patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Higher variance across random seeds on small datasets compared
                  to LSTMs: Mean Absolute Percentage Error (MAPE) can swing from
                  2.4% to over 3% across runs, impacting Service Level
                  Agreements (SLAs) for frequent retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best suited for long context needs (1000+ steps), abundant
                  training data (millions of series), and batch serving
                  pipelines where forecast quality dominates per request latency
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
                  Google capacity planning: Transformer encoder with 336 hour
                  context, 8 heads, 6 layers predicts 7 day compute resource
                  needs in nightly batch pipeline, processing 100k server
                  forecasts in 15 minutes on GPU cluster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retail demand with promotions: 4 layer Transformer with length
                  240 (10 weeks daily), 4 heads captures long promotional cycles
                  and product lifecycle patterns, trains on 5 million SKU
                  histories in 8 hours on 4 A100 GPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix content delivery: Transformer based forecasting with
                  168 hour context and 8 heads models regional bandwidth demand
                  including event driven spikes, batch generates 50k forecasts
                  hourly on CPU with p95 under 200ms per forecast
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeepLearningTimeseriesTransformerArchitecturesForTimeSeriesSelfAttentionAndLongRangeDependencies;
