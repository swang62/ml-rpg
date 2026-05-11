import type { Component } from "solid-js";

const LessonMultiModelServingLlmMultiModelServingGatewayPatternAndVramConstraints: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            LLM Multi-Model Serving: Gateway Pattern and VRAM Constraints
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why LLMs Are Different
            </p>
            <p style="margin-top: 0">
              LLMs require a fundamentally different multi-model approach due to
              massive memory footprints and KV cache growth during generation. A
              7B parameter model needs 6 to 8GB of VRAM just for weights (in
              FP16), plus additional gigabytes for the KV cache that grows with
              sequence length and batch size. This makes on demand loading
              impractical: swapping a multi gigabyte model in and out of VRAM
              takes 5 to 30 seconds and destroys throughput.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Gateway Pattern
            </p>
            <p style="margin-top: 0">
              The dominant production pattern is gateway level aggregation: each
              large model runs on dedicated GPU resources (one model per GPU or
              node), and a lightweight reverse proxy exposes a single external
              endpoint that routes to per model backends. A team serving 10
              different 7B to 13B models deploys 10 separate GPU instances (each
              running one model with vLLM or TensorRT-LLM), fronted by an nginx
              or Envoy gateway that routes based on model ID. The gateway adds
              negligible overhead (under 1ms) while providing centralized
              authentication, rate limiting, and failover.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Throughput and Latency
            </p>
            <p style="margin-top: 0">
              Per GPU throughput for LLMs is measured in tokens per second. A 7B
              model on a single 40GB A100 typically sustains 100 to 300 tokens/s
              aggregate throughput across concurrent requests, depending on
              batch size, sequence length, and KV cache optimization (techniques
              like paged attention). Per request latency is dominated by output
              length: generating 100 tokens at 50 tokens/s takes 2 seconds, plus
              initial prompt processing (typically 50 to 200ms for 1000 token
              prompts). Trying to fit two 7B models on one 40GB GPU usually
              violates SLOs because VRAM pressure limits effective batch size.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sequence Length Spikes
            </p>
            <p style="margin-top: 0">
              The critical failure mode. If a user sends a request with a 4000
              token output limit, the KV cache for that sequence can consume 2
              to 4GB, reducing concurrent requests from 16 to 4, causing OOM or
              latency cliffs for other requests. Production systems mitigate
              this with strict max token limits (512 or 1024 output tokens),
              budget aware admission control that tracks allocated KV memory,
              and paged KV caching (used by vLLM) that reduces fragmentation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Client Request</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    &#123;model: "llama2_7b", prompt: "..."&#125;
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Gateway (Nginx/Envoy)</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Routing + Auth + Rate Limit
                  </div>
                  <div style="font-size: 10px">&lt;1ms overhead</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 11px">GPU 1</strong>
                    <div style="font-size: 9px; margin-top: 3px">llama2_7b</div>
                    <div style="font-size: 9px">6GB weights</div>
                    <div style="font-size: 9px">200 tok/s</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 11px">GPU 2</strong>
                    <div style="font-size: 9px; margin-top: 3px">
                      mistral_7b
                    </div>
                    <div style="font-size: 9px">7GB weights</div>
                    <div style="font-size: 9px">180 tok/s</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 11px">GPU 3</strong>
                    <div style="font-size: 9px; margin-top: 3px">
                      llama2_13b
                    </div>
                    <div style="font-size: 9px">12GB weights</div>
                    <div style="font-size: 9px">120 tok/s</div>
                  </div>
                </div>
                <div style="margin-top: 6px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 10px; text-align: center">
                  <strong>Isolation:</strong> Each model on dedicated GPU to
                  avoid VRAM thrashing
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
                  7 billion parameter LLMs require 6 to 8 gigabytes VRAM for
                  weights alone; on demand loading takes 5 to 30 seconds and
                  destroys throughput, making per GPU isolation necessary
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gateway pattern deploys each model on dedicated GPU with
                  reverse proxy routing; gateway adds under 1ms overhead while
                  providing centralized auth and rate limiting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single 40GB A100 running 7B model sustains 100 to 300 tokens
                  per second aggregate throughput; per request latency is output
                  length divided by generation speed (100 tokens at 50 tok/s
                  equals 2 seconds)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fitting two 7B models on one 40GB GPU usually fails: VRAM
                  pressure limits batch size, KV cache thrashes, and total
                  throughput drops below 150 tokens/s, violating SLOs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sequence length spikes are the critical failure mode: a 4000
                  token output can consume 2 to 4GB of KV cache, reducing
                  concurrency from 16 to 4 requests and causing OOM; mitigate
                  with strict max token limits and paged KV caching
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
                  OpenAI style deployment serving 5 LLM variants: each model on
                  separate GPU cluster (GPT 3.5 turbo on 50 A100s, GPT 4 on 200
                  A100s), single api.openai.com endpoint routes by model
                  parameter
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anthropic Claude serving multiple model sizes: claude-instant
                  (7B class) at 250 tokens/s per GPU, claude-2 (70B+ class) at
                  30 tokens/s per GPU, gateway splits traffic 80/20 by cost and
                  latency needs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Internal enterprise LLM platform: 8 fine tuned 13B models for
                  different business units, each on dedicated 40GB A100, nginx
                  gateway with JWT auth and per-user rate limits (10 requests
                  per minute), tracks KV memory and rejects requests when 35GB
                  threshold reached
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiModelServingLlmMultiModelServingGatewayPatternAndVramConstraints;
