import type { Component } from "solid-js";

const LessonDataMeshArchitectureWhenToUseDataMeshVsAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Use Data Mesh vs Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Decision Framework:</strong>
            Data mesh is not a universal solution. It trades central control and
            uniformity for autonomy and scalability of people. You must have the
            organizational scale and complexity to justify the overhead of
            federated governance, platform engineering, and distributed data
            ownership.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Central Data Warehouse
                </div>
                <div style="font-size: 12px">
                  Simpler for fewer than 5 domains, single team controls quality
                  and schema, lower coordination cost
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Data Mesh
                </div>
                <div style="font-size: 12px">
                  Scales to 50+ domains, 10x more change capacity, domains move
                  independently at high velocity
                </div>
              </div>
            </div>
            <strong>When Data Mesh Fits:</strong>
            You have many domains (more than 10 to 15), many autonomous product
            teams, and high demand for analytical features and Machine Learning
            (ML). Your central data team is a bottleneck with lead times
            measured in months. You can staff each domain with engineers who
            have data literacy and can own quality, SLOs, and operational
            aspects of analytical pipelines. Concretely, if you are ingesting
            100,000+ events per second from dozens of domains, have hundreds of
            microservices, and need to support both batch analytics and real
            time ML features, data mesh lets you scale from 1 central data
            platform team to 10 domain data teams plus 1 platform team. This
            handles 10x more change velocity. Domains can evolve schemas, add
            new products, and fix quality issues independently without waiting
            on a shared backlog.
            <strong>When Central Warehouse Fits:</strong>
            You have fewer than 5 domains, a small data team (under 10 people),
            and modest analytical demand. A well run central warehouse or
            lakehouse will be simpler and cheaper. You avoid the overhead of
            federated governance, domain data ownership training, and complex
            platform engineering. With fewer domains, the central team can
            maintain close relationships with stakeholders and respond quickly
            without formal product contracts.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Lead Time Comparison
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    CENTRAL BOTTLENECK
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    2-3 months
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">DATA MESH</div>
                  <div style="font-size: 16px; font-weight: 800">Minutes</div>
                </div>
              </div>
            </div>
            <strong>Hidden Costs of Data Mesh:</strong>
            Domain teams now own quality, SLOs, and operational aspects. This
            requires higher data literacy and engineering skills inside each
            domain. You need to train teams on data modeling, pipeline
            operations, and quality monitoring. If you cannot staff this
            expertise, you end up with inconsistent quality and many half broken
            data products. Cross domain analytics becomes more complex. In a
            central warehouse, joins across domains are straightforward because
            one team controls all schemas. With data mesh, you need stronger
            contracts and alignment on shared concepts like identity keys.
            Without discipline, you get schema divergence where Orders domain
            uses <code>customer_id</code> and Payments domain uses{" "}
            <code>user_id</code> for the same concept, making joins painful.
            There is also platform engineering cost. Building and maintaining a
            self serve platform with declarative APIs, automated provisioning,
            embedded governance, and unified catalog is significant upfront
            investment. Estimate at least 5 to 10 experienced platform engineers
            and 12 to 18 months to reach maturity.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose data mesh when you have more domains than you have
                central data engineers who can keep up. Otherwise, a well run
                central platform will be simpler and cheaper."
              </div>
            </div>
            <strong>Compared to Data Lake:</strong>A monolithic data lake with
            central ingestion improves storage efficiency and scales storage
            capacity, but it does not solve the people bottleneck. You still
            have one team owning all pipelines. Data mesh improves scalability
            of people by distributing ownership. The trade off is more cognitive
            load per domain and risk of inconsistent patterns if governance is
            weak.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data mesh fits when you have 10+ domains, high analytical
                  demand, and a central team that is a bottleneck with lead
                  times of 2 to 3 months for new datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Central warehouse fits when you have fewer than 5 domains,
                  modest analytical demand, and a data team under 10 people.
                  Simpler and cheaper without federated governance overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data mesh scales people: from 1 central team to 10 domain
                  teams plus 1 platform team, handling 10x more change velocity
                  as domains evolve independently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hidden costs include training domain teams on data literacy,
                  ensuring cross domain schema alignment (for example,
                  &lt;code&gt;customer_id&lt;/code&gt; versus
                  &lt;code&gt;user_id&lt;/code&gt;), and building a mature self
                  serve platform (5 to 10 engineers, 12 to 18 months)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Estimate platform engineering cost carefully: declarative
                  APIs, automated provisioning, embedded governance, and unified
                  catalog require significant upfront investment before domains
                  see benefits
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
                  An ecommerce company with 50 domains and 500k events per
                  second during peak benefits from data mesh. Domains evolve
                  independently, reducing lead time from months to minutes.
                  Analysts query domain products with p50 latency of 1 to 3
                  seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A startup with 3 domains and 10 person data team uses a
                  central warehouse with dbt models. Simpler governance, one
                  team owns quality, and faster iteration without the overhead
                  of domain data ownership training.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A financial services company with 20 domains initially tries
                  data mesh but domains lack data literacy. Quality is
                  inconsistent, many products have null rates over 5%, and SLOs
                  are missed. They invest 18 months in training and platform
                  maturity before seeing benefits.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema divergence failure: Orders domain uses
                  &lt;code&gt;customer_id&lt;/code&gt;, Payments uses
                  &lt;code&gt;user_id&lt;/code&gt;, Catalog uses
                  &lt;code&gt;buyer_id&lt;/code&gt; for the same concept. Cross
                  domain joins require complex mapping logic. Federated
                  governance later standardizes on
                  &lt;code&gt;customer_id&lt;/code&gt; across all domains.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMeshArchitectureWhenToUseDataMeshVsAlternatives;
