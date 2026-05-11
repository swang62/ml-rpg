import type { Component } from "solid-js";

const LessonDeepLearningTimeseriesLongShortTermMemoryLstmNetworksForTimeSeriesForecasting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Long Short-Term Memory (LSTM) Networks for Time Series Forecasting
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Long Short-Term Memory (LSTM) networks solve a fundamental problem
            in time series prediction: learning temporal patterns across many
            steps without losing information. Unlike basic Recurrent Neural
            Networks (RNNs) that suffer from vanishing gradients, LSTMs use a
            gating mechanism with input, forget, and output gates to selectively
            retain or discard information in a hidden state that flows through
            the sequence. The architecture works step by step through your time
            series. At each timestamp, the LSTM takes the current input and the
            previous hidden state, then updates both a cell state (long term
            memory) and hidden state (short term working memory). The forget
            gate decides what to throw away from the cell state, the input gate
            decides what new information to store, and the output gate controls
            what gets passed to the next layer. This design maintains gradient
            flow and allows the network to remember events from 24 to 720 steps
            back, which is critical for capturing weekly or monthly patterns.
            For production forecasting, a typical LSTM architecture uses 1 to 2
            layers with 64 to 128 hidden units per layer. Amazon retail
            forecasting might use a 2 layer LSTM with 128 units, processing
            context windows of 168 hours (one week) to predict the next 48 hours
            across millions of item-store pairs. Training on a single A100
            Graphics Processing Unit (GPU) achieves about 20,000 sequences per
            second with mixed precision, which means training on a few million
            series completes in hours, not days. The key advantage of LSTMs is
            predictable, linear compute cost in sequence length. A compact
            single layer LSTM with 64 units can deliver predictions in under 10
            milliseconds per series on Central Processing Unit (CPU), making it
            ideal for online serving at thousands of Queries Per Second (QPS)
            with strict p99 latency budgets. This efficiency matters when you
            need to score forecasts in real time for surge pricing or capacity
            allocation. The tradeoff is that LSTMs process sequences
            sequentially, which prevents parallelism during training and limits
            their ability to capture very long range dependencies beyond a few
            hundred steps. For context windows beyond 512 to 1024 steps, or when
            you need to relate events separated by thousands of timestamps,
            Transformer architectures become more effective despite higher
            serving cost.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                LSTM Cell at Time Step t
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 13px">
                    <strong>x(t)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Current Input
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 13px">
                    <strong>h(t-1)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Prev Hidden
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 14px 16px; border-radius: 6px; width: 85%">
                  <div style="font-weight: 700; margin-bottom: 8px; text-align: center; font-size: 13px">
                    Gates
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <div>Forget Gate: What to discard</div>
                    <div>Input Gate: What to store</div>
                    <div>Output Gate: What to emit</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 13px">
                    <strong>c(t)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Cell State
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 13px">
                    <strong>h(t)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Hidden State
                    </div>
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
                  LSTMs solve vanishing gradients with gating mechanisms
                  (forget, input, output gates) that control information flow
                  through a cell state and hidden state updated at each time
                  step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training throughput reaches 20,000 sequences per second on
                  A100 GPU for 2 layer 128 unit models with context length 168
                  hours, enabling nightly retraining across millions of series
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inference efficiency is excellent: single layer 64 unit LSTMs
                  deliver p99 under 10ms per series on CPU for contexts under
                  200 steps, supporting thousands of QPS without GPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Linear compute complexity in sequence length (unlike quadratic
                  attention) makes LSTMs predictable and cost effective for
                  moderate context windows of 24 to 720 steps
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sequential processing limits training parallelism and long
                  range dependency modeling beyond 512 to 1024 steps compared to
                  Transformers, but provides stable variance across training
                  runs
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
                  Amazon retail demand forecasting: 2 layer LSTM with 128 units,
                  context 168 hours (1 week), forecasts next 48 hours for
                  millions of item-store pairs, trains nightly on A100 GPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber ride demand prediction: Single layer 64 unit LSTM for
                  online scoring at 2000 QPS with p99 under 50ms on CPU,
                  predicts next 2 hours from 72 hour context window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix capacity planning: 2 layer 128 unit LSTM processes 336
                  hourly observations to forecast 7 day compute resource needs,
                  batch generation of 50k forecasts/second on CPU pool
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeepLearningTimeseriesLongShortTermMemoryLstmNetworksForTimeSeriesForecasting;
