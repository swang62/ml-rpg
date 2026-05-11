import type { Component } from "solid-js";

const LessonBackfillStrategiesAdvancedIncrementalStateDependencyManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced: Incremental State &amp; Dependency Management
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Dependency Problem:</strong>
            In real data platforms, tables depend on other tables. Your{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              daily_revenue
            </code>{" "}
            table joins to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_segments
            </code>{" "}
            to compute revenue per segment. When you reprocess{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_segments
            </code>
            , you must also reprocess{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              daily_revenue
            </code>{" "}
            and everything downstream. This forms a directed acyclic graph (DAG)
            of dependencies. Naive backfill approaches reprocess the entire DAG
            for the affected time range. But this is wasteful. If only one table
            in a 20 table pipeline changed logic, you do not need to recompute
            the other 19. The challenge is tracking which tables are affected
            and propagating reprocessing only where needed.
            <strong>Incremental State Propagation:</strong>
            Sophisticated systems use incremental state markers. Each table
            partition has metadata indicating its version and the versions of
            its upstream dependencies. When you reprocess{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_segments
            </code>{" "}
            with new logic and write{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_segments_v3
            </code>
            , the orchestrator marks all downstream partitions as stale. The
            next scheduled run of{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              daily_revenue
            </code>{" "}
            sees that its upstream dependency changed and automatically triggers
            a reprocessing of its affected partitions. This propagates through
            the DAG:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              daily_revenue
            </code>{" "}
            reprocesses, marks{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              monthly_rollups
            </code>{" "}
            as stale, and so on. This is how Airbnb and similar companies manage
            backfill at scale: they do not manually rerun every downstream job.
            The orchestrator detects staleness and automatically schedules
            reprocessing, respecting resource limits and priority.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "At 50+ tables in a dependency graph, manual backfill
                coordination becomes impossible. Automated staleness propagation
                is the only scalable approach."
              </div>
            </div>
            <strong>Selective Reprocessing by Entity:</strong>
            Another advanced pattern is entity scoped backfill. Instead of
            reprocessing all users for 90 days, you reprocess only affected
            users. For example, a pricing bug affected only users in the
            European Union. Raw event logs are partitioned by date and region.
            You backfill only{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              region=EU
            </code>{" "}
            partitions, leaving US and Asia untouched. This slashes cost and
            time. EU is 20 percent of your user base, so you process 180 TB
            instead of 900 TB. But it introduces complexity. Your aggregates now
            mix old and new logic by region. Queries that span regions must be
            aware of this. Debugging becomes harder: "Is this metric wrong
            because of the bug, or because we only fixed EU?" Entity scoped
            backfill works best when entities are isolated, for example separate
            customer tenants in a Business to Business (B2B) SaaS platform. Each
            tenant's data is independent. Reprocessing tenant 42 has no impact
            on tenant 57. For consumer products where aggregates span all users,
            entity scoped backfill is riskier.
            <strong>Coordinating Batch and Streaming:</strong>A sophisticated
            production challenge is coordinating backfill with real-time
            streaming pipelines. Suppose your streaming pipeline consumes Kafka,
            processes events, and writes to the same tables as your batch
            backfill. During backfill, you must ensure streaming does not
            overwrite or conflict with batch outputs. One pattern is to pause
            streaming for the affected time range and let backfill handle it.
            After backfill completes, streaming resumes from a later Kafka
            offset. This guarantees no conflicts but creates a temporary gap in
            real-time processing. Another pattern is priority-based overwrites.
            Batch backfill writes with a higher priority version tag. When the
            streaming pipeline tries to write the same partition, it checks the
            version. If batch already wrote a higher version, streaming skips
            the write. This allows both to run concurrently without conflicts.
            At Uber scale, streaming processes 500,000 events per second while
            batch backfills 90 days in parallel. Coordination is done with
            partition locking: backfill acquires a lock on partitions it is
            reprocessing. Streaming sees the lock and either skips those
            partitions or queues events for later replay. Locks are released
            after batch completes and validation passes.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> At Airbnb, dependency aware
              backfill cuts reprocessing time by 60 to 70 percent by only
              recomputing affected downstream tables, not the entire DAG.
            </div>
            <strong>When Backfill Becomes Migration:</strong>
            Sometimes "backfill" is actually a full data migration: moving from
            one storage system to another, changing partitioning schemes, or
            fundamentally restructuring data models. For example, migrating from
            Hive to Iceberg table format while also reprocessing with new logic.
            This requires a phased approach. First, dual write new data to both
            old and new systems. Second, backfill historical data to the new
            system. Third, validate that old and new produce identical results
            for overlapping time ranges. Fourth, switch reads to the new system.
            Finally, sunset the old system after a grace period. At LinkedIn
            scale, this can take months. Dual writing increases infrastructure
            cost by 30 to 50 percent during migration. But it allows safe
            validation and instant rollback if issues arise. The alternative, a
            risky "big bang" cutover, is rarely acceptable for production data
            platforms.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 12px; text-align: center">
                DEPENDENCY AWARE BACKFILL
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">user_segments_v3</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Reprocessed with new logic
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">daily_revenue</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Marked STALE, auto-reprocess
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">monthly_rollups</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Marked STALE, auto-reprocess
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Dashboard Queries</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Consistent across DAG
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
                  Dependency aware backfill tracks staleness: when
                  &lt;code&gt;user_segments&lt;/code&gt; reprocesses,
                  orchestrator automatically marks
                  &lt;code&gt;daily_revenue&lt;/code&gt; stale and triggers
                  reprocessing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At Airbnb scale, dependency propagation cuts backfill time by
                  60 to 70 percent by only recomputing affected tables, not the
                  entire 50+ table DAG
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Entity scoped backfill (only EU users, 180 TB) is 5x cheaper
                  than full backfill (900 TB) but creates mixed logic across
                  regions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coordinating streaming and batch: Uber uses partition locking
                  so 500,000 events per second streaming does not conflict with
                  90 day batch backfill
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data migration requires dual write (30 to 50 percent cost
                  increase), backfill, validation, cutover, and grace period
                  before sunsetting old system
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
                  Staleness propagation: Airflow task checks
                  &lt;code&gt;upstream_version&lt;/code&gt; metadata. If
                  &lt;code&gt;user_segments&lt;/code&gt; changed from v2 to v3,
                  &lt;code&gt;daily_revenue&lt;/code&gt; task sees staleness and
                  reruns for affected dates.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition locking: Batch backfill acquires Zookeeper lock on
                  &lt;code&gt;revenue/date=2024-03-15&lt;/code&gt;. Streaming
                  job checks lock before writing; if locked, queues event to
                  Kafka for later replay.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBackfillStrategiesAdvancedIncrementalStateDependencyManagement;
