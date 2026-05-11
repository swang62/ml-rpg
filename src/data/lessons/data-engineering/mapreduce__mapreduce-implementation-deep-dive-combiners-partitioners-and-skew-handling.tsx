import type { Component } from "solid-js";

const LessonMapreduceMapreduceImplementationDeepDiveCombinersPartitionersAndSkewHandling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            MapReduce Implementation Deep Dive: Combiners, Partitioners, and
            Skew Handling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Production MapReduce systems rely on sophisticated implementation
            details to achieve efficiency at scale. Combiners are the first
            critical optimization: these are mini reducers that run locally on
            each mapper's output before shuffle, performing partial aggregation
            to shrink network transfer. For associative and commutative
            operations like sum, count, or set union, combiners can reduce
            shuffle volume by 10x to 100x. However, combiners must preserve
            semantics: the framework may invoke them zero, one, or multiple
            times per key, so they must be idempotent. For example, computing
            average requires careful design: emit (sum, count) tuples and
            combine them, then divide in final reducer, rather than naively
            averaging averages. Partitioners control how keys map to reducers
            and directly impact load balance. The default hash partitioner
            distributes keys uniformly by hash value, which works well for
            uniform key distributions but fails catastrophically under skew.
            Skew aware partitioners use sampling: scan a small fraction of
            mapper output to measure per key byte weights, then construct range
            boundaries that assign approximately equal bytes to each reducer.
            For secondary sort patterns, you encode composite keys (primary
            grouping key plus sort key) and use custom partitioners and grouping
            comparators to ensure values arrive at reducers in desired order
            without loading everything into memory. Handling hot keys at scale
            requires multi phase decomposition. Key salting appends random
            suffixes (example: transform "user_12345" into "user_12345_shard0"
            through "user_12345_shard9") to split heavy hitters across multiple
            reducers in phase one. Phase two runs a lightweight final reduce to
            combine shards back into original keys. This pattern transforms one
            bottleneck partition into N balanced partitions plus a fast
            coalesce, cutting hot reducer time from hours to minutes. Amazon
            retail scale batch pipelines use this extensively for joining
            massive customer activity logs where a small fraction of power users
            generate orders of magnitude more events than median users.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combiners perform local pre-aggregation on mapper output
                  before shuffle, reducing network bytes by 10x to 100x for
                  associative operations like sum or count
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combiner semantics require idempotence: framework invokes
                  zero, one, or multiple times per key; computing average
                  requires emitting (sum, count) tuples, not averaging averages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skew aware partitioners use sampling to measure per key byte
                  weights, then construct range boundaries assigning equal bytes
                  per reducer rather than uniform hash distribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Secondary sort encodes composite keys (primary grouping key
                  plus sort key) with custom partitioners and grouping
                  comparators to deliver values in order without loading into
                  memory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key salting transforms hot keys by appending random suffixes
                  (example: "user_12345_shard0" to "shard9"), splitting across
                  reducers in phase one, then combining in lightweight phase two
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production example: Amazon retail pipelines use two phase
                  salting for customer activity joins where top 1 percent power
                  users generate 100x median events, cutting hot reducer time
                  from hours to minutes
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
                  Word count with combiner: Mapper emits 1 million (word, 1)
                  pairs totaling 10 MB. Combiner aggregates locally to 1000
                  unique (word, count) pairs = 10 KB shuffle. 1000x reduction in
                  network transfer.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Computing average correctly: emit (sum=value, count=1) from
                  mapper, combiner merges to (sum=total, count=N), final reducer
                  computes sum/count. Naive approach of averaging mapper
                  averages produces wrong results.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Salting hot user join: User activity log with user_12345
                  generating 10 million events. Salt to user_12345_shard0
                  through shard99 (100 shards), each reducer processes 100K
                  events in parallel, final reduce combines 100 partial results
                  in seconds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMapreduceMapreduceImplementationDeepDiveCombinersPartitionersAndSkewHandling;
