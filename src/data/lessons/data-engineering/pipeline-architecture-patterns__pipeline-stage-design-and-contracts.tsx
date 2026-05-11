import type { Component } from "solid-js";

const LessonPipelineArchitecturePatternsPipelineStageDesignAndContracts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pipeline Stage Design and Contracts
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Stage Contract:</strong>
            Every pipeline stage is a black box with three critical
            specifications. First, the input contract: what data format, schema,
            and assumptions does this stage require? Second, the output
            contract: what format, guarantees, and quality does it produce?
            Third, the performance contract: what throughput and latency targets
            must it meet? Consider a real enrichment stage. Input contract:
            "Events must have <code>user_id</code>, <code>timestamp</code>, and{" "}
            <code>schema_version</code> fields. Timestamps must be within 24
            hours of current time." Output contract: "Adds{" "}
            <code>geo_enriched</code> field with country, region, and city.
            Events are deduplicated by <code>event_id</code> within a 24 hour
            window." Performance contract: "Processes 50k events per second per
            instance with p99 latency under 100ms."
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Performance Contract Targets
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50k</div>
                  <div style="font-size: 10px; font-weight: 600">
                    EVENTS/SEC
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 LATENCY
                  </div>
                </div>
              </div>
            </div>
            <strong>Stateless vs Stateful Stages:</strong>
            Most stages should be stateless: they transform each record
            independently without remembering previous records. This makes them
            trivial to parallelize. Spin up 20 instances, and each processes
            1/20th of the traffic. Stateless stages also recover easily from
            failures: just restart and continue. But some stages need state.
            Aggregation stages compute per user counts or rolling windows. Join
            stages need to hold one side of the join in memory or storage. For
            stateful stages, you must externalize the state. Instead of keeping
            counters in memory, write them to a key value store or state
            backend. This enables horizontal scaling: partition state by key,
            and each worker handles a subset of keys. It also enables recovery:
            if a worker crashes, another can load its state partition and
            continue.
            <strong>Parallelism Through Partitioning:</strong>
            To scale a stage from 10k to 200k events per second, you cannot just
            make one instance faster. You partition the data stream and run
            multiple instances in parallel. The most common approach is
            partitioning by key. Hash the <code>user_id</code>, and send all
            events for user 123 to worker 3. This preserves per user ordering,
            which is often necessary for correctness. The math matters. If one
            stage instance handles 10k events per second and you need 200k per
            second throughput, you need at least 20 workers. In practice, add
            headroom: use 24 to 30 workers to handle traffic spikes and leave
            room for rolling deployments without dropping below capacity.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Partitioning by{" "}
              <code>user_id</code> works great until you have power users. One
              user generates 100 times more events than average. That worker
              becomes a hot spot, causing p99 latency spikes. The solution is
              secondary partitioning: hash on <code>user_id</code> plus{" "}
              <code>event_type</code>, or use consistent hashing with virtual
              nodes to spread hot keys.
            </div>
            <strong>Transport Between Stages:</strong>
            For streaming pipelines, stages communicate through message queues
            or distributed logs like Kafka. The queue provides buffering: if
            Stage 3 slows down temporarily, the queue between Stage 2 and 3
            absorbs the backlog, preventing upstream disruption. The queue also
            enables replay: you can reprocess historical data by resetting the
            consumer offset. For batch pipelines, stages write output files to
            object storage or a data lake, and the next stage reads those files.
            This is simpler but higher latency. A batch stage might take 5
            minutes to run and write output, then the next stage waits for all
            output files before starting. End to end latency for a 5 stage batch
            pipeline could be 30 to 60 minutes, compared to seconds for
            streaming.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: 700; font-size: 13px">
                Partitioned Stage Processing:
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Input Queue</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    200k events/sec
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Worker 1</strong>
                    <div style="font-size: 10px">Partition 0-99</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Worker 2</strong>
                    <div style="font-size: 10px">Partition 100-199</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Worker N</strong>
                    <div style="font-size: 10px">Partition N</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Output Queue</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    200k events/sec
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
                  Each stage defines three contracts: input requirements, output
                  guarantees, and performance targets like 50k events/sec at p99
                  100ms latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stateless stages transform records independently and scale
                  trivially; stateful stages externalize state to key value
                  stores for horizontal scaling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partitioning by key enables parallelism: for 200k events/sec
                  at 10k per worker, deploy at least 20 workers with headroom
                  for spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Message queues between stages provide buffering and replay
                  capability; batch stages use file storage with higher latency
                  but simpler semantics
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
                  An enrichment stage contract: Input requires user_id and
                  timestamp within 24h. Output adds geo_enriched field and
                  deduplicates by event_id. Performance: 50k events/sec per
                  instance, p99 under 100ms.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A stateful aggregation stage partitions by user_id across 30
                  workers. Each worker maintains counters in Redis for its
                  partition (user_id % 30). If a worker crashes, another loads
                  state for that partition and resumes counting.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineArchitecturePatternsPipelineStageDesignAndContracts;
