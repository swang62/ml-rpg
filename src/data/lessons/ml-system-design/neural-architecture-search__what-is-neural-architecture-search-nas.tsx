import type { Component } from "solid-js";

const LessonNeuralArchitectureSearchWhatIsNeuralArchitectureSearchNas: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Neural Architecture Search (NAS)?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Neural Architecture Search (NAS)</strong> automatically
                discovers optimal neural network architectures by searching
                through a defined space of possible designs, replacing manual
                architecture engineering with algorithmic exploration.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Problem It Solves
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Manual architecture design is slow and requires deep expertise. An
              expert might try 50-100 architecture variations over months, but
              the search space contains millions of possible designs. Human
              intuition cannot exhaustively explore this space.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              NAS automates this exploration. It evaluates thousands of
              architectures systematically, finding designs that humans might
              never consider. The result is often architectures that outperform
              hand-designed ones by 1-5% accuracy at the same or lower compute
              cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Core Components
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Search space:</strong> Defines what architectures are
              possible. This includes layer types (convolution, attention,
              pooling), connections (skip connections, dense blocks), and sizes
              (channel counts, depths). Larger spaces find better architectures
              but cost more to search.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Search strategy:</strong> How to explore the space.
              Options include reinforcement learning, evolutionary algorithms,
              or gradient-based methods. Each has different
              exploration-exploitation tradeoffs.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Evaluation strategy:</strong> How to score each candidate
              architecture. Full training is expensive (hours to days per
              architecture). Multi-fidelity methods train partially or use
              proxies to estimate final accuracy cheaply.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Search Space</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Operations: Conv 3x3, 5x5, 7x7
                    <br />
                    Connections: Skip, Sequential
                    <br />
                    Max params: 6M, FLOPs: 400M
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Search Strategy</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Evolutionary (100 candidates)
                    <br />
                    RL Controller
                    <br />
                    Differentiable DARTS
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Evaluation Strategy</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Stage 1: 3 epochs @ 160px
                    <br />
                    Stage 2: 10 epochs @ 224px (top 5%)
                    <br />
                    Stage 3: Full train + quantize
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Best Architecture</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Latency: 78ms p50, 115ms p95
                    <br />
                    Accuracy: 76.2% top 1<br />
                    Size: 18.4 MB
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
                  NAS explores millions of architecture combinations that humans
                  cannot manually test
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three components: search space, search strategy, evaluation
                  strategy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Found architectures often beat hand-designed ones by 1-5%
                  accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Search cost is the main limitation: thousands of GPU hours
                  possible
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
                  Interview Tip: Explain why the search space definition is
                  critical and how it constrains what NAS can find
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Compare reinforcement learning vs evolutionary
                  search strategies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss the compute cost tradeoff when
                  expanding search space
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNeuralArchitectureSearchWhatIsNeuralArchitectureSearchNas;
