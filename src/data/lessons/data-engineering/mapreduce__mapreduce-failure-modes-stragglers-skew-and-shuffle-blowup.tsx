import type { Component } from "solid-js";

const LessonMapreduceMapreduceFailureModesStragglersSkewAndShuffleBlowup: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            MapReduce Failure Modes: Stragglers, Skew, and Shuffle Blowup
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            MapReduce's deterministic retry model gracefully handles machine
            failures but struggles with performance pathologies that stretch job
            tail latency by orders of magnitude. Stragglers occur when a small
            fraction of tasks run abnormally slow due to hardware degradation
            (thermal throttling, dying disks), resource contention (noisy
            neighbors), or software issues (garbage collection pauses). A single
            straggler reducer processing 1 percent of data can delay the entire
            job. The standard mitigation is speculative execution: launch backup
            copies of slow tasks and use whichever finishes first. However,
            speculation amplifies problems if the root cause is data skew rather
            than hardware. Key skew is the most pernicious failure mode. When a
            single key represents a disproportionate fraction of data (for
            example, one user generates 10 percent of all events), that key's
            reducer becomes a hot partition receiving gigabytes while others
            finish in seconds. Symptoms include long tail reducers, excessive
            disk spills during merge, and out of memory errors. Mitigation
            strategies include key salting (append random suffixes to split hot
            keys across multiple reducers, then run a second pass to combine),
            two phase aggregation (fanout then final coalesce), and skew aware
            partitioners that use sampling to assign keys by byte weight rather
            than hash uniformity. Combiners help but cannot eliminate the
            problem if a single key's post aggregation size remains huge.
            Shuffle blowup happens when intermediate data explodes beyond
            network and disk capacity. This occurs with poor combiner design,
            Cartesian joins, or unexpected cardinality growth. Symptoms include
            network saturation, disk spill storms where reducers cannot keep up
            with incoming data, and merge phases that take longer than the
            reduce logic itself. A concrete example: joining 1 terabyte
            dimension table with 10 terabyte fact table without filtering
            produces 11 terabytes of shuffle. If mappers emit without
            pre-aggregation and the join has high cardinality, intermediate data
            can exceed input by 10x. Mitigation requires early filtering,
            aggressive compression, sampling to validate cardinality assumptions
            before full production runs, and in extreme cases redesigning the
            pipeline to use map side broadcast joins for small dimensions or
            multi stage decomposition for complex joins.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; padding-bottom: 8px; border-bottom: 2px solid">
                  KEY SKEW PROBLEM
                </div>
                <div style="display: flex; gap: 8px; align-items: flex-end; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 60px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer 1</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      key_A
                      <br />
                      50 MB
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 65px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer 2</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      key_B
                      <br />
                      80 MB
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 180px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer 3</strong>
                    <div style="font-size: 10px; margin-top: 2px; font-weight: bold">
                      HOT KEY
                      <br />
                      key_C
                      <br />5 GB ⚠️
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 70px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer 4</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      key_D
                      <br />
                      90 MB
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 10px; padding: 6px; border: 2px solid; border-radius: 6px">
                  Job completes only when slowest reducer finishes
                  <br />
                  <strong>
                    Reducer 3 takes 50x longer → entire job blocked
                  </strong>
                </div>
                <div style="height: 8px; border-top: 2px dashed; margin: 4px 0"></div>
                <div style="text-align: center; font-weight: bold; font-size: 14px; padding-bottom: 8px; border-bottom: 2px solid">
                  MITIGATION: Key Salting
                </div>
                <div style="display: flex; gap: 8px; align-items: flex-end; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 85px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer 1</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      key_C_shard0
                      <br />
                      500 MB
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 90px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer 2</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      key_C_shard1
                      <br />
                      600 MB
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; height: 95px; display: flex; flex-direction: column; justify-content: flex-end">
                    <strong style="font-size: 11px">Reducer N</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      key_C_shardN
                      <br />
                      700 MB
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 4px 0">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Second Stage: Combine Shards
                  </strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Final reduce: key_C → 5 GB (lightweight)
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
                  Stragglers extend job tail latency when few tasks run
                  abnormally slow due to hardware degradation, noisy neighbors,
                  or garbage collection pauses; speculative execution launches
                  backup tasks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key skew creates hot partitions when one key holds
                  disproportionate data (example: 10 percent of total); that
                  reducer becomes bottleneck while others idle, stretching job
                  time by 10x to 100x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key salting mitigates skew by appending random suffixes to hot
                  keys, splitting them across multiple reducers in first pass,
                  then combining in lightweight second pass
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shuffle blowup saturates network when intermediate data
                  explodes beyond capacity; joining 1 TB dimension with 10 TB
                  fact without filtering creates 11 TB shuffle, often exceeding
                  bisection bandwidth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combiners provide critical defense against shuffle blowup:
                  pre-aggregating before shuffle can reduce network bytes by 10x
                  to 100x for associative operations, but cannot fix high
                  cardinality joins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sampling is essential for validating assumptions: run small
                  scale test with 1 percent sample to detect skew or cardinality
                  explosions before committing petabyte scale production run
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
                  Social network graph join: user activity logs joined with
                  social graph creates Cartesian explosion for highly connected
                  users (celebrities). One user with 10 million followers
                  generates 10 million join outputs, overwhelming single
                  reducer.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce sales aggregation: 99 percent of users generate few
                  orders, but top 1 percent power users create millions. Without
                  salting, those users' keys bottleneck reducers while others
                  finish instantly.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log analysis with bad combiner: counting unique IP addresses
                  per hour without combiner sends raw IPs across network. 1 TB
                  logs with 100 million IPs creates 10 GB shuffle. Proper
                  combiner (HyperLogLog sketch) reduces to 10 MB.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMapreduceMapreduceFailureModesStragglersSkewAndShuffleBlowup;
