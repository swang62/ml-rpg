import type { Component } from "solid-js";

const LessonLlmFineTuningTradeOffsFullFineTuningVsLoraVsQlora: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Full Fine Tuning vs LoRA vs QLoRA
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Choice:</strong> When adapting a large
            language model to your task, you're choosing between three main
            approaches, each with concrete implications for quality, cost, and
            operational complexity. The decision framework hinges on your read
            write ratio for model updates, budget constraints, and quality
            requirements.<p></p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Full Fine Tuning
                </div>
                <div style="font-size: 12px">
                  Best quality, 8 to 16 GPUs, $500+ per run, risk of
                  catastrophic forgetting
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  QLoRA
                </div>
                <div style="font-size: 12px">
                  97 to 99% quality, 1 GPU, $30 to $100 per run, preserves
                  general capabilities
                </div>
              </div>
            </div>
            <strong>Quality and Expressiveness:</strong> Full fine tuning
            updates every parameter, so in principle it can reach the absolute
            best specialization for your task. If you're training a model for
            medical diagnosis where 1% accuracy improvement translates to lives
            saved, and you have the budget, full fine tuning is worth
            considering. However, narrow task data often causes catastrophic
            forgetting: the model loses general capabilities. A customer support
            model trained only on refund queries might forget how to handle
            shipping questions. LoRA constrains updates to a low rank subspace.
            This typically gets you 95 to 98% of full fine tuning quality while
            preserving general capabilities much better. For assistant like
            systems that handle mixed workloads, this is often preferable. QLoRA
            adds 4 bit quantization, which introduces small numerical noise.
            Most tasks see 97 to 99% of full precision performance, but tasks
            requiring exact numerical outputs (code generation, arithmetic
            reasoning) can degrade by 5 to 10%.
            <strong>Adapter Size vs Capacity:</strong> Within LoRA and QLoRA,
            you control the rank r. Lower rank means fewer parameters and lower
            memory cost, but less expressiveness. Consider a production platform
            serving 1000 tenants: With rank 4 on attention only, each adapter
            might be 20 MB. You can fit 50 adapters in 1 GB of GPU memory for
            hot cache, serving high QPS multi tenant workloads with minimal
            latency. But performance on complex reasoning tasks may plateau.
            With rank 64 targeting all linear layers, adapters grow to 200 MB
            each. You fit only 5 in 1 GB, requiring more disk I/O for cold
            adapters, but you get near full fine tuning quality. The Databricks
            finding is instructive: going from rank 8 to rank 16 didn't help on
            their 3B model, but expanding from attention only to all linear
            layers did. This suggests layer coverage matters more than rank up
            to a threshold.<p></p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't whether PEFT is better. It's: do I have one
                critical task where 1% quality matters more than cost, or do I
                have 100 tasks where 95% quality at 10x lower cost enables more
                experimentation?"
              </div>
            </div>
            <strong>Deployment Patterns:</strong> Merged adapters (computing W +
            A×B offline) give you the simplest serving: load one checkpoint, get
            baseline latency. This works for 5 to 10 high traffic
            specializations, such as major product surfaces. Inference latency
            matches the base model: 50 to 150 ms p50, 200 to 400 ms p99 for
            short generations on A100. Separate adapters enable multi tenancy
            but add complexity. You need adapter routing, cache management with
            Least Recently Used (LRU) eviction, and handling of cold start when
            an adapter isn't in GPU memory. The latency penalty is 3 to 7% from
            extra matrix multiplies if adapters are hot, or 20 to 50 ms if you
            must load from disk. This pattern shines when you serve hundreds of
            tasks, each at moderate QPS: aggregate 5000 QPS across 500 tenants
            is easier than maintaining 500 separate model deployments.
            <strong>When to Choose What:</strong> Use full fine tuning when you
            have a single mission critical task, the quality difference of 1 to
            5% directly impacts business metrics, you can tolerate the cost of
            $500+ per training run, and you're willing to manage separate model
            artifacts and risk catastrophic forgetting. Use standard LoRA (16
            bit or 8 bit) when you need to adapt to dozens of tasks, quality
            within 2 to 5% of full fine tuning is acceptable, you want to
            preserve general model capabilities, and you have access to multi
            GPU infrastructure for training but want lower serving costs. Use
            QLoRA when you have limited GPU budget (single cards), you need to
            experiment rapidly across many variants, quality within 3 to 10% is
            acceptable, or you're fine tuning models above 30B parameters where
            even standard LoRA would require multiple GPUs. For most production
            ML teams, QLoRA is the default starting point: fast iteration, low
            cost, and quality sufficient for 80% of use cases.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full fine tuning achieves peak quality but costs $500+ per run
                  on 8 to 16 GPUs and risks catastrophic forgetting of general
                  capabilities on narrow datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LoRA rank choice trades capacity for efficiency: rank 4
                  adapters (20 MB) enable high multi tenant throughput with 50
                  adapters cached in 1 GB; rank 64 (200 MB) gives near full fine
                  tuning quality but limits cache to 5 adapters per GB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Merged adapters (W + A×B offline) suit 5 to 10 high traffic
                  products with simplest serving; separate adapters suit 100 to
                  1000 tasks with 3 to 7% latency overhead when hot, 20 to 50 ms
                  penalty on cold cache miss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision criteria: use full fine tuning when 1 to 5% quality
                  gain justifies 10x cost; use standard LoRA for dozens of tasks
                  with multi GPU access; use QLoRA as default for rapid
                  experimentation and models above 30B parameters on single GPUs
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
                  Medical diagnosis model: full fine tuning gains 2% accuracy
                  over LoRA, worth $500 per run when improvement affects patient
                  outcomes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Internal platform serving 500 teams: QLoRA adapters at rank 8
                  (50 MB each) enable serving all teams from single base model
                  with 5 to 10% cache hit rate and 30 ms p99 cold load penalty
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Code generation task: QLoRA shows 8% correctness drop versus
                  16 bit LoRA due to quantization noise affecting numerical
                  precision, prompting switch to 8 bit quantization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmFineTuningTradeOffsFullFineTuningVsLoraVsQlora;
