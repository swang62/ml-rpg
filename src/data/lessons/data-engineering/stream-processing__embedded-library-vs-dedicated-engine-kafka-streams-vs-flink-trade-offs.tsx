import type { Component } from "solid-js";

const LessonStreamProcessingEmbeddedLibraryVsDedicatedEngineKafkaStreamsVsFlinkTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Embedded Library vs Dedicated Engine: Kafka Streams vs Flink
            Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Stream processing implementations fall into two camps: embedded
            libraries like Kafka Streams and dedicated cluster engines like
            Apache Flink. Embedded libraries deploy as standard microservices
            within your application JVM. They tightly integrate with Kafka, use
            local state backed by compacted changelog topics, and scale by
            adding more application instances. Operationally simple, they favor
            microservice ownership and smaller teams. The trade-off is less
            sophisticated event time semantics, fewer execution knobs, and
            scaling tied to the number of application instances you can deploy.
            Dedicated engines run as separate clusters with resource managers,
            task schedulers, and control planes. Flink offers richer windowing,
            complex multi-way joins across diverse sources, iterative
            processing, and uniform state management. SQL over streams,
            autoscaling with large state, and savepoints for zero downtime
            upgrades are first class features. You can rescale jobs from 10 to
            100 workers without code changes. The trade-off is higher
            operational complexity: separate infrastructure, careful tuning to
            avoid backpressure and checkpoint stalls, and the need for
            centralized ops teams. Choose an embedded library when all input and
            output is Kafka, topologies are modest (per-key aggregates, joins
            with compacted tables), and teams prefer owning their services end
            to end. Choose a dedicated engine for multi-source joins, complex
            event time windows at scale, sessionization, large state (hundreds
            of GB to TB), continuous SQL, or cross-cluster high availability
            requirements. LinkedIn runs thousands of Kafka Streams jobs for
            simple per-user aggregations but uses Flink for complex cross-stream
            joins and ML feature pipelines at petabyte scale.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Kafka Streams (Library)
                  </strong>
                  <div style="font-size: 12px; line-height: 1.6">
                    ✓ Deploy as microservice
                    <br />✓ Simple ops, tight Kafka integration
                    <br />✓ Fast local state failover
                    <br />✗ Limited windowing semantics
                    <br />✗ Scaling tied to instances
                    <br />
                    <strong>Use:</strong> Per-key aggregates, modest topologies
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Flink (Cluster Engine)
                  </strong>
                  <div style="font-size: 12px; line-height: 1.6">
                    ✓ Rich event-time, complex joins
                    <br />✓ SQL, autoscaling, savepoints
                    <br />✓ Multi-source, large state (TB)
                    <br />✗ Separate infrastructure
                    <br />✗ Complex tuning (backpressure)
                    <br />
                    <strong>Use:</strong> Multi-stream joins, sessionization at
                    scale
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
                  Embedded libraries like Kafka Streams deploy as microservices
                  with simple ops and tight Kafka integration; dedicated engines
                  like Flink require separate clusters but offer richer
                  semantics and autoscaling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kafka Streams scales by adding instances (one instance per
                  partition max); Flink decouples compute from partitions and
                  can rescale from 10 to 100 workers via savepoints without
                  topology changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Flink supports complex multi-way joins across Kafka,
                  databases, and files with sophisticated watermark alignment;
                  Kafka Streams favors simpler Kafka to Kafka joins with
                  compacted tables
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational complexity differs by an order of magnitude: Kafka
                  Streams needs only Kafka and your app runtime; Flink requires
                  resource managers, tuning for backpressure, and checkpoint
                  monitoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At LinkedIn scale, thousands of Kafka Streams jobs handle
                  per-user aggregations while Flink processes cross-stream ML
                  features and sessionization with terabyte state
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
                  A team building real-time user session counters from Kafka
                  clickstream chooses Kafka Streams, deploying 20 instances for
                  20 partitions with local RocksDB state and 60 second changelog
                  replay on failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An ML platform team building a feature store with joins across
                  Kafka events, database Change Data Capture (CDC) streams, and
                  S3 reference data chooses Flink, running a 50 node cluster
                  with SQL queries and 500 GB total state
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStreamProcessingEmbeddedLibraryVsDedicatedEngineKafkaStreamsVsFlinkTradeOffs;
