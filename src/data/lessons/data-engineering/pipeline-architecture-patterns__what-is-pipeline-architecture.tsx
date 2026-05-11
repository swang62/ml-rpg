import type { Component } from "solid-js";

const LessonPipelineArchitecturePatternsWhatIsPipelineArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Pipeline Architecture?
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
                <strong>Pipeline Architecture</strong> is a design pattern that
                decomposes data processing into a sequence of independent
                stages, where each stage performs one focused transformation and
                passes its output to the next stage.
              </div>
            </div>
            <strong>The Core Problem:</strong>
            Imagine you need to process millions of user events: validate them,
            clean them, enrich them with user metadata, join with purchase
            history, aggregate daily metrics, and write to multiple
            destinations. A single monolithic job that does all this becomes a
            nightmare. Any change requires redeploying everything. Testing is
            hard because you cannot isolate which transformation broke. Scaling
            is all or nothing, even if only the aggregation step is slow.
            <strong>How Pipeline Architecture Solves This:</strong>
            Pipeline architecture breaks the work into stages. Think of it like
            an assembly line. Stage 1 validates raw events. Stage 2 enriches
            with user data. Stage 3 performs joins. Stage 4 aggregates metrics.
            Each stage is independent: it reads from an input queue or storage,
            transforms data, and writes to an output queue or storage. This is
            similar to CPU instruction pipelines. A CPU does not execute one
            instruction completely before starting the next. Instead, it has
            stages like Fetch, Decode, Execute, and while one instruction is
            being decoded, another is being fetched. Multiple instructions are
            in flight simultaneously, improving throughput. Data pipelines work
            the same way: while Stage 1 processes new incoming events, Stage 2
            is processing the previous batch, and Stage 3 is aggregating results
            from earlier.
            <strong>Key Properties:</strong>
            Good pipeline designs share characteristics. Data flows in one
            direction through known steps. Each stage has a clear contract: what
            it expects as input and what it guarantees as output. Stages are
            stateless functions where possible, making them easier to
            parallelize and recover from failures. Between stages, you have
            buffers or queues that absorb bursts and decouple components.
            Finally, you can observe each stage independently: measure its
            throughput, latency, and error rate.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Netflix processes millions of
              viewing events per second through pipelines. LinkedIn transforms
              billions of profile updates and interactions daily. Uber uses
              pipelines to process ride data from ingestion through fraud
              detection to billing.
            </div>
            Pipeline architecture is foundational for Extract, Transform, Load
            (ETL) workflows, streaming analytics, log processing, machine
            learning feature generation, and even HTTP request handling through
            middleware chains.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Raw Events</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    500k events/sec
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Stage 1: Validate</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Schema checks
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Stage 2: Enrich</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Add user metadata
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Stage 3: Aggregate</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Daily metrics
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
                  Pipeline architecture decomposes complex data processing into
                  sequential, independent stages connected by queues or storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each stage has a clear contract defining input schema, output
                  schema, and performance targets like p99 latency under 100ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stages operate like CPU instruction pipelines: multiple
                  batches are in different stages simultaneously, improving
                  overall throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Between stages, buffers absorb traffic bursts and provide
                  decoupling, allowing independent deployment and scaling of
                  each stage
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
                  A video streaming platform processes viewing events: Stage 1
                  validates and normalizes 2M events/sec, Stage 2 enriches with
                  user tier and device info, Stage 3 computes real time
                  engagement metrics, Stage 4 writes to data lake for batch
                  analytics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A ride sharing platform pipeline: Stage 1 ingests ride
                  requests, Stage 2 performs fraud detection checks in under
                  200ms p99, Stage 3 enriches with driver and location data,
                  Stage 4 computes pricing, Stage 5 writes to billing system
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineArchitecturePatternsWhatIsPipelineArchitecture;
