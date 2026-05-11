import type { Component } from "solid-js";

const LessonMapreduceWhatIsMapreduceCoreModelAndExecutionFlow: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is MapReduce? Core Model and Execution Flow
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            MapReduce is a programming model for processing massive datasets by
            breaking work into two distributed phases: map and reduce, connected
            by a shuffle. The fundamental idea is to push computation to where
            data already lives rather than moving terabytes across the network.
            Mappers read input partitions in parallel, transform records, and
            emit intermediate key value pairs. The shuffle groups all values
            sharing the same key together across the cluster. Reducers then
            aggregate per key state to produce final outputs. This abstraction
            hides distribution complexity from developers. You write pure
            functions (map and reduce) over records, and the framework handles
            parallelization, failure recovery, and data movement. Tasks within
            each phase are embarrassingly parallel, meaning they don't need to
            coordinate. If a mapper fails, the system simply reruns it on
            another machine since operations are deterministic and idempotent.
            Google published the original MapReduce paper based on their
            internal system that by 2008 was running 100,000 jobs per day
            processing 20 petabytes daily. The model proved so effective for
            batch ETL, log analysis, and index building that it spawned the
            entire Hadoop ecosystem. The key insight was trading latency for
            throughput: jobs take minutes to hours, but can process petabytes
            with commodity hardware and automatic fault tolerance.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Input Split 1</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      logs_part_0001
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Input Split 2</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      logs_part_0002
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Input Split N</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      logs_part_000N
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ MAP PHASE
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Mapper 1</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      emit (key, val)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Mapper 2</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      emit (key, val)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Mapper N</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      emit (key, val)
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ SHUFFLE &amp; SORT
                  <div style="font-size: 11px; font-weight: normal; margin-top: 2px">
                    Group all values by key
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Reducer 1</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      key_A: [v1, v2...]
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Reducer 2</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      key_B: [v3, v4...]
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Reducer M</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      key_Z: [v5, v6...]
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold; margin-top: 4px">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Final Output</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Aggregated results per key
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
                  Map phase processes input partitions in parallel, emitting
                  intermediate key value pairs without coordination between
                  mappers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shuffle phase is the expensive global sort and group operation
                  that routes all values for each key to the same reducer
                  (network and disk intensive)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reduce phase aggregates per key state, with each reducer
                  handling a disjoint subset of the key space independently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fault tolerance via deterministic reexecution: failed map or
                  reduce tasks are simply rerun on different machines since
                  functions are pure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimized for throughput over latency: typical jobs take
                  minutes to hours but can process terabytes to petabytes on
                  commodity clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google's production system ran 100,000 jobs daily processing
                  20 PB per day by 2008, demonstrating scale for web indexing
                  and log analysis
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
                  Word count: Mappers emit (word, 1) for each occurrence.
                  Shuffle groups all counts per word. Reducers sum counts to
                  produce (word, total_count).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log analysis: Mappers parse logs and emit (user_id,
                  bytes_transferred). Shuffle co-locates all bytes per user.
                  Reducers sum to get total bandwidth per user.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inverted index building: Mappers emit (term, document_id).
                  Shuffle groups documents per term. Reducers build posting
                  lists for search indexing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMapreduceWhatIsMapreduceCoreModelAndExecutionFlow;
